import React, {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import CoinTable from "./CoinTable";



function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() =>{
    const fetchData = async() =>{
      try {
        const res = await axios.get ('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false') 

        setCoins(res.data);
        
      } catch (err) {
        alert("There is an error");
      }
    }
    fetchData()
}, [])  

  const handleChange = e =>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase()) || coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" className="coin-input" placeholder="Search" onChange={handleChange} />
        </form>
      </div>

      {<CoinTable coins={filteredCoins}/>}
    </div>

  );
}

export default App;
