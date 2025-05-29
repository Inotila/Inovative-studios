import { useState, useEffect } from "react";
import axios from "axios";

export function useTrackLike(trackId: string) {
    
  const [isLiked, setIsLiked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const baseURL = 'http://localhost:3001';

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!trackId || !token) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);

    axios
      .get(`${baseURL}/api/track-interactions/like-status?trackId=${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setIsLiked(res.data.isLiked))
      .catch(() => setIsLiked(false));
  }, [trackId]);

  const toggleLike = async () => {
    const token = localStorage.getItem("token");
   if (!trackId || !token) {
      console.warn("User not authenticated.");
      return;
    }
 try {
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
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return { isLiked, toggleLike, isAuthenticated };
}
