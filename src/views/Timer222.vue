<template>
  <div class="time-div">
    <div class="time-now">
      <div class="time-show">
        <div class="label">当前时间：</div><span style="color: #009a61;">{{ timetamp_now }}</span>
      </div>
    </div>
    <div class="time-now">
      <div class="time-show">
        <div class="label">现在时间：</div><span style="color: #009a61;">{{ timetamp_now }}</span>
      </div>
      <div class="time-control">
        控制：<button type="button" :class="[status > 0 ? 'end':'start']" @click="status = status < 1 ? 1 : 0">{{ status>0 ? '停止':'开始' }}</button>
      </div>
    </div>
    <div class="time-now">
      <label>
        <span class="label">时间戳：</span>
        <input v-model="timetamp" type="text" class="text">
      </label>
      <label>
        <select v-model="timeType">
          <option value="0">秒(s)</option>
          <option value="1">毫秒(ms)</option>
        </select>
      </label>
      <button type="button" class="button">转换 >></button>
      <label>
        <input v-model="timetamp" type="text" class="text">
      </label>
      <div class="text-div">北京时间</div>
    </div>
    <div class="time-now">
      <label>
        <span class="label">时间：</span>
        <input v-model="timetamp" type="text" class="text">
      </label>
      <div class="text-div">北京时间</div>
      <button type="button" class="button">转换 >></button>
      <label>
        <input v-model="timetamp" type="text" class="text">
      </label>
      <label>
        <select v-model="timeType">
          <option value="0">秒(s)</option>
          <option value="1">毫秒(ms)</option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  data() {
    return {
      status: 1,
      timeObject: null,
      timetamp_now: 0,
      timetamp: 0,
      timeType: '0'
    }
  },
  created() {
    this.getOutputTimestamp()
    this.timetamp = this.getTimeTamp().slice(0, 10)
  },
  methods: {
    getTimeTamp() {
      return new Date().getTime().toString()
    },
    getOutputTimestamp() {
      this.timeObject = setInterval(() => {
        if (this.status > 0) {
          this.timetamp_now = this.getTimeTamp().slice(0, 10)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.time-div{
  width: 650px;
  margin: auto;
}
.time-now {
  height: 40px;
  line-height: 40px;
}
.time-show,.time-control {
  display: inline-block;
  width: 300px;
}
.start {
  color: #eaecef;
  background-color: #009a61;
  border: 0;
}
.end {
  color: #eaecef;
  background-color: red;
  border: 0;
}
.label {
  width: 80px;
  display: inline-block;
}
.text {
  width: 150px;
  padding: 5px 3px;
  line-height: 17px;
  border: 1px solid #ccc;
}
select{
  width: 81px;
  height: 29px;
  margin: 0 5px;
}
input {
  outline-color:#009a61
}
.button{
  padding: 5px 8px;
  line-height: 17px;
  border-radius: 0;
  margin: 0 7px 0 0;
  background-color: #f5f5f5;
  border: 1px solid;
  border-color: #f0f0f0 #9c9c9c #9c9c9c #f0f0f0;
  text-decoration: none;
  font-weight: 700;
}
.button:hover {
  color: #009a61;
}
.text-div {
  display: inline-block;
  width: 81px;
  height: 29px;
  margin: 0 5px;
}
</style>
