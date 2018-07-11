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
                        <div class="intro">
                            <h2>{{playlist.name}}</h2>
                            <p>简介</p>
                            <p id="playlistIntro" style="width: 500px; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden; float: left; margin-top: 0px;">{{playlist.intro}}</p>
                            <el-popover v-if="this.isOverflow" placement="left" title="简介" trigger="click" style="float: left;">
                                <p class="font_des" style="width: 600px">{{playlist.intro}}</p>
                                <el-button type="text" slot="reference" style="color: black; margin-left: 20px; padding-top: 15px;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">[更多]</el-button>
                            </el-popover>
                        </div>  

                        <el-button class="btn2" type="primary" icon="el-icon-caret-right" v-on:click="playAllSong">播放全部</el-button>

                        <el-popover
                        ref=""
                        placement="right" width="500"
                        trigger="click"
                        v-model="editDialogVisible">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                                <el-form-item label="歌单名称" prop="name">
                                    <el-input v-model="ruleForm.name" placeholder="请输入歌单名称"></el-input>
                                </el-form-item>
                                <el-form-item label="歌单简介" prop="intro">
                                    <el-input type="textarea" v-model="ruleForm.intro" placeholder="请输入歌单简介"></el-input>
                                </el-form-item>
                                <el-form-item label="上传图片" prop="image">
                                    <el-upload
                                    class="avatar-uploader"
                                    ref="uploadImage"
                                    action="http://192.168.20.99:8080/hifive/upload/uploadPlaylistImage"
                                    :auto-upload="false"
                                    list-type="picture-card"
                                    :show-file-list="false"
                                    :data={id:ruleForm.id} 
                                    :on-change="editImage"
                                    :before-upload="beforeAvatarUpload"
                                    :on-success="handleAvatarSuccess"
                                    :on-error="uploadFail"
                                    accept=".jpg, .jpeg, .png">
                                    <img v-if="ruleForm.image" style="width:150px;height:150px" :src="ruleForm.image" alt="">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                               
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
                                    <el-button @click="cancelEdit">取消</el-button>
                                </el-form-item>
                            </el-form>

                            <el-button class="btn2" slot="reference" v-on:click="clickOnEdit">编辑歌单</el-button>
                        </el-popover>

                        <el-dropdown trigger="click" @command="handlePlaylistCommand">
                            <el-button class="btn2" icon="el-icon-plus">添加到<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown" :data="playlistList">
                                <el-dropdown-item :command='{type:"playqueue"}'>播放队列</el-dropdown-item>
                                <div v-if="isLogin">
                                    <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" 
                                    :command='{type:"playlist",param1:playlist.id}'>{{playlist.name}}</el-dropdown-item>
                                    <el-dropdown-item :command='{type:"newplaylist"}' divided>添加到新歌单</el-dropdown-item>
                                </div>
                                <el-dropdown-item v-else :command='{type:"login"}' divided>登录后添加到歌单</el-dropdown-item>
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
                                        <el-dropdown-item :command='{type:"playqueue"}' @click.native ="addToSongList(scope.$index)">播放队列</el-dropdown-item>
                                        <div v-if="isLogin">
                                            <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" 
                                            :command='{type:"playlist",param1:playlist.id,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
                                            <el-dropdown-item :command='{type:"newplaylist",params:scope.row}' divided>添加到新歌单</el-dropdown-item>
                                        </div>
                                        <el-dropdown-item v-else :command='{type:"login"}' divided>登录后添加到歌单</el-dropdown-item>
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
                                        <el-button type="primary" @click="createPlaylist">完成</el-button>
                                        <el-button @click="dialogVisible=false">取消</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
                            <span v-if="scope.row.Flag"> <el-button icon="el-icon-download" circle 
                            v-on:click="downloadSong(scope.row)"></el-button> </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="歌手" width="150">
                        <template slot-scope="scope">
                        <router-link :to="{ path: '/user/artistdetail', query: {id:playlistSongList[scope.$index].artistId }}">
                            <el-button type="text" style="color:black;cursor:pointer;text-decoration:none"
                            onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</el-button>
                        </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="专辑" width="150">
                        <template slot-scope="scope">
                        <router-link :to="{ path: '/user/albumdetail', query: { id: scope.row.albumId }}">
                            <el-button type="text" style="color:black;cursor:pointer;text-decoration:none"
                            onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.albumName}}</el-button>
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
                <br>

                <br>
            </div>
        </el-col>
        </el-row>
        <el-row>
            <el-col :span="15" :offset="4" style="text-align: center">
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
            editDialogVisible:false,
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
                { min: 1, max: 680, message: '长度在 680 个字符以内', trigger: 'blur' }
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
    //获取用户登录情况及serverurl
    computed: {
      serverUrl() {
        return this.$store.state.serverUrl;
      },
      isLogin(){
        return this.$store.state.isLogin;
      }
    },
    //在模板渲染成html前调用，获取歌单简介实际长度及当前用户id
    created() {
      window.scrollTo(0,0);
      this.id = this.$route.query.id;
    },
    //在模板渲染成html后调用，获取用户歌单信息，分页，歌单列表
    mounted() {
        this.getPlaylistIntro();
        this.pagination(1);
        this.computePageCount();
        this.getPlaylistList();       
    },
    //由于数据更改导致虚拟 DOM 重新渲染，在这之后调用。在这里是编辑歌单后数据更改，调用handleOverflow函数
    updated(){
        this.handleOverflow();
    },
    methods: {
        //计算索引，避免因为分页后索引总是从1开始的情况
        indexMethod(index) {
            return (this.page - 1)* 20 + index + 1;
        },
        //判断歌单简介是否过长超出限制高度
        handleOverflow:function(){
            var offsetWidth = document.getElementById("playlistIntro").offsetWidth;  
            var scrollWidth = document.getElementById("playlistIntro").scrollWidth;
            if (offsetWidth < scrollWidth) {
                this.isOverflow=true;
            }
            else{
                this.isOverflow=false;
            }
        },
        //播放歌单所有歌曲，调用公共函数play
        playAllSong:function(){
            //传递歌曲id给player
            this.$store.dispatch("play", [this.playlistSongList, 0, false]);
        },
        //歌单添加到：若未登录则只显示添加到播放队列，若已登录则显示添加到用户歌单
        handlePlaylistCommand:function(command){
          if(command.type=="login"){
            window.location.href='/';
          }
          else if(command.type=="newplaylist"){
            this.dialogVisible=true;
            this.newPlaylist.type="playlist";
          }
          else if(command.type=="playqueue"){
            //传递所有歌曲id给player.vue
            this.addAllToSongList();
          }
          else{
            this.addPlaylistToPlaylist(command.param1);
          }
        },
        //歌单所有歌曲添加到歌单
        addPlaylistToPlaylist:function(toId){           
            this.axios.get(this.serverUrl+'/playlist/addPlaylistToPlaylist',{
              params:{
                fromId:this.playlist.id,
                toId:toId
              }
            })
            .then(response =>{
              if(response){
                this.getPlaylistList();
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
        //实现鼠标移入时当前行出现播放，添加到，下载，删除按钮的效果
        handleMouseEnter:function(row, column, cell, event){
            row.Flag=true;
        },
        //实现鼠标移出时当前行播放，添加到，下载，删除按钮的效果失效
        handleMouseOut:function(row, column, cell, event){
            if(!row.isopen){
            row.Flag=false;}
            else{
                return false;
            }
        },
        //点击事件触发对应歌曲的事件
        handle:function(row,event){
          row.Flag=event;
          row.isopen=event;
        },
        //歌曲添加到：若未登录则只显示添加到播放队列，若已登录则显示添加到用户歌单
        handleSongCommand:function(command){
            if(command.type=="login"){
                window.location.href='/';
            }
            else if(command.type=="newplaylist"){
                this.dialogVisible=true;
                this.newPlaylist.type="song";
                this.newPlaylist.info=command.params.id;
            }
            else if(command.type=="playqueue"){
                //传递歌曲id给player.vue
            }
            else{
                this.addSongToPlaylist(command.param2.id,command.param1);
            }
        },
        //歌曲添加到歌单
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
        //取消时的确认框
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
            done();
            })
            .catch(_ => {});
        },
        //下载歌曲，先决条件为用户已登录
        downloadSong:function(row){
            if(this.isLogin){
                window.location.href = this.serverUrl + "/download/downloadSong?id=" + row.id;
            } else{
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
        //获取用户歌单列表
        getPlaylistList:function(){
            if(this.isLogin){
                this.playlistList=this.$store.state.playlistList;
            }
            else{
                return false;
            }
        },
        //获取歌单信息
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
                if(this.playlist.intro == null)
                    this.playlist.intro = " ";
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
        //提交编辑后的歌单
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
                    this.$refs["ruleForm"].resetFields();
                    this.getPlaylistIntro();
                    this.handleOverflow();
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
        //控制分页操作
        handleChange: function(val){
            if(val != this.page){
                this.pagination(val);
            }
        },
        //按顺序分页展示歌曲，一页展示20首，避免因为分页后索引总是从1开始的情况
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
        //根据歌曲量动态显示分页总数
        computePageCount: function(){
            this.pageCount = Math.ceil(parseFloat(this.playlistSongList.length) / 20);
        },
        //添加歌单所有歌曲到播放列表，调用公共函数addToSongList
        addAllToSongList: function(){
            this.$store.dispatch("addToSongList", this.playlistSongList);
        },
        //歌曲添加到播放队列，调用公共函数addToSongList
        addToSongList: function(index){
            index = (this.page - 1) * 20 + index;
            var song = this.playlistSongList[index];
            var songs = [song];
            this.$store.dispatch("addToSongList", songs);
        },
        //播放歌曲，调用公共函数play
        playSong:function(index){
            //传递歌曲ID给player.vue
            var startIndex = (this.page - 1) * 20 + index;
            this.$store.dispatch("play", [this.playlistSongList, startIndex, false]);
        },
        //删除对应行的歌曲
        deleteSong:function(row, index){
            this.axios.get(this.serverUrl+'/playlist/removeSong',{
                params:{
                    songId: row.id,
                    playlistId: this.playlist.id,
                }
            })
            .then(response =>{
                if(response){
                    this.playlistSongList.splice((this.page-1)*20+index,1);
                    this.pagination(this.page);
                    this.$message({
                      showClose: true,
                      message: '歌曲移出歌单',
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
        //上传图片
        editImage:function(file,){
            this.ruleForm.image=file.url;
        },
        //提示上传成功
        handleAvatarSuccess: function() {
            alert("上传成功");
        },
        //对用户上传的图片进行大小及格式验证
        beforeAvatarUpload(file) {
            const isType = file.type === 'image/jpg'||'image/jpeg'||'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isType) {
                this.$message.error('上传图片只能是jpg/jpeg/png格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传歌单封面大小不能超过 2MB!');
            }
            return isType && isLt2M;
        },
        //新建歌单，提交相关数据到对应url
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
                            this.$store.state.playlistList.push(thisPlaylist);
                            this.getPlaylistList();
                            this.dialogVisible=false;
                            this.$refs["newPlaylist"].resetFields();
                            this.$message({
                                showClose: true,
                                message: '歌单创建成功',
                                type: 'success'
                            });
                            if(this.newPlaylist.type=="song"){
                                this.addSongToPlaylist(this.newPlaylist.info,response.data);
                            }
                            else if(this.newPlaylist.type=="playlist"){
                                this.addPlaylistToPlaylist(response.data);
                            }
                            else if(this.newPlaylist.type==''){
                                return false;
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
        //在编辑歌单表单中显示未修改的歌单信息
        clickOnEdit: function(){
            this.ruleForm.id = this.playlist.id;
            this.ruleForm.name = this.playlist.name;
            this.ruleForm.intro = this.playlist.intro;
            if(this.playlist.image != emptyImage){
                this.ruleForm.image = this.playlist.image;
            }
        },
        //取消编辑操作
        cancelEdit: function(done){
            this.$confirm('确认关闭？')
            .then(_ => {
                this.clickOnEdit();
                this.editDialogVisible=false;
                done();
            })
            .catch(_ => { });

        },
        //提示上传失败
        uploadFail: function(err, file, fileList){
            alert("上传失败");
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
.intro{
    padding-top:15px;
}
.btn2{
    margin-top:25px;
    height:45px;
    width:120px;
    text-align:center;
    margin-right:20px;
}
.pagination {
    font-size: 30px;
    /*padding-left:-300px;*/
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
