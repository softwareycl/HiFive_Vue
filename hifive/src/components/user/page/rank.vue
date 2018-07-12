<template>
<div>
    <div>
    <v-header></v-header>
    <v-nav></v-nav>
    </div>
    <el-row>
    <div class="rank">
        <el-col :span="6">
            <div class="navMenu">
                <div class="rankTitle">
                    <h2>排行榜</h2>
                </div>
                <el-menu
                :default-active=index
                class="rankMenu"
                mode="vertical">
                    <el-menu-item index="1" @click="rankDisplay(1)">
                        新歌榜
                    </el-menu-item>
                    <el-menu-item index="2" @click="rankDisplay(2);">
                        热歌榜
                    </el-menu-item>
                    <el-menu-item index="3" @click="rankDisplay(3);">
                        内地榜
                    </el-menu-item>
                    <el-menu-item index="4" @click="rankDisplay(4);">
                        港台榜
                    </el-menu-item>
                    <el-menu-item index="5" @click="rankDisplay(5);">
                        欧美榜
                    </el-menu-item>
                    <el-menu-item index="6" @click="rankDisplay(6);">
                        日韩榜
                    </el-menu-item>

                </el-menu>
            </div>
        </el-col>
        <el-col :gutter="2" :span="16">
            <div class="display">
                <div class="displayTitle">
                    <h1>{{rankText[rankType - 1]}}</h1>
                </div>
                <el-button type="primary" 
                icon="el-icon-caret-right" 
                style="background-color:#31C27C" 
                onmouseover="this.style.backgroundColor='#2CAF6F';" 
                onmouseout="this.style.backgroundColor='#31C27C';" 
                v-on:click="playAllSong">播放全部</el-button>
                <el-dropdown trigger="click" id="dropdown" @command="handleAlbumCommand">
                <el-button icon="el-icon-plus" v-on:click="getPlaylistList" >添加到<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>

                <el-dropdown-menu slot="dropdown" :data="playlistList">
                    <el-dropdown-item command="playqueue" @click.native ="addAllToSongList()">播放队列</el-dropdown-item>
                    <div v-if="isLogin">
                      <el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",params:playlist.id}'>{{playlist.name}}</el-dropdown-item>
                      <el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
                    </div>
                    <el-dropdown-item v-else command="login" divided>登录后添加到歌单</el-dropdown-item>
                </el-dropdown-menu>

                </el-dropdown>

                <el-table
                :data="songsView"
                style="width: 100%"
                max-height="1500"

                @cell-mouse-enter="handleMouseEnter" 
                @cell-mouse-leave="handleMouseOut">
                    <el-table-column prop="index" width="50" type="index" :index="indexMethod"></el-table-column>
                    <el-table-column prop="name" label="歌曲" width="300">
                        <template slot-scope="scope">
                            <router-link :to="{path:'/user/songdetail',query:{id:songs[scope.$index+20*(page-1)].id}}">
                                <el-button type="text" style="color:black;cursor:pointer;text-decoration: none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    
                    <el-table-column label=" " width="150" type="index">
                            <template slot-scope="scope">
                                <span v-if="scope.row.Flag">
                                    <el-button icon="el-icon-caret-right" circle @click.native ="playSong(scope.$index)"></el-button>
                                </span>
                                <span v-if="scope.row.Flag"> 
                                    <el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handleSongCommand">
                                    <el-button icon="el-icon-plus" circle></el-button>
                                    <el-dropdown-menu slot="dropdown" :data="playlistList">
                                    <el-dropdown-item command="playqueue" @click.native ="addToSongList(scope.$index)">播放队列</el-dropdown-item>
                                    <div v-if="isLogin">
                                        <el-dropdown-item v-for="playlist in playlistList" :key="playlist.ID" :command='{type:"playlist",param1:playlist.ID,param2:scope.row}'>{{playlist.name}}</el-dropdown-item>
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
                                        <el-form-item label="歌单简介" prop="des">
                                            <el-input type="textarea" v-model="ruleForm.des" placeholder="请输入歌单简介"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
                                            <el-button @click="dialogVisible=false">取消</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-dialog>
                                <span v-if="scope.row.Flag"> 
                                    <el-button icon="el-icon-download" circle v-on:click="downloadSong(scope.row)"></el-button> 
                                </span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="artist" label="歌手" width="200">
                        <template slot-scope="scope">            
                            <router-link :to="{path:'/user/artistdetail',query:{id:songs[scope.$index+20*(page-1)].artistId}}">
                                <el-button type="text" style="color:black;cursor:pointer;text-decoration:none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}
                                </el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="duration" label="时长" width="100">
                    </el-table-column>  
                </el-table>

                <br>
                <el-pagination class="pagination" :page-count="pageCount" 
                layout="prev, pager, next" 
                @current-change="handleChange"></el-pagination>
                <br>
            </div>
        </el-col>
    </div>
    </el-row>
    <el-row>
        <v-foot></v-foot>
    </el-row>
