<template>
    <div>
        <v-header></v-header>
    <div class="playlistDetail" :data="playlist">
        <el-row>
            <div class="playlistInfo">
                <el-col :span="5" :offset="4">
                    <div>
                        <img style="width:230px;height:230px;margin-top:20px;" :src="playlist.image" onerror="this.style.display='none'">
                    </div>
                </el-col>
                <el-col :span="10">
                    <div>
                        <h2>{{playlist.name}}</h2>
                        <div class="intro">
                            <p>简介</p>
                            <p id="playlistIntro">{{playlist.intro}}</p>
                            <el-popover v-if="isOverflow" placement="left" title="歌单简介" trigger="click">
                            <p>{{playlist.intro}}</p>
                            <el-button type="text" slot="reference" style="color:black">[更多]</el-button>
                            </el-popover>
                        </div>  

                        <el-button class="btn2" type="primary" icon="el-icon-caret-right" v-on:click="playAllSong">播放全部</el-button>

                        <el-popover
                        ref=""
                        placement="right" width="500"
                        trigger="click">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                <el-form-item label="歌单名称" prop="name">
                                    <el-input v-model="ruleForm.name" placeholder="请输入歌单名称"></el-input>
                                </el-form-item>
                                <el-form-item label="歌单简介" prop="intro">
                                    <el-input type="textarea" v-model="ruleForm.intro" placeholder="请输入歌单简介"></el-input>
                                </el-form-item>
                                <el-form-item label="上传图片" prop="image">
                                    <el-upload
                                    ref="uploadImage"
                                    action="http://192.168.20.99:8080/hifive/upload/uploadPlaylistImage"
                                    list-type="picture-card"
                                    :show-file-list="false"
                                    :data={id:ruleForm.id} 
                                    :on-change="editImage"                    
                                    :before-upload="beforeAvatarUpload">
                                    <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="ruleForm.image" alt="">
                                    </el-dialog>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
                                    <el-button @click="dialogVisible=false">取消</el-button>
                                </el-form-item>
                            </el-form>

                            <el-button class="btn2" slot="reference">编辑歌单</el-button>
                        </el-popover>

                        <el-dropdown trigger="click" @command="handlePlaylistCommand">
                        <el-button class="btn2" icon="el-icon-plus">添加到<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown" :data="playlistList">
                                <el-dropdown-item command="playqueue" @click.native ="addAllToSongList()">播放队列</el-dropdown-item>
                                <div v-if="isLogin">
                                    <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" 
                                    :command='{type:"playlist",params:playlist.id}'>{{playlist.name}}</el-dropdown-item>
                                    <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                                </div>
                                <el-dropdown-item v-else command="login" divided>登录后添加到歌单</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
            </div>
        </el-row>
        <el-row>
            <el-col :span="15.5" :offset="4">
            <div class="playlistSongList">
                <el-table :data="songsView" 
                max-height="1350"
                @cell-mouse-enter="handleMouseEnter" 
                @cell-mouse-leave="handleMouseOut"               
                class="songTable">
                <el-table-column type="index" label=" " :index="indexMethod"></el-table-column>
                <el-table-column label="歌曲" width="200">
                    <template slot-scope="scope">
                    <router-link :to="{ path: '/user/songdetail', query: {id:playlistSongList[scope.$index].id}}">
                        <el-button type="text" style="color:black;cursor:pointer;text-decoration:none" 
                        onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</el-button>
                    </router-link>
                    </template>
                </el-table-column>
                <el-table-column label=" " width="200" type="index">
                    <template slot-scope="scope">
                    <span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle 
                    v-on:click="playSong(scope.$index)"></el-button> </span>
                    <span v-if="scope.row.Flag"> 
                        <el-dropdown trigger="click" placement="bottom-start" 
                        @visible-change="handle(scope.row,$event)" @command="handleSongCommand">
                        <el-button icon="el-icon-plus" circle></el-button>
                        <el-dropdown-menu slot="dropdown" :data="playlistList">
                            <el-dropdown-item command="playqueue" @click.native ="addToSongList(scope.$index)">播放队列</el-dropdown-item>
                            <div v-if="isLogin">
                            <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                            <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" 
                            :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                            <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                            </div>
                            <el-dropdown-item v-else command="login" divided>登录后添加到歌单</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </span>
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
                    <span v-if="scope.row.Flag"> <el-button icon="el-icon-download" circle 
                    v-on:click="downloadSong(scope.row)"></el-button> </span>
                    </template>
                </el-table-column>
                <el-table-column label="歌手" width="140">
                    <template slot-scope="scope">
                    <router-link :to="{ path: '/user/artistdetail', query: {id:playlistSongList[scope.$index].artistId }}">
                        <el-button type="text" style="color:black;cursor:pointer;text-decoration:none"
                        onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</el-button>
                    </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="专辑" width="160">
                    <template slot-scope="scope">
                    <router-link :to="{ path: '/user/albumdetail', query: { id: scope.row.albumId }}">
                        <el-button type="text" style="color:black;cursor:pointer;text-decoration:none"
                        onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.albumName}}</el-button>
                    </router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="duration" label="时长" width="60">                                   
                </el-table-column>
                <el-table-column width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.Flag">
                            <el-button @click="deleteSong" icon="el-icon-delete" circle></el-button>
                        </span>
                    </template>
                </el-table-column>
                </el-table>
                <br>

                <br>
            </div>
        </el-col>
        </el-row>
        <el-row>
            <el-col :span="16" :offset="4">
                <el-pagination class="pagination" :page-count="pageCount" 
                layout="prev, pager, next" 
                @current-change="handleChange"></el-pagination>
            </el-col>
        </el-row>
    </div>

        <v-foot></v-foot>
    </div>
