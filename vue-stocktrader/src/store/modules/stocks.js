import Vue from 'vue';
import R from 'ramda';

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
    const ids = R.map(({ id }) => id, st.stocks);
    const maxId = R.reduce(R.maxBy(R.identity), 0, ids);
    st.stocks.push({ name, price, id: maxId + 1 });
  },
};

const loadStocks = ({ commit }) => {
  Vue.http.get('http://192.168.99.100:3000/stocks')
    .then(r => r.json())
    .then((data) => {
      if (data) {
        const res = R.map(s => R.merge({ price: 0 }, s), data);
        commit('SET_STOCKS', res);
      }
    });
};

const actions = {
  initStocks(c) {
    loadStocks(c);

    // commit('SET_STOCKS', stocks);
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
