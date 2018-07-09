<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-nav></v-nav>
    <div id="albumdetail" :data="album">
      <el-row :gutter="50" style="background: linear-gradient(#F2F2F2, #FFFFFF);">
        <el-col :span="4" :offset="3">
          <div>
            <img align=right style="width:230px;height:230px;margin-top:20px" :src=album.image>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <p class="font_albumName" style="margin-bottom:0px">{{album.name}}</p>
            <i class="el-icon-service"></i>
            <router-link :to="{ path: '/user/artistdetail', query: { id: album.artistId }}">
              <span class="font_albumArtistName"  style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{album.artistName}}</span>
            </router-link>
            <div>
              <p class="font_other">流派 : {{album.style}}</p>
              <p class="font_other">发行时间 : {{album.releaseDate}}</p>
            </div>
            <el-button type="primary" icon="el-icon-caret-right" style="background-color:#31C27C" onmouseover="this.style.backgroundColor='#2CAF6F';" onmouseout="this.style.backgroundColor='#31C27C';" v-on:click="playAllSong">播放全部</el-button>
            <el-button v-if="album.isCollected" icon="el-icon-star-on" v-on:click="cancelCollect">已收藏</el-button>
            <el-button v-else icon="el-icon-star-off" v-on:click="collect">收藏</el-button>
            <el-dropdown trigger="click" @command="handleAlbumCommand">
              <el-button icon="el-icon-plus">添加到<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" :data="playlistList">
                <el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
                <div v-if="isLogin">
                  <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                  <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",params:playlist.id}'>{{playlist.name}}</el-dropdown-item>
                  <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                </div>
                <el-dropdown-item v-else command="login" divided>登录后添加到歌单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="2">
          <div>
            <el-table :data="songList" :stripe=true style="width:95%;" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
              <el-table-column type="index" label=" " :index="indexMethod"></el-table-column>
              <el-table-column label="歌曲" width=300>
                <template slot-scope="scope">
                  <router-link :to="{ path: '/user/songdetail', query: { id: scope.row.id }}">
                    <span style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</span>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column label=" " width=200>
                <template slot-scope="scope">
                  <span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle v-on:click="playSong(scope.$index)"></el-button> </span>
                  <span v-if="scope.row.Flag"> 
                    <el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handleSongCommand">
                      <el-button icon="el-icon-plus" circle></el-button>
                      <el-dropdown-menu slot="dropdown" :data="playlistList">
                        <el-dropdown-item :command='{type:"playqueue",params:scope.$index}'>播放队列</el-dropdown-item>
                        <div v-if="isLogin">
                          <el-dropdown-item divided :command='{type:"collect",params:scope.$index}'>我喜欢</el-dropdown-item>
                          <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                          <el-dropdown-item :command='{type:"newplaylist",params:scope.row}' divided>添加到新歌单</el-dropdown-item>
                        </div>
                        <el-dropdown-item v-else command="login" divided>登录后添加到歌单</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                  <span v-if="scope.row.Flag"> <el-button icon="el-icon-download" circle v-on:click="downloadSong(scope.row)"></el-button> </span>
                </template>
              </el-table-column>
              <el-table-column label="歌手" width=150>
                <template slot-scope="scope">
                  <router-link :to="{ path: '/user/artistdetail', query: { id: scope.row.artistId }}">
                    <span style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</span>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="duration" label="时长">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <p class="font_albumIntro">简介</p>
            <p id="albumIntro" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;" class="font_other">{{album.intro}}</p>
            <el-popover v-if="this.isOverflow" placement="left" title="专辑简介" trigger="click" width=500>
              <p class="font_other">{{album.intro}}</p>
              <el-button type="text" slot="reference" style="color:black" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">[更多]</el-button>
            </el-popover>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="创建歌单" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="newPlaylist" :rules="rules" ref="newPlaylist" label-width="100px">
          <el-form-item label="歌单名称" prop="name">
            <el-input v-model="newPlaylist.name" placeholder="请输入歌单名称"></el-input>
          </el-form-item>
          <el-form-item label="歌单简介" prop="intro">
            <el-input type="textarea" v-model="newPlaylist.intro" placeholder="请输入歌单简介"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">完成</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <v-foot></v-foot>
  </div>
</template>

