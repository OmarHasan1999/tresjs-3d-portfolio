<template>
  <RouterView />
  <IndexComponent />
</template>

<script setup>
import { RouterView } from 'vue-router'
import IndexComponent from './components/IndexComponent.vue'

</script>

<style>

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
