import React from 'react';
import './Coin.css';

const Coin = ({
  rank,
  name,
  image,
  symbol,
  price,
  volume,
  priceChange1h,
  priceChange24h,
  priceChange7d,
  marketcap,
}) => (
  <tr>
    <td>
      <p className="coin-rank">{rank}</p>
    </td>
    <td>
      <img className="coin-img" src={image} alt="crypto" />
    </td>
    <td>
      <h1 className="coin-name">{name}</h1>
    </td>
    <td>
      <p className="coin-symbol">{symbol}</p>
    </td>
    <td>
      $
      {price.toLocaleString()}
    </td>
    <td>
      {priceChange1h < 0 ? (
        <p className="coin-percent red">
          {priceChange1h.toFixed(2)}
          %
        </p>
      ) : (
        <p className="coin-percent green">
          {priceChange1h.toFixed(2)}
          %
        </p>
      )}
    </td>
    <td>
      {priceChange24h < 0 ? (
        <p className="coin-percent red">
          {priceChange24h.toFixed(2)}
          %
        </p>
      ) : (
        <p className="coin-percent green">
          {priceChange24h.toFixed(2)}
          %
        </p>
      )}
    </td>
    <td>
      {priceChange7d < 0 ? (
        <p className="coin-percent red">
          {priceChange7d.toFixed(2)}
          %
        </p>
      ) : (
        <p className="coin-percent green">
          {priceChange7d.toFixed(2)}
          %
        </p>
      )}
    </td>
    <td>
      $
      {volume.toLocaleString()}
    </td>
    <td>
      $
      {marketcap.toLocaleString()}
    </td>
  </tr>
);

export default Coin;
