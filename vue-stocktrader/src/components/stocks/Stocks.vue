<template>
  <div>
    <Stock v-for="stock in stocks"
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
        'stocks',
      ]),
    },
  };
</script>
