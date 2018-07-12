<template>
    <div class="wrapper">
        <v-head></v-head>
            <div :data="user" class="background" :style="background">
                <div style="width:100%;height:315px;">
                    <img :src="state.user.image" class="userImage">
                    <p align=center style="font-size: x-large;color:white;">{{user.name}}</p>
                </div>
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
                <el-tabs style="width:90%;position:relative;left:5%;bottom:-27px;">
                    <el-tab-pane>
                        <span class="tab1" slot="label">我喜欢</span>
                        <el-tabs style="width:100%;">
                            <el-tab-pane>
                                <span class="tab2" slot="label">歌曲 {{allSong.length}}</span>
                                <div>
                                    <el-button type="primary" icon="el-icon-caret-right" style="background-color:#31C27C;margin-top:30px;" onmouseover="this.style.backgroundColor='#2CAF6F';" onmouseout="this.style.backgroundColor='#31C27C';" v-on:click="playAllSong">播放全部</el-button>
                                    <el-table :data="songList" :stripe=true style="width:100%;margin-top: 10px;" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
                                        <el-table-column label="歌曲" width=60>
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/songdetail', query: { id: scope.row.id }}">
                                                    <img :src=scope.row.image class="smallImage">
                                                </router-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label=" " width=350>
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/songdetail', query: { id: scope.row.id }}">
                                                    <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</span>
                                                </router-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label=" " width=200>
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle v-on:click="playSong(scope.$index)"></el-button> </span>
                                                <span v-if="scope.row.Flag"> 
                                                    <el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handleSongCommand">
                                                        <el-button icon="el-icon-plus" circle></el-button>
                                                        <el-dropdown-menu slot="dropdown" :data="allPlaylist">
                                                            <el-dropdown-item :command='{type:"playqueue",params:scope.$index}'>播放队列</el-dropdown-item>
                                                            <el-dropdown-item v-for="playlist in allPlaylist" :key="playlist.id" :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                                                            <el-dropdown-item :command='{type:"newplaylist",params:scope.row}' divided>添加到新歌单</el-dropdown-item>
                                                        </el-dropdown-menu>
                                                    </el-dropdown>
                                                </span>
                                                <span v-if="scope.row.Flag"> <el-button icon="el-icon-download" circle v-on:click="downloadSong(scope.row)"></el-button></span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="歌手" width=240>
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/artistdetail', query: { id: scope.row.artistId }}">
                                                    <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</span>
                                                </router-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="专辑" width=240>
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/albumdetail', query: { id: scope.row.albumId }}">
                                                    <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.albumName}}</span>
                                                </router-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="时长">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.Flag"><el-button icon="el-icon-delete" circle v-on:click="deleteSong(scope.row,scope.$index)"></el-button></span>
                                                <span v-else class="font_other">{{scope.row.duration}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination v-if="allSong.length>10" :current-page.sync=currentPageOfSong align=center layout="prev, pager, next" :total="allSong.length" @current-change="songPaginationChange"></el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane>
                                <span class="tab2" slot="label">专辑 {{allAlbum.length}}</span>
                                <div>
                                    <el-table :data="albumList" :stripe=true style="width: 100%;margin-top:30px;" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
                                        <el-table-column label="专辑" width=60>
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/albumdetail', query: { id: scope.row.id }}">
                                                    <img :src=scope.row.image class="smallImage">
                                                </router-link>
                                            </template>
                                        </el-table-column>    
                                        <el-table-column label=" ">
                                            <template slot-scope="scope" width=350>
                                                <router-link :to="{ path: '/user/albumdetail', query: { id: scope.row.id }}">
                                                    <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</span>
                                                </router-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label=" " width=200>
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle v-on:click="playAlbum(scope.row)"></el-button></span>
                                                <span v-if="scope.row.Flag"> 
                                                    <el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handleAlbumCommand">
                                                        <el-button icon="el-icon-plus" circle></el-button>
                                                        <el-dropdown-menu slot="dropdown" :data="allPlaylist">
                                                            <el-dropdown-item :command='{type:"playqueue",params:scope.row}'>播放队列</el-dropdown-item>
                                                            <el-dropdown-item v-for="playlist in allPlaylist" :key="playlist.id" :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                                                            <el-dropdown-item :command='{type:"newplaylist",params:scope.row}' divided>添加到新歌单</el-dropdown-item>
                                                        </el-dropdown-menu>
                                                    </el-dropdown>
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="曲目数" width=240>
                                            <template slot-scope="scope">
                                                <span class="font_other">{{scope.row.count}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="歌手" width=240>
                                            <template slot-scope="scope">
                                                <router-link :to="{ path: '/user/artistdetail', query: { id: scope.row.artistId }}">
                                                    <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</span>
                                                </router-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="发行时间">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.Flag"><el-button icon="el-icon-delete" circle v-on:click="deleteAlbum(scope.row,scope.$index)"></el-button></span>
                                                <span v-else class="font_other">{{scope.row.releaseDate}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination v-if="allAlbum.length>10" :current-page.sync=currentPageOfAlbum align=center layout="prev, pager, next" :total="allAlbum.length" @current-change="albumPaginationChange"></el-pagination>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span class="tab1" slot="label">我创建的歌单</span>
                        <div>
                            <el-button icon="el-icon-plus" style="margin-top:10px;" v-on:click="dialogVisible=true">新建歌单</el-button>
                            <el-table :data="playlistList" :stripe=true style="width: 100%;margin-top:10px;" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
                                <el-table-column label="歌单" width=60>
                                    <template slot-scope="scope">
                                        <router-link :to="{ path: '/user/playlistdetail', query: { id: scope.row.id }}">
                                            <img :src=scope.row.image class="smallImage">
                                        </router-link>
                                    </template>
                                </el-table-column>    
                                <el-table-column label=" " width=400>
                                    <template slot-scope="scope">
                                        <router-link :to="{ path: '/user/playlistdetail', query: { id: scope.row.id }}">
                                            <span class="font_link" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</span>
                                        </router-link>
                                    </template>
                                </el-table-column>
                                <el-table-column label=" " width=200>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle v-on:click="playPlaylist(scope.row)"></el-button></span>
                                        <span v-if="scope.row.Flag"> 
                                            <el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handlePlaylistCommand">
                                                <el-button icon="el-icon-plus" circle></el-button>
                                                <el-dropdown-menu slot="dropdown" :data="allPlaylist">
                                                    <el-dropdown-item :command='{type:"playqueue",params:scope.row}'>播放队列</el-dropdown-item>
                                                    <el-dropdown-item v-for="playlist in allPlaylist" :key="playlist.id" :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                                                    <el-dropdown-item :command='{type:"newplaylist",params:scope.row}' divided>添加到新歌单</el-dropdown-item>
                                                </el-dropdown-menu>
                                            </el-dropdown>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="曲目数" width=300>
                                    <template slot-scope="scope">
                                        <span class="font_other">{{scope.row.count}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label=" ">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.Flag"><el-button icon="el-icon-delete" circle v-on:click="deletePlaylist(scope.row,scope.$index)"></el-button></span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination v-if="allPlaylist.length>10" :current-page.sync=currentPageOfPlaylist align=center layout="prev, pager, next" :total="allPlaylist.length" @current-change="playlistPaginationChange"></el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <br style="clear:both;">
                <br style="clear:both;">
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
            user:{id:''},
            background:{
            backgroundImage: "url(" + require("../../../assets/我的音乐.jpg") + ")",
            backgroundRepeat: "no-repeat",
            },
            currentPageOfSong:1,
            currentPageOfAlbum:1,
            currentPageOfPlaylist:1,
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
            songList:[],
            albumList:[],
            playlistList:[],
            allSong:[],
            allAlbum:[],
            allPlaylist:[],
        }
    },
    methods:{
        //对话框关闭前调用，询问确认关闭
        handleClose(done) {
        this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
        },
        //鼠标移入列表单元格调用，修改那一行的标志
        handleMouseEnter:function(row, column, cell, event){
            row.Flag=true;
        },
        //鼠标移出列表单元格调用，修改那一行的标志
        handleMouseOut:function(row, column, cell, event){
            if(!row.isopen){
                row.Flag=false;}
            else{
                return false;
            }
        },
        //列表里的添加到下拉框显示状态改变调用，修改那一行的标志
        handle:function(row,event){
            row.Flag=event;
            row.isopen=event;
        },
        //点击播放全部按钮调用，播放收藏的歌曲
        playAllSong:function(){
            if(this.allSong.length==0){
                this.$message({
                  showClose: true,
                  message: '还未收藏任何歌曲',
                  type: 'info'
                });
            }
            else{
                this.$store.dispatch("play", [this.allSong, 0, false]);
            }
        },
        //点击歌曲播放按钮调用，播放歌曲
        playSong:function(index){
            this.$store.dispatch("play", [this.songList, index, false]);
        },
        //点击歌曲列表里添加到中的一项调用，处理添加到按钮的不同请求
        handleSongCommand:function(command){
          if(command.type=="playqueue"){
            var song=this.songList[command.params];
            var songs=[song];
            this.$store.dispatch("addToSongList",songs);
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
        //把歌曲添加到歌单
        addSongToPlaylist:function(songId,playlistId){
          this.axios.get(this.serverUrl+'/playlist/addSong',{
              params:{
                songId:songId,
                playlistId:playlistId
              }
            })
            .then(response =>{
              if(response){
                this.getMyPlaylist(1);
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
        //点击歌曲下载按钮调用，下载歌曲
        downloadSong:function(row){
            window.location.href = this.serverUrl + "/download/downloadSong?id=" + row.id;
        },
        //点击歌曲删除按钮调用，删除歌曲
        deleteSong:function(row,index){
            this.$confirm('确认删除？')
            .then(_ => {
                this.axios.get(this.serverUrl+'/user/unlikeSong',{
                  params:{
                    songId:row.id
                }
            })
                .then(response =>{
                  if(response){
                    this.allSong.splice((this.currentPageOfSong-1)*10+index,1);
                    this.state.likeSongs=this.allSong;
                    sessionStorage.setItem('likeSongs', JSON.stringify(this.state.likeSongs));
                    if(this.songList.length==1){
                        this.songPaginationChange(this.currentPageOfSong-1);
                    }
                    else{
                        this.songPaginationChange(this.currentPageOfSong);
                    }
                    this.$message({
                      showClose: true,
                      message: '歌曲已被取消收藏',
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
            })
            .catch(_ => {});
        },
        //点击专辑播放按钮调用，播放专辑
        playAlbum:function(row){
            this.axios.get(this.serverUrl+'/album/getSongsFromAlbum',{
              params:{
                id:row.id,
              }
            })
            .then(response =>{
                var songs = response.data;
                for(var i = 0; i < songs.length; i++){
                    songs[i].image = this.serverUrl + songs[i].image;
                    songs[i].filePath = this.serverUrl + songs[i].filePath;
                    songs[i].lyricsPath = this.serverUrl + songs[i].lyricsPath;
                }
                this.$store.dispatch("play", [songs, 0, false]); 
            })
            .catch(function(err){
              console.log(err);
            });
        },
        //点击专辑添加到按钮中的一项调用，处理添加到按钮的不同请求
        handleAlbumCommand:function(command){
          if(command.type=="playqueue"){
            this.axios.get(this.serverUrl+'/album/getSongsFromAlbum',{
              params:{
                id:command.params.id,
              }
            })
            .then(response =>{
                var songs = response.data;
                for(var i = 0; i < songs.length; i++){
                    songs[i].image = this.serverUrl + songs[i].image;
                    songs[i].filePath = this.serverUrl + songs[i].filePath;
                    songs[i].lyricsPath = this.serverUrl + songs[i].lyricsPath;
                }
                this.$store.dispatch("addToSongList", songs); 
            })
            .catch(function(err){
              console.log(err);
            });
          }
          else if(command.type=="newplaylist"){
            this.dialogVisible=true;
            this.newPlaylist.type="album";
            this.newPlaylist.info=command.params.id;
          }
          else{
            this.addAlbumToPlaylist(command.param2.id,command.param1);
          }
        },
        //把专辑添加到歌单
        addAlbumToPlaylist:function(albumId,playlistId){
          this.axios.get(this.serverUrl+'/playlist/addAlbum',{
              params:{
                albumId:albumId,
                playlistId:playlistId
              }
            })
            .then(response =>{
              if(response){
                this.getMyPlaylist(1);
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
        //点击专辑删除按钮调用，删除专辑
        deleteAlbum:function(row,index){
            this.$confirm('确认删除？')
            .then(_ => {
                this.axios.get(this.serverUrl+'/user/unlikeAlbum',{
                  params:{
                    albumId:row.id
                  }
                })
                .then(response =>{
                  if(response){
                    this.allAlbum.splice((this.currentPageOfPlaylist-1)*10+index,1);
                    this.state.likeAlbums=this.allAlbum;
                    sessionStorage.setItem('likeAlbums', JSON.stringify(this.state.likeAlbums));
                    if(this.albumList.length==1){
                        this.albumPaginationChange(this.currentPageOfAlbum-1);
                    }
                    else{
                        this.albumPaginationChange(this.currentPageOfAlbum);
                    }
                    this.$message({
                      showClose: true,
                      message: '专辑已被取消收藏',
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

            })
            .catch(_ => {});
        },
        //点击歌单播放按钮调用，播放歌单
        playPlaylist:function(row){
          this.axios.get(this.serverUrl+'/playlist/getSongs',{
              params:{
                id:row.id,
              }
            })
            .then(response =>{
                var songs = response.data;
                if(songs.length==0){
                    this.$message({
                      showClose: true,
                      message: '歌单里还没有任何歌曲',
                      type: 'info'
                    });
                    return false;
                }
                for(var i = 0; i < songs.length; i++){
                    songs[i].image = this.serverUrl + songs[i].image;
                    songs[i].filePath = this.serverUrl + songs[i].filePath;
                    songs[i].lyricsPath = this.serverUrl + songs[i].lyricsPath;
                }
                this.$store.dispatch("play", [songs,0,false]); 
            })
            .catch(function(err){
              console.log(err);
            });
        },
        //点击歌单列表里的添加到按钮中的一项调用，处理添加到按钮的不同请求
        handlePlaylistCommand:function(command){
          if(command.type=="playqueue"){
            this.axios.get(this.serverUrl+'/playlist/getSongs',{
              params:{
                id:command.params.id,
              }
            })
            .then(response =>{
                var songs = response.data;
                for(var i = 0; i < songs.length; i++){
                    songs[i].image = this.serverUrl + songs[i].image;
                    songs[i].filePath = this.serverUrl + songs[i].filePath;
                    songs[i].lyricsPath = this.serverUrl + songs[i].lyricsPath;
                }
                this.$store.dispatch("addToSongList", songs); 
            })
            .catch(function(err){
              console.log(err);
            });
          }
          else if(command.type=="newplaylist"){
            this.dialogVisible=true;
            this.newPlaylist.type="playlist";
            this.newPlaylist.info=command.params.id;
          }
          else{
            this.addPlaylistToPlaylist(command.param2.id,command.param1);
          }
        },
        //把歌单添加到歌单
        addPlaylistToPlaylist:function(fromId,toId){
            this.axios.get(this.serverUrl+'/playlist/addPlaylistToPlaylist',{
              params:{
                fromId:fromId,
                toId:toId
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
        //点击歌单删除按钮调用，删除歌单
        deletePlaylist:function(row,index){
            this.$confirm('确认删除？')
            .then(_ => {
                this.axios.get(this.serverUrl+'/playlist/remove',{
              params:{
                id:row.id
              }
            })
            .then(response =>{
              if(response){
                this.allPlaylist.splice((this.currentPageOfPlaylist-1)*10+index,1);
                this.state.playlistList=this.allPlaylist;
                sessionStorage.setItem('playlistList', JSON.stringify(this.state.playlistList));
                if(this.playlistList.length==1){
                    this.playlistPaginationChange(this.currentPageOfPlaylist-1);
                }
                else{
                    this.playlistPaginationChange(this.currentPageOfPlaylist);
                }
                this.$message({
                  showClose: true,
                  message: '删除歌单成功',
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
            })
            .catch(_ => {});
        },
        //点击表单完成按钮调用，提交新建歌单的表单
        submitForm:function(){
          this.$refs["newPlaylist"].validate((valid) => {
            if (valid) {
              this.axios.post(this.serverUrl+'/playlist/create',{
                name:this.newPlaylist.name,
                intro:this.newPlaylist.intro
              })
              .then(response =>{
                if(response.data!=-1){
                  this.$message({
                    showClose: true,
                    message: '歌单创建成功',
                    type: 'success'
                  });
                  if(this.newPlaylist.type==''){
                    var thisPlaylist={id:response.data,name:this.newPlaylist.name,intro:this.newPlaylist.intro,image:require('../../../assets/暂无图片.png'),count:0,Flag:false,isopen:false}
                    this.allPlaylist.push(thisPlaylist);
                    this.state.playlistList=this.allPlaylist;
                    sessionStorage.setItem('playlistList', JSON.stringify(this.state.playlistList));
                    this.playlistPaginationChange(Math.floor((this.allPlaylist.length-1)/10)+1);
                  }
                  else if(this.newPlaylist.type=="song"){
                    this.addSongToPlaylist(this.newPlaylist.info,response.data);
                  }
                  else if(this.newPlaylist.type=="album"){
                    this.addAlbumToPlaylist(this.newPlaylist.info,response.data);
                  }
                  else{
                    this.addPlaylistToPlaylist(this.newPlaylist.info,response.data);
                    this.getMyPlaylist(Math.floor((this.allPlaylist.length-1)/10)+1);
                  }
                  this.dialogVisible=false;
                  this.$refs["newPlaylist"].resetFields();
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
        //将时间戳变成固定格式时间
        timestampToTime: function(timestamp) {
          var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate();
          if(D < 10) D = '0' + D;
          return Y+M+D;
        },
        //从后台获取用户歌单
        getMyPlaylist:function(page){
            this.axios.get(this.serverUrl + "/user/showMyMusic", {
                params: {
                    id: this.user.id
                }
            })
            .then(res => {
                this.user = res.data;
                if(this.user.image==null){
                    this.user.image=require('../../../assets/暂无图片.png');
                }
                else{
                    this.user.image = this.serverUrl + this.user.image;
                }
                this.allPlaylist=this.user.playlistList;
                for(var i=0;i<this.allPlaylist.length;i++){
                    if(this.allPlaylist[i].image==null){
                        this.allPlaylist[i].image=require('../../../assets/暂无图片.png');
                    }
                    else{
                        this.allPlaylist[i].image=this.serverUrl+this.allPlaylist[i].image;
                    }
                    this.$set(this.allPlaylist[i],'Flag',false);
                    this.$set(this.allPlaylist[i],'isopen',false);
                }
                this.state.playlistList=this.allPlaylist;
                sessionStorage.setItem('playlistList', JSON.stringify(this.state.playlistList));
                this.playlistPaginationChange(page);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        //从后台获取用户我的音乐里的所有信息
        getMyMusic:function(){
            this.axios.get(this.serverUrl + "/user/showMyMusic", {
                params: {
                    id: this.user.id
                }
            })
            .then(res => {
                this.user = res.data;
                if(this.user.image==null){
                    this.user.image=require('../../../assets/暂无图片.png');
                }
                else{
                    this.user.image = this.serverUrl + this.user.image;
                }
                this.allSong=this.user.likeSongList;
                this.allAlbum = this.user.likeAlbumList;
                this.allPlaylist=this.user.playlistList;
                for(var i=0;i<this.allSong.length;i++){
                    if(this.allSong[i].image==null){
                        this.allSong[i].image=require('../../../assets/暂无图片.png');
                    }
                    else{
                        this.allSong[i].image=this.serverUrl+this.allSong[i].image;
                    }
                    this.allSong[i].filePath=this.serverUrl+this.allSong[i].filePath;
                    this.allSong[i].lyricsPath=this.serverUrl+this.allSong[i].lyricsPath;
                    this.$set(this.allSong[i],'Flag',false);
                    this.$set(this.allSong[i],'isopen',false);
                }
                for(var i=0;i<this.allAlbum.length;i++){
                    if(this.allAlbum[i].image==null){
                        this.allAlbum[i].image=require('../../../assets/暂无图片.png');
                    }
                    else{
                        this.allAlbum[i].image=this.serverUrl+this.allAlbum[i].image;
                    }
                    this.allAlbum[i].releaseDate=this.timestampToTime(this.allAlbum[i].releaseDate);
                    this.$set(this.allAlbum[i],'Flag',false);
                    this.$set(this.allAlbum[i],'isopen',false);
                }
                for(var i=0;i<this.allPlaylist.length;i++){
                    if(this.allPlaylist[i].image==null){
                        this.allPlaylist[i].image=require('../../../assets/暂无图片.png');
                    }
                    else{
                        this.allPlaylist[i].image=this.serverUrl+this.allPlaylist[i].image;
                    }
                    this.$set(this.allPlaylist[i],'Flag',false);
                    this.$set(this.allPlaylist[i],'isopen',false);
                }
                this.songPaginationChange(1);
                this.albumPaginationChange(1);
                this.playlistPaginationChange(1);
                this.state.likeSongs=this.allSong;
                this.state.likeAlbums=this.allAlbum;
                this.state.playlistList=this.allPlaylist;
                sessionStorage.setItem('likeSongs', JSON.stringify(this.state.likeSongs));
                sessionStorage.setItem('likeAlbums', JSON.stringify(this.state.likeAlbums));
                sessionStorage.setItem('playlistList', JSON.stringify(this.state.playlistList));
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        //收藏歌曲页码变动调用，换页
        songPaginationChange:function(page){
            this.songList=[];
            if(this.allSong.length==0){
                return false;
            }
            else{
                this.currentPageOfSong=page;
                if(page==Math.floor((this.allSong.length-1)/10)+1){
                    for(var i=10*(page-1);i<this.allSong.length;i++){
                        this.songList.push(this.allSong[i]);
                    }
                }
                else{
                    for(var i=10*(page-1);i<10*page;i++){
                        this.songList.push(this.allSong[i]);
                    }
                }
            }
        },
        //收藏专辑页码变动调用，换页
        albumPaginationChange:function(page){
            this.albumList=[];
            if(this.allAlbum.length==0){
                return false;
            }
            else{
                this.currentPageOfAlbum=page;
                if(page==Math.floor((this.allAlbum.length-1)/10)+1){
                    for(var i=10*(page-1);i<this.allAlbum.length;i++){
                        this.albumList.push(this.allAlbum[i]);
                    }
                }
                else{
                    for(var i=10*(page-1);i<10*page;i++){
                        this.albumList.push(this.allAlbum[i]);
                    }
                }
            }
        },
        //歌单页码变动调用，换页
        playlistPaginationChange:function(page){
            this.playlistList=[];
            if(this.allPlaylist.length==0){
                return false;
            }
            else{
                this.currentPageOfPlaylist=page;
                if(page==Math.floor((this.allPlaylist.length-1)/10)+1){
                    for(var i=10*(page-1);i<this.allPlaylist.length;i++){
                        this.playlistList.push(this.allPlaylist[i]);
                    }
                }
                else{
                    for(var i=10*(page-1);i<10*page;i++){
                        this.playlistList.push(this.allPlaylist[i]);
                    }
                }
            }
        },
    },
    //vue的created生命周期
    created(){
        window.scrollTo(0,0);
    },
    //从state.js获取常用参数
    computed:{
        serverUrl(){
          return this.$store.state.serverUrl;
        },
        state(){
          return this.$store.state;
        },

    },
    //vue的mounted生命周期，获取用户信息
    mounted(){
        if(this.state.isLogin){
            this.user.id=this.state.user.id;
            this.getMyMusic();
        }
        else{
            this.$router.push('/user/unlogin');
        }
    }
}
</script>

<style>
.spHeight td{
  height:70px;
}
.background{
	width:100%;
	height:auto;
}
.userImage{
    width:150px;
    height:150px;
	border-radius:100%;
	margin-top:80px;
	margin-left:45%;
}
.smallImage{
    width:50px;
    height:50px;
    display:block;
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
    font-family:"Hiragino Sans GB";
    font-size: small;
    color:black;
    cursor:pointer;
}
.font_other{
    font-family:"Hiragino Sans GB";
    font-size: small;
    color:black;
}
a {
     text-decoration:none;
     out-line: none;
  }
</style>