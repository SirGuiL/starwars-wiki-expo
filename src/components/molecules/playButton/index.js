import React from 'react';

import { ButtonContainer } from './styles';

import { Text } from '~/components/atoms';
import { theme } from '~/styles/theme';

import { Ionicons } from '@expo/vector-icons';

export const PlayButton = ({ onPress }) => (
  <ButtonContainer onPress={onPress}>
    <Ionicons
      name="play"
      size={theme.metrics.px(12)}
      color={theme.colors.black}
    />
    <Text fontFamily="bold" size={14}>
      Play
    </Text>
  </ButtonContainer>
);
