import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
    id?: string;
}

export function Section({ children, className = "", align = "center", id }: SectionProps) {
    const alignClass = align === 'left' ? 'items-start text-left' :
        align === 'right' ? 'items-end text-right' :
            'items-center text-center';

    return (
        <section id={id} className={`h-screen w-full flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pointer-events-none ${alignClass} ${className}`}>
            <div className="pointer-events-auto">
                {children}
            </div>
        </section>
    )
}
