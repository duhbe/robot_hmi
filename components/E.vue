<template>
  <GChart
      type="LineChart"
      :data="chartData"
      :options="chartOptions"
  />
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  data () {
    return {
      chartDataHeader: ['t', 'vx', 'vy', 'vz'],
      chartOptions: {
        chart: {
          title: 'Robot parameters',
          subtitle: 'Linear speeds'
        },
        curveType: 'function',
        hAxis: {
          title: 'time (s)'
        }
      }
    }
  },
  computed: {
    chartData () {
      return [ this.chartDataHeader, ...this.$root.linearSpeeds ]
    }
  },
  methods: {
  },
  mounted () {
  },
  created () {
  },
  components: {
    GChart
  }
}

</script>

<style>
</style>
