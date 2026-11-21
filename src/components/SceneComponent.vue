<template>

  <div class="scene" v-show="!isLoading">

  <TresCanvas v-if="loadingScene" v-bind="gl" class="three-canvas" shadows>
        <!-- Stars background  -->
        <Levioso :isMoving="isMoving" :direction="direction" :modelPosition="modelPosition">
          <Stars :radius="100" :depth="50" :count="mobile ? 1000 : 3000" :factor="4" :fade="true" />
          <Stars :radius="50" :depth="8" :count="400" :factor="2" :speed="2" :fade="true" />
        </Levioso>
        <CameraComponent />
        <LoadModel/>

        <!-- 3D text -->
        <Suspense>
        <Text3D
          v-for="text in textPos" :key="text" :position="text.positions"
          :text="text.theText"
          :font="fontPath"
          :size="0.3"
          :height="0.03"
          :bevel-thickness="0.02"
          :bevel-size="0.01"
          center
          cast-shadow
        >
          <TresMeshStandardMaterial 
            color="white" 
            :roughness="0.5" 
            :metalness="0.1" 
          />
        </Text3D>
      </Suspense>

      <!-- Ground plane and wireframe -->
        <TresMesh :position="[8, -0.2, 0.8]" :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
          <TresPlaneGeometry :args="[105, 4]"/>
          <TresMeshStandardMaterial color="#ffffff" :roughness="0.5"/>
        </TresMesh>
        <TresMesh v-for="plan in planPos" :key="plan" :position="plan.positions" >
          <TresPlaneGeometry :args="[0.3, 1]"/>
          <TresMeshStandardMaterial color="#ffffff" :roughness="0.5"/>
        </TresMesh>
        <TresMesh :position="arrowObj[0].position" :rotation="arrowObj[0].rotation">
          <TresPlaneGeometry :args="[0.2, 1]"/>
          <TresMeshStandardMaterial color="#ffffff" :roughness="0.5"/>
        </TresMesh>
        <TresMesh :position="arrowObj[1].position" :rotation="arrowObj[1].rotation">
          <TresCircleGeometry :args="[0.25, 3]" />
          <TresMeshStandardMaterial color="#ffffff" :roughness="0.5" />
        </TresMesh>

        <Html  v-for="(section,i) in sections" :key="i"
        center transform 
        :position="section.position"
        :scale="section.scale"
        wrapper-class="html-elements"
        >
            <component :is="section.component"/>
        </Html>
        
    <TresAmbientLight :intensity="0.6" />
    <TresDirectionalLight
        :position="[modelPosition.x + 6, 12, modelPosition.z + 8]"
        :color="lightColor"
        :intensity="3"
        cast-shadow
        :shadow-mapSize-width="1024"
        :shadow-mapSize-height="1024"
        :shadow-camera-far="40"
        :shadow-camera-left="-10"
        :shadow-camera-right="10"
        :shadow-camera-top="10"
        :shadow-camera-bottom="-10"
        :shadow-bias="-0.0005"
      />
      <EffectComposer :effects="effects" />
      

  </TresCanvas>


  <div class="controls">
    <button 
      class="forward-button control-btn" 
      @click="toggleMove('forward')"
    ><i class="mdi mdi-arrow-right"></i></button>

    <button 
      class="backward-button control-btn" 
      @click="toggleMove('backward')"
    ><i class="mdi mdi-arrow-left"></i></button>

    <button 
      class="camera control-btn" 
      @click="toggleCamera"
    ><i class="mdi mdi-camera-outline"></i>
</button>
  </div>
</div>
  <div class="social-buttons" aria-hidden="false">
    <a href="https://wa.me/+905318360156" target="_blank" rel="noopener noreferrer" class="social-btn whatsapp" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.88 11.88 0 0 0 12 .5 11.78 11.78 0 0 0 .5 12c0 2.09.54 4.04 1.56 5.8L.5 23.5l5.86-1.53A11.78 11.78 0 0 0 12 23.5 11.88 11.88 0 0 0 20.52 3.48zM12 21.5a9.5 9.5 0 0 1-5.17-1.4l-.37-.22-3.48.9.93-3.39-.24-.38A9.5 9.5 0 1 1 12 21.5z"/>
      </svg>
    </a>

    <a href="https://github.com/OmarHasan1999/" target="_blank" rel="noopener noreferrer" class="social-btn github" aria-label="GitHub">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.69-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.02 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.57.23 2.73.11 3.02.74.81 1.18 1.84 1.18 3.1 0 4.43-2.71 5.4-5.29 5.68.41.35.77 1.03.77 2.07 0 1.5-.01 2.71-.01 3.08 0 .3.2.66.79.55A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
      </svg>
    </a>

    <a href="https://m.me/omar.hamad.18294" target="_blank" rel="noopener noreferrer" class="social-btn messenger" aria-label="Messenger">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 5.92 2 10.2c0 2.38 1.31 4.52 3.43 5.85v3.44l3.21-1.77c.94.26 1.92.4 2.96.4 5.52 0 10-3.92 10-8.2S17.52 2 12 2zm1.5 7.5L9 9l-1 3 3.5-1.5L15 15l1-3-3.5 1.5z"/>
      </svg>
    </a>
  </div>

  <div class="progress-bar">
    <div class="progress" :style="{ width: Math.min(Math.max((modelPosition.x - (-35)) / (55 - (-35)) * 100, 0), 100) + '%' }"></div>
  </div>

