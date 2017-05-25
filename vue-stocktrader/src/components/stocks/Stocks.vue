<template>
  <div>
    <div class="page-header" v-if="empty">
      <h5 class="text-center">No stocks loaded</h5>
    </div>
    <Stock v-for="stock in stocks"
           v-else
           :stock="stock"
           :key="stock.id" />
    <StockForm />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Stock from './Stock';
  import StockForm from './StockForm';

  export default {
    components: {
      Stock,
      StockForm,
    },

    computed: {
      ...mapGetters([
        'stocks',
      ]),

      empty() {
        return this.stocks.length === 0;
      },
    },
  };
</script>
