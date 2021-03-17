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
              <label>
                <select v-model="timeZone" class="form-control" @change="changeTimeZone">
                  <option v-for="zone in timeZones" :key="zone.value" :value="zone.value">{{ zone.label }}</option>
                </select>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="content">
      <h4 class="content-title">&gt;&gt; Unix时间戳定义</h4>
      <form class="form-inline">
        <div class="form-group">
          <label style="width: 127px">现在的当地时间为:</label>
          <label>
            <input v-model="localTime" type="text" class="form-control" readonly>
          </label>
        </div>
        <button type="submit" class="btn btn-primary" style="margin-left: 25px" @click="status = status > 0 ? 0:1 ">{{ status>0?'暂停':'开始' }}</button>
      </form>
      <form class="form-inline">
        <div class="form-group">
          <label style="width: 127px">现在的Unix时间戳:</label>
          <label>
            <input v-model="timetamp" type="text" class="form-control" readonly>
            秒
          </label>
          <label style="margin-left: 4px">
            <input v-model="timetamp_now" type="text" class="form-control" readonly>
            毫秒
          </label>
        </div>
      </form>
      <h4 class="content-title">&gt;&gt; Unix时间戳 转 当地时间</h4>
      <form class="form-inline">
        <div class="form-group">
          <label>
            <input v-model="timetampInput" type="text" class="form-control" :placeholder="'时间戳eg:' + timetamp">
          </label>
          <button type="button" class="btn btn-primary" style="margin: 0 25px" @click="UnixToTime">转换</button>
          <label>
            <input v-model="timetampOutput" type="text" class="form-control" placeholder="时间">
          </label>
        </div>
      </form>
      <h4 class="content-title">&gt;&gt; 当地时间 转 Unix时间戳</h4>
      <form class="form-inline">
        <div class="form-group">
          <label>
            <input v-model="timeInput" type="text" class="form-control" :placeholder="'时间eg:' + localTime">
          </label>
          <button type="button" class="btn btn-primary" style="margin: 0 25px" @click="timeToUnix">转换</button>
          <label>
            <input v-model="timeOutput" type="text" class="form-control" placeholder="时间戳">
          </label>
          <label>
            <select v-model="timeType" class="form-control" style="margin-left: 5px" @change="timeToUnix">
              <option value="0">秒(s)</option>
              <option value="1">毫秒(ms)</option>
            </select>
          </label>
        </div>
      </form>
      <h4 class="content-title">&gt;&gt; 转换历史</h4>
      <div>
        <p v-for="(item, index) in timeList" :key="index">
          <span class="font-style">{{ item.s }}</span>=><span class="font-style">{{ item.e }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { time_default_now, timeUnix_now } from '@/utils'
import { strTimeToUnixTime, unixTimeToStrTime } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'Timer',
  data() {
    return {
      status: 1,
      timeObject: null,
      timetamp_now: 0,
      localTime: '',
      timetamp: 0,
      timeType: '0',
      timeZones: [
        { label: '埃尼威托克岛 (GMT-12)', value: -12 },
        { label: '萨摩亚群岛 (GMT-11)', value: -11 },
        { label: '夏威夷 (GMT-10)', value: -10 },
        { label: '阿拉斯加 (GMT-9)', value: -9 },
        { label: '太平洋时间 (GMT-8)', value: -8 },
        { label: '山脉时间 (GMT-7)', value: -7 },
        { label: '中央标准时间 (GMT-6)', value: -6 },
        { label: '东部时间 (GMT-5)', value: -5 },
        { label: '大西洋时间 (GMT-4)', value: -4 },
        { label: 'Brazilia (GMT-3)', value: -3 },
        { label: '大西洋中部时间(GMT-2)', value: -2 },
        { label: '亚述尔群岛 (GMT-1)', value: -1 },
        { label: '格林威治标准（GMT）', value: 0 },
        { label: '罗马 (GMT +1)', value: 1 },
        { label: '以色列 (GMT +2)', value: 2 },
        { label: '莫斯科 (GMT +3)', value: 3 },
        { label: '巴库 (GMT +4)', value: 4 },
        { label: 'New Delhi (GMT +5)', value: 5 },
        { label: 'Dhakar (GMT +6)', value: 6 },
        { label: '曼谷 (GMT +7)', value: 7 },
        { label: '北京 (GMT +8)', value: 8 },
        { label: '东京 (GMT +9)', value: 9 },
        { label: '悉尼 (GMT +10)', value: 10 },
        { label: 'Magadan (GMT +11)', value: 11 },
        { label: '惠灵顿 (GMT +12)', value: 12 }
      ],
      timeZone: 8,
      timetampInput: '',
      timetampOutput: '',
      timeInput: '',
      timeOutput: ''
    }
  },
  computed: {
    ...mapGetters(['timeList'])
  },
  created() {
    this.getRunTime()
    this.getOutputTimestamp()
  },
  methods: {
    getOutputTimestamp() {
      this.timeObject = setInterval(() => {
        this.getRunTime()
      }, 1000)
    },
    getRunTime() {
      if (this.status > 0) {
        this.timetamp_now = timeUnix_now(13, this.timeZone)
        this.timetamp = this.timetamp_now.slice(0, 10)
        this.localTime = time_default_now(null, this.timeZone)
      }
    },
    UnixToTime() {
      this.timetampOutput = ''
      if (this.timetampInput) {
        if (/^\d+$/.test(this.timetampInput)) {
          this.timetampOutput = unixTimeToStrTime('Y-m-d H:i:s', this.timetampInput, this.timeZone)
          this.$store.dispatch('time/addItem', { s: this.timetampInput, e: this.timetampOutput })
        } else {
          this.$alert('请填写数字')
        }
      } else {
        this.$alert('先填写你需要转换的时间戳')
      }
    },
    timeToUnix() {
      let length = 13
      if (this.timeType === '0') {
        length = 10
      }
      this.timeOutput = ''
      if (this.timeInput) {
        if (!/\d{2}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?/.test(this.timeInput)) {
          this.$alert('时间格式为:' + this.localTime + '或' + this.localTime.slice(0, 10))
          return
        }
        this.timeOutput = strTimeToUnixTime(length, this.timeInput, this.timeZone)
        this.$store.dispatch('time/addItem', {
          s: this.timeInput, e: this.timeOutput
        })
      } else {
        this.$alert('先填写你需要转换的时间')
      }
    },
    changeTimeZone() {
      this.getOutputTimestamp()
      this.timeToUnix()
      this.UnixToTime()
    }
  }
}
</script>

<style scoped>
  .navbar {
    margin: 7px 20px 0;
  }
 .form-control{
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
  .font-style {
    color: #2e6da4;
    font-size: 16px;
    font-weight: 600;
    margin: 0 20px;
  }
</style>
