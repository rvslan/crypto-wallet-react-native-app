import { View, Text, TouchableOpacity, Touchable } from 'react-native';
import React from 'react';

import { COLORS, FONTS } from '../constants';

const TextButton = ({ label, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
