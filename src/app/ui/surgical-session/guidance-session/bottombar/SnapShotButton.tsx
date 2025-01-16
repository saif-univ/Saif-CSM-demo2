// src/components/controls/ControlButton.tsx
import { FC } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

interface SnapShotButtonProps {
    icon: React.ElementType;
    onClick?: () => void;
}

export const SnapShotButton: FC<SnapShotButtonProps> = ({
    icon: Icon,
    onClick,
}) => (
    <button
        className="rounded-lg hover:bg-gray-300 transition-colors border border-gray-900"
        onClick={onClick}
    >
        <div className="w-8 h-8 flex items-center justify-center">
            <Icon className={`w-6 h-6`} />
            {/* {options && (
                <ChevronUpIcon className="w-5 h-5 ml-1 text-gray-800 mb-6" />
            )} */}
        </div>
    </button>
);