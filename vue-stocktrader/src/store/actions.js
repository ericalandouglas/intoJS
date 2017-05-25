import Vue from 'vue';

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

export default {
  loadStocksPortfolio,
};
