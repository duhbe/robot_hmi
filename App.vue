<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">WebSiteName</a>
        </div>
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#">Page 1</a></li>
          <li><a href="#">Page 2</a></li>
          <li><a href="#">Page 3</a></li>
        </ul>
      </div>
    </nav>
    <div class="row">
      <div class="col-sm-2 text-left">
        <D v-bind:imu="$root.imu"></D>
      </div>
      <div class="col-sm-6 text-left">
        <H></H>
      </div>
    </div>
    <B></B>
    <C></C>
    <A></A>
    <terminal></terminal>
    <Imu v-bind:imu="$root.imu"></Imu>
  </div>
</template>

<script>
import A from './components/A.vue'
import B from './components/B.vue'
import C from './components/C.vue'
import D from './components/D.vue'
import E from './components/E.vue'
import F from './components/F.vue'
import H from './components/H.vue'
import I from './components/I.vue'
import Terminal from './components/Terminal.vue'
import Imu from './components/Imu.vue'
export default {
  name: 'app',
  components: { A, B, C, D, E, F, H, I, Terminal, Imu }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2px;
}

</style>
