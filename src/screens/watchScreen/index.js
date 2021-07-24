import React, { useState, useCallback } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

import { theme } from '~/styles/theme';

import { Container, GoBack } from '~/components';

import { useDataStore } from '~/services/stores';

export const WatchScreen = () => {
  const { selectedData } = useDataStore();
  const [playing, setPlaying] = useState(false);

  const youtubeId = useMemo(() => {
    const id = selectedData.trailer_url.split('v=')[1].substring(0, 11);
    return id;
  }, [selectedData]);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <Container align="flex-start" justify="center">
      <YoutubePlayer
        height={theme.metrics.px(300)}
        width={theme.metrics.width}
        play={playing}
        videoId={() => YoutubeGetID(selectedData.trailer_url)}
        onChangeState={onStateChange}
      />
      <GoBack />
    </Container>
  );
};
