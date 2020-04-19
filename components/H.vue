<template>
  <div class="graphs">
    <b-tabs content-class="mt-3">
      <b-tab title="Commands" active>
        <E></E>
        <F></F>
      </b-tab>
      <b-tab title="Odometry">
        <p> Odometry data </p>
      </b-tab>
      <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import E from './E.vue'
import F from './F.vue'
export default {
  components: { E, F}
}
</script>

<style scoped>
.graphs {
  height: 30em;
}
</style>
