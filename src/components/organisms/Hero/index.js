import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  HeroContainer,
  HeroImageBackground,
  HeroGradient,
  ButtonsView,
  ButtonItemView,
} from './styles';

import { Text, Logo } from '~/components/atoms';
import {
  Tag,
  IconButton,
  PlayButton,
  FavoriteStateModal,
} from '~/components/molecules';

import { colors } from '~/styles/colors';

import { useFavorites } from '~/services/hooks';
import { useDataStore } from '~/services/stores';

export const Hero = ({ item, onDetail }) => {
  const navigation = useNavigation();
  const { setSelectedData } = useDataStore();

  const [isFavorite, setIsFavorite] = useState(false);
  const { addFavorite, getFavorites, removeFavorite } = useFavorites();
  const { image_url, title, subtitle, type } = item;

  const checkIsFavorite = async () => {
    const favorites = await getFavorites();
    const isInFavorite = favorites.filter(
      (fv) => fv.id === item.id && fv.type === item.type
    );
    setIsFavorite(isInFavorite.length > 0);
  };

  useEffect(() => {
    checkIsFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeFavoriteModal = () => {
    setTimeout(() => {
      setShowFavoriteModal(null);
    }, 1000);
  };

  const addDataToFavorite = async () => {
    await addFavorite(item);
    setShowFavoriteModal('added');
    checkIsFavorite();
    closeFavoriteModal();
  };

  const removeDataFromFavorite = async () => {
    await removeFavorite(item);
    checkIsFavorite();
  };

  const onPressWatch = () => {
    setSelectedData(item);
    navigation.navigate('Watch');
  };

  const onPressDetail = () => {
    setSelectedData(item);
    navigation.navigate('Detail');
  };

  return (
    <HeroContainer>
      <HeroImageBackground
        source={{
          uri: image_url,
        }}
      >
        <HeroGradient colors={[colors.dark, 'transparent', colors.dark]}>
          {!onDetail && <Logo size="small" />}
          <Tag mt={onDetail ? 224 : 200}>{type}</Tag>
          <Text fontFamily="bold" size={28} mt={8}>
            {title}
          </Text>
          <Text size={18}>{subtitle}</Text>
          <ButtonsView>
            <ButtonItemView align="flex-start">
              <IconButton
                onPress={() =>
                  isFavorite ? removeDataFromFavorite() : addDataToFavorite()
                }
                label={isFavorite ? 'Rem. Favoritos' : 'Add Favoritos'}
                iconName={
                  isFavorite ? 'remove-circle-outline' : 'add-circle-outline'
                }
              />
            </ButtonItemView>

            <ButtonItemView>
              <PlayButton onPress={onPressWatch} />
            </ButtonItemView>

            <ButtonItemView align="flex-end">
              {!onDetail && (
                <IconButton
                  onPress={onPressDetail}
                  label="Saiba mais"
                  iconName="information-circle-outline"
                />
              )}
            </ButtonItemView>
          </ButtonsView>
        </HeroGradient>
      </HeroImageBackground>
      {!!showFavoriteModal && (
        <FavoriteStateModal
          type={showFavoriteModal}
          visible={!!showFavoriteModal}
          onClose={() => setShowFavoriteModal(null)}
        />
      )}
    </HeroContainer>
  );
};
