import React from 'react'
import './Coin.css'


const Coin = ({rank, name, image, symbol, price, volume, priceChange, marketcap}) => {

    return (
        <tr>
            <td>
                <p className="coin-rank">{rank}</p>
            </td>
            <td>
                <img src={image} alt="crypto" /> 
            </td>
            <td>
                <h1>{name}</h1>
            </td>
            <td>
                <p className='coin-symbol'>{symbol}</p> 
            </td>
            <td>
                ${price.toLocaleString()}
            </td>
            <td>
                {priceChange < 0 ? (<p className="coin-percent red">{priceChange.toFixed(2)}%</p>) : (<p className="coin-percent green">{priceChange.toFixed(2)}%</p>
                )}
            </td>
            <td>
                ${volume.toLocaleString()}
            </td>
            <td>
                Mkt Cap: ${marketcap.toLocaleString()}
            </td>
        </tr>
)};

export default Coin