</div>
</template>
<script>
import vHeader from "../common/header.vue";
import vNav from "../common/navigation.vue";
import vFoot from "../common/footer.vue";
import a from "@/../static/images/1.jpg"
export default{
    data(){
        return {
            index: "1",
            page:1,
            rankType:1,
            rankText: ["新歌榜", "热歌榜", "内地榜", "港台榜", "欧美榜", "日韩榜"],
            songs:[],
            pageCount: 1,
            songsView: [],
            dialogVisible:false,
            ruleForm: {
                name: '',
                des: ''
            },
            rules: {
                name: [
                {required: true, message: '请输入歌单名称', trigger: 'blur'},
                {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                ],
                des: [
                {min: 1, max: 140, message: '长度在 140 个字符以内', trigger: 'blur' }
                ]
            },
            userID:'',
            state:true,
            playlistList:[],
        }
    },
    components: {
        vNav,
        vHeader,
        vFoot,
    },
    //在模板渲染成html前调用，显示对应榜单名称
    created(){
        var index=this.$route.query.rankType;
        if(index != undefined)
            this.index = index.toString();
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
    //在模板渲染成html后调用，获取排行榜及用户歌单列表
    mounted() {
      this.rankDisplay(this.index);
      this.getPlaylistList(this.userID);
    },
    methods:{
        /* 获取用户播放列表*/
        getPlaylistList:function(){
            if(this.isLogin){
            this.playlistList=this.$store.state.playlistList;
          }
          else{
            return false;
          }
        },
        //计算索引，避免因为分页后索引总是从1开始的情况
        indexMethod: function(index){
            return (this.page - 1)* 20 + index + 1;
        },
        //按顺序分页显示歌曲排名，一页展示20首，避免因为分页后索引总是从1开始的情况
        pagination: function(_page){
            this.page = _page;
            this.songsView.splice(0,this.songsView.length);
            for(var i = 0; i < 20; i++){
                if(this.songs[((_page - 1)*20) + i] == null){
                } else {
                    var _songList = this.songs[((_page - 1)*20) + i];
                    this.songsView.push(_songList);
                }
            }
            
        },
        //根据歌曲量动态显示分页总数
        computePageCount: function(){
            this.pageCount = Math.ceil(parseFloat(this.songs.length) / 20);
        },
        //控制分页操作
        handleChange: function(val){
            if(val != this.page){
                this.pagination(val);
            }
        },
        //从mounted获取的serverurl请求排行榜有关数据
        rankDisplay: function(_rankType){
            this.rankType = _rankType;
            //get排行榜展示内容数据
            this.axios.get(this.serverUrl + "/song/rank", {
                params: {
                    type: _rankType,
                    isAll: true
                }
            })
            .then(res => {
                this.songs = res.data;
                for(var i = 0; i < res.data.length; i++){
                    if(this.songs[i].image == null){
                        this.songs[i].image = required("../../../assets/暂无图片.png");
                    } else {
                        this.songs[i].image = this.serverUrl + this.songs[i].image;
                    }
                    
                    this.songs[i].filePath = this.serverUrl + this.songs[i].filePath;
                    this.songs[i].lyricsPath = this.serverUrl + this.songs[i].lyricsPath;
                    this.$set(this.songs[i],'Flag',false);
                    this.$set(this.songs[i],'isopen',false);
                    // this.songs[i].displayName = (i+1) + "  " + this.songs[i].name;
                }
                this.computePageCount();
                this.pagination(1);

            })
            .catch(function (error) {
                console.log(error);
            });
        },
        //提交playlist对象，包括歌单名称和简介，返回-1用户会话超时
        submitForm:function(formname){        
            this.$refs[formname].validate((valid) => {
                if (valid) {
                    alert('submit!');
                    this.dialogVisible=false;
                    this.$refs[formname].resetFields();
                } else {
                    alert('error submit!!');
                return false;
                }
            });
        },
        //下载歌曲，先决条件为用户已登录
        downloadSong:function(row){
            if(this.isLogin){
                window.location.href = this.serverUrl + "/download/downloadSong?id=" + row.id;
            } else {
                //询问要不要登录
                this.$confirm('还未登录,是否现在登录?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                }).then(() => {
                  this.$router.push({
                      path: "/user/unlogin"
                    })
                }).catch(() => {
                });
            }
        },
        //歌曲添加到：若未登录则只显示添加到播放队列，若已登录则显示添加到用户歌单
        handleSongCommand:function(command){
            if(command=="login"){
                this.$router.push({
                  path: "/user/unlogin"
                })
            }
            else if(command=="newplaylist"){
                this.dialogVisible=true;
            }
                else if(command=="playqueue"){
          //传递歌曲ID给player.vue
            }
            else{
            //提交歌曲ID和歌单ID，返回false则用户会话超时
             console.log(command.param1);
             console.log(command.param2.ID)
            }
        },
        //取消操作时的确认框
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                })
                .catch(_ => {});
        },
        //实现鼠标移入时当前行出现播放，添加到，下载按钮的效果
        handleMouseEnter:function(row, column, cell, event){
            // alert(row.id);
            row.Flag=true;
        },
        //实现鼠标移出时当前行播放，添加到，下载按钮的效果失效
        handleMouseOut:function(row, column, cell, event){
            if(!row.isopen){
                row.Flag=false;
            }
            else{
                return false;
            }
        },
        //点击事件触发对应歌曲的事件
        handle:function(row,event){
            row.Flag=event;
            row.isopen=event;
        },
        //专辑添加到：若未登录则只显示添加到播放队列，若已登录则显示添加到用户歌单
        handleAlbumCommand:function(command){
            if(command=="login"){
                this.$router.push({
                  path: "/user/unlogin"
                })
            }
            if(command=="newplaylist"){
                this.dialogVisible=true;
            }
            else if(command=="playqueue"){
            //传递所有歌曲ID给player.vue
            }
            else{
            //提交专辑ID和歌单ID，返回false则用户会话超时
            console.log(command.params);
            }
        },
        //歌曲添加到播放队列，调用公共函数addToSongList
        addToSongList: function(index){
            index = (this.page - 1) * 20 + index;
            var song = this.songs[index];
            var songs = [song];
            this.$store.dispatch("addToSongList", songs);
        },
        //添加榜单所有歌曲到播放列表，调用公共函数addToSongList
        addAllToSongList: function(){
            this.$store.dispatch("addToSongList", this.songs);
        },
        //播放歌曲，调用公共函数play
        playSong:function(index){
            //传递歌曲ID给player.vue
            var startIndex = (this.page - 1) * 20 + index;
            this.$store.dispatch("play", [this.songs, startIndex, false]);
        },
        //播放榜单所有歌曲，调用公共函数play
        playAllSong:function(){
            //传递所有歌曲ID给player.vue
            this.$store.dispatch("play", [this.songs, 0, false]);
        },
    },
    
}
</script>
<style>
.navMenu{
    margin-left:100px;
    margin-top:50px;
    margin-bottom:30px;
    height:80%;
    text-align:center;
}
.rankTitle{
    margin-left:8px;
}
.rankMenu{
    margin:0 auto;
}
.pagination{
    color:#31c27c;
    text-align: center;
    font-size: 20px;
}
.display{
    margin-left:50px;
}
.pagination {
text-align: center;
font-size: 20px;
margin:0 auto;
}
.displayTitle{
    margin-left:20px;
}
.songImg{
  width:30px;
  height:30px;
}
#dropdown{
    margin-left:20px;
}
.a{
    text-decoration:none;
}
</style>