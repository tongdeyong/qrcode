<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>

import Header from './components/Header'
export default {
  name: 'App',
  components: { Header }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,body {
  padding: 0;
  margin: 0;
}
</style>
