import React from "react";

const CoinHeader = ({ sortByRank, sortByCoin, sortByPrice }) => (
  <thead>
    <tr>
      <th onClick={sortByRank}>Rank</th>
      <th onClick={sortByCoin}>Coin</th>
      <th />
      <th />
      <th onClick={sortByPrice}>Price</th>
      <th>24h</th>
      <th>7d</th>
      <th>24h Volume</th>
      <th>Mkt Cap</th>
      <th>1h</th>
    </tr>
  </thead>
);

export default CoinHeader;
