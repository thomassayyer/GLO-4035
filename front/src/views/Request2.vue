<template>
  <div class="request2">
    <div v-for="item in result" :key="item._id" class="result">
     <span>Name: {{ item.name }}</span>
     <span>Le coût moyen d'acquisition : {{ item.result }} $</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Request2',
  computed: {
    result() {
      return this.$store.getters.getResult;
    },
  },
};
</script>

<style lang="scss" scoped>
.request2 {
  display: flex;
  flex-direction: column;
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
    span {
      margin: 5px 0;
    }
  }
}
</style>