</template>

<script setup>
import LoadModel from './LoadModel.vue'
import CameraComponent from './CameraComponent.vue'
import { TresCanvas } from '@tresjs/core'
import homeSection from './homeSection.vue'
import aboutSection from './aboutSection.vue'
import contactSection from './contactSection.vue'
import ServicesSection from './ServicesSection.vue'
import { Html, Text3D, Stars, Levioso } from '@tresjs/cientos'
import { useModelPosition } from '../js/index.js'
import { EffectComposer } from '@tresjs/post-processing'
import { BloomEffect } from 'postprocessing'
import { ref, reactive, watch, shallowRef, computed, onMounted, onUnmounted } from 'vue'

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
const loadingScene = ref(false)
const mobile = ref(window.innerWidth < 600)
const { isMoving, direction, cameraRotateY, modelPosition } = useModelPosition()
const gl = {
  alpha: true,
  clearAlpha : 0,
  antialias: true,
  powerPreference: 'high-performance',
  shadowMapType: 'BasicShadowMap',
}

// font of 3D text
const fontPath = '/fonts/FiraCodeRegular.json'
const sections = reactive([
  { component: homeSection, position: [-19, 2.7, -5], scale: [1,1,1],  },
  { component: aboutSection, position: [-3.7, 2.5, -5], scale: [1,1,1],  },
  { component: ServicesSection, position: [24, 2.8, -5], scale: [0.8,0.8,0.8] },
  { component: contactSection, position: [45, 2.8, -5], scale: [0.8,0.8,0.8] },
])      

const arrowObj = reactive([
  { position: [-32.2, 0.1, -4], rotation: [0, 0, Math.PI / 2] },
  { position: [-31.6, 0.1, -4], rotation: [0, 0, 0] }
])

const planPos = reactive([
  {
    positions : [ -13.5, -0.2, -4 ]
  },
  {
    positions : [ -1, -0.2, -4 ]
  },
  {
    positions : [ 13, -0.2, -4 ]
  },
  {
    positions : [ 35, -0.2, -4 ]
  },
  { 
    positions: [ 60, -0.2, -4 ]
  },
])

const textPos = reactive([
  {
    positions : [ -13.5, 0.7, -4 ],
    theText: "About Me"
  },
  {
    positions : [ -1, 0.7, -4 ],
    theText: "Our Techs"
  },
  {
    positions : [ 12.9, 0.7, -4 ],
    theText: "Services"
  },
  {
    positions : [ 35, 0.7, -4 ],
    theText: "Contact Us"
  },
  {
    positions: [ -32, 0.7, -4 ],
    theText: "EXPLORE"
  },
  {
    positions: [ 60.1, 0.7, -4 ],
    theText: "THANKS .."
  }
  
])

// change light color of the sections based on the model position
const lightColor = computed(() => {
  if(modelPosition.x < -13){
    return '#DCB4C2'
  }else if(modelPosition.x >= -12 && modelPosition.x < 12){
    return '#bbbbbb'
  }else if(modelPosition.x >= 12 && modelPosition.x < 34){
    return '#CEB3BC'
  }else{
    return '#dfd6b0'
  }
})

