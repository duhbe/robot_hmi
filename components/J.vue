<template>
  <canvas id="3Dpos" width="100" height="100"></canvas>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default {
  name: 'axes',
  data () {
    return {
      axes: null,
      renderer: null,
      scene: null,
      camera: null,
      controls: null
    }
  },
  props: ['imu'],
  watch: {
    'imu.orientation': function(v) {
      this.axes.quaternion=new THREE.Quaternion(v.x,v.y,v.z,v.w)
      this.render()
    }
  },
  methods: {
    init: function () {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
        90,
        1.0,
        0.1,
        1000
      )

      this.renderer = new THREE.WebGLRenderer({canvas: document.getElementById('3Dpos'), antialias: true })
      this.resizeCanvasToDisplaySize()
      
      // Build geometry
      var axisgeo = new THREE.CylinderGeometry(0.02, 0.02, 1, 32 )
      THREE.GeometryUtils.merge(
        axisgeo, 
        new THREE.ConeGeometry( 0.1, 0.4, 32 ).translate( 0, 0.7, 0 ))
      axisgeo.translate( 0, 0.5, 0 );
      var axisy = new THREE.Mesh( axisgeo, new THREE.MeshBasicMaterial({ color: 0x00ff00 }) );  
      var axisz = new THREE.Mesh( axisgeo.clone().rotateX(Math.PI/2.0), new THREE.MeshBasicMaterial({ color: 0x0000ff }) );  
      var axisx = new THREE.Mesh( axisgeo.clone().rotateZ(-Math.PI/2.0), new THREE.MeshBasicMaterial({ color: 0xFF0000 }) );  

      this.axes = new THREE.Group()
      this.axes.add(axisx)
      this.axes.add(axisy)
      this.axes.add(axisz)

      this.scene.add( this.axes )

      var grid = new THREE.GridHelper( 10, 10, 0x444444, 0xC0C0C0 )
      this.scene.add( grid );

      this.scene.background = new THREE.Color( 'white' )
      this.camera.position.z = 3

      // Enable orbit control
			this.controls = new OrbitControls( this.camera, this.renderer.domElement );
      this.controls.addEventListener( 'change', this.render ); // call this only in static scenes (i.e., if there is no animation loop)
			this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			this.controls.dampingFactor = 0.05;

			this.controls.screenSpacePanning = true;

      this.controls.maxPolarAngle = Math.PI / 2;
    /*          
      this.$root.$on('orientation_evt', () => 
        { 
          //this.axes.rotation = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(this.$root.orientation.x,this.$root.orientation.y,this.$root.orientation.z,this.$root.orientation.w) )
          this.axes.quaternion=new THREE.Quaternion(this.$root.orientation.x,this.$root.orientation.y,this.$root.orientation.z,this.$root.orientation.w)
          this.render()
        })
        */
    },
    animate: function () {
      requestAnimationFrame( this.animate );
      this.controls.update()
      this.render()
    },
    render: function () {
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize () {
    },
    resizeCanvasToDisplaySize () {
      const canvas = this.renderer.domElement
      // look up the size the canvas is being displayed
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      console.log(canvas)
      // adjust displayBuffer size to match
      if (canvas.width !== width || canvas.height !== height) {
        // you must pass false here or three.js sadly fights the browser
        this.renderer.setSize(width, height, false)
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        // update any render target sizes here
      }
    }    
  },
  mounted() {
    this.init()
    this.animate()
  },
  created(){
    window.addEventListener('resize', () => {this.onWindowResize()})
  }  
}
</script>

<style scoped>
#3Dpos { 
    width: 20px; 
    height: 20px; 
    border-style: solid;
    border-color: red;
}
</style>