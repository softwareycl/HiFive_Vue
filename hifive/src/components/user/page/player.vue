<template>

  <div class="wholeBody">
    <div class="footer">
    <!--去掉audio标签中controls="controls"属性就可以修改样式-->
      <audio 
      ref="audio" 
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate" 
      @loadedmetadata="onLoadedmetadata"
      src="http://65.ierge.cn/12/186/372266.mp3" 
      controlsList="nodownload">
      </audio>
    <!--<el-row>
      <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button>
    </el-row>-->

      <el-col :span="1">
        <el-button class="btn" icon="el-icon-d-arrow-left" circle></el-button>
      </el-col>
      <el-col :span="1"> 
        <el-button class="btn" @click="startPlayOrPause" circle>{{audio.playing|transPlayPause}}</el-button>
      </el-col>
      <el-col :span="1">
        <el-button class="btn" icon="el-icon-d-arrow-right" circle></el-button>
      </el-col>
      <el-col :span="2">
        <img class="albumImg" src="https://p.qpic.cn/music_cover/oQ7QIr12iawo8AdKZPxIeuUneZQTUL489DXnNEkpG9Ltz39j6dBOsfw/300?n=1" alt="专辑图片">
      </el-col>
      <el-col :span="13">
      <div class="songInfo">  
        <el-button class="songInfo2" type="text" @click="songdetail">{{songList[0].id}}</el-button>
        <el-button class="songInfo2" type="text" @click="artistdetail">{{songList[0].name}}</el-button>
      </div>
      <div class="tooltip">
        <el-slider v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="slider"></el-slider>
      </div>
      </el-col>
      <el-col :span="2">
        <p class="time">{{ audio.currentTime | formatSecond}}</p>
      </el-col>
      <el-col :span="2">
        <p class="time">{{ audio.maxTime | formatSecond}}</p>
      </el-col>
      <!--以下为弹出框内容-->
      <el-popover
        placement="top-start"
        width="1250"
        trigger="click">
        <div class="bg">
        <div class="box">
        <el-container>

          <el-main>
            <div class="playlist">
              <h2>播放列表</h2>
            </div>
          </el-main>
          <el-aside width="40%">
            <div class="lyrics">
              <h4>{{songList[0].id}}</h4>
              <el-input
              id="lyrics"
              type="textarea"
              :disabled="true"
              :autosize="{ minRows: 20, maxRows: 20}"
              placeholder="歌词"
              v-model="textarea">
              </el-input>
            </div>
          </el-aside>
        </el-container>
      </div>
      </div>
      <el-button class="playlistbtn" slot="reference" icon="el-icon-document" circle></el-button>

      </el-popover>
  </div>
</div>

</template>
<script>
import {mapState} from 'vuex';//引入mapstate

  //音频显示时间,将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '0:00:00'
  }
}

export default {
    data(){
        return {
          textarea:'',
            audio:{
                // 该字段是音频是否处于播放状态的属性
                playing:false,
                // 音频当前播放时长
                currentTime: 0,
                // 音频最大播放时长
                maxTime: 0,
                id:0,
                url:'',
                singer:'',
                img_url:'',
                lyrics:'',
            }
        }
    },
    computed: {
      ...mapState([
        'songList', 
      ])
    },
   methods: {
    // 控制音频的播放与暂停
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    },
    // 播放音频
    play () {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay () {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      console.log('timeupdate')
      console.log(res)
      this.audio.currentTime = res.target.currentTime
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      console.log('loadedmetadata')
      console.log(res)
      this.audio.maxTime = parseInt(res.target.duration)
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
    this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
    },
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
    console.log('timeupdate')
    console.log(res)
    this.audio.currentTime = res.target.currentTime
    this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
    },

    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
    index = parseInt(this.audio.maxTime / 100 * index)
    return '进度条: ' + realFormatSecond(index)
    }, 
    //点击单曲名跳转至单曲详情
    songdetail(){
      this.$router.push({
          path: '/page/songdetail'
      });
    },
    //点击歌手名跳转至歌手详情
    artistdetail(){
      this.$router.push({
          path: '/page/artistdetail'
      });
    },
    		/* 播放上一曲
		playNext (state) {
			state.currentIndex ++
			const length = state.songList.length
			if (state.currentIndex >= length) {
				state.currentIndex = 0
			}
			state.audioelement.setAttribute('src', state.songList[state.currentIndex].url)
			state.playing = true
			state.audioelement.load()
			state.audioelement.play()
		},

		// 播放下一曲
		playPrev (state) {
			state.currentIndex --
			const length = state.songList.length
			if (state.currentIndex < 0) {
				state.currentIndex = length - 1
			}
			state.audioelement.setAttribute('src', state.songList[state.currentIndex].url)
			state.playing = true
			state.audioelement.load()
			state.audioelement.play()
    },*/
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? '|| ': '►'
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second)
    }
  }
}
</script>
<style>
.wholeBody,.info{
  height:100%;
  width:100%;
  min-height:100%;
  margin-bottom:50px;
}
.bg{
  height:100%;
  width:100%;
  background:url("http://publicdomainarchive.com/wp-content/uploads/2016/01/public-domain-images-free-stock-photos-002.jpg") 0 0 no-repeat;
}
.footer {
    color: #333;
    text-align: center;
    width:100%;
    height:60px;
    position:fixed;
    bottom:0px;
    background-color:white;
    margin-left:-10px;
  }
.playlist {
    color: #333;
    text-align: center;
    line-height: 10px;

  }
  
  .lyrics {
    color: #333;
    text-align: center;
    line-height: 10px;

  }
.albumImg{
  width:50px;
  height:50px;
  padding-top:1%;
}
.time{    
  width:50px;
  height:40px;
  font-size:16px;
  color:black;
  margin-top:30px;
  margin-left:10px;
}

.songInfo2{
  margin-left:0%;
  padding-left:10px;
  font-size:18px;
  text-align: left;
}

.btn{
  margin-top:20%;
  width:40px;
  height:40px;
  margin-left:20px;
}
#lyrics{
  margin:0 auto;
  width:80%;
}
.tooltip{
  margin-top:-20px;
}
.playlistbtn{
  width:40px;
  height:40px;
  margin-left:-80px;
  margin-top:0.8%;
}
</style>
