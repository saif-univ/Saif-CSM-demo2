import ViewModeStatus from "@/app/ui/surgical-session/bottombar/viewmodestatus";
import ViewModeControls from "@/app/ui/surgical-session/bottombar/viewmodecontrols";
import SugicalSessionControls from "@/app/ui/surgical-session/bottombar/surgicalsessioncontrols";
import { SessionData } from "@/app/types/sessionData";
import { ImageMetaData } from "@/app/types/imageTypes";
import styles from "@/app/ui/surgical-session/bottombar/bottombar.module.css";

const BottomBar: React.FC<{
  modes: string[];
  viewMode: string;
  setViewMode: (mode: string) => void;
  sessionData: SessionData;
  selectedImage: ImageMetaData;
  onCapture: () => void;
  onRecordStart: () => void;
  onRecordStatus: () => void;
  onRecordStop: () => void;
}> = ({
  modes,
  viewMode,
  setViewMode,
  sessionData,
  selectedImage,
  onCapture,
  onRecordStart,
  onRecordStatus,
  onRecordStop,
}) => {
  return (
    <div className={styles["bottom-bar"]}>
      <ViewModeStatus viewMode={viewMode} sessionData={sessionData} />
      <ViewModeControls
        viewMode={viewMode}
        onCapture={onCapture}
        sessionData={sessionData}
        selectedImage={selectedImage}
        onRecordStart={onRecordStart}
        onRecordStatus={onRecordStatus}
        onRecordStop={onRecordStop}
      />
      <SugicalSessionControls viewMode={viewMode} />
    </div>
  );
};

export default BottomBar;
