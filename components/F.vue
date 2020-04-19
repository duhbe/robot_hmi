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
      chartDataHeader: ['t', 'wx', 'wy', 'wz'],
      chartOptions: {
        chart: {
          title: 'Robot parameters',
          subtitle: 'Angular speeds'
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
      return [ this.chartDataHeader, ...this.$root.angularSpeeds ]
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
