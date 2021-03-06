<template>
  <div class="wrapper">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">时间戳转换</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">选择时区：</a></li>
            <li>
              <select class="form-control">
                <option>北京(GMT +8)</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="content">
      <h4 class="content-title">&gt;&gt; Unix时间戳定义</h4>
      <form class="form-inline">
        <div class="form-group">
          <label>现在的当地时间为：</label>
          <label>
            <input v-model="localTime" type="text" class="form-control" readonly>
          </label>
        </div>
        <button type="submit" class="btn btn-primary" style="margin-left: 10px" @click="status = status > 0 ? 0:1 ">{{ status>0?'暂停':'开始' }}</button>
      </form>
      <form class="form-inline">
        <div class="form-group">
          <label>现在的Unix时间戳：</label>
          <label>
            <input v-model="timetamp" type="text" class="form-control" readonly>
            秒
          </label>
          <label style="margin-left: 30px">
            <input v-model="timetamp_now" type="text" class="form-control" readonly>
            毫秒
          </label>
        </div>
      </form>
      <h4 class="content-title">&gt;&gt; Unix时间戳 转 当地时间</h4>
      <form class="form-inline">
        <div class="form-group">
          <label>
            <input type="text" class="form-control" placeholder="时间">
          </label>
          <label>
            <select class="form-control" style="margin-left: 5px">
              <option value="0">秒(s)</option>
              <option value="1">毫秒(ms)</option>
            </select>
          </label>
          <button type="button" class="btn btn-primary" style="margin: 0 25px">转换</button>
          <label>
            <input type="text" class="form-control" placeholder="时间">
          </label>
        </div>
      </form>
      <h4 class="content-title">&gt;&gt; 当地时间 转 Unix时间戳</h4>
      <form class="form-inline">
        <div class="form-group">
          <label>
            <input type="text" class="form-control" placeholder="时间">
          </label>
          <button type="button" class="btn btn-primary" style="margin: 0 25px">转换</button>
          <label>
            <input type="text" class="form-control" placeholder="时间">
          </label>
          <label>
            <select class="form-control" style="margin-left: 5px">
              <option value="0">秒(s)</option>
              <option value="1">毫秒(ms)</option>
            </select>
          </label>
        </div>
      </form>
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
      localTime: '',
      timetamp: 0,
      timeType: '0'
    }
  },
  created() {
    this.getOutputTimestamp()
  },
  methods: {
    getTimeTamp() {
      return new Date().getTime().toString()
    },
    getOutputTimestamp() {
      this.timeObject = setInterval(() => {
        if (this.status > 0) {
          this.timetamp_now = this.getTimeTamp()
          this.timetamp = this.timetamp_now.slice(0, 10)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .navbar {
    margin: 7px 20px 0;
  }
 .form-control{
   width: 150px;
   margin: 8px 0;
 }
 .content {
   margin: 10px 40px;
 }
 .content-title {
   margin-top: 10px;
   border-bottom: 1px solid #eee;
   padding-bottom: 5px;
   font-size: 16px;
   color: #428bca;
 }
 .btn {
   width: 100px;
   vertical-align: inherit;
 }
</style>
