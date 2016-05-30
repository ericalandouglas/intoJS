
import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => { // unpack props, creating new variable video to reference the props.video property
  const imageUrl = video.snippet.thumbnails.default.url;

  return (
    <li
      onClick={() => onVideoSelect(video)} // pass the list item's video back up the chain to the top level App scope an update video detail accordingly
      className="list-group-item"
    >
      <div className="video-list media">

        <div className="media-left">
          <img className="media-object" src={imageUrl} />
        </div>

        <div className="media-body">
          <div className="media-heading">{video.snippet.title}</div>
        </div>

      </div>
    </li>
  );

};

export default VideoListItem;

