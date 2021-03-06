import React from "react";
import "./Coin.css";
import Table from "react-bootstrap/Table";
import Coin from "./Coin";
import CoinHeader from "./CoinHeader";

const CoinTable = ({ coins, sortByRank, sortByCoin, sortByPrice }) => (
  <Table hover responsive="lg">
    <CoinHeader
      sortByCoin={sortByCoin}
      sortByRank={sortByRank}
      sortByPrice={sortByPrice}
    />
    <tbody>
      {coins.map((coin) => (
        <Coin
          key={coin.id}
          rank={coin.market_cap_rank}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          priceChange1h={coin.price_change_percentage_1h_in_currency}
          priceChange24h={coin.price_change_percentage_24h_in_currency}
          priceChange7d={coin.price_change_percentage_7d_in_currency}
          volume={coin.total_volume}
        />
      ))}
    </tbody>
  </Table>
);

export default CoinTable;
