<template>
  <div>
    <div class="page-header" v-if="empty">
      <h5 class="text-center">No stocks purchased</h5>
    </div>
    <Stock v-else
           v-for="stock in stocksPortfolio"
           :stock="stock"
           :key="stock.id" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Stock from './Stock';

  export default {
    components: {
      Stock,
    },

    computed: {
      ...mapGetters([
        'stocksPortfolio',
      ]),

      empty() {
        return this.stocksPortfolio.length === 0;
      },
    },
  };
</script>
