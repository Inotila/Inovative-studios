import { useTrackLike } from "../../hooks/useTrackLike";

interface LikeButtonProps {
    trackId: string;
}

export default function LikeButton({ trackId }: LikeButtonProps) {
    const { isLiked, toggleLike, isAuthenticated } = useTrackLike(trackId);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <button onClick={toggleLike} style={{ color: isLiked ? 'red' : 'gray' }} className="btn like-btn-container mb-3">
            <i className={isLiked ? "fa-solid fa-heart likeIcon" : "fa-regular fa-heart unlikeIcon"}></i>
        </button>
    );
}
