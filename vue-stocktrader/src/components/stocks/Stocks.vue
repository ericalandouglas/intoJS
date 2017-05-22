<template>
  <div>
    <Stock v-for="stock in stocks"
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
    },
  };
</script>
