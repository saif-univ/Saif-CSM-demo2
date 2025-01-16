import { FC } from 'react';
import { Badge } from './Badge';

export interface Resource {
    id: string;
    icon: React.ElementType;
    label: string;
    badge?: string;
}

interface ResourceListProps {
    resources: Resource[];
    activeResource: string;
    onResourceSelect: (id: string) => void;
}

export const ResourceList: FC<ResourceListProps> = ({
    resources,
    activeResource,
    onResourceSelect
}) => (
    <div className="w-20 bg-[#E7ECEB] flex flex-col items-center py-4 space-y-6">
        {resources.map((resource) => (
            <div key={resource.id} className="relative">
                <button
                    onClick={() => onResourceSelect(resource.id)}
                    className={`p-2 rounded-lg hover:bg-white/50 transition-colors border border-gray-300
            ${activeResource === resource.id ? 'bg-white/30 text-blue-600' : 'text-gray-600'}`}
                >
                    <resource.icon className="w-8 h-7" />
                </button>
                {resource.badge && <Badge count={resource.badge} />}
            </div>
        ))}
    </div>
);