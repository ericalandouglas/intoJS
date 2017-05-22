import stocks from '../../data/stocks';

const state = {
  stocks: [],
};

const mutations = {
  SET_STOCKS(stateParam, newStocks) {
    const st = stateParam;
    st.stocks = newStocks;
  },
  // eslint-disable-next-line
  RND_STOCKS(stateParam) {
    const st = stateParam;
    st.stocks.forEach((stockParam) => {
      const s = stockParam;
      s.price = Math.round(s.price * (1 + Math.random() + -0.5));
    });
  },
};

const actions = {
  initStocks: ({ commit }) => {
    commit('SET_STOCKS', stocks);
  },
  randomizeStocks: ({ commit }) => {
    commit('RND_STOCKS');
  },
};

const getters = {
  stocks: st => st.stocks,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
