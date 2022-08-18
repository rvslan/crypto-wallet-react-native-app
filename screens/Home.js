import React from 'react';
import { View, Text } from 'react-native';

import MainLayout from './MainLayout';
import { BalanceInfo, Chart, IconTextButton } from '../components';

import { useFocusEffect } from '@react-navigation/native';

import { connect } from 'react-redux';
import { getHoldings, getCoinMarket } from '../stores/market/marketActions';

import { SIZES, COLORS, FONTS, dummyData, icons } from '../constants';

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  useFocusEffect(
    React.useCallback(() => {
      getHoldings(dummyData.holdings);
      getCoinMarket();
    }, [getHoldings, getCoinMarket])
  );

  let totalWallet = myHoldings.reduce(
    (acc, curr) => acc + (curr.total || 0),
    0
  );

  let valueChange = myHoldings.reduce(
    (acc, curr) => acc + (curr.holding_value_change_7d || 0),
    0
  );

  let valueChangePerc = (valueChange / (totalWallet - valueChange)) * 100;

  const renderWalletInfoSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        <BalanceInfo
          title='Your Wallet'
          displayAmount={totalWallet}
          changePercentage={valueChangePerc}
          containerStyle={{
            marginTop: 50,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label='Transfer'
            icon={icons.send}
            containerStyle={{
              flex: 1,
              margin: 10,
              marginRight: SIZES.radius,
            }}
            onPress={() => {
              console.log('Transfer');
            }}
          />
          <IconTextButton
            label='Withdraw'
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              margin: 10,
            }}
            onPress={() => {
              console.log('Transfer');
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* Header - Wallet Info */}
        {renderWalletInfoSection()}

        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={coins[0]?.sparkline_in_7d?.price}
        />
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
