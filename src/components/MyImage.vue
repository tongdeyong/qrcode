<template>
  <div>
    <div class="my-img" :style="'width:' + width + 'px;height:' + height + 'px'" @click="selectPicture">
      <img v-if="src" :src="src" alt="" class="avatar" :style="'height:' + height + 'px'">
      <i v-else class="el-icon-plus avatar-uploader-icon" :style="'width:' + width + 'px;height:' + height + 'px;line-height: ' + height + 'px'" />
    </div>
    <input id="picture" type="file" accept=".png,.jpg,jpeg" style="display: none" @change="getPicture">
  </div>
</template>

<script>
export default {
  name: 'MyImage',
  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    imgSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      src: ''
    }
  },
  watch: {
    imgSrc: function(val) {
      this.src = val
    }
  },
  methods: {
    selectPicture() {
      document.getElementById('picture').click()
    },
    getPicture() {
      const image = document.getElementById('picture')
      this.src = URL.createObjectURL(image.files[0])
      this.$emit('getImageSrc', this.src)
    }
  }
}
</script>

<style scoped>
.my-img {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.my-img:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
.avatar {
  display: block;
}
</style>
