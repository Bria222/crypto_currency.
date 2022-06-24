import axios from 'axios';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Details from '../pages/Details';
import store from '../redux/configureStore';
import { FetchDetailsFunc } from '../redux/CoinDetails/CoinDetails';

const TestDetails = () => (
  <Provider store={store}>
    <Router><Details /></Router>
  </Provider>
);
const res = {
  data: {
    data: {
      id: 'bitcoin',
      rank: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      supply: '19072893',
      maxSupply: '21000000',
      marketCapUsd: '401264068520',
      volumeUsd24Hr: '12269572130',
      priceUsd: '21038',
      changePercent24Hr: '5.23',
      vwap24Hr: '20515',
    },
  },
};

jest.mock('axios');
axios.get.mockResolvedValue(res);
FetchDetailsFunc();
render(<TestDetails />);
describe('Details page', () => {
  it('check details elements', () => {
    expect(screen.getAllByText(/Bitcoin/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/BTC/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/19072893.0000/i)).toBeInTheDocument();
    expect(screen.getByText(/401264068520.0000/i)).toBeInTheDocument();
    expect(screen.getByText(/12269572130.0000/i)).toBeInTheDocument();
    expect(screen.getByText(/21038.00000000/i)).toBeInTheDocument();
    expect(screen.getAllByText(/5.23000000/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/20515.00000000/i)).toBeInTheDocument();
  });
});
