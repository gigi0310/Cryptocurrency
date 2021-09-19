import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import './App.css';
import _ from 'lodash';
import CoinTable from './components/Table/CoinTable';
import Search from './components/Search/Search';
import Alert from './components/Alert';

const pageSize = 10;

const pagination = (pageNo, coins) => {
  const startIndex = (pageNo - 1) * pageSize;
  return _(coins)
    .slice(startIndex)
    .take(pageSize)
    .value();
};

const filteredCoins = (search, coins) => {
  let coinsFiltered = [];
  if (search === '') {
    coinsFiltered = coins;
  } else {
    coinsFiltered = coins.filter(
      (coin) => coin.name.toLowerCase().includes(search.toLocaleLowerCase())
        || coin.symbol.toLowerCase().includes(search.toLocaleLowerCase()),
    );
  }
  return coinsFiltered;
};

const newPaginatedCoins = (coins) => _(coins).slice(0).take(pageSize).value();

const newPages = (coins) => {
  const count = coins ? Math.ceil(coins.length / pageSize) : 0;
  return _.range(1, count + 1);
};

const initalState = () => ({
  coins: [],
  paginatedCoins: [],
  pages: [],
  currentPage: 1,
  search: '',
  isLoaded: false,
  alertShowed: false,
});

function App() {
  const [state, setState] = useState(initalState());

  const updateState = (newState) => setState({ ...state, ...newState });

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
            alertShowed: false,
          },
        });
      } catch (err) {
        setState({
          ...initalState(),
          ...{
            isLoaded: true,
            alertShowed: true,
          },
        });
      }
    };
    fetchData();
  }, []);

  return !state.isLoaded ? <ReactLoading type="bars" color="pink" height={667} width={375} className="isLoaded" />
    : (
      <>
        <div className="coin-app">
          <Search
            onSearch={(value) => {
              const coins = filteredCoins(value, state.coins);
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
                  <p
                    className="page-link"
                    onClick={() => updateState({
                      paginatedCoins: pagination(page, state.coins),
                      currentPage: page,
                    })}
                  >
                    {page}
                  </p>
                </li>
              ))}
            </ul>
          </nav>
          <Alert
            show={state.alertShowed}
            handleClose={() => {
              updateState({
                alertShowed: false,
                isLoaded: false,
              });
            }}
          />
        </div>
      </>
    );
}

export default App;
export {
  pagination,
  filteredCoins,
  newPaginatedCoins,
  initalState,
  newPages,
};
