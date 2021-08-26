import { useEffect, useRef } from 'react';
import { processMessage } from './utils';
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = (props) => {

  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options } = props;

  const VideoHtml = (props) => (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );

  const receiveMessage = (event) => processMessage(event, playerRef.current);

  useEffect(() => {
    window.addEventListener('message', receiveMessage);
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      playerRef.current = videojs(videoElement, options);
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    }
  }, [options]);

  return (<VideoHtml />);
}
export default VideoJS;