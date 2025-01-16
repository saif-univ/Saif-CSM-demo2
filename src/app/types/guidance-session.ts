export type LayoutType = 'single' | 'split' | 'quad';
export type ContentType = 'camera' | 'whiteboard' | 'dicom' | 'screen-share' | 'image' | 'video';
export type CameraType = 'endo' | 'external' | 'monitoring' | 'mobile';

export interface ContentBase {
    type: ContentType;
    id: string;
    title?: string;
}

export interface CameraContent extends ContentBase {
    type: 'camera';
    cameraType: CameraType;
    isLive: boolean;
}

export interface WhiteboardContent extends ContentBase {
    type: 'whiteboard';
    sessionId: string;
    currentImage?: string;
}

export interface PanelContent extends ContentBase {
    panelId: string;
    content: CameraContent | WhiteboardContent;
}

