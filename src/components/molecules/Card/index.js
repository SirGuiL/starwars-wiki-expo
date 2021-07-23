import React from 'react';
import { CardContainer, CardImage } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDataStore } from '~/services/stores/dataStore';

export const Card = ({ item }) => {
  const { setSelectedData } = useDataStore();
  const navigation = useNavigation();

  const onSelectedItem = () => {
    setSelectedData(item);
    navigation.navigate('Details');
  };

  return (
    <CardContainer onPress={() => navigation.navigate('Details')}>
      <CardImage source={{ uri: item.image_url }} />
    </CardContainer>
  );
};
