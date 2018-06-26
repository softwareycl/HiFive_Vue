<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-nav></v-nav>
        <div style="width:100%;height:1500px;">
            <div :data="user" class="background" :style="background">
                <img src="../../../assets/周杰伦.jpg" class="userImage">
            	<p align=center style="font-size: x-large;color:white;">{{user.name}}</p>
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
                <el-tabs value="1" style="width:90%;position:relative;left:5%;bottom:-27px;">
                    <el-tab-pane name="1">
                        <span class="tab1" slot="label">我喜欢</span>
                        <el-tabs value="1" style="width:100%;">
                            <el-tab-pane  name="1">
                                <span class="tab2" slot="label">歌曲{{songList.length}}</span>
                                <div>
                                    <el-button type="primary" icon="el-icon-caret-right" style="background-color:#31C27C;margin-top:30px;" onmouseover="this.style.backgroundColor='#2CAF6F';" onmouseout="this.style.backgroundColor='#31C27C';" v-on:click="playAllSong">播放全部</el-button>
                                    <el-dropdown trigger="click" @command="handleCommand">
                                        <el-button icon="el-icon-plus">添加到<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                                        <el-dropdown-menu slot="dropdown" :data="playlistList">
                                            <el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
                                            <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                                            <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",params:playlist.id}'>{{playlist.name}}</el-dropdown-item>
                                            <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    <el-table :data="songList" :stripe=true style="width:100%;margin-top: 10px;" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
                                        <el-table-column label="歌曲">
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/songdetail', query: { id: scope.row.id }}">
                                                    <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</span>
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
                                                            <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                                                            <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                                                            <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                                                        </el-dropdown-menu>
                                                    </el-dropdown>
                                                </span>
                                                <span v-if="scope.row.Flag"> <el-button icon="el-icon-download" circle v-on:click="downloadSong(scope.row)"></el-button></span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="歌手">
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/artistdetail', query: { id: scope.row.artistId }}">
                                                    <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</span>
                                                </router-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="专辑">
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/albumdetail', query: { id: scope.row.albumId }}">
                                                    <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.albumName}}</span>
                                                </router-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="时长">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.Flag"><el-button icon="el-icon-delete" circle v-on:click="deleteSong(scope.row)"></el-button></span>
                                                <span v-else class="font_other">{{scope.row.duration}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination align=center layout="prev, pager, next" :total="songList.length" @current-change="songPaginationChange"></el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane name="2">
                                <span class="tab2" slot="label">专辑{{albumList.length}}</span>
                                <div>
                                    <el-table :data="albumList" :stripe=true style="width: 100%;margin-top:30px;" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">    <el-table-column label="专辑">
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/songdetail', query: { id: scope.row.id }}">
                                                    <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</span>
                                                </router-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label=" ">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle v-on:click="playAlbum(scope.row)"></el-button></span>
                                                <span v-if="scope.row.Flag"> 
                                                    <el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handleAlbumCommand">
                                                        <el-button icon="el-icon-plus" circle></el-button>
                                                        <el-dropdown-menu slot="dropdown" :data="playlistList">
                                                            <el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
                                                            <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                                                            <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                                                            <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                                                        </el-dropdown-menu>
                                                    </el-dropdown>
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="曲目数">
                                            <template slot-scope="scope">
                                                    <span class="font_other">{{scope.row.count}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="歌手">
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/albumdetail', query: { id: scope.row.albumId }}">
                                                    <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</span>
                                                </router-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="发行时间">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.Flag"><el-button icon="el-icon-delete" circle v-on:click="deleteAlbum(scope.row)"></el-button></span>
                                                <span v-else class="font_other">{{scope.row.releaseDate}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination align=center layout="prev, pager, next" :total="albumList.length" @current-change="albumPaginationChange"></el-pagination>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane name="2">
                        <span class="tab1" slot="label">我创建的歌单</span>
                        <div>
                           <el-button icon="el-icon-plus" style="margin-top:10px;" v-on:click="dialogVisible=true">新建歌单</el-button>
                           <el-table :data="playlistList" :stripe=true style="width: 100%;margin-top:10px;" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">    
                            <el-table-column label="歌单">
                                <template slot-scope="scope">
                                    <router-link :to="{ path: '/user/songdetail', query: { id: scope.row.id }}">
                                        <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</span>
                                    </router-link>
                                </template>
                            </el-table-column>
                            <el-table-column label=" ">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle v-on:click="playPlaylist(scope.row)"></el-button></span>
                                    <span v-if="scope.row.Flag"> 
                                        <el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handlePlaylistCommand">
                                            <el-button icon="el-icon-plus" circle></el-button>
                                            <el-dropdown-menu slot="dropdown" :data="playlistList">
                                                <el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
                                                <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                                                <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                                                <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="曲目数">
                                <template slot-scope="scope">
                                    <span class="font_other">{{scope.row.count}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label=" ">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.Flag"><el-button icon="el-icon-delete" circle v-on:click="deletePlaylist(scope.row)"></el-button></span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination align=center layout="prev, pager, next" :total="playlistList.length" @current-change="playlistPaginationChange"></el-pagination>
                    </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
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
            background:{
            backgroundImage: "url(" + require("../../../assets/我的音乐.jpg") + ")",
            backgroundRepeat: "no-repeat",
            },
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
            user:{
                name:'周杰伦',
                image:'',
            },
            songList:[{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                albumName:'333',
                duration:'444',
                Flag:false,
                isopen:false,
            },],
            albumList:[{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                artistName:'222',
                count:'333',
                releaseDate:'444',
                Flag:false,
                isopen:false,
            },],
            playlistList:[{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },{
                name:'111',
                count:'111',
                Flag:false,
                isopen:false,
            },],
        }
    },
    methods:{
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
        switchTab1:function(tab){

        },
        switchTab2:function(tab){

        },
        playAllSong:function(){

        },
        handleCommand:function(command){
          if(command=="newplaylist"){
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
        playSong:function(){

        },
        handleSongCommand:function(command){
          if(command=="newplaylist"){
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
        downloadSong:function(){

        },
        deleteSong:function(){

        },
        playAlbum:function(){

        },
        handleAlbumCommand:function(command){
          if(command=="newplaylist"){
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
        deleteAlbum:function(){
        
        },
        playPlaylist:function(){

        },
        handlePlaylistCommand:function(command){
          if(command=="newplaylist"){
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
        deletePlaylist:function(){

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
        getMyMusic:function(){
            
        },
        songPaginationChange:function(){

        },
        albumPaginationChange:function(){

        },
        playlistPaginationChange:function(){

        },
    },
}
</script>

<style>
.spHeight td{
  height:65px;
}
.background{
	width:100%;
	height:382px;
}
.userImage{
    width:150px;
    height:150px;
	border-radius:100%;
	margin-top:80px;
	margin-left:45%;
}
.tab1{
    color:white;
    font-size: large;
}
.tab2{
    color:black;
    font-size: large;
}
.font_link{
    color:black;
    cursor:pointer;
}
.font_other{
    color:black;
}
a {
     text-decoration:none;
     out-line: none;
  }
</style>