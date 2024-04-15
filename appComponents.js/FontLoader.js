import React from 'react';
import { useFonts } from 'expo-font';

const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    'comfortaa-variable': require('../assets/fonts/Comfortaa-VariableFont_wght.ttf'),
    'pacifico-regular': require('../assets/fonts/Pacifico-Regular.ttf'),
  });

  if (!fontsLoaded) {
    // You may return a loading indicator here
    return null;
  }

  return children;
};

export default FontLoader;