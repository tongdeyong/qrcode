<template>
  <div class="menu">
    <ul>
      <li v-for="menuItem in menuItems" :key="menuItem.id">
        <span :class="{aStyle:menuItem.isClick}" @click="chooseMenu(menuItem.id,menuItem.path)">{{ menuItem.item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      menuItems: [
        { id: 1, item: '生成二维码', path: '/qrcode', isClick: true },
        { id: 2, item: '时间戳转换', path: '/timer', isClick: false }
      ]
    }
  },
  methods: {
    chooseMenu(id, path) {
      this.menuItems.map(item => {
        item.isClick = item.id === id
      })
      this.$router.push({ path: path })
    }
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
