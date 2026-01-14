'use client';
import { createContext, useContext, useState, RefObject } from 'react';

interface CursorContextType {
    stickyElement: RefObject<HTMLElement> | null;
    setStickyElement: (ref: RefObject<HTMLElement> | null) => void;
}

const CursorContext = createContext<CursorContextType>({
    stickyElement: null,
    setStickyElement: () => { },
});

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
    const [stickyElement, setStickyElement] = useState<RefObject<HTMLElement> | null>(null);

    return (
        <CursorContext.Provider value={{ stickyElement, setStickyElement }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => useContext(CursorContext);