const setResponsive = () => {
  const width = window.innerWidth
  if (width < 600) {
    sections[0].position = [-21, 2.7, -5]
    sections[1].position = [-5.7, 2.7, -5]
    sections[2].position = [22, 2.7, -5]
    sections[3].position = [43, 2.7, -5]
    planPos[0].positions = [ -15.5, -0.2, -4 ]
    planPos[1].positions = [ -3, -0.2, -4 ]
    planPos[2].positions = [ 11, -0.2, -4 ]
    planPos[3].positions = [ 33, -0.2, -4 ]
    planPos[4].positions = [ 57.8, -0.2, -4 ]
    textPos[0].positions = [ -15.5, 0.7, -4 ]
    textPos[1].positions = [ -3, 0.7, -4 ]
    textPos[2].positions = [ 11, 0.7, -4 ]
    textPos[3].positions = [ 33, 0.7, -4 ]
    textPos[4].positions = [ -27, 0.7, -4 ]
    textPos[5].positions = [ 58, 0.7, -4 ]
    arrowObj[0].position = [-27.2, 0.1, -4]
    arrowObj[1].position = [-26.6, 0.1, -4]
  }
  else {
    sections[0].position = [-19, 2.7, -5]
    sections[1].position = [-3.7, 2.7, -5]
    sections[2].position = [24, 2.7, -5]
    sections[3].position = [45, 2.7, -5]
    planPos[0].positions = [ -13.5, -0.2, -4 ]
    planPos[1].positions = [ -1, -0.2, -4 ]
    planPos[2].positions = [ 13, -0.2, -4 ]
    planPos[3].positions = [ 35, -0.2, -4 ]
    planPos[4].positions = [ 60, -0.2, -4 ]
    textPos[0].positions = [ -13.5, 0.7, -4 ]
    textPos[1].positions = [ -1, 0.7, -4 ]
    textPos[2].positions = [ 12.9, 0.7, -4 ]
    textPos[3].positions = [ 35, 0.7, -4 ]
    textPos[4].positions = [ -32, 0.7, -4 ]
    textPos[5].positions = [ 60.1, 0.7, -4 ]
    arrowObj[0].position = [-32.2, 0.1, -4]
    arrowObj[1].position = [-31.6, 0.1, -4]
  }
}

onMounted(() => {
  setResponsive()
  window.addEventListener('resize', setResponsive)

  setTimeout(() => {
    loadingScene.value = true
  }, 100)
  })

onUnmounted(() => {
  window.removeEventListener('resize', setResponsive)
})

const minX = -35
const maxX = 55

// Watch for changes in modelPosition.x and stop movement if it reaches the min or max boundaries
watch(() => modelPosition.x, (currentX) => {
  if (isMoving.value) {
    if (direction.value === 'backward' && currentX <= minX) {
      modelPosition.x = minX
      isMoving.value = false 
    }
    else if (direction.value === 'forward' && currentX >= maxX) {
      modelPosition.x = maxX
      isMoving.value = false
    }
  }
})

// Function to toggle movement direction
const toggleMove = (dir) => {
  if (dir === 'backward' && modelPosition.x <= minX) return
  if (dir === 'forward' && modelPosition.x >= maxX) return

  if (isMoving.value && direction.value === dir) {
    isMoving.value = false
  } else {
    isMoving.value = true
    direction.value = dir
  }
}

const cameraRotateVal = 0.4

// Function to toggle camera rotation
const toggleCamera = () => {
  if(cameraRotateY.value !== 0){
    cameraRotateY.value = 0
  }else{
    cameraRotateY.value = cameraRotateVal
  }
}

const bloomEffect = new BloomEffect({ 
  intensity: 1.5, 
  luminanceThreshold: 0.15,
  luminanceSmoothing: 0.9 
})
const effects = shallowRef([bloomEffect])

</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
.scene {
  width: 100%;
  height: 100%;
  position: absolute;
  perspective: 1000px;
  transform-style: preserve-3d;
  background-color: black;
}

.three-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.html-elements {
  position: absolute;
  z-index: 1 !important;
  will-change: transform;
  backface-visibility: hidden;
}

.controls {
  position: absolute;
  display: flex;
  top: 520px;
  left: 40px;
  z-index: 999;
  gap: 10px;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(29, 50, 45, 0.2);
  color: #a0f6e4;
  font-size: 20px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;
}


.social-buttons {
  position: absolute;
  right: 40px;
  top: 520px;
  display: flex;
  gap: 12px;
  z-index: 999;
}

.social-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}

.social-btn svg { width: 20px; height: 20px; fill: currentColor; }

.social-btn.whatsapp { background: linear-gradient(135deg,#25D366,#128C7E); }
.social-btn.github { background: linear-gradient(135deg,#24292e,#57606a); }
.social-btn.messenger { background: linear-gradient(135deg,#0084FF,#2E89FF); }

.social-btn:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.35); }

.progress-bar{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 999;
}
.progress-bar .progress{
  height: 100%;
  background-color: #a0f6e4;
  transition: width 1.1s ease;
}

@media (max-width:768px) {
  .controls {
    top: 520px;
    left: 20px;
  }
  .control-btn{
    width: 38px;
    height: 38px;
  }
  .social-buttons {
    top: 50px;
    left: 20px;
  }
  .social-btn{
    width: 38px;
    height: 38px;
  }
}

</style>