<template>
  <transition name="slide-fade">
    <div class="col-sm-6 col-md-4">
      <div class="panel panel-info">
        <div class="panel-heading">
          <h3 class="panel-title">
            {{ stock.name }}
            <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
          </h3>
        </div>
        <div class="panel-body">
          <div class="pull-left">
            <input type="number"
                   class="form-control"
                   :class="{ danger: insufficientQuantity }"
                   placeholder="Quantity"
                   v-model.number="quantity">
          </div>
          <div class="pull-right">
            <button class="btn btn-info"
                    @click="sellStock"
                    :disabled="sellDisabled">
              {{ insufficientQuantity ? 'Insufficient Qty.' : 'Sell' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .danger {
    border: 1px solid red;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: ['stock'],

    data() {
      return {
        quantity: 0,
      };
    },

    computed: {
      insufficientQuantity() {
        return this.quantity > this.stock.quantity;
      },

      sellDisabled() {
        return this.quantity <= 0 ||
               !Number.isInteger(this.quantity) ||
               this.insufficientQuantity;
      },
    },

    methods: {
      ...mapActions({
        sellStockAction: 'sellStock',
      }),

      sellStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity,
        };

        this.quantity = 0;
        this.sellStockAction(order);
      },
    },
  };
</script>
