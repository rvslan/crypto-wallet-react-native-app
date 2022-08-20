const getPortfolioChanges = {
  totalWallet: (myHoldings) => {
    return myHoldings.reduce((acc, curr) => acc + (curr.total || 0), 0);
  },
  valueChange: (myHoldings) => {
    return myHoldings.reduce(
      (acc, curr) => acc + (curr.holding_value_change_7d || 0),
      0
    );
  },
};

export default getPortfolioChanges;
