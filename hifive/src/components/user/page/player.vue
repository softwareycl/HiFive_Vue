<template>

  <div class="wholeBody">
    <div class="playerFooter">
    <!--去掉audio标签中controls="controls"属性就可以修改样式-->
      <audio 
      ref="audio" 
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate" 
      @loadedmetadata="onLoadedmetadata"
      @ended="end"
      :src="currentSong.filePath" 
      controlsList="nodownload"
      autoplay>
      </audio>
      <el-col :span="1">
        <el-button class="btn" icon="el-icon-d-arrow-left" @click="preSong" circle></el-button>
      </el-col>
      <el-col :span="1"> 
        <el-button class="btn" @click="startPlayOrPause" circle>{{audio.playing|transPlayPause}}</el-button>
      </el-col>
      <el-col :span="1">
        <el-button class="btn" icon="el-icon-d-arrow-right" @click="nextSong" circle></el-button>
      </el-col>
      <el-col :span="2">
        <div class="songImg" >
          <img height="50" width="50" :src="currentSong.image" alt="" onerror="this.style.display='none'"/>
        </div>
      </el-col>
      <el-col :span="13">
      <div class="songInfo">  
        <el-button class="songInfo2" type="text" @click="songdetail">{{currentSong.name}}</el-button>
        <el-button class="songInfo2" type="text" @click="artistdetail">{{currentSong.artistName}}</el-button>
      </div>
      <div class="tooltip">
        <el-slider v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="slider"></el-slider>
      </div>
      </el-col>
      <el-col :span="4">
        <p class="time">{{ audio.currentTime | formatSecond}}/{{ audio.maxTime | formatSecond}}</p>
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
              <h2 class="playlistLabel">播放列表</h2>
              <!--播放列表表格-->
              <div class="songTable">
              <el-table
                :data="songList"
                style="width: 100%"
                max-height="500" min-height="500">
              <el-table-column prop="index" width="50" type="index">
              </el-table-column>
              <el-table-column               
                prop="name"
                label="歌曲"
                width="350">
              </el-table-column>
              <el-table-column               
                prop="artistName"
                label="歌手"
                width="170">
              </el-table-column>            
              <el-table-column               
                prop="duration"
                label="时长"
                width="80">
              </el-table-column>
              </el-table>
              </div>
            </div>
          </el-main>
          <el-aside width="40%">
            <div class="lyrics">
              <h3>{{currentSong.name}}</h3>
              <div>
                <textarea id="lyrics">{{currentSong.lyricsPath}}</textarea>
              </div>
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
          id: '',
          songUrl: [],
          audio: {
            playing:false,
            currentTime: 0,
            maxTime: 0,
          },
          sliderTime:0,
        }
    },
    computed: {
      ...mapState([
        'songList',
      ]),
      currentSong() {
        return this.$store.state.currentSong;
      },
    },
    mounted() {
      // this.axios.get("http://localhost:8080/hifive/lyrics/Maroon5/Red%20Pill%20Blues/Whiskey.txt", {
      //     params: {
      //     }
      //   })
      //     .then(res => {
      //     console.log(res.data);

      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });


      // var xmlhttp=new XMLHttpRequest();
      // xmlhttp.onreadystatechange=function()
      // {
      //   var textHTML=xmlhttp.responseText;
      //   alert(textHTML);
      //   textHTML=textHTML.replace(/(\n)+|(\r\n)+/g,"<br>");
      //   document.getElementById("lyrics").innerHTML=textHTML;
      // }
      // xmlhttp.open("GET","http://localhost:8080/hifive/lyrics/Maroon5/Red%20Pill%20Blues/Whiskey.txt",true);
      // xmlhttp.overrideMimeType("text/html;charset=gb2312");
      // xmlhttp.send();
 
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
    //播放上一曲
      preSong: function(){
        if(this.$store.state.currentIndex > 0){
          this.$store.state.currentIndex = this.$store.state.currentIndex - 1
          this.$store.state.currentSong = this.$store.state.songList[this.$store.state.currentIndex]
        }
      },
    // 播放下一曲
      nextSong: function(){
        if(this.$store.state.currentIndex < this.$store.state.songList.length){
          this.$store.state.currentIndex = this.$store.state.currentIndex + 1
          this.$store.state.currentSong = this.$store.state.songList[this.$store.state.currentIndex]
        }
      },
      end: function () {
        this.nextSong()
      },
      showLyrics: function(){
        this.axios.get(this.serverUrl + "/song/getInfo", {
          params: {
            id: _id,
          }
        })
          .then(res => {
          console.log(res.data);
          this.song = res.data;
          this.song.lyricsPath = this.serverUrl + this.song.lyricsPath;

          var xmlhttp=new XMLHttpRequest();
          xmlhttp.onreadystatechange=function()
          {
            var textHTML=xmlhttp.responseText;
            textHTML=textHTML.replace(/(\n)+|(\r\n)+/g,"<br>");
            document.getElementById("lyr").innerHTML=textHTML;
          }
          xmlhttp.open("GET",this.song.lyricsPath,true);
          xmlhttp.overrideMimeType("text/html;charset=gb2312");
          xmlhttp.send();
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? '|| ': '►';
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
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
.playerFooter {
    color: #333;
    text-align: center;
    width:100%;
    height:60px;
    position:fixed;
    bottom:0px;
    background-color:white;
    margin-left:-1px;
    margin-bottom:0px;
  }
.playlist {
    color: #333;
    text-align: left;
    line-height: 10px;
    margin-left:10px;
  }
.playlistLabel {
  padding-top: 0px;
  margin-top: 0px;
}
.songTable{
  margin-top:20px;
  text-align:left;
  margin-left:0px;
}
  .lyrics {
    color: #333;
    text-align: center;
    line-height: 10px;
    margin-top:30px;
  }
  .songImg{
  border-color:white;
  padding-top:5px;
  padding-left:25px;
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
  margin:0,auto;
  width:80%;
  min-height:300px;
  max-height:300px;
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
