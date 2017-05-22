import stocks from '../../data/stocks';

const state = {
  stocks: [],
};

const mutations = {
  SET_STOCKS(stateParam, newStocks) {
    const st = stateParam;
    st.stocks = newStocks;
  },

  RND_STOCKS(stateParam) {
    const st = stateParam;
    st.stocks.forEach((stockParam) => {
      const s = stockParam;
      s.price = Math.round(s.price * (1 + Math.random() + -0.5));
    });
  },

  ADD_STOCK(stateParam, { name, price }) {
    const st = stateParam;
    function reduceHelper(z, { id }) {
      return z > id ? z : id;
    }
    const maxId = st.stocks.reduce(reduceHelper, 0);
    st.stocks.push({ name, price, id: maxId + 1 });
  },
};

const actions = {
  initStocks({ commit }) {
    commit('SET_STOCKS', stocks);
  },
  randomizeStocks({ commit }) {
    commit('RND_STOCKS');
  },
  addStock({ commit }, stock) {
    commit('ADD_STOCK', stock);
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
