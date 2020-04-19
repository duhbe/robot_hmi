<template>
  <div id='speeds'>
    <div>
    Speeds
      <ul>
        <li> v= {{$root.v.toFixed(2)}} m/s </li>
        <li> &omega;= {{$root.omega.toFixed(2)}} rad/s</li>
        <li> &omega;l= {{$root.omegaL.toFixed(2)}} rad/s</li>
        <li> &omega;r= {{$root.omegaR.toFixed(2)}} rad/s</li>
      </ul>
    </div>
    <div>
    Pose
      <J v-bind:imu="imu"></J>
    </div>
  </div>
</template>

<script>
import J from './J.vue'
export default {
  components: { J },
  props: ['imu']
}
</script>

<style scoped>
#speeds {
  font-size: 80%
}
</style>