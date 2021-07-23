import React, { useEffect, useState } from 'react';
import { ScreenScrollContainer, HomeList, Hero, Loader } from '~/components';
import { useGetData } from '~/services/hooks';

export const Home = () => {
  const { getFilms, getCharacters } = useGetData();
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  const callGetData = async () => {
    const filmsResponse = await getFilms();
    const charactersResponse = await getCharacters();

    if (!filmsResponse.error && !charactersResponse.error) {
      setFilms(filmsResponse);
      setCharacters(charactersResponse);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ScreenScrollContainer>
        <Loader />
      </ScreenScrollContainer>
    );
  }

  return (
    <ScreenScrollContainer>
      <Hero
        item={{
          ...films[0],
          type: 'Filme',
        }}
      />
      <HomeList title="Filmes" data={films} />
      <HomeList title="Personagens" data={characters} />
    </ScreenScrollContainer>
  );
};