<script>
  import vHead from '../common/header.vue'
  import vNav from '../common/navigation.vue'
  import vFoot from '../common/footer.vue'
  
  export default {
   components: {
    vHead,
    vNav,
    vFoot
  },
  data(){
    return{
      id: '',
      style: ['', 'POP 流行', 'ELECTRONIC 电子','ROCK 摇滚' ,'CLASSIC 古典','FOLK 民谣', 'R&B', '其他'],
      dialogVisible:false,
      newPlaylist: {
        id:'',
        name: '',
        intro: '',
        type:'',
        info:''
      },
      rules: {
        name: [
        { required: true, message: '请输入歌单名称', trigger: 'blur' },
        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        intro: [
        { min: 1, max: 680, message: '长度在 680 个字符以内', trigger: 'blur' }
        ]
      },
      isOverflow:'',
      isLogin:'',
      album:{},
      songList: [],
      playlistList:[],
    }
  },
  methods: {
    indexMethod(index) {
      return index+1;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done();
      })
      .catch(_ => {});
    },
    handleMouseEnter:function(row, column, cell, event){
      row.Flag=true;
    },
    handleMouseOut:function(row, column, cell, event){
      if(!row.isopen){
        row.Flag=false;}
        else{
          return false;
        }
      },
    handle:function(row,event){
        row.Flag=event;
        row.isopen=event;
      },
    handleOverflow:function(){
      var offsetHeight = document.getElementById("albumIntro").offsetHeight;  
      var scrollHeight = document.getElementById("albumIntro").scrollHeight;
      if (offsetHeight < scrollHeight) {
        this.isOverflow=true;
      }
      else{
        this.isOverflow=false;
      }
    },
    playAllSong:function(){
      this.$store.dispatch("play", [this.songList, 0, false]);
    },
    collect:function(){
      if(this.isLogin){
        this.axios.get(this.serverUrl+'/user/likeAlbum',{
          params:{
            albumId:this.album.id
          }
        })
        .then(response =>{
          if(response){
            this.state.likeAlbums.push(this.album);
            sessionStorage.setItem('likeAlbums', JSON.stringify(this.state.likeAlbums));
            this.album.isCollected=true;
            this.$message({
              showClose: true,
              message: '收藏专辑成功',
              type: 'success'
            });
          }  
          else{
            this.$message({
              showClose: true,
              message: '会话超时',
              type: 'error'
            });
          }
        })
        .catch(function(err){
          console.log(err);
        });
      }
      else{
        this.$confirm('还未登录,是否现在登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          window.location.href='/';
        }).catch(() => {
        });
      }
    },
    cancelCollect:function(){ 
      this.axios.get(this.serverUrl+'/user/unlikeAlbum',{
        params:{
          albumId:this.album.id
        }
      })
      .then(response =>{
        if(response){
          for(var i=0;i<this.state.likeAlbums.length;i++){
            if(this.state.likeAlbums[i].id==this.album.id){
              this.state.likeAlbums.splice(i,1);
              break;
            }
          }
          sessionStorage.setItem('likeAlbums', JSON.stringify(this.state.likeAlbums));
          this.album.isCollected=false;
          this.$message({
            showClose: true,
            message: '取消收藏成功',
            type: 'success'
          });
        }
        else{
          this.$message({
            showClose: true,
            message: '会话超时',
            type: 'error'
          });
        }
      })
      .catch(function(err){
        console.log(err);
      });
    },
    handleAlbumCommand:function(command){
      if(command=="login"){
        window.location.href='/';
      }
      else if(command=="newplaylist"){
        this.dialogVisible=true;
        this.newPlaylist.type="album";
        this.newPlaylist.info=this.album.id;
      }
      else if(command=="playqueue"){
        this.$store.dispatch("addToSongList", this.songList);
      }
      else{
        this.addAlbumToPlaylist(command.params);
      }
    },
    addAlbumToPlaylist:function(playlistId){
      this.axios.get(this.serverUrl+'/playlist/addAlbum',{
        params:{
          albumId:this.album.id,
          playlistId:playlistId
        }
      })
      .then(response =>{
        if(response){
          this.$message({
            showClose: true,
            message: '已成功添加到歌单',
            type: 'success'
          });
        }
        else{
          this.$message({
            showClose: true,
            message: '会话超时',
            type: 'error'
          });
        }
      })
      .catch(function(err){
        console.log(err);
      });
    },
    playSong:function(index){
      this.$store.dispatch("play", [this.songList, index, false]);
    },
    collectSong:function(index){
      this.axios.get(this.serverUrl+'/user/likeSong',{
        params:{
          songId:this.songList[index].id
        }
      })
      .then(response =>{
        if(response){
          this.state.likeSongs.push(this.songList[index]);
          sessionStorage.setItem('likeSongs', JSON.stringify(this.state.likeSongs));
          this.$message({
            showClose: true,
            message: '收藏歌曲成功',
            type: 'success'
          });
        }  
        else{
          this.$message({
            showClose: true,
            message: '会话超时',
            type: 'error'
          });
        }
      })
      .catch(function(err){
        console.log(err);
      });
    },
    handleSongCommand:function(command){
      if(command=="login"){
        window.location.href='/';
      }
      else if(command.type=="playqueue"){
        var song=this.songList[command.params];
        var songs=[song];
        this.$store.dispatch("addToSongList",songs);
      }
      else if(command.type=="collect"){
        this.collectSong(command.params);
      }
      else if(command.type=="newplaylist"){
        this.dialogVisible=true;
        this.newPlaylist.type="song";
        this.newPlaylist.info=command.params.id;
      }
      else{
        this.addSongToPlaylist(command.param2.id,command.param1);
      }
    },
    addSongToPlaylist:function(songId,playlistId){
      this.axios.get(this.serverUrl+'/playlist/addSong',{
        params:{
          songId:songId,
          playlistId:playlistId
        }
      })
      .then(response =>{
        if(response){
          this.$message({
            showClose: true,
            message: '已成功添加到歌单',
            type: 'success'
          });
        }
        else{
          this.$message({
            showClose: true,
            message: '会话超时',
            type: 'error'
          });
        }
      })
      .catch(function(err){
        console.log(err);
      });
    },
    submitForm:function(){
      this.$refs["newPlaylist"].validate((valid) => {
        if (valid) {
          this.axios.post(this.serverUrl+'/playlist/create',{
            name:this.newPlaylist.name,
            intro:this.newPlaylist.intro
          })
          .then(response =>{
            if(response.data!=-1){
              var thisPlaylist={id:response.data,name:this.newPlaylist.name,intro:this.newPlaylist.intro};
              this.state.playlistList.push(thisPlaylist);
              sessionStorage.setItem('playlistList', JSON.stringify(this.state.playlistList));
              this.dialogVisible=false;
              this.$refs["newPlaylist"].resetFields();
              this.$message({
                showClose: true,
                message: '歌单创建成功',
                type: 'success'
              });
              if(this.newPlaylist.type=="album"){
                this.addAlbumToPlaylist(response.data);
              }
              else{
                this.addSongToPlaylist(this.newPlaylist.info,response.data);
              }
            }
            else{
              this.$message({
                showClose: true,
                message: '会话超时',
                type: 'error'
              });
            }
          })
          .catch(function(err){
            console.log(err);
          });
        } 
        else {
          this.$message({
            showClose: true,
            message: '格式不正确',
            type: 'error'
          });
          return false;
        }
      });
    },
    downloadSong:function(row){
      if(this.isLogin){
        window.location.href = this.serverUrl + "/download/downloadSong?id=" + row.id;
      }
      else{
        this.$confirm('还未登录,是否现在登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          window.location.href='/';
        }).catch(() => {
        });
      }
    },
    timestampToTime: function(timestamp) {
      var date = new Date(timestamp);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate();
      if(D < 10) D = '0' + D;
      return Y+M+D;
    },
    getAlbumInfo:function(){
      this.axios.get(this.serverUrl+'/album/getInfo',{
        params:{
          id:this.album.id
        }
      })
      .then(response => {
        this.album = response.data;
        if(this.album.image==null){
          this.album.image=require('../../../assets/暂无图片.png');
        }
        else{
          this.album.image = this.serverUrl + this.album.image;
        }
        this.album.releaseDate = this.timestampToTime(this.album.releaseDate);
        this.album.style = this.style[this.album.style];
        this.songList = this.album.songList;
        for(var i = 0; i < this.songList.length; i++){
          if(this.songList[i].image==null){
            this.songList[i].image=require('../../../assets/暂无图片.png');
          }
          else{
            this.songList[i].image=this.serverUrl+this.songList[i].image;
          }
          this.songList[i].filePath=this.serverUrl+this.songList[i].filePath;
          this.songList[i].lyricsPath=this.serverUrl+this.songList[i].lyricsPath;
          this.$set(this.songList[i],'Flag',false);
          this.$set(this.songList[i],'isopen',false);
        }
        this.$set(this.album,'isCollected',false);
        if(this.isLogin){
          this.getIsCollected();
          this.getPlaylistList();
        }
      })
      .catch(function(err){
        console.log(err);
      });
    },
    getPlaylistList:function(){
      if(this.isLogin){
        this.playlistList=this.state.playlistList;
      }
      else{
        return false;
      }
    },
    getIsCollected:function(){
      var flag=false;
      for(var i=0;i<this.state.likeAlbums.length;i++){
        if(this.album.id==this.state.likeAlbums[i].id){
          flag=true;
          break;
        }
      }
      this.album.isCollected=flag;
    },
  },
  created(){
    this.album.id=this.$route.query.id;
    window.scrollTo(0,0);
  },
  computed:{
    serverUrl(){
      return this.$store.state.serverUrl;
    },
    state(){
      return this.$store.state;
    }
  },
  mounted(){
    this.isLogin=this.state.isLogin;
    this.getAlbumInfo();
  },
  updated: function (){
    this.handleOverflow();
  }
}
</script>


<style>
#albumdetail{
  padding: 0px 30px;
}
.spHeight td{
  height:70px;
}
.el-popover{
  width:550px;
}
.font_albumName{
  font-family:"Microsoft YaHei";
  font-size:xx-large;
}
.font_albumArtistName{
  font-family:"Hiragino Sans GB";
  font-size:x-large;
}
.font_albumIntro{
  font-family:"Hiragino Sans GB";
  font-size:x-large;
}
.font_other{
  font-family:"Hiragino Sans GB";
  font-size:Medium;
}
a {
 text-decoration:none;
 out-line: none;
}
</style>
