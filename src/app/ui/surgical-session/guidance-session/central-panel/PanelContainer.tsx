import { FC, ReactNode } from 'react';
import { PanelContent } from '@/app/types/guidance-session';

interface PanelContainerProps {
    content: PanelContent;
    children: ReactNode;
    isActive?: boolean;
    onSelect?: () => void;
}

export const PanelContainer: FC<PanelContainerProps> = ({
    content,
    children,
    isActive,
    onSelect,
}) => (
    <div
        onClick={onSelect}
        className={`relative rounded-lg overflow-hidden border 
      ${isActive ? 'border-gray-100' : 'border-gray-200'}`}
    >
        {children}
        <div className="absolute top-2 right-2 flex space-x-2">
            {content.content.type === 'camera' && content.content.isLive && (
                <span className="bg-red-500 px-2 py-1 rounded text-white text-xs">
                    LIVE
                </span>
            )}
        </div>
    </div>
);