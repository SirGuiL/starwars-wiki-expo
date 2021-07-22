import React from "react";
import { FlatList } from "react-native";
import { Card } from "../../molecules";
import { Text } from "../../atoms";

const Fake_Data = [
  {
    id: 0,
    image_url:
      "https://sm.ign.com/ign_br/screenshot/default/darth-vader_5yvm.jpg",
  },
  {
    id: 1,
    image_url:
      "https://network.grupoabril.com.br/wp-content/uploads/sites/4/2020/02/desafio-jedi-de-mestre-yoda-consertar-as-frases-consegue-vocecc82.jpg?quality=100&strip=info",
  },
];

export const HomeList = () => {
  return (
    <FlatList
      horizontal
      data={Fake_Data}
      renderItem={({ item }) => <Card item={item} />}
      keyExtractor={(item) => String(item.id)}
    />
  );
};
