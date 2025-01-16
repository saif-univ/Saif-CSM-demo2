import React from "react";

interface ResourceCountProps {
  count: number;
}

const ResourceCount: React.FC<ResourceCountProps> = ({ count }) => {
  return (
    <div className="flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold">
      {count}
    </div>
  );
};

export default ResourceCount;
