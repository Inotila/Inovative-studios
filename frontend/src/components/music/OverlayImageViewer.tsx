import React from 'react';

interface OverlayImageViewerProps {
    imgSrc: string | null;
    onClose: () => void;
}

const OverlayImageViewer: React.FC<OverlayImageViewerProps> = ({ imgSrc, onClose }) => {
    if (!imgSrc) return null;

    return (
        <div
            className="overlay-image-viewer"
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                cursor: 'pointer',
            }}
            onClick={onClose}
        >
            <img
                src={imgSrc}
                alt="Full view"
                style={{
                    maxHeight: '90%',
                    maxWidth: '90%',
                    boxShadow: '0 0 15px white',
                    borderRadius: 8,
                }}
            />
        </div>
    );
};

export default OverlayImageViewer;
