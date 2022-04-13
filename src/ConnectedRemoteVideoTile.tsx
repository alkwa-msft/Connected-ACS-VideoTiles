// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from 'react';
import { VideoStreamOptions, usePropsFor, VideoGallery, VideoGalleryRemoteParticipant } from '@azure/communication-react'
import { RemoteVideoTile } from './RemoteVideoTile';

/**
 * A memoized version of VideoTile for rendering remote participants. React.memo is used for a performance
 * boost by memoizing the same rendered component to avoid rerendering a VideoTile when its position in the
 * array changes causing a rerender in the parent component. https://reactjs.org/docs/react-api.html#reactmemo
 */
export const ConnectedRemoteVideoTile = React.memo(
  (props: {
    remoteParticipant: VideoGalleryRemoteParticipant,
    options?: VideoStreamOptions
  }) => {
    const propsForVideoGallery = usePropsFor(VideoGallery);
    const { remoteParticipant, options } = props;
    return (
      <RemoteVideoTile
        userId={remoteParticipant.userId}
        onCreateRemoteStreamView={propsForVideoGallery.onCreateRemoteStreamView}
        onDisposeRemoteStreamView={propsForVideoGallery.onDisposeRemoteStreamView}
        displayName={remoteParticipant.displayName}
        renderElement={remoteParticipant.videoStream?.renderElement}
        isAvailable={remoteParticipant.videoStream?.isAvailable}
        isMuted={remoteParticipant.isMuted}
        isScreenSharingOn={remoteParticipant.isScreenSharingOn}
        remoteVideoViewOptions={options}
      />
    );
  }
);