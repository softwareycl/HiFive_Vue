<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-nav></v-nav>
    <div id="albumdetail" :data="album">
      <el-row :gutter="50">
        <el-col :span="4" :offset="4">
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
      <el-row :gutter="50">
        <el-col :span="13" :offset="3">
          <div>
            <el-table :data="songList" :stripe=true style="height:600px;width: 100%;" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
              <el-table-column type="index" label=" " :index="indexMethod"></el-table-column>
              <el-table-column label="歌曲">
                <template slot-scope="scope">
                  <router-link :to="{ path: '/user/songdetail', query: { id: scope.row.id }}">
                    <p style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</p>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column label=" ">
                <template slot-scope="scope">
                  <span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle v-on:click="playSong(scope.row)"></el-button> </span>
                  <span v-if="scope.row.Flag"> 
                    <el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handleSongCommand">
                      <el-button icon="el-icon-plus" circle></el-button>
                      <el-dropdown-menu slot="dropdown" :data="playlistList">
                        <el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
                        <div v-if="isLogin">
                          <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                          <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                          <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                        </div>
                        <el-dropdown-item v-else command="login" divided>登录后添加到歌单</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </span>
                  <el-dialog title="创建歌单" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="歌单名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入歌单名称"></el-input>
                      </el-form-item>
                      <el-form-item label="歌单简介" prop="intro">
                        <el-input type="textarea" v-model="ruleForm.intro" placeholder="请输入歌单简介"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
                        <el-button @click="dialogVisible=false">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                  <span v-if="scope.row.Flag"> <el-button icon="el-icon-download" circle v-on:click="downloadSong(scope.row)"></el-button> </span>
                </template>
              </el-table-column>
              <el-table-column label="歌手">
                <template slot-scope="scope">
                  <router-link :to="{ path: '/user/artistdetail', query: { id: scope.row.artistId }}">
                    <p style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</p>
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
            <el-popover v-if="isOverflow" placement="left" title="专辑简介" trigger="click">
              <p class="font_other">{{album.intro}}</p>
              <el-button type="text" slot="reference" style="color:black" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">[更多]</el-button>
            </el-popover>
          </div>
        </el-col>
      </el-row>
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
        style: ['', 'POP 流行', 'ROCK 摇滚', 'FOLK 民谣', 'ELECTRONIC 电子', 'LIGHT 轻音乐', 'RAP RAP', 'COUNTRY 乡村','DANCE 舞曲', '其他'],
        dialogVisible:false,
        ruleForm: {
          name: '',
          intro: ''
        },
        rules: {
          name: [
          { required: true, message: '请输入歌单名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          intro: [
          { min: 1, max: 140, message: '长度在 140 个字符以内', trigger: 'blur' }
          ]
        },
        isOverflow:'',
        isLogin:false,
        album:{
          artistName:'111',
        },
        songList: [{
          name:'111',
          artistName:'111',
        }],
        playlistList:[{
          id:'1',
          name:'1',
          count:'',
        },
        {
          id:'2',
          name:'2',
          count:'',
        },
        {
          id:'3',
          name:'3',
          count:'',
        }]
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
        playAllSong:function(){
          //传递歌曲id给player
        },
        collect:function(){
          if(this.isLogin){
            this.axios.get('',{
              params:{
                id:this.album.id
              }
            })
            .then(response =>{
              if(response){
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
            //询问是否要登录
            this.$confirm('还未登录,是否现在登录?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              window.location.href='/';
            }).catch(() => {
            });
          }
        },
        cancelCollect:function(albumId){ 
          this.axios.get('',{
            params:{
              id:this.album.id
            }
          })
          .then(response =>{
            if(response){
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
          }
          else if(command=="playqueue"){
            //传递所有歌曲id给player.vue
          }
          else{
            this.axios.get('',{
              params:{
                id:this.album.id,
                playlistId:command.params
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
          }
        },
        playSong:function(row){
          //传递歌曲id给player.vue
        },
        handleSongCommand:function(command){
          if(command=="login"){
            window.location.href='/';
          }
          else if(command=="newplaylist"){
            this.dialogVisible=true;
          }
          else if(command=="playqueue"){
            //传递歌曲id给player.vue
          }
          else{
            this.axios.get('',{
              params:{
                id:command.param2.id,
                playlistId:command.param1
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
          }
        },
        submitForm:function(formname){
          this.$refs[formname].validate((valid) => {
            if (valid) {
              this.axios.get('',{
                params:{
                  playlist:{

                  }
                }
              })
              .then(response =>{
                if(response){
                  this.getPlaylistList();
                  this.$message({
                    showClose: true,
                    message: '已成功添加到新歌单',
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
              this.dialogVisible=false;
              this.$refs[formname].resetFields();
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
            this.axios.get('',{
              params:{
                id:row.id
              }
            })
            .then(response =>{
              if(response){
                this.$message({
                  showClose: true,
                  message: '下载成功',
                  type: 'success'
                });
              }
              else{
                this.$message({
                  showClose: true,
                  message: '下载失败',
                  type: 'error'
                });
              }
            })
            .catch(function(err){
              console.log(err);
            });
          }
          else{
            //询问要不要登录
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
          var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate();
          if(D < 10) D = '0' + D;
          return Y+M+D;
        },
        getAlbumInfo:function(albumId){
          this.axios.get(this.serverUrl+'/album/getInfo',{
                params:{
                  id:albumId
                }
              })
              .then(response => {
                console.log(response.data);
                this.album = response.data;
                this.album.image = this.serverUrl + this.album.image;
                this.album.releaseDate = this.timestampToTime(this.album.releaseDate);
                this.album.style = this.style[this.album.style];
                this.songList = this.album.songList;
                for(var i = 0; i < this.songList.length; i++){
                  this.$set(this.songList[i],'Flag',false);
                  this.$set(this.songList[i],'isopen',false);
                }
                this.$set(this.album,'isCollected',false);
              })
              .catch(function(err){
                console.log(err);
              });
        },
        getPlaylistList:function(){
          this.axios.get('',{
            params:{
            }
          })
          .then(response =>{

          })
          .catch(function(err){
            console.log(err);
          });
        },
        handleOverflow:function(){
          var offsetWidth = document.getElementById("albumIntro").offsetHeight;  
          var scrollWidth = document.getElementById("albumIntro").scrollHeight;
          if (offsetWidth < scrollWidth) {
            this.isOverflow=true;
          }
          else{
            this.isOverflow=false;
          }
        }
      },
      created(){
        this.id=this.$route.query.id;
      },
      computed:{
        serverUrl(){
          return this.$store.state.serverUrl;
        }
      },
      mounted(){
        this.getAlbumInfo(this.id);
        this.handleOverflow();
        this.getPlaylistList();
      }
}
</script>
<style>
#albumdetail{
  padding: 30px;
}
.spHeight td{
  height:65px;
}
.el-popover{
  width:550px;
  height:400px;
  word-wrap: break-word; 
  word-break: normal; 
  overflow-x:hidden;
  overflow-y:scroll;
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