</template>
    
<script>
  import vHeader from "../common/header.vue";
  import vNav from "../common/navigation.vue";
  import vFoot from "../common/footer.vue";
  import emptyImage from '../../../assets/暂无图片.png'
export default {
   components: {
      vHeader,
      vFoot
    },
    data(){
        return{
            id:'',
            playlist:{},
            index:1,
            songsView:[],
            playlistSongList: [],
            isOverflow:'',
            dialogVisible:false,
            dialogImageUrl: '',
            notDelete:false,
            page: 1,
            pageCount: 1,
            rules: {
                name: [
                { required: true, message: '请输入歌单名称', trigger: 'blur' },
                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                intro: [
                { min: 1, max: 140, message: '长度在 140 个字符以内', trigger: 'blur' }
                ]
            },
            newPlaylist: {
                id:'',
                name: '',
                intro: '',
                type:'',
                info:''
            },
            ruleForm: {
                id: '',
                name: '',
                intro: '',
                image:'',
            },
            playlistList:[],
        }
    },
    computed: {
      serverUrl() {
        return this.$store.state.serverUrl;
      },
      isLogin(){
        return this.$store.state.isLogin;
      }
    },
    created() {
      window.scrollTo(0,0);
      this.id = this.$route.query.id;
    },
    mounted() {
        this.getPlaylistIntro();
        this.handleOverflow();
        this.pagination(1);
        this.computePageCount();
        
    },
    methods: {
        indexMethod(index) {
            return (this.page - 1)* 20 + index + 1;
        },
        handleOverflow:function(){
          var offsetWidth = document.getElementById("playlistIntro").offsetHeight;  
          var scrollWidth = document.getElementById("playlistIntro").scrollHeight;
          if (offsetWidth < scrollWidth) {
            this.isOverflow=true;
          }
          else{
            this.isOverflow=false;
          }
        },
        playAllSong:function(){
            //传递歌曲id给player
            this.$store.dispatch("play", [this.playlistSongList, 0, false]);
        },
        handlePlaylistCommand:function(command){
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
            this.axios.get(this.serverUrl+'/playlist/addPlaylist',{
              params:{
                fromId:this.playlist.id,
                toId:command.params
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
                this.axios.get(this.serverUrl+'/playlist/addSong',{
                params:{
                    songId:command.param2.id,
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
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
            done();
            })
            .catch(_ => {});
        },
        downloadSong:function(row){
            if(this.isLogin){
                this.axios.get(this.serverUrl+'/download/downloadSong',{
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
        getPlaylistList:function(){
            if(this.isLogin){
                this.playlistList=this.state.playlistList;
            }
            else{
                return false;
            }
        },
        getPlaylistIntro: function(){
          this.axios.get(this.serverUrl+'/playlist/getInfo',{
                params:{
                  id:this.id
                }
              })
              .then(response => {
                console.log(response.data);
                this.playlist = response.data;
                if(this.playlist.image == null){
                    this.playlist.image = emptyImage;
                } else {
                    this.playlist.image = this.serverUrl + this.playlist.image;
                }
                
                this.playlistSongList = this.playlist.songList;
                for(var i = 0; i < this.playlistSongList.length; i++){
                    this.playlistSongList[i].filePath = this.serverUrl + this.playlistSongList[i].filePath;
                    this.playlistSongList[i].image = this.serverUrl + this.playlistSongList[i].image;
                    this.playlistSongList[i].lyricsPath = this.serverUrl + this.playlistSongList[i].lyricsPath;
                    this.$set(this.playlistSongList[i],'Flag',false);
                    this.$set(this.playlistSongList[i],'isopen',false);
                }
                this.computePageCount();
                this.pagination(1);
              })
              .catch(function(err){
                console.log(err);
              });
        },
        submitForm:function(){
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            this.$refs.uploadImage.submit();
            this.axios.post(this.serverUrl+'/playlist/modifyInfo',{
              id:this.ruleForm.id,
              name:this.ruleForm.name,
              intro:this.ruleForm.intro,
            })
            .then(response =>{
              if(response){
                this.getPlaylistInfo();
                this.editDialogVisible=false;
                this.$message({
                  showClose: true,
                  message: '歌单编辑成功',
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
        handleChange: function(val){
            if(val != this.page){
                this.pagination(val);
            }
        },
        pagination: function(_page){
            this.page = _page;
            this.songsView.splice(0,this.songsView.length);
            for(var i = 0; i < 20; i++){
                if(this.playlistSongList[((_page - 1)*20) + i] == null){
                } else {
                    var _songList = this.playlistSongList[((_page - 1)*20) + i];
                    this.songsView.push(_songList);
                }
            }
            
        },
        computePageCount: function(){
            this.pageCount = Math.ceil(parseFloat(this.playlistSongList.length) / 20);
        },
        addAllToSongList: function(){
            this.$store.dispatch("addToSongList", this.playlistSongList);
        },
        addToSongList: function(index){
            index = (this.page - 1) * 20 + index;
            console.log(this.playlistSongList);
            var song = this.playlistSongList[index];
            var songId = song.id;
            if(this.$store.state.songList.length == 0){
                this.$store.state.songList = [];
                this.$store.state.songList.push(song);
                this.$store.state.currentSong = song;
                this.$store.state.currentIndex = 0;
            } else if(this.$store.state.currentSong.id != songId){
                for(var i = 0; i < this.$store.state.songList.length; i++){
                    if(this.$store.state.songList[i].id == songId){
                        this.$store.state.songList.splice(i, 1);
                        if(i < this.$store.state.currentIndex)
                            this.$store.state.currentIndex=this.$store.state.currentIndex-1;
                        break;
                    }
                }
                this.$store.state.songList.push(song);
            }
        },
        playSong:function(index){
            //传递歌曲ID给player.vue
            index = (this.page - 1) * 20 + index;

            this.$store.state.songList = [];
            for(var i = 0; i < this.playlistSongList.length; i++){
                this.$store.state.songList.push(this.playlistSongList[i]);
            }
            this.$store.state.currentSong = this.playlistSongList[index];
            this.$store.state.currentIndex = index;
        },
        deleteSong:function(){
        this.axios.get(this.serverUrl+'/playlist/removeSong',{
              songId:this.song.id,
              playlistId: this.playlist.id,
            })
            .then(response =>{
              if(response){
                this.$message({
                  showClose: true,
                  message: '歌曲删除成功',
                  type: 'success'
                });
                this.$router.go(-1);
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
        //上传图片
        editImage:function(file,){
            this.ruleForm.image=file.url;
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
            this.$message.error('上传歌单封面大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        createPlaylist: function(){
            this.$refs["newPlaylist"].validate((valid) => {
                if (valid) {
                    this.axios.post(this.serverUrl+'/playlist/create',{
                        name:this.newPlaylist.name,
                        intro:this.newPlaylist.intro
                    })
                    .then(response =>{
                        if(response.data != -1){
                            var thisPlaylist={id:response.data,name:this.newPlaylist.name,intro:this.newPlaylist.intro};
                            this.state.playlistList.push(thisPlaylist);
                            this.getMyPlaylist();
                            this.playlistPaginationChange(Math.floor((this.allPlaylist.length-1)/10)+1);
                            this.dialogVisible=false;
                            this.$refs["newPlaylist"].resetFields();
                            this.$message({
                                showClose: true,
                                message: '歌单创建成功',
                                type: 'success'
                            });
                            if(this.newPlaylist.type==''){
                                return false;
                            }
                            else if(this.newPlaylist.type=="song"){
                                this.addSongToPlaylist(this.newPlaylist.info,response.data);
                            }
                            else if(this.newPlaylist.type=="album"){
                                this.addAlbumToPlaylist(this.newPlaylist.info,response.data);
                            }
                            else{
                                this.addPlaylistToPlaylist(this.newPlaylist.info,response.data);
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
        }
    }

}
</script>

<style scoped>
el-row{
    width: 1000px;
}

.playlistDetail{
    /*width:90%;*/
    height:100%;
    /*margin-left: 100px;*/
}

#playlistIntro{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}
.songTable{
    /*width:100%;*/
    /*margin-left:132px;*/
    overflow:hidden;
}
.btn2{
    margin-top:60px;
    height:45px;
    width:120px;
    text-align:center;
    margin-right:20px;
}
.pagination {
    font-size: 30px;
    padding-left:-300px;
}
.el-popover{
  width:550px;
  height:400px;
  word-wrap: break-word; 
  word-break: normal; 
  overflow-x:hidden;
  overflow-y:scroll;
}
</style>
