import React from "react";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  BigPlayButton,
} from "video-react";
import DownloadButton from "./DownloadButton";
const VideoCard = (props) => {
  return (
    <Player playsInline poster={props.poster} src={props.src}>
      <BigPlayButton position="center" className="my-class" />
      <ControlBar autoHide={false}>
        <VolumeMenuButton />
        <ReplayControl seconds={10} order={1.1} />
        <ForwardControl seconds={30} order={1.2} />
        <CurrentTimeDisplay order={4.1} />
        <TimeDivider order={4.2} />
        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
        <VolumeMenuButton disabled />
        <DownloadButton order={7} />
      </ControlBar>
    </Player>
  );
};

export default VideoCard;