import React from 'react';
import { Text, View } from 'react-native';

const Header = ({label = "Vive l'Algerie"}) => {
  return (
    <View>
      <Text style={{color: 'white'}}>{label}</Text>
    </View>
  );
};

export default Header;
