import Vue from 'vue';

const loadData = ({ commit }) => {
  Vue.http.get('data.json')
    .then(r => r.json())
    .then((data) => {
      if (data) {
        const { funds, stocks, stocksPortfolio } = data;
        commit('SET_STOCKS', stocks);
        commit('SET_PORTFOLIO', { funds, stocksPortfolio });
      }
    });
};

export default {
  loadData,
};
