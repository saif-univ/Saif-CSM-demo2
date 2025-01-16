import { FC } from 'react';
import { LayoutType } from '@/app/types/guidance-session';

interface LayoutButtonProps {
    layout: LayoutType;
    activeLayout: LayoutType;
    onClick: (layout: LayoutType) => void;
}

export const LayoutButton: FC<LayoutButtonProps> = ({ layout, activeLayout, onClick }) => {
    const isActive = layout === activeLayout;

    return (
        <button
            onClick={() => onClick(layout)}
            className={`p-3 border border-gray-500 relative
        ${isActive ? 'bg-[#E7ECEB]' : 'hover:bg-[#E7ECEB]'}`}
        >
            {layout === 'split' && (
                <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-gray-500" />
            )}
            {layout === 'quad' && (
                <>
                    <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-gray-500" />
                    <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-px bg-gray-500" />
                </>
            )}
        </button>
    );
};