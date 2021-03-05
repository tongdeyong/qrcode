<template>
  <Header />
  <div>
    <Qrcode />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Qrcode from '@/components/Qrcode'

export default {
  name: 'App',
  components: {
    Qrcode,
    Header
  }
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
