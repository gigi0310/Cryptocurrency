import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import CoinTable from './components/Table/CoinTable';

const pageSize = 10;

const SimpleApp = () => {
  const initalState = {
    coins: [],
    isLoaded: false,
    alertShowed: false,
    pages: [],
  };
  const [state, setState] = useState(initalState);

  useEffect(() => {
    const fetchData = async () => {
      /**
             // eslint-disable-next-line max-len
             *  fetch data {coins:[],isLoaded:false, alertShowed: false} => success: {coins:data,isLoaded:true, alertShowed:false}
             *              => failed: {coins:[], isLoaded:true,      alertShowed:true}
             *  */
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d',
        );
        // success + pagination happen
        const coins = res.data;
        // pages first page
        const newPages = (coins) => {
          const count = coins ? Math.ceil(Math.ceil(coins.length / pageSize)) : 0;
          return _.range(1, count + 1); // [1] or [1,...., 10]
        };


        // 2 - 1 * 10 = 10;  [10 ... 19]
        const pagination = (pageNo, coins) => {
            const startIndex = (pageNo - 1) * pageSize;
            return _(coins)
              .slice(startIndex)
              .take(pageSize)
              .value();
          };

        // 1...10
        const newPaginatedCoins = (coins) => _(coins).slice(0).take(pageSize).value();

        setState(state, {
          coins: res.data,
          isLoaded: true,
          alertShowed: false,
          pages: newPages(coins),
          paginatedCoins: newPaginatedCoins(coins),
        });
      } catch (e) {
        // fail
        setState(state, {
          coins: [],
          isLoaded: true,
          alertShowed: true,
          pages: [],
        });
      }
    };
    fetchData();
  });

  return (

    <div>
      <CoinTable coins={state.paginatedCoins} />

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
    </div>
  );
};

export default SimpleApp;
