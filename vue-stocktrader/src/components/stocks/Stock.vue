<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }})</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input type="number"
                 class="form-control"
                 :class="{ danger: insufficientFunds }"
                 placeholder="Quantity"
                 v-model.number="quantity">
        </div>
        <div class="pull-right">
          <button class="btn btn-success"
                  @click="buyStock"
                  :disabled="buyDisabled">
            {{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .danger {
    border: 1px solid red;
  }
</style>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props: ['stock'],

    data() {
      return {
        quantity: 0,
      };
    },

    computed: {
      ...mapGetters([
        'funds',
      ]),

      insufficientFunds() {
        return this.stock.price * this.quantity > this.funds;
      },

      buyDisabled() {
        return this.quantity <= 0 ||
               !Number.isInteger(this.quantity) ||
               this.insufficientFunds;
      },
    },

    methods: {
      ...mapActions({
        buyStockAction: 'buyStock',
      }),

      buyStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity,
        };

        this.quantity = 0;
        this.buyStockAction(order);
      },
    },
  };
</script>
