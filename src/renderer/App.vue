<template>
  <div id="app">
    <title-bar/>
    <router-view/>
  </div>
</template>

<script>
import TitleBar from './components/TitleBar'
export default {
  name: 'FileManager',
  components: {
    TitleBar,
  },
}
</script>

<style>
  /* CSS */
</style>
