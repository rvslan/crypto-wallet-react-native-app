import { View, Text, Image } from 'react-native';
import React from 'react';

import { COLORS, SIZES, FONTS, icons } from '../constants';

const BalanceInfo = ({
  title,
  displayAmount,
  changePercentage,
  containerStyle,
}) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <Text
        style={{
          ...FONTS.h3.color,
          color: COLORS.lightGray3,
        }}
      >
        {title}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.lightGray3,
          }}
        >
          $
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            ...FONTS.h2,
            color: COLORS.white,
          }}
        >
          {displayAmount.toLocaleString()}
        </Text>
        <Text
          style={{
            color: COLORS.lightGray3,
            ...FONTS.h3,
          }}
        >
          {' USD'}
        </Text>
      </View>

      {/* Change Percentage */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        {changePercentage != 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: 'center',
              tintColor: changePercentage > 0 ? COLORS.lightGreen : COLORS.red,
              transform: [
                { rotate: changePercentage > 0 ? '45deg' : '125deg' },
              ],
            }}
          ></Image>
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'flex-end',
            color:
              changePercentage == 0
                ? COLORS.lightGray3
                : changePercentage > 0
                ? COLORS.lightGreen
                : COLORS.red,
            ...FONTS.h4,
          }}
        >
          {changePercentage.toFixed(2)}%
        </Text>

        <Text
          style={{
            marginLeft: SIZES.radius,
            alignSelf: 'flex-end',
            color: COLORS.lightGray3,
            ...FONTS.h5,
          }}
        >
          7d change
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
