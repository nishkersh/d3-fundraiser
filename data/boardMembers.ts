export interface BoardMember {
    id: string;
    name: string;
    role: string;
    image: string;
}

export const boardMembers: BoardMember[] = [
    {
        id: '1',
        name: 'Rohan Gupta',
        role: 'President',
        image: '/assets/team-president.png',
    },
    {
        id: '2',
        name: 'Aanya Singh',
        role: 'Secretary',
        image: '/assets/team-secretary.png',
    },
    {
        id: '3',
        name: 'Vivaan Kumar',
        role: 'Treasurer',
        image: '/assets/team-president.png', // Placeholder
    },
    {
        id: '4',
        name: 'Diya Sharma',
        role: 'Event Chair',
        image: '/assets/team-secretary.png', // Placeholder
    },
    {
        id: '5',
        name: 'Arjun Patel',
        role: 'Sponsorship Lead',
        image: '/assets/team-president.png', // Placeholder
    },
];
