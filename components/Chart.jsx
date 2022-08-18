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
import moment from 'moment';

import { SIZES, COLORS, FONTS } from '../constants';

const Chart = ({ containerStyle, chartPrices }) => {
  let startUnixTimestamp = moment().subtract(7, 'day').unix();

  let data = chartPrices
    ? chartPrices?.map((item, index) => {
        return {
          x: startUnixTimestamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  let points = monotoneCubicInterpolation({ data, range: 40 });

  const formatUSD = (value) => {
    'worklet';

    if (value === '') {
      return '';
    }

    return `$${Number(value).toFixed(2)}`;
  };

  const formatDateTime = (value) => {
    'worklet';

    if (value === '') {
      return '';
    }

    let selectedDate = new Date(value * 1000);

    let date = `0${selectedDate.getDate()}`.slice(-2);
    let month = `0${selectedDate.getMonth() + 1}`.slice(-2);

    return `${date} / ${month}`;
  };

  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
     return `${(value / 1e3).toFixed(roundingPoint)}K`;
    } else {
      return `${value}.toFixed(${roundingPoint})`;
    }
  };

  const getYAxisLabelValues = () => {
    if (chartPrices != undefined) {
      let minValue = Math.min(...chartPrices);
      let maxValue = Math.max(...chartPrices);

      let midValue = (maxValue + minValue) / 2;

      let higherMidValue = (maxValue + midValue) / 2;
      let lowerMidValue = (midValue + minValue) / 2;

      let roundPoint = 2;

      return [
        formatNumber(maxValue, roundPoint),
        formatNumber(higherMidValue, roundPoint),
        formatNumber(lowerMidValue, roundPoint),
        formatNumber(midValue, roundPoint),
      ];
    } else {
      return [];
    }
  };

  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      {/* Y Axis Label */}
      <View
        style={{
          position: 'absolute',
          left: SIZES.padding,
          top: 0,
          bottom: 0,
          justifyContent: 'space-between',
        }}
      >
        {getYAxisLabelValues().map((value, index) => {
          return (
            <Text
              key={index}
              style={{
                color: COLORS.lightGray3,
                ...FONTS.body4,
              }}
            >
              {value}
            </Text>
          );
        })}
      </View>
      {/* Chart */}
      {data.length > 0 && (
        <ChartPathProvider
          data={{
            points,
            smoothingStratey: 'bezier',
          }}
        >
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />
          <ChartDot>
            <View
              style={{
                position: 'absolute',
                left: -35,
                width: 80,
                alignItems: 'center',
                backgroundColor: COLORS.transparentBlack1,
              }}
            >
              {/* Dot */}
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen,
                  }}
                ></View>
              </View>

              {/* Y-Label */}
              <ChartYLabel
                format={formatUSD}
                style={{
                  color: COLORS.white,
                  ...FONTS.body5,
                }}
              ></ChartYLabel>
              {/* X-Label */}
              <ChartXLabel
                format={formatDateTime}
                style={{
                  marginTop: 3,
                  color: COLORS.lightGray3,
                  ...FONTS.body5,
                  lineHeight: 15,
                }}
              ></ChartXLabel>
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;
