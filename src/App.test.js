// import React from 'react';
// import axios from 'axios';
// import {
//   render, screen,
// } from '@testing-library/react';
// import '@testing-library/jest-dom';
import { pagination, filteredCoins } from "./App";

jest.mock("axios");

// test('render app', async () => {
//   render(<App />);
// });

// test("initalState", () => {
//   expect(initalState()).toEqual({
//     coins: [],
//     paginatedCoins: [],
//     pages: [],
//     currentPage: 1,
//     search: "",
//     isLoaded: false,
//     alertShowed: false,
//   });
// });

test("pagination show only first 10 items", () => {
  expect(
    pagination(1, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"])
  ).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
});

// 1. know what the function doing
// 2. what needs to test
// 3. what expect to return

test("filteredCoins with query", () => {
  expect(filteredCoins("a", [{ name: "ab", symbol: "abcoin" }])).toEqual([
    { name: "ab", symbol: "abcoin" },
  ]);
});
