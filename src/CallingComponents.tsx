// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  CameraButton,
  ControlBar,
  EndCallButton,
  GridLayout,
  MicrophoneButton,
  DevicesButton,
  ScreenShareButton,
  VideoTile,
  usePropsFor,
  VideoGallery
} from '@azure/communication-react';

import { IContextualMenuProps, mergeStyles, Stack } from '@fluentui/react';
import React, { useState } from 'react';
import { ConnectedLocalVideoTile } from './ConnectedLocalVideoTile';
import { ConnectedRemoteVideoTile } from './ConnectedRemoteVideoTile';

export const CallingComponents = (): JSX.Element => {
  const controlBarStyle = {
    root: {
      justifyContent: 'center'
    }
  };

  const videoGalleryProps = usePropsFor(VideoGallery);
  const {cameras, checked, disabled, onToggleCamera, selectedCamera} = usePropsFor(CameraButton);
  const microphoneButtonProps = usePropsFor(MicrophoneButton);
  return (
    <Stack className={mergeStyles({ height: '100%' })}>
      {/* GridLayout Component relies on the parent's height and width, so it's required to set the height and width on its parent. */}
      <div>
        <div style={{ width: '200px', height: '200px'}}> <ConnectedLocalVideoTile localParticipant={videoGalleryProps.localParticipant}/></div>
            {
                videoGalleryProps.remoteParticipants.map(remoteParticipant => <div style={{ width: '200px', height: '200px'}}> <ConnectedRemoteVideoTile remoteParticipant={remoteParticipant} /></div>)
            }
        </div>

      {/* Control Bar with default set up */}
      <ControlBar styles={controlBarStyle}>
        <CameraButton checked={checked} disabled={disabled} onToggleCamera={onToggleCamera} selectedCamera={selectedCamera} cameras={cameras} />
        <MicrophoneButton {...microphoneButtonProps} />
      </ControlBar>
    </Stack>
  );
};