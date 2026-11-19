<template>
      <TresGroup :position="[modelPosition.x, modelPosition.y, modelPosition.z]" :rotation="[0, rotationY, 0]"
                  :scale="[0.012, 0.012, 0.012]">
        <primitive v-if="rig" :object="rig"/>
    </TresGroup>
</template>

<script setup>
import { useGLTF, useAnimations } from '@tresjs/cientos'
import { computed, ref, watch, watchEffect } from 'vue'
import { LoopRepeat } from 'three'
import { useLoop } from '@tresjs/core'
import { useModelPosition } from '../js/index.js'

const { onBeforeRender } = useLoop()
const { modelPosition, isMoving, direction } = useModelPosition()

// Load the GLTF model and its animations
// state contains the model's state, including animations, and nodes contains the model's scene graph
const { state } = useGLTF('character.glb')
const speed = 0.025

// get all animations from the model
const animations = computed(() => state.value?.animations || [] )

// The RIG is the skeleton/root object of the character.
const rig = computed(() => state.value?.scene || null)

// Get the actions for each animation clip
const { actions} = useAnimations(animations, rig)
const currentAction = ref(null)
const animName = 'Take 001'

// log the names of all nodes
// watch(nodes, (value) => {
//   console.log(value)
//   console.log(Object.keys(value))
// })


// log the names of all animations
// watch(animations, (value) => {
//   console.log("animations:", value.map(clip => clip.name))
// })

// Function to transition between animations
function transitionTo(name, duration = 0.2) {
    const next = actions?.[name]
    if (!next || currentAction.value === next) return
    if (currentAction.value) {
    currentAction.value.fadeOut(duration)
  }
    next.reset().setLoop(LoopRepeat, Infinity).fadeIn(duration).play()
    currentAction.value = next
}

// Watch for changes in the rig and transition to the idle animation when the rig is ready
watch([rig, () => actions], ([newRig, currentActions]) => {
  if (newRig && currentActions?.[animName]) {
    transitionTo(animName)
    if (!isMoving.value) {
      actions[animName].paused = true
    }
  }
}, { immediate: true })

// Watch for changes in the isMoving state 
watch([isMoving, rig], ([moving, readyRig]) => {
  if (!readyRig || !actions?.[animName]) return

  const action = actions[animName]
  if (moving) {
    action.paused = false
    action.play()
  } else {
    action.paused = true
  }
})

onBeforeRender(() => {
  if (isMoving.value) {
    modelPosition.x += direction.value === 'forward' ? speed : -speed
  }
})

const rotationY = computed(() =>
  direction.value === 'forward' ? Math.PI / 2 : -Math.PI / 2)


// Set up shadows for all meshes in the rig
watchEffect(() => {
  if(rig.value) {
    rig.value.traverse((child) => {
      if(child.isMesh){
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }
})

</script>
<style lang="css">
</style>
