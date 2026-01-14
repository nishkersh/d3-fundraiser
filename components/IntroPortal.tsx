'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Vector Utility Class
class Vector2D {
    constructor(public x: number, public y: number) { }

    static random(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }
}

class Vector3D {
    constructor(public x: number, public y: number, public z: number) { }

    static random(min: number, max: number): number {
        return min + Math.random() * (max - min);
    }
}

// Animation Controller
class AnimationController {
    private timeline: gsap.core.Timeline;
    private time = 0;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private dpr: number;
    private size: number;
    private stars: Star[] = [];

    // Constants
    private readonly changeEventTime = 0.32;
    public readonly cameraZ = -400;
    private readonly cameraTravelDistance = 3400;
    private readonly startDotYOffset = 28;
    public readonly viewZoom = 100;
    private readonly numberOfStars = 5000;
    private readonly trailLength = 80;

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        dpr: number,
        size: number
    ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.dpr = dpr;
        this.size = size;
        this.timeline = gsap.timeline({ repeat: -1 });

        // Initialization
        this.setupRandomGenerator();
        this.createStars();
        this.setupTimeline();
    }

    // Setup Random Generator
    private setupRandomGenerator() {
        const originalRandom = Math.random;
        const customRandom = () => {
            let seed = 1234;
            return () => {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280;
            };
        };

        Math.random = customRandom();
        this.createStars();
        Math.random = originalRandom;
    }

    // Create Stars
    private createStars() {
        for (let i = 0; i < this.numberOfStars; i++) {
            // Star colors: Random mix of Gold and Cream
            const isGold = Math.random() > 0.4; // 60% gold
            const color = isGold ? '#D4AF37' : '#F5F5F0';
            this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance, color));
        }
    }

    // Setup Timeline
    private setupTimeline() {
        this.timeline.to(this, {
            time: 1,
            duration: 15,
            repeat: -1,
            ease: 'none',
            onUpdate: () => this.render(),
        });
    }

    // Easing Function
    public ease(p: number, g: number): number {
        if (p < 0.5) return 0.5 * Math.pow(2 * p, g);
        else return 1 - 0.5 * Math.pow(2 * (1 - p), g);
    }

    // Elastic Easing
    public easeOutElastic(x: number): number {
        const c4 = (2 * Math.PI) / 4.5;
        if (x <= 0) return 0;
        if (x >= 1) return 1;
        return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1;
    }

    // Map Function
    public map(
        value: number,
        start1: number,
        stop1: number,
        start2: number,
        stop2: number
    ): number {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    }

    // Constrain Function
    public constrain(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    // Linear Interpolation
    public lerp(start: number, end: number, t: number): number {
        return start * (1 - t) + end * t;
    }

    // Spiral Path
    public spiralPath(p: number): Vector2D {
        p = this.constrain(1.2 * p, 0, 1);
        p = this.ease(p, 1.8);
        const numberOfSpiralTurns = 6;
        const theta = 2 * Math.PI * numberOfSpiralTurns * Math.sqrt(p);
        const r = 170 * Math.sqrt(p);

        return new Vector2D(
            r * Math.cos(theta),
            r * Math.sin(theta) + this.startDotYOffset
        );
    }

    // Rotate Transform
    public rotate(
        v1: Vector2D,
        v2: Vector2D,
        p: number,
        orientation: boolean
    ): Vector2D {
        const middle = new Vector2D((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);

        const dx = v1.x - middle.x;
        const dy = v1.y - middle.y;
        const angle = Math.atan2(dy, dx);
        const o = orientation ? -1 : 1;
        const r = Math.sqrt(dx * dx + dy * dy);

        // Elastic Effect
        const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p);

        return new Vector2D(
            middle.x +
            r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
            middle.y +
            r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p))
        );
    }

    // Project Dot
    public showProjectedDot(position: Vector3D, sizeFactor: number, color: string) {
        const t2 = this.constrain(
            this.map(this.time, this.changeEventTime, 1, 0, 1),
            0,
            1
        );
        const newCameraZ =
            this.cameraZ +
            this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance;

        if (position.z > newCameraZ) {
            const dotDepthFromCamera = position.z - newCameraZ;

            // 3D -> 2D Projection Formula
            const x = (this.viewZoom * position.x) / dotDepthFromCamera;
            const y = (this.viewZoom * position.y) / dotDepthFromCamera;
            const sw = (400 * sizeFactor) / dotDepthFromCamera;

            this.ctx.fillStyle = color; // Use specific star color
            this.ctx.lineWidth = sw;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 0.5, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    // Draw Start Dot
    private drawStartDot() {
        if (this.time > this.changeEventTime) {
            const dy = (this.cameraZ * this.startDotYOffset) / this.viewZoom;
            const position = new Vector3D(0, dy, this.cameraTravelDistance);
            this.showProjectedDot(position, 2.5, '#D4AF37'); // Start dot is Gold
        }
    }

    // Main Render Function
    public render() {
        const ctx = this.ctx;
        if (!ctx) return;

        // Background Color: Deep Burgundy
        ctx.fillStyle = '#4A0404';
        ctx.fillRect(0, 0, this.size, this.size);

        ctx.save();
        ctx.translate(this.size / 2, this.size / 2);

        // Calculate Time Parameters
        const t1 = this.constrain(
            this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1),
            0,
            1
        );
        const t2 = this.constrain(
            this.map(this.time, this.changeEventTime, 1, 0, 1),
            0,
            1
        );

        // Rotate Camera
        ctx.rotate(-Math.PI * this.ease(t2, 2.7));

        // Draw Trail
        this.drawTrail(t1);

        // Draw Stars
        for (const star of this.stars) {
            star.render(t1, this);
        }

        // Draw Start Dot
        this.drawStartDot();

        ctx.restore();
    }

    // Draw Trail
    private drawTrail(t1: number) {
        for (let i = 0; i < this.trailLength; i++) {
            const f = this.map(i, 0, this.trailLength, 1.1, 0.1);
            const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f;

            this.ctx.fillStyle = '#D4AF37'; // Trail is also Gold
            this.ctx.lineWidth = sw;

            const pathTime = t1 - 0.00015 * i; // Small adjustment to prevent flicker
            const position = this.spiralPath(pathTime);

            // Add Rotation Effect
            const basePos = position;
            const offset = new Vector2D(position.x + 5, position.y + 5);
            const rotated = this.rotate(
                basePos,
                offset,
                Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5,
                i % 2 === 0
            );

            this.ctx.beginPath();
            this.ctx.arc(rotated.x, rotated.y, sw / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    // Pause Animation
    public pause() {
        this.timeline.pause();
    }

    // Resume Animation
    public resume() {
        this.timeline.play();
    }

    // Destroy Animation
    public destroy() {
        this.timeline.kill();
    }
}

// Star Class
class Star {
    private dx: number;
    private dy: number;
    private spiralLocation: number;
    private strokeWeightFactor: number;
    private z: number;
    private angle: number;
    private distance: number;
    private rotationDirection: number; // Rotation Direction
    private expansionRate: number; // Expansion Rate
    private finalScale: number; // Final Scale Ratio
    private color: string;

    constructor(cameraZ: number, cameraTravelDistance: number, color: string) {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = 30 * Math.random() + 15;
        this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
        this.expansionRate = 1.2 + Math.random() * 0.8; // Increase expansion rate 0.8-1.2 to 1.2-2.0
        this.finalScale = 0.7 + Math.random() * 0.6; // Final scale between 0.7-1.3
        this.color = color;

        this.dx = this.distance * Math.cos(this.angle);
        this.dy = this.distance * Math.sin(this.angle);

        this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3;
        this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ);

        const lerp = (start: number, end: number, t: number) =>
            start * (1 - t) + end * t;
        this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation);
        this.strokeWeightFactor = Math.pow(Math.random(), 2.0);
    }

    render(p: number, controller: AnimationController) {
        const spiralPos = controller.spiralPath(this.spiralLocation);
        const q = p - this.spiralLocation;

        if (q > 0) {
            const displacementProgress = controller.constrain(4 * q, 0, 1);

            // Mixed easing functions: gentle start, elastic end
            const linearEasing = displacementProgress;
            const elasticEasing = controller.easeOutElastic(displacementProgress);
            const powerEasing = Math.pow(displacementProgress, 2);

            // Mix different easing effects for smoother animation
            let easing;
            if (displacementProgress < 0.3) {
                // Start phase: mostly linear and quadratic
                easing = controller.lerp(
                    linearEasing,
                    powerEasing,
                    displacementProgress / 0.3
                );
            } else if (displacementProgress < 0.7) {
                // Middle phase: transition to elastic
                const t = (displacementProgress - 0.3) / 0.4;
                easing = controller.lerp(powerEasing, elasticEasing, t);
            } else {
                // Final phase: elastic effect
                easing = elasticEasing;
            }

            // Calculate Position Offset
            let screenX, screenY;

            // Apply different motion patterns in phases
            if (displacementProgress < 0.3) {
                // Initial phase: linear movement (30%)
                screenX = controller.lerp(
                    spiralPos.x,
                    spiralPos.x + this.dx * 0.3,
                    easing / 0.3
                );
                screenY = controller.lerp(
                    spiralPos.y,
                    spiralPos.y + this.dy * 0.3,
                    easing / 0.3
                );
            } else if (displacementProgress < 0.7) {
                // Middle phase: curved movement (40%)
                const midProgress = (displacementProgress - 0.3) / 0.4;
                const curveStrength =
                    Math.sin(midProgress * Math.PI) * this.rotationDirection * 1.5;

                // Base position (30% linear distance)
                const baseX = spiralPos.x + this.dx * 0.3;
                const baseY = spiralPos.y + this.dy * 0.3;

                // Target position (70% distance)
                const targetX = spiralPos.x + this.dx * 0.7;
                const targetY = spiralPos.y + this.dy * 0.7;

                // Add curve offset
                const perpX = -this.dy * 0.4 * curveStrength;
                const perpY = this.dx * 0.4 * curveStrength;

                screenX =
                    controller.lerp(baseX, targetX, midProgress) + perpX * midProgress;
                screenY =
                    controller.lerp(baseY, targetY, midProgress) + perpY * midProgress;
            } else {
                // Final phase: stronger spiral expansion (30%)
                const finalProgress = (displacementProgress - 0.7) / 0.3;

                // Base position (70% linear distance)
                const baseX = spiralPos.x + this.dx * 0.7;
                const baseY = spiralPos.y + this.dy * 0.7;

                // Final position (further distance)
                const targetDistance = this.distance * this.expansionRate * 1.5;
                const spiralTurns = 1.2 * this.rotationDirection;
                const spiralAngle =
                    this.angle + spiralTurns * finalProgress * Math.PI;

                const targetX = spiralPos.x + targetDistance * Math.cos(spiralAngle);
                const targetY = spiralPos.y + targetDistance * Math.sin(spiralAngle);

                // Apply easing
                screenX = controller.lerp(baseX, targetX, finalProgress);
                screenY = controller.lerp(baseY, targetY, finalProgress);
            }

            // Convert 2D screen coordinates to 3D space coordinates
            const vx =
                ((this.z - controller.cameraZ) * screenX) / controller.viewZoom;
            const vy =
                ((this.z - controller.cameraZ) * screenY) / controller.viewZoom;

            const position = new Vector3D(vx, vy, this.z);

            // Particle size animation: normal initial, slightly larger middle, adjust to finalScale
            let sizeMultiplier = 1.0;
            if (displacementProgress < 0.6) {
                // First 60%: slight expansion
                sizeMultiplier = 1.0 + displacementProgress * 0.2;
            } else {
                // Last 40%: transition to final size
                const t = (displacementProgress - 0.6) / 0.4;
                sizeMultiplier = 1.2 * (1.0 - t) + this.finalScale * t;
            }

            const dotSize = 8.5 * this.strokeWeightFactor * sizeMultiplier;

            controller.showProjectedDot(position, dotSize, this.color);
        }
    }
}

interface IntroPortalProps {
    onEnter: () => void;
}

export function IntroPortal({ onEnter }: IntroPortalProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<AnimationController | null>(null);
    const [startVisible, setStartVisible] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Initialize dimensions on mount to avoid SSR mismatch
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    // Handle Window Resize
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Create and Manage Animation
    useEffect(() => {
        if (dimensions.width === 0) return; // Wait for initial dimensions

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Handle DPR for sharpness
        const dpr = window.devicePixelRatio || 1;
        // Use full screen size max dimension for square render area coverage if needed, or just fill
        const size = Math.max(dimensions.width, dimensions.height);

        canvas.width = size * dpr;
        canvas.height = size * dpr;

        // Set CSS dimensions
        canvas.style.width = `${dimensions.width}px`;
        canvas.style.height = `${dimensions.height}px`;

        // Scale Context
        ctx.scale(dpr, dpr);

        // Create Animation Controller
        animationRef.current = new AnimationController(canvas, ctx, dpr, size);

        // Fade in button
        const timer = setTimeout(() => {
            setStartVisible(true);
        }, 2000);

        return () => {
            clearTimeout(timer);
            if (animationRef.current) {
                animationRef.current.destroy();
                animationRef.current = null;
            }
        };
    }, [dimensions]);

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-vanta z-50">
            {/* Spiral Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Canvas is centered and may be larger than viewport to cover it */}
                <canvas ref={canvasRef} className="absolute" />
            </div>

            {/* Button Overlay */}
            <div
                className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
          transition-all duration-1500 ease-out
          ${startVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }
        `}
            >
                <button
                    onClick={onEnter}
                    className="
            text-gold text-2xl tracking-[0.2em] uppercase font-playfair font-bold
            transition-all duration-700
            hover:tracking-[0.3em] hover:text-cream animate-pulse
            border border-gold px-8 py-3 rounded-sm bg-black/20 backdrop-blur-sm
          "
                >
                    Enter
                </button>
            </div>
        </div>
    );
}
