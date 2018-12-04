<template>
  <div class="home">
    <div class="total-cost">
      <span>Le coût total à une date précise pour une catégorie de matériel : </span>
      <input v-model="category1" type="text" placeholder="Category (ex: Consumable,Base Oil)">
      <input v-model="date1" type="date">
      <button>Submit</button>
    </div>
    <div class="avg-cost-p">
      <span>Le coût moyen d'acquisition, pondéré par l'unité d'acquisition ,
        à une date précise d'une catégorie de matériel : </span>
      <input v-model="category2" type="text" placeholder="Category (ex: Consumable,Base Oil)">
      <input v-model="date2" type="date">
      <button>Submit</button>
    </div>
    <div class="avg-cost-u">
      <span>Le coût moyen d'acquisition, pondéré par l'unité d'utilisation ,
        à une date précise d'une catégorie de matériel : </span>
      <input v-model="category3" type="text" placeholder="Category (ex: Consumable,Base Oil)">
      <input v-model="date3" type="date">
      <button>Submit</button>
    </div>
    <div class="stock">
      <span>L'image à une date précise de la quantité restante,
        en unité d'utilisation, des matières premières : </span>
      <input v-model="date4" type="date">
      <button>Submit</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data: () => ({
    category1: '',
    date1: '',
    category2: '',
    date2: '',
    category3: '',
    date3: '',
    category4: '',
    date4: '',
  }),
  methods: {
    request1(payload) {
      this.$store.dispatch('loadRequest1', payload);
    },
    request2(payload) {
      this.$store.dispatch('loadRequest2', payload);
    },
    request3(payload) {
      this.$store.dispatch('loadRequest3', payload);
    },
    request4(payload) {
      this.$store.dispatch('loadRequest4', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  .total-cost {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      margin: 10px 0;
      padding: 5px 0;
      width: 250px;
    }
  }
  .avg-cost-p {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      margin: 10px 0;
      padding: 5px 0;
      width: 250px;
    }
  }
  .avg-cost-u {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      margin: 10px 0;
      padding: 5px 0;
      width: 250px;
    }
  }
  .stock {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      margin: 10px 0;
      padding: 5px 0;
      width: 250px;
    }
  }
}
</style>
