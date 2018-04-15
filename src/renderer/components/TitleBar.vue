<template>
  <div class="titlebar doc">
    <div>File Manager</div>
    <div class="filler"/>
    <button
      class="alt"
      @click="min">min</button>
    <button
      class="alt"
      @click="max">max</button>
    <button
      class="alt"
      @click="close">Close</button>
  </div>
</template>

<script>
import { remote  } from 'electron' // eslint-disable-line

export default {
  name: 'TitleBar',
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link)
    },
    close() {
      remote.app.exit(0)
    },
    min() {
      remote.BrowserWindow.getFocusedWindow().minimize()
    },
    max() {
      remote.BrowserWindow.getFocusedWindow().maximize()
    },
  },
}
</script>

<style>
    .titlebar {
        padding: 10px;
        display: flex;
        justify-content: end;
        -webkit-user-select: none;
        -webkit-app-region: drag;
        background: #ccc;
    }
    .filler{flex-grow:1;}
    .titlebar button {
        -webkit-app-region: no-drag;
    }
</style>
