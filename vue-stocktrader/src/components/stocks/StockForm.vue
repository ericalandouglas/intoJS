<template>
  <div class="col-sm-6 col-md-12">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          Add Stock
        </h3>
      </div>
      <div class="panel-body">
        <button class="pull-right btn btn-success"
                @click="addStock"
                :disabled="invalidForm">
          {{ invalidForm ? 'Invalid Stock' : 'Add' }}
        </button>
        <div class="pull-left">
          <input class="form-control"
                 :class="{ danger: invalidName }"
                 placeholder="Enter Name"
                 v-model="name">
        </div>
        <br><br>
        <div class="pull-left">
          <input class="form-control"
                 type="number"
                 :class="{ danger: invalidPrice }"
                 placeholder="Enter Price"
                 v-model.number="price">
        </div>
        <small class="pull-left">(Integer)</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
  small {
    padding: 10px;
  }

  .danger {
    border: 1px solid red;
  }
</style>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        name: '',
        price: 0,
      };
    },

    computed: {
      invalidName() {
        return this.name.length < 3 ||
               this.name.length > 12 ||
               !/^[a-zA-Z]/.test(this.name[0]) ||
               !/^[a-zA-Z0-9\s]+$/.test(this.name.slice(1));
      },

      invalidPrice() {
        return this.price <= 0 || !Number.isInteger(this.price);
      },

      invalidForm() {
        return this.invalidPrice || this.invalidName;
      },
    },

    methods: {
      ...mapActions({
        addStockAction: 'addStock',
      }),

      resetForm() {
        this.price = 0;
        this.name = '';
      },

      addStock() {
        const { name, price } = this;
        const nameTitle = name.replace(/\b\w/g, l => l.toUpperCase());
        this.resetForm();
        this.addStockAction({ price, name: nameTitle });
      },
    },
  };
</script>
