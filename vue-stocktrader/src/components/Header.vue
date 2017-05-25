<template>

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand">Stock Trader</router-link>
    </div>

    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
        <router-link to="/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
        <router-link to="/help" activeClass="active" tag="li"><a>Vue Links</a></router-link>
      </ul>
      <strong class="navbar-text navbar-right">Funds: {{ funds | currency }}</strong>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#" @click="endDay">End Day</a></li>
        <li class="dropdown" :class="{ open: isDropDownOpen }" @click="isDropDownOpen = !isDropDownOpen">
          <a href="#"
             class="dropdown-toggle"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false">Save & Load <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#" @click="savePortfolio">Save Data</a></li>
            <li><a href="#" @click="loadPortfolio">Load Data</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        isDropDownOpen: false,
      };
    },

    computed: {
      ...mapGetters([
        'funds',
        'stocks',
        'stocksPortfolio',
      ]),
    },

    methods: {
      ...mapActions([
        'randomizeStocks',
        'loadPortfolio',
      ]),

      endDay() {
        this.randomizeStocks();
      },

      savePortfolio() {
        const { funds, stocksPortfolio } = this;
        const data = {
          funds,
          stocksPortfolio,
        };
        this.$http.put('data.json', data);
      },

      loadStocksPortfolio() {
        this.loadPortfolio();
      },
    },
  };
</script>
