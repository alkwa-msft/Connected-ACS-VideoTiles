// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from 'react';
import { VideoStreamOptions, usePropsFor, VideoGallery, VideoGalleryLocalParticipant } from '@azure/communication-react'
import { LocalVideoTile } from './LocalVideoTile';

/**
 * A memoized version of VideoTile for rendering remote participants. React.memo is used for a performance
 * boost by memoizing the same rendered component to avoid rerendering a VideoTile when its position in the
 * array changes causing a rerender in the parent component. https://reactjs.org/docs/react-api.html#reactmemo
 */
export const ConnectedLocalVideoTile = React.memo(
  (props: {
    localParticipant: VideoGalleryLocalParticipant,
    options?: VideoStreamOptions
  }) => {
    const propsForVideoGallery = usePropsFor(VideoGallery);
    const { localParticipant, options } = props;
    return (
      <LocalVideoTile
        onCreateLocalStreamView={propsForVideoGallery.onCreateLocalStreamView}
        onDisposeLocalStreamView={propsForVideoGallery.onDisposeLocalStreamView}
        displayName={localParticipant.displayName}
        renderElement={localParticipant.videoStream?.renderElement}
        isAvailable={localParticipant.videoStream?.isAvailable}
        isMuted={localParticipant.isMuted}
        isScreenSharingOn={localParticipant.isScreenSharingOn}
        remoteVideoViewOptions={options}
      />
    );
  }
);