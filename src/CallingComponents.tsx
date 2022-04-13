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
    const exampleOptionsMenuProps: IContextualMenuProps = {
      items: [
        {
          key: '1',
          name: 'Choose Camera',
          iconProps: { iconName: 'LocationCircle' },
          onClick: () => alert('Choose Camera Menu Item Clicked!')
        }
      ]
    };
  
    const controlBarStyle = {
      root: {
        justifyContent: 'center'
      }
    };
    const videoGalleryProps = usePropsFor(VideoGallery);
    const {cameras, checked, disabled, onToggleCamera, selectedCamera} = usePropsFor(CameraButton);
    return (
      <Stack className={mergeStyles({ height: '100%' })}>
        {/* GridLayout Component relies on the parent's height and width, so it's required to set the height and width on its parent. */}
        <div style={{ height: '30rem', width: '30rem', border: '1px solid' }}>
            <ConnectedLocalVideoTile localParticipant={videoGalleryProps.localParticipant}/>
            {
                videoGalleryProps.remoteParticipants.map(remoteParticipant => <ConnectedRemoteVideoTile remoteParticipant={remoteParticipant} />)
            }
          {/* <GridLayout>
            <VideoTile displayName={'Michael'} />
          </GridLayout> */}
        </div>
  
        {/* Control Bar with default set up */}
        <ControlBar styles={controlBarStyle}>
          <CameraButton checked={checked} disabled={disabled} onToggleCamera={onToggleCamera} selectedCamera={selectedCamera} cameras={cameras} />
        </ControlBar>
      </Stack>
    );
  };