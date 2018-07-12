<template>

  <div class="wholeBody">
    <div class="playerFooter" style="z-index:10">
    <!--去掉audio标签中controls="controls"属性就可以修改样式-->
      <audio 
      ref="audio" 
      id = "audio"
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
          <!-- <router-link :to="{path:'/user/songdetail',query:{id:currentSong.id}}"> -->
            <img id="img" height="50" width="50"  @click="clickSongName" :src="currentSong.image" alt=""/>
          <!-- </router-link> -->
        </div>
      </el-col>
      <el-col :span="13">
      <div class="songInfo">  
          <el-button class="songInfo2" type="text" @click="clickSongName">{{currentSong.name}}</el-button>
          <el-button class="songInfo2" @click="clickArtistName" type="text">{{currentSong.artistName}}</el-button>
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
      ref=""
        placement="top-start"
        width="1200"
        trigger="click"
        @show="clickPopOver">
        <div class="bg">
        <el-container>

          <el-main>
            <div class="playlist">
              <div class="playlistLabel">
                <el-col :span="20">
                  <h2>播放列表</h2>
                </el-col>
                <el-col :span="4">
                  <el-button class="el-icon-delete" @click="deleteAll" circle></el-button>
                </el-col>

            </div>
              <!--播放列表表格-->
              <div class="songTable songListTable">
              <el-table
                class="songListTable"
                ref="songListTable"
                :data="songList"
                highlight-current-row
                style="width: 100%"
                max-height="455" min-height="455"
                @row-dblclick="clickSongRow">
              <el-table-column prop="index" width="50" type="index">
              </el-table-column>
              <el-table-column
                label="歌曲"
                width="350">
                <template slot-scope="scope">
                  <div id="nameTable">
                    <i v-if="scope.$index == currentIndex" class="el-icon-caret-right"></i>
                    <el-tooltip class="item" effect="light" placement="top-start" open-delay="500">
                      <div slot="content">{{scope.row.name}}</div>
                      <span >{{ scope.row.name }}</span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="歌手"
                width="170">
                <template slot-scope="scope">
                  <div id="artistTable">
                    <el-tooltip class="item" effect="light" placement="top-start" open-delay="500">
                      <div slot="content">{{scope.row.artistName}}</div>
                      <span >{{ scope.row.artistName }}</span>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>          
              <el-table-column
                prop="duration"
                label="时长"
                width="100">
              </el-table-column>
              </el-table>
              </div>
            </div>
          </el-main>
          <el-aside width="40%">
            <div class="lyrics">
               <el-tooltip class="item" effect="light" placement="top">
                  <div slot="content">{{currentSong.name}}</div>
                  <h2 id="lyricsTitle">{{currentSong.name}}</h2>
               </el-tooltip>
              <div>
                <textarea id="lyrics" disabled="disabled" ></textarea>
              </div>
            </div>
          </el-aside>
        </el-container>
      </div>
      <el-button class="playlistbtn" slot="reference" icon="el-icon-document" circle></el-button>

      </el-popover>
  </div>
</div>

