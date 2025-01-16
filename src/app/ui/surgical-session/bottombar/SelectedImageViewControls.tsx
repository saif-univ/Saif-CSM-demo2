import React from "react";
import {
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import styles from "@/app/ui/surgical-session/bottombar/bottombar.module.css";

const buttons = [
  { name: "Crop", count: 0, icon: ArrowTopRightOnSquareIcon },
  { name: "Color", count: 0, icon: SparklesIcon },
  { name: "Notes", count: 0, icon: ChatBubbleBottomCenterTextIcon },
  { name: "Guidance", count: 0, icon: ShareIcon },
  { name: "Save", count: 0, icon: CheckCircleIcon },
  { name: "Cancel", count: 0, icon: XCircleIcon },
  { name: "Delete", count: 0, icon: TrashIcon },
];

function handleButtonClick(name: string) {
  console.log(`Button clicked: ${name}`);
}

const SelectedImageViewControls: React.FC = () => {
  //console.log("SelectedImageViewControls rendering buttons" + buttons.length);
  return (
    <div className="flex space-x-4">
      {buttons.map((resource) => {
        const ResourceIcon = resource.icon;
        // console.log(
        //   "SelectedImageViewControls rendering button: " + resource.name
        // );
        return (
          <button
            key={resource.name}
            onClick={() => handleButtonClick(resource.name)}
            className={styles["bottombar-button"]}
          >
            <ResourceIcon />
            <span className="tooltip">{resource.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SelectedImageViewControls;
