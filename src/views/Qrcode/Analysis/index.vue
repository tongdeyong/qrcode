<template>
  <div>
    <div class="img-div">
      图片
    </div>
    <div class="img-div result">
      输出
    </div>
  </div>
</template>

<script>
// import jsQR from 'jsqr'
export default {
  name: 'Index'
}
</script>

<style scoped>
.img-div{
  width: 48%;
  margin: 10px 5px;
  border: #ddd 4px dashed;
  height: 460px;
  display: inline-block;
}
.result {
  height: 460px;
  padding: 4px;
  margin: 0;
  resize: none;
  outline: 0;
  background: #fcfcfc;
  border: 1px solid #ddd;
}
</style>
