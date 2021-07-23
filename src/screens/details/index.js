import React from 'react';
import { ScreenScrollContainer, Hero, GoBack } from '~/components';
import { useDataStore } from '~/services/stores/dataStore';

export const Details = () => {
  const { selectedData } = useDataStore();

  return (
    <ScreenScrollContainer>
      <Hero item={selectedData} onDetail />
      <GoBack />
    </ScreenScrollContainer>
  );
};
