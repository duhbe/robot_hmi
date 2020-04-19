<template>
  <div>
    <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
      <template v-slot:default="{ hide }">
        <div class="p-3">
          <h4 id="sidebar-no-header-title">Menu</h4>
          <b-row class="text-md-center">
            <b-icon icon="arrow-clockwise" animation="spin" font-scale="2"></b-icon>
          </b-row>
          <b-row>
            <b-button>
              <b-icon-arrow-up></b-icon-arrow-up>
            </b-button>
          </b-row>
          <b-row>
            <b-button>
              <b-icon-exclamation-triangle-fill></b-icon-exclamation-triangle-fill>
            </b-button>
          </b-row>
          <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { BIcon, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

export default {
  data () {
    return {
      person: {
        firstname: 'Eric',
        lastname: 'jenn'
      },
      connection: null
    }
  },
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown
  },
  props: {
    // ...
  }
}
</script>

<style>
</style>
