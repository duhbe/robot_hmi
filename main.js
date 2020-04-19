// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ROSLIB from 'roslib'

Vue.config.productionTip = false

// Install Vuex
Vue.use(Vuex)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const store = new Vuex.Store({
  state: {
    ros: null
  },
  mutations: {
  	set (state) { ros => state.ros=ros }
  },
  getters: {
    ros: state => state.ros
  }
})

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  data: {
    nbClients: 0,
    v: 0.0,
    omega: 0.0,
    omegaL: 0.0,
    omegaR: 0.0,
    linearSpeeds: [[0, 0, 0, 0]],
    angularSpeeds: [[0, 0, 0, 0]],
    imu: {
      orientation: null,
      linearAcceleration: null,
      angularVelocity: null
    },
    t0: Date.now()
  }
})

// Connecting to ROS
// -----------------
var ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
})

new ROSLIB.Topic({
  ros: ros,
  name: '/client_count',
  messageType: 'std_msgs/Int32'
}).subscribe(function (message) {
  console.log('Received message on ' + message.data)
  vm.nbClients = message.data
})

new ROSLIB.Topic({
  ros: ros,
  name: '/cmd_vel',
  messageType: 'geometry_msgs/Twist'
}).subscribe(function (message) {
  console.log('Received message: ' + message.linear.x)
  if (vm.linearSpeeds.length >= 50) {
    vm.linearSpeeds.shift()
    vm.angularSpeeds.shift()
  }
  vm.linearSpeeds.push([(Date.now() - vm.t0) / 1000.0, message.linear.x, message.linear.y, message.linear.z])
  vm.angularSpeeds.push([(Date.now() - vm.t0) / 1000.0, message.angular.x, message.angular.y, message.angular.z])

  console.log(vm.speeds)
})

new ROSLIB.Topic({
  ros: ros,
  name: '/imu_data',
  messageType: 'sensor_msgs/Imu'
}).subscribe(function (message) {
  vm.imu.orientation = message.orientation
  vm.imu.linearAcceleration = message.linear_acceleration
  vm.imu.angularSpeed = message.angular_speed
  // vm.$emit('orientation_evt')
})

ros.on('connection', function () {
  console.log('Connected to websocket server.')
})

ros.on('error', function (error) {
  console.log('Error connecting to websocket server: ', error)
})

ros.on('close', function () {
  console.log('Connection to websocket server closed.')
})
