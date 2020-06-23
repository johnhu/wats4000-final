<template>
  <div id="app">
    <router-view />
    <svg></svg>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background: url('../src/assets/img/reel-graphic.svg')#2b2d2f;
  background-repeat: no-repeat;
  background-position: 100px;
  width: 75%;
  margin: 20px auto;
  padding: 2px;
  overflow-x: hidden;
}
</style>
