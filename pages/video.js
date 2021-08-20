import VideoJS from "../components/video";
import { useEffect } from "react";

const Video = ({ data }) => {
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

  const { videoSources } = data;
  const htmlSources = videoSources.html;
  const sources = []

  const qualities = Object.keys(htmlSources);
  qualities.forEach(quality => {
    sources.push(...htmlSources[quality].map(source => ({ src: source.source, type: source.mimeType, label: quality })))
  });
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources
  }

  return (
    <>
      <VideoJS options={videoJsOptions} />
    </>
  );
}

export default Video;

export async function getServerSideProps({ query }) {
  const videoId = query['video-id'];
  const playerId = query['player-id'];
  const channelId = query['channel-id'];

  const res = await fetch(`https://d.video-cdn.net/play/player/${playerId}/video/${videoId}`)
  const data = await res.json()

  return { props: { data } }
}