</template>
<script>
import {mapState} from 'vuex';

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
      //引入公共变量
      ...mapState([
        'songList','currentIndex'
      ]),
      //player若没有正在播放的歌曲则显示默认内容
      currentSong() {
        var song = this.$store.state.currentSong;
        if(song.id != null)
          return song;
        else {
          return {
            name:"无播放歌曲", 
            image:require("../../../assets/player_icon.jpg"),
          };
        }
          
      },
      //获取当前用户的serverurl
      serverUrl() {
        return this.$store.state.serverUrl;
      },
    },
    watch: {
      // 如果 `currentSong` 发生改变，这个函数就会运行
      currentSong: function (newSong, oldSong) {
        if(newSong != null && newSong.id != null){
          this.axios.get(this.serverUrl + "/song/play", {
            params: {
              id: newSong.id
            }
          })
          .then(res => {
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
    },

   methods: {
    // 控制音频的播放与暂停
    startPlayOrPause () {
      if(this.$refs.audio.src == "" || this.$refs.audio.src==undefined || this.$refs.audio.src==null)
        return this.pause();
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
    getAudio: function(){
      return document.getElementById("audio");
    },
    // 当音频播放
    onPlay () {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    },

    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      this.audio.maxTime = parseInt(res.target.duration)
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
    },
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      // console.log(res);
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100);
    },

    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt(this.audio.maxTime / 100 * index)
      return '进度条: ' + realFormatSecond(index)
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
    // 当前歌曲结束播放时调用nextSong函数
    end: function () {
      if(this.$store.state.currentIndex < this.$store.state.songList.length - 1)
        this.nextSong()
    },
    //点击按钮跳出弹出框，显示播放列表及歌词
    clickPopOver: function(){
      if(this.currentSong.name != undefined){
        this.$refs.songListTable.setCurrentRow(this.$store.state.songList[this.$store.state.currentIndex]);
      }
      if(this.$store.state.currentIndex > 3){
        var distance = 50 * this.$store.state.currentIndex - 150;
        this.$nextTick(() => {
          this.$refs.songListTable.bodyWrapper.scrollTop = distance;
        });        
      }
      this.showLyrics();
    },
    //显示歌词
    showLyrics: function(){
      if(this.currentSong.name === undefined){
        document.getElementById("lyricsTitle").innerHTML="无播放歌曲";
      } else {
        this.axios.get(this.currentSong.lyricsPath, {
          params: {
          }
        })
        .then(res => {
          document.getElementById("lyrics").innerHTML=res.data;

        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    //点击歌曲名称或者歌曲图片跳转至歌曲详情
    clickSongName: function(){
      if(this.currentSong.id == null) return;
      this.$router.push({
        path: "/user/songdetail",
        query:{id:this.currentSong.id}
      })
    },
    //点击歌手名称跳转至歌曲详情
    clickArtistName: function(){
      if(this.currentSong.id == null) return;
      this.$router.push({
        path: "/user/artistdetail",
        query:{id:this.currentSong.artistId}
      })
    },
    //在播放列表点击任一行播放对应歌曲
    clickSongRow: function(row, event){
      var songId = row.id;
      var index;
      for(var i = 0; i < this.$store.state.songList.length; i++){
        if(this.$store.state.songList[i].id == songId){
          index = i;
          break;
        }
      }
      this.$store.state.currentSong = this.$store.state.songList[index];
      this.$store.state.currentIndex = index;
      this.showLyrics();
      this.play();
    },
    //清空播放列表
    deleteAll: function(){
      this.onPause();
      document.getElementById("audio").src="";
      this.$store.state.songList = [];
      this.$store.state.currentSong = {filePath: ""};
      this.$store.state.currentIndex = -1;
      this.audio.currentTime = 0;
      this.audio.maxTime = 0;
      this.sliderTime = 0,

      document.getElementById("lyricsTitle").innerHTML="无播放歌曲";
      document.getElementById("lyrics").innerHTML = "暂无歌词";
    },
  },
  //改变播放状态按钮函数
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
<style scoped>
.wholeBody,.info{
  height:100%;
  width:100%;
  min-height:100%;
  margin-bottom:61px;
}
.bg{
  height:550px;
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
    margin-bottom:0px;
    border-top: 1px solid #D0D0D0;
  }
.playlist {
    color: #333;
    text-align: left;
    line-height: 10px;
    margin-left:10px;
  }
.playlistLabel {
  padding-left:41%;
  padding-top: 1px;
  margin: 0 auto;
}
.songTable{
  margin-top:56px;
  text-align:left;
  margin-left:0px;
}
.lyrics {
  color: #333;
  text-align: center;
  margin:0 auto;
}
.songImg{
  border-color:white;
  padding-top:5px;
  padding-left:25px;
}
#img{
  border-color:white;
  border-width: 0;
  border-style: none;
  cursor: pointer;
}
.time{    
  width:50px;
  height:40px;
  font-size:16px;
  color:black;
  margin-top:34px;
  margin-left:10px;
}

.songInfo2{
  margin-left:0%;
  padding-left:10px;
  font-size:18px;
  text-align: left;
  color: #009933;
}

.btn{
  margin-top:20%;
  width:40px;
  height:40px;
  margin-left:20px;
  color: #31C27C;
}
#lyrics{
  margin-right:20px;
  width:90%;
  min-height:450px;
  max-height:450px;
  background-color: white;
  border: none;
  font: Microsoft YaHei, 黑体, PingFang SC;
}
#lyricsTitle{
  padding-bottom:15px;
  margin-right:20px;
  margin-top:28px;
  margin-bottom:5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.slider{
  color:#31c27c;
}
.el-popover{
position: fixed;
word-wrap: break-word; 
word-break: normal; 
overflow:hidden;
margin-top: 0px;
}
#nameTable{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 2px;
}
#artistTable{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
