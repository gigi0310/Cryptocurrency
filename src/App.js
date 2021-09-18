import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import './App.css';
import _ from 'lodash';
import CoinTable from './components/Table/CoinTable';
import Search from './components/Search/Search';

const pageSize = 10;

function App() {
  const initalState = () => ({
    coins: [],
    paginatedCoins: [],
    pages: [],
    currentPage: 1,
    search: '',
    isLoaded: false,
  });

  const [state, setState] = useState(initalState());

  const updateState = (newState) => setState({ ...state, ...newState });

  const newPages = (coins) => {
    const count = coins ? Math.ceil(coins.length / pageSize) : 0;
    return _.range(1, count + 1);
  };

  const pagination = (pageNo) => {
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedCoins = _(state.coins)
      .slice(startIndex)
      .take(pageSize)
      .value();
    updateState({ paginatedCoins, currentPage: pageNo });
  };

  const filteredCoins = (search) => {
    let coins = [];
    if (search === '') {
      coins = state.coins;
    } else {
      coins = state.coins.filter(
        (coin) => coin.name.toLowerCase().includes(search.toLocaleLowerCase())
          || coin.symbol.toLowerCase().includes(search.toLocaleLowerCase()),
      );
    }
    return coins;
  };
  const newPaginatedCoins = (coins) => _(coins).slice(0).take(pageSize).value();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d',
        );

        const coins = res.data;

        const paginatedCoins = newPaginatedCoins(coins);

        const pages = newPages(coins);

        setState({
          ...initalState(),
          ...{
            coins,
            paginatedCoins,
            pages,
            isLoaded: true,
          },
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return !state.isLoaded ? <ReactLoading type="bars" color="green" height={667} width={375} />
    : (
      <>
        <h1>Crytocurrency</h1>
        <div className="coin-app">
          <Search
            onSearch={(value) => {
              const coins = filteredCoins(value);
              const paginatedCoins = newPaginatedCoins(coins);
              updateState({
                search: value,
                currentPage: 1,
                paginatedCoins,
                pages: newPages(coins),
              });
            }}
          />
          {!state.paginatedCoins ? (
            'No coin found'
          ) : (
            <CoinTable coins={state.paginatedCoins} />
          )}
          <nav>
            <ul className="pagination">
              {state.pages.map((page) => (
                <li
                  key={`1+${page}`}
                  className={
                    page === state.currentPage
                      ? 'page-item active'
                      : 'page-item'
                  }
                >
                  <p className="page-link" onClick={() => pagination(page)}>
                    {page}
                  </p>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    );
}

export default App;
