<template>
  <div class="menu">
    <ul>
      <li v-for="menuItem in menuItems" :key="menuItem.id">
        <span :class="{aStyle:$route.path === menuItem.path}" @click="$router.push({ path: menuItem.path })">{{ menuItem.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { routes } from '@/router'
export default {
  name: 'Menu',
  data() {
    return {
      menuItems: []
    }
  },
  created() {
    this.menuItems = routes
  }
}
</script>

<style scoped>
 .menu {
   display: inline-block;
   font-size: 0.9rem;
   float: right;
   padding: 0 50px;
   width: 600px;
 }
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    display: inline-block;
    margin-left: 1.5rem;
    cursor: pointer;
  }
 span {
    padding: 10px 2px;
    text-decoration: none;
    color: #2c3e50;
    font-weight: 600;
    font-size: 1.4rem;
  }
 span:hover {
    border-bottom: #3eaf7c 2px solid;
  }
 .aStyle {
   border-bottom: #3eaf7c 2px solid;
 }
</style>
