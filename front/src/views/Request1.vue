<template>
  <div class="request1">
    <div class="result">
      Le Coût est de : {{ result.cost }} $
    </div>
  </div>
</template>

<script>
export default {
  name: 'Request1',
  computed: {
    result() {
      return this.$store.getters.getResult;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
