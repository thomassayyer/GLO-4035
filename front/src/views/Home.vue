<template>
  <div class="home">
    <div class="total-cost">
      <span>Le coût total à une date précise pour une catégorie de matériel : </span>
      <input v-model="category1" type="text" placeholder="Category (ex: Consumable,Base Oil)">
      <input v-model="date1" type="date">
      <button @click="request1({ category: category1, date: date1})">Submit</button>
    </div>
    <div class="avg-cost-p">
      <span>Le coût moyen d'acquisition, pondéré par l'unité d'acquisition ,
        à une date précise d'une catégorie de matériel : </span>
      <input v-model="category2" type="text" placeholder="Category (ex: Consumable,Base Oil)">
      <input v-model="date2" type="date">
      <button @click="request2({ category: category2, date: date2})">Submit</button>
    </div>
    <div class="avg-cost-u">
      <span>Le coût moyen d'acquisition, pondéré par l'unité d'utilisation ,
        à une date précise d'une catégorie de matériel : </span>
      <input v-model="category3" type="text" placeholder="Category (ex: Consumable,Base Oil)">
      <input v-model="date3" type="date">
      <button @click="request3({ category: category3, date: date3})">Submit</button>
    </div>
    <div class="stock">
      <span>L'image à une date précise de la quantité restante,
        en unité d'utilisation, des matières premières : </span>
      <input v-model="date4" type="date">
      <button @click="request4({ date: date4 })">Submit</button>
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
    date4: '',
  }),
  methods: {
    request1(payload) {
      this.$store.dispatch('loadRequest1', payload);
      this.$router.push('Request1');
    },
    request2(payload) {
      this.$store.dispatch('loadRequest2', payload);
      this.$router.push('Request2');
    },
    request3(payload) {
      this.$store.dispatch('loadRequest3', payload);
      this.$router.push('Request3');
    },
    request4(payload) {
      this.$store.dispatch('loadRequest4', payload);
      this.$router.push('Request4');
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
