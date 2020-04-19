<template>
  <div>
    <GChartLinearAccelerations
        type="LineChart"
        :data="chartDataLinearAccelerations"
        :options="chartOptionsLinearAccelerations"
    />
    <GChartAngularVelocities
        type="LineChart"
        :data="chartDataAngularVelocities"
        :options="chartOptionsAngularVelocities"
    />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  data () {
    return {
      chartDataHeaderLinearAccelerations: ['t', 'x', 'y', 'z'],
      chartOptionsLinearAccelerations: {
        chart: {
          title: 'IMU data',
          subtitle: 'Linear acceleration'
        },
        curveType: 'function',
        hAxis: {
          title: 'time (s)'
        }
      },
      chartDataHeaderAngularVelocities: ['t', 'x', 'y', 'z'],
      chartOptionsAngularVelocities: {
        chart: {
          title: 'IMU data',
          subtitle: 'Angular speed'
        },
        curveType: 'function',
        hAxis: {
          title: 'time (s)'
        }
      },
      linearAccelerations: [[0.0, 0.0, 0.0, 0.0]],      
      angularVelocities: [[0.0, 0.0, 0.0, 0.0]],
      t0: 0.0
    }
  },
  props: ['imu'],
  watch: {
    'imu.linearAcceleration': function(v) {
      if (this.linearAccelerations.length >= 50) {
        this.linearAccelerations.shift()
      }
      this.linearAccelerations.push([(Date.now()-this.t0 ) / 1000.0, 
        v.x,
        v.y, 
        v.z])
    },
    'imu.angularVelocity': function(v) {
      console.log('LA!')
      if (this.angularVelocities.length >= 50) {
        this.angularVelocities.shift()
      }
      this.angularVelocities.push([(Date.now()-this.t0 ) / 1000.0, 
        v.x,
        v.y, 
        v.z])      
    }    
  },  
  computed: {
    chartDataLinearAccelerations () {
      return [ this.chartDataHeaderLinearAccelerations, ...this.linearAccelerations ]
    },
    chartDataAngularVelocities () {
      return [ this.chartDataHeaderAngularVelocities, ...this.angularVelocities ]
    }    
  },
  methods: {
  },
  mounted () {
    this.t0 = Date.now()
  },
  created () {
  },
  components: {
    GChartLinearAccelerations: GChart,
    GChartAngularVelocities: GChart
  }
}

</script>

<style>
</style>
