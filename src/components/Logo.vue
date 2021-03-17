<template>
  <div>
    <span>{{ title }}</span>
  </div>
</template>

<script>
import { title } from '@/setting'

export default {
  name: 'Logo',
  data() {
    return {
      title: title
    }
  }
}
</script>

<style scoped>
  div {
    text-align: left;
    padding-left: 50px;
    display: inline-block;
    font-size: 2.6rem;
  }
  span {
    font-size: 2.6rem;
    font-family: 华文行楷;
  }
</style>
