import VideoJS from "../components/video";
import { useEffect } from "react";

const Video = ({ videoData, error }) => {
  useEffect(() => {
    const receiveMessage = (event) => {
      const message = {
        event: 'ready',
        method: 'ping'
      }
      event.source.postMessage(message, event.origin);
    }

    window.addEventListener('message', receiveMessage);
  });

  const sources = []

  if (videoData) {
    const { videoSources } = videoData;
    const htmlSources = videoSources.html;
    const qualities = Object.keys(htmlSources);
    qualities.forEach(quality => {
      sources.push(...htmlSources[quality].map(source => ({ src: source.source, type: source.mimeType, label: quality })))
    });
  }

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources
  }

  return (
    <>
      {error ? <h1>Video not available</h1> : <VideoJS options={videoJsOptions} />}
    </>
  );
}

export default Video;

const isValidToken = (token) => {
  // Logic to determine if the token is valid, like size, etc.
  return true;
}

export async function getServerSideProps({ query }) {
  const videoId = query['video-id'];
  const playerId = query['player-id'];
  const channelId = query['channel-id']; // To be defined
  const token = query['token'];

  let url = `https://d.video-cdn.net/play/player/${playerId}/video/${videoId}`
  if (token && isValidToken(token)) {
    url = url + `?token=${token}`;
  }

  try {

    const res = await fetch(url);
    const videoData = await res.json();
    return { props: { videoData } };

  } catch (error) {

    return { props: { error: error.message } };

  }
}