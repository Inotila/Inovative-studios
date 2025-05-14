import React, { useEffect, useRef } from 'react';

interface AudioElementProps {
    trackId: string;
    audioUrl: string;
    isPlaying: boolean;
    onEnded: () => void;
    registerAudioRef: (trackId: string, element: HTMLAudioElement | null) => void;
}

const AudioElement: React.FC<AudioElementProps> = ({ trackId, audioUrl, isPlaying, onEnded, registerAudioRef }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        registerAudioRef(trackId, audioRef.current);
    }, [trackId, registerAudioRef]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [isPlaying]);

    return (
        <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={onEnded}
            hidden
        />
    );
};

export default AudioElement;
