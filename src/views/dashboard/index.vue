<template>
  <div>
    <Card></Card>
    <Sale></Sale>
  </div>
</template>

<script>
import Card from "./card";
import Sale from './Sale'
export default {
  name: "Dashboard",
  components: {
    Card,
    Sale
  },
};
</script>

<style lang="scss" scoped>

</style>
