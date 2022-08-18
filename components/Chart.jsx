import { View, Text } from 'react-native';
import React from 'react';

import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';

import { SIZES, COLORS, FONTS } from '../constants';

const Chart = () => {
  return (
    <View>
      <Text
        style={{
          color: COLORS.white,
        }}
      ></Text>
    </View>
  );
};

export default Chart;
