<template>
    <TresPerspectiveCamera ref="cameraRef"
    :rotation="[cameraRotateY.x, cameraRotateY.y, cameraRotateY.z]"
    :fov="fov"
    :look-at="[0, 0, 0]"/>
</template>
<script setup>
import { useModelPosition } from '../js/index.js'
import { useLoop } from '@tresjs/core'
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const cameraRef = ref(null)
const { modelPosition, cameraRotateY } = useModelPosition()
const { onBeforeRender } = useLoop()
const baseDistance = 6
const currentDistance = ref(baseDistance)
// const cameraOffsetX = ref(1.7)

let lastX = 0

onBeforeRender(() => {
  if (cameraRef.value) {
    // Determine if the model is moving by checking the change in its x position
    const moving = Math.abs(modelPosition.x - lastX) > 0.01
    lastX = modelPosition.x

    // Set the target distance based on whether the model is moving or not
    const targetDistance = moving ? baseDistance : 4.8

    // Smoothly interpolate the current distance towards the target distance
    currentDistance.value = THREE.MathUtils.lerp(currentDistance.value, targetDistance, 0.05)

    // Calculate the target camera position based on the model's position and the current distance
    const targetX = (modelPosition.x ) + Math.sin(cameraRotateY.value) * currentDistance.value
    const targetZ = modelPosition.z + Math.cos(cameraRotateY.value) * currentDistance.value
    const targetY = modelPosition.y + 1

    // Smoothly interpolate the camera position towards the target position
    cameraRef.value.position.lerp(
      new THREE.Vector3(targetX, targetY, targetZ),
      0.07
    )

    // cameraRef.value.lookAt(modelPosition.x, modelPosition.y + 1, modelPosition.z)
    cameraRef.value.lookAt(modelPosition.x, modelPosition.y + 1, modelPosition.z)
  }
})


const fov = ref(45) // Default FOV value
const setCamera = () => {
  const width = window.innerWidth
  if (width < 768) {
    fov.value = 70
    currentDistance.value = 12
    // cameraOffsetX.value = 1.3
  }
  else {
    fov.value = 45
    currentDistance.value = 6
    // cameraOffsetX.value = 1.7
  }
}

onMounted(() => {
  setCamera()
  window.addEventListener('resize', setCamera)
})

onUnmounted(() => {
  window.removeEventListener('resize', setCamera)
})

</script>
<style lang="css">
    
</style>