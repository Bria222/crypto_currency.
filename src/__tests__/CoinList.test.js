import CoinsReducer, { FetchCoinsSuccess } from '../redux/CoinList/CoinList';

jest.mock('axios');
describe('action creator of coins list ', () => {
  test('should return payload & data', () => {
    const res = [
      {
        data: {
          data: {
            id: 'bitcoin',
            rank: '1',
            symbol: 'BTC',
            name: 'Bitcoin',
            priceUsd: '21038.4480487916075722',
          },
        },
      },
    ];
    expect(FetchCoinsSuccess(res)).toEqual({
      type: 'FETCH_COINS',
      payload: res,
    });
  });
});

describe('reducer of coin list ', () => {
  test('should return the initial state', () => {
    expect(CoinsReducer([], {})).toEqual([]);
  });
  test('should return the data', () => {
    const action = {
      type: 'FETCH_COINS',
      payload: [{
        id: 'bitcoin',
        rank: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        priceUsd: '21038.4480487916075722',
      }],
    };
    expect(CoinsReducer([], action)).toEqual([
      {
        id: 'bitcoin',
        rank: '1',
        symbol: 'BTC',
        name: 'Bitcoin',
        price: '21038.44804879',
      },
    ]);
  });
});
