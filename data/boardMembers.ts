export interface BoardMember {
    id: string;
    name: string;
    role: string;
    image: string;
}

export const boardMembers: BoardMember[] = [
    {
        id: '1',
        name: 'Harshit kedia',
        role: 'President',
        image: '/assets/team-president.png',
    },
    {
        id: '2',
        name: 'Harseerat Kaur',
        role: 'Secretary',
        image: '/assets/team-secretary.png',
    },
    {
        id: '3',
        name: 'Navnita Rajput',
        role: 'Club Advisor',
        image: '/assets/team-president.png', // Placeholder
    },
    {
        id: '4',
        name: 'Pranshu Goyal',
        role: 'Financial Advisor',
        image: '/assets/team-secretary.png', // Placeholder
    },
    {
        id: '5',
        name: 'Mayank Sharma',
        role: 'Treasurer',
        image: '/assets/team-president.png', // Placeholder
    },
    {
        id: '6',
        name: 'Prinni dutta',
        role: 'Public Relations Officer',
        image: '/assets/team-president.png', // Placeholder
    },
    {
        id: '7',
        name: 'Bhumika',
        role: 'Social Media Head',
        image: '/assets/team-president.png', // Placeholder
    },
    {
        id: '8',
        name: 'saloni',
        role: 'Creative Head',
        image: '/assets/team-president.png', // Placeholder
    },
];
