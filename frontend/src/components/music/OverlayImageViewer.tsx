import React from 'react';

interface OverlayImageViewerProps {
    imgSrc: string | null;
    onClose: () => void;
}

const OverlayImageViewer: React.FC<OverlayImageViewerProps> = ({ imgSrc, onClose }) => {
    if (!imgSrc) return null;

    return (
        <div className="overlay-image-viewer" onClick={onClose}>
            <img src={imgSrc} alt="Full view" />
        </div>
    );
};

export default OverlayImageViewer;
