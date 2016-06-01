
import React from 'react';
import VideoListItem from './videoListItem.js';

const VideoList = (props) => { // props is an object holding the data passed by props

  const videoItems = props.videos.map((video) => {
    return (
      <VideoListItem
        onVideoSelect={props.onVideoSelect} // pass function through to each item, originating from index.js
        key={video.etag}
        video={video}
      />
    );
  });

  return (
    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );

};

export default VideoList;

