import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import "./App.css";
import _ from "lodash";
import CoinTable from "./components/Table/CoinTable";
import Search from "./components/Search/Search";
import Alert from "./components/Alert";
import Pagination from "./components/Pagination/Pagination";

const coinPerPage = 10;

/*
  show the coins in the current page;
  calculated by: indexOfFirst, indexOfLast;
  using slice to find the subarray.
*/
const pagination = (pageNo, coins) => {
  const startIndex = (pageNo - 1) * coinPerPage;
  // startIndex = 10,  10 + pageSzie = 20 (19)
  return coins.slice(startIndex, startIndex + coinPerPage);
};

const filteredCoins = (search, coins) => {
  let coinsFiltered = [];
  if (search === "") {
    coinsFiltered = coins;
  } else {
    coinsFiltered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }
  return coinsFiltered;
};

const paginatedPages = (coins) => {
  const count = coins ? Math.ceil(coins.length / coinPerPage) : 0;
  return _.range(1, count + 1); // [1, 2, 3, ... count]
};

const initalState = {
  coins: [],
  paginatedCoins: [],
  pages: [],
  currentPage: 1, // default selected page
  search: "",
  isLoaded: false,
  alertShowed: false,
};

function App() {
  const [state, setState] = useState(initalState);

  const updateState = (newState) => setState({ ...state, ...newState });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d"
        );

        const coins = res.data;
        const pages = paginatedPages(coins);

        // loaded succeeded
        setState({
          ...initalState,
          ...{
            coins,
            paginatedCoins: pagination(1, coins),
            pages,
            isLoaded: true,
            alertShowed: false,
          },
        });
      } catch (err) {
        // load failed
        setState({
          ...initalState,
          ...{
            isLoaded: true,
            alertShowed: true,
          },
        });
      }
    };
    fetchData();
  }, []);

  return !state.isLoaded ? (
    <ReactLoading
      type="bars"
      color="pink"
      height={667}
      width={375}
      className="isLoaded"
    />
  ) : (
    <>
      <Alert
        show={state.alertShowed}
        handleClose={() => {
          updateState({
            alertShowed: false,
            isLoaded: false,
          });
        }}
      />
      <div className="coin-app">
        <Search
          onSearch={(value) => {
            const coins = filteredCoins(value, state.coins);
            updateState({
              search: value,
              paginatedCoins: pagination(1, coins),
              currentPage: 1,
              pages: paginatedPages(coins),
            });
          }}
        />
        {!state.paginatedCoins ? (
          "No coin found"
        ) : (
          <CoinTable
            coins={state.paginatedCoins}
            sortByRank={() => {
              const coins = filteredCoins(state.search, state.coins).sort(
                (a, b) => a.market_cap_rank - b.market_cap_rank
              );
              // sort
              updateState({
                paginatedCoins: pagination(state.currentPage, coins),
              });
            }}
            sortByPrice={() => {
              const coins = filteredCoins(state.search, state.coins).sort(
                (a, b) => b.current_price - a.current_price
              );
              // sort
              updateState({
                paginatedCoins: pagination(state.currentPage, coins),
              });
            }}
          />
        )}
        <Pagination
          pages={state.pages}
          currentPage={state.currentPage}
          onPageClick={(pageIndex) =>
            updateState({
              paginatedCoins: pagination(
                pageIndex,
                filteredCoins(state.search, state.coins)
              ),
              currentPage: pageIndex,
            })
          }
        />
      </div>
    </>
  );
}

export default App;
export { pagination, filteredCoins, initalState, paginatedPages };
