import { useState, useEffect } from "react";
import axios from "axios";

export function useTrackLike(trackId: string) {
    
  const [isLiked, setIsLiked] = useState(false);
  const baseURL = 'http://localhost:3001';

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!trackId || !token) return;
    axios
      .get(`${baseURL}/api/track-interactions/like-status?trackId=${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setIsLiked(res.data.isLiked))
      .catch(() => setIsLiked(false));
  }, [trackId, token]);

  const toggleLike = async () => {
    if (!trackId || !token) return;

    try {
      if (isLiked) {
        await axios.post(
        `${baseURL}/api/track-interactions/like`,
        { trackId },
        {
            headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );
setIsLiked((prev) => !prev);

      } else {
        await axios.post(
          `${baseURL}/api/track-interactions/like`,
          { trackId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return { isLiked, toggleLike };
}