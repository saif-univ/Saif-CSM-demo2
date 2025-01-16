import React from "react";
import {
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface SelectedVideoPlaybackControlProps {
  onPlay: () => void;
  onPause: () => void;
  onNextBookmark: () => void;
  onPreviousBookmark: () => void;
}

export default function SelectedVideoPlaybackControl() {
  return (
    <div className="flex space-x-4">
      <button>
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <button>
        <PlayIcon className="w-6 h-6" />
      </button>
      <button>
        <PauseIcon className="w-6 h-6" />
      </button>
      <button>
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
