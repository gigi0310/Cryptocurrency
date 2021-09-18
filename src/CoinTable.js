import React from 'react'
import './Coin.css'
import Coin from './Coin';


const CoinTable = ({coins}) => {
    return  (<table className='table'>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Coin</th>
                    <th></th>
                    <th></th>
                    <th>Price</th>
                    <th>1h</th>
                    <th>24h</th>
                    <th>7d</th>
                    <th>24h Volume</th>
                    <th>Mkt Cap</th>
                </tr>
            </thead>
            <tbody>
                {
                    coins.map(coin =>{
                        return (
                        <Coin 
                            key={coin.id} 
                            rank = {coin.market_cap_rank}
                            name={coin.name} 
                            image={coin.image} 
                            symbol={coin.symbol} 
                            marketcap={coin.market_cap}
                            price = {coin.current_price}
                            priceChange = {coin.price_change_percentage_24h}
                            volume = {coin.total_volume}
                        />);
                    })
                }
            </tbody>
            </table>);

}

    


export default CoinTable;