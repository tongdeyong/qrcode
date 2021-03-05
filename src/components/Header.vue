<template>
  <div class="header">
    <Logo />
    <Menu />
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import Menu from '@/components/Menu'
export default {
  name: 'Header',
  components: { Menu, Logo }
}
</script>

<style scoped>
  div {
    height: 60px;
    vertical-align: middle;
    line-height: 60px;
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
  }
  .header {
    border-bottom: #eaecef 1px solid;
  }
</style>
