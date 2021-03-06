<template>
  <div style="text-align: center">
    <div>
      现在时间：{{ timetamp }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  data() {
    return {
      statue: 1,
      timeObject: null,
      timetamp: 0
    }
  },
  computed: {

  },
  created() {
    this.getTimeTemp(1)
  },
  methods: {
    getTimeTemp(status) {
      if (status > 0) {
        this.timeObject = setInterval(() => {
          this.timetamp = new Date().getTime().toString().slice(0, 10)
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>

</style>
