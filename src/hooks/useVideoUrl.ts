/**
 * Custom hook for converting Cloudinary embed URLs to direct video URLs
 * @param embedUrl - The Cloudinary embed URL
 * @returns The direct video URL
 */
export const useVideoUrl = () => {
  const getDirectVideoUrl = (embedUrl: string): string => {
    // Extract public_id from embed URL
    const match = embedUrl.match(/public_id=([^&]+)/);
    if (match) {
      const publicId = match[1];
      return `https://res.cloudinary.com/dzunaznej/video/upload/${publicId}.mp4`;
    }
    return embedUrl;
  };

  return { getDirectVideoUrl };
}; 