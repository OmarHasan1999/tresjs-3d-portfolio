<template>
  <RouterView />
  <SceneComponent :isLoading="loading"/>

  <div class="loading-container" v-if="loading">
    <div class="bar-track">
      <div ref="bar" class="bar"></div>
    </div>
    <p id="animeBar">Loading {{ progressText }}</p>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { animate } from 'animejs'

const SceneComponent = defineAsyncComponent(() => import('./components/SceneComponent.vue'))
const bar = ref(null)
const progressText = ref("0%")
const loading = ref(true)

onMounted(() => {
  // bar animation when loading the page
  const duration = 3000
  animate(bar.value, {
    width: ["0%", "100%"],
    easing: 'linear',
    duration: duration,
  })
  
    const intervalTime = 30
    let elapsed = 0
    const timer = setInterval(() => {
    elapsed += intervalTime
    let currentProgress = Math.round((elapsed / duration) * 100)

    if (currentProgress >= 100) {
      currentProgress = 100
      clearInterval(timer)
    }

    progressText.value = `${currentProgress}%`
  }, intervalTime)

  setTimeout(() => {
    loading.value = false
  }, duration + 500)

})

</script>

<style>

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: #000;
}


.loading-container {
    position: fixed;
    top: 0;
    left: 0;
    color: white;
    background-color: black;
    width: 100%;
    height: 100vh;
    z-index: 999;    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

.bar-track {
  width: 100px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.15); 
  border-radius: 2px;
  overflow: hidden; 
}

.bar {
  width: 0%;
  height: 3px;
  background-color: #a0a0a0;
  border-radius: 2px;
}

#animeBar {
  font-size: 14px;
  font-weight: 450;
  letter-spacing: 1px;
  color: #a0a0a0;
}
</style>
