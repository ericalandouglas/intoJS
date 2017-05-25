import Vue from 'vue';

const state = {
  funds: 10000,
  stocks: [],
};

const mutations = {
  BUY_STOCK(stateParam, { stockId, quantity, stockPrice }) {
    const st = stateParam;
    const record = st.stocks.find(el => el.id === stockId);
    if (record) {
      record.quantity += quantity;
    } else {
      st.stocks.push({ quantity, id: stockId });
    }
    st.funds -= stockPrice * quantity;
  },

  SELL_STOCK(stateParam, { stockId, quantity, stockPrice }) {
    const st = stateParam;
    const record = st.stocks.find(el => el.id === stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else {
      st.stocks = st.stocks.filter(s => s.id !== stockId);
    }
    st.funds += stockPrice * quantity;
  },

  SET_PORTFOLIO(stateParam, { stocksPortfolio, funds }) {
    const st = stateParam;
    st.stocks = stocksPortfolio;
    st.funds = funds;
  },
};

const loadStocksPortfolio = ({ commit }) => {
  Vue.http.get('data.json')
    .then(r => r.json())
    .then((data) => {
      if (data) {
        const { funds, stocksPortfolio } = data;
        commit('SET_PORTFOLIO', { funds, stocksPortfolio });
      }
    });
};

const actions = {
  buyStock({ commit }, order) {
    commit('BUY_STOCK', order);
  },
  sellStock({ commit }, order) {
    commit('SELL_STOCK', order);
  },
  loadPortfolio(c) {
    loadStocksPortfolio(c);
  },
};

const getters = {
  stocksPortfolio(st, gs) {
    return st.stocks.map(({ id, quantity }) => {
      const { name, price } = gs.stocks.find(el => el.id === id);
      return { name, price, id, quantity };
    });
  },

  funds: st => st.funds,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
