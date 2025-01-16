import UserInfo from "@/app/ui/surgical-session/topbar/userinfo";
import ViewModeInfo from "@/app/ui/surgical-session/topbar/viewmodeinfo";
import SurgeryViewModes from "@/app/ui/surgical-session/topbar/surgeryviewmode";

const TopBar: React.FC<{
  modes: string[];
  viewMode: string;
  setViewMode: (mode: string) => void;
  sessionData: any;
}> = ({ modes, viewMode, setViewMode, sessionData }) => {
  return (
    <div className="topbar">
      <div className="csm-icon-container">
        <img src="/csm.svg" alt="CSM Icon" className="csm-icon" />
      </div>
      {/* Surgery View Modes */}
      <div className="surgery-view-modes">
        <SurgeryViewModes
          modes={modes}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>

      {/* View Mode Info (Centered) */}
      <div className="view-mode-info">
        <ViewModeInfo viewMode={viewMode} />
      </div>

      {/* User Info (Right-Aligned) */}
      <div className="user-info">
        <UserInfo sessionData={sessionData} />
      </div>
    </div>
  );
};

export default TopBar;
