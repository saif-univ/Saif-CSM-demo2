import React, { useState } from "react";
import ResourceCount from "@/app/ui/surgical-session/sidepanel/resourcecount";
import { ResourceType } from "@/app/types/resourceTypes";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

interface ResourceListPanelProps {
  selectedResourceTab: string;
  setSelectedResourceTab: (tab: string) => void;
  resources: ResourceType[];
  toggleContentPanel: () => void; // New prop to toggle the content panel visibility
}

const ResourceListPanel: React.FC<ResourceListPanelProps> = ({
  selectedResourceTab,
  setSelectedResourceTab,
  resources,
  toggleContentPanel,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>(
    selectedResourceTab
  );

  const handleButtonClick = (resourceName: string) => {
    if (activeTab === resourceName) {
      setActiveTab(null); // Deselect if the same tab is clicked
      toggleContentPanel(); // Toggle the content panel visibility
    } else {
      setActiveTab(resourceName); // Set new active tab
      setSelectedResourceTab(resourceName);
      toggleContentPanel(); // Ensure content panel is visible
    }
  };

  return (
    <div className="sidebar">
      {resources.map((resource) => {
        const ResourceIcon = resource.icon;
        const isActive = activeTab === resource.name;

        return (
          <div key={resource.name} className="relative">
            <button
              onClick={() => handleButtonClick(resource.name)}
              className={`sidebar-button ${isActive ? "selected" : ""}`}
            >
              <ResourceIcon />
              {resource.count > 0 && (
                <div className="resource-count">{resource.count}</div>
              )}
              <span className="tooltip">{resource.name}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ResourceListPanel;
