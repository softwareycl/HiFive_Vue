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
                default-active="1"
                class="rankMenu"
                mode="vertical"
                background-color="#f5fffa"
                text-color="#2CAF6F"
                active-text-color="#d02090">
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
                        日韩榜
                    </el-menu-item>
                    <el-menu-item index="6" @click="rankDisplay(6);">
                        欧美榜
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
                    <el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
                    <div v-if="state">
                    <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
                    <el-dropdown-item v-for="playlist in playlistList" :key="playlist.ID" :command='{type:"playlist",params:playlist.ID}'>{{playlist.name}}</el-dropdown-item>
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
                    <el-table-column prop="name" label="歌曲" width="250">
                        <template slot-scope="scope">
                            <router-link to="/user/songdetail">
                                <el-button type="text" style="color:black;cursor:pointer;text-decoration: none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    
                    <el-table-column label=" " width="230" type="index">
                            <template slot-scope="scope">
                                <span v-if="scope.row.Flag">
                                    <el-button icon="el-icon-caret-right" circle @click.native ="playSong(scope.$index)"></el-button>
                                </span>
                                <span v-if="scope.row.Flag"> 
                                    <el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handleSongCommand">
                                    <el-button icon="el-icon-plus" circle></el-button>
                                    <el-dropdown-menu slot="dropdown" :data="playlistList">
                                    <el-dropdown-item command="playqueue" @click.native ="addToSongList(scope.$index)">播放队列</el-dropdown-item>
                                    <div v-if="state">
                                        <el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
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
                            <router-link to="/user/artistdetail">
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
            index: 1,
            page:1,
            rankType:1,
            rankText: ["新歌榜", "热歌榜", "内地榜", "港台榜", "日韩榜", "欧美榜"],
            songs:[],
            page: 1,
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
            playlistList:[{
                ID:'1',
                name:'1'
              },
              {
                ID:'2',
                name:'2'
              },
              {
                ID:'3',
                name:'3'
            }],
        }
    },
    components: {
        vNav,
        vHeader,
        vFoot,
    },
    computed: {
      serverUrl() {
        return this.$store.state.serverUrl;
      }
    },
    mounted() {
      this.rankDisplay(1);
      this.getPlaylistList(this.userID);
    },
    methods:{
        indexMethod: function(index){
            return (this.page - 1)* 20 + index + 1;
        },
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
        computePageCount: function(){
            this.pageCount = Math.ceil(parseFloat(this.songs.length) / 20);
        },
        handleChange: function(val){
            if(val != this.page){
                this.pagination(val);
            }
        },
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
                console.log(res.data);
                for(var i = 0; i < res.data.length; i++){
                    this.songs[i].image = this.serverUrl + this.songs[i].image;
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

        submitForm:function(formname){
        //提交playlist对象，包括歌单名称和简介，返回-1用户会话超时
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
        downloadSong:function(row){
        //提交歌曲ID，无返回
        },
        handleSongCommand:function(command){
            if(command=="login"){
                window.location.href='/';
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
        playAllSong:function(){
        //传递所有歌曲ID给player.vue
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        handleMouseEnter:function(row, column, cell, event){
            // alert(row.id);
            row.Flag=true;
        },
        handleMouseOut:function(row, column, cell, event){
            if(!row.isopen){
                row.Flag=false;
            }
            else{
                return false;
            }
        },
        handle:function(row,event){
            row.Flag=event;
            row.isopen=event;
        },

        getPlaylistList:function(){
        //无提交，返回歌单列表
        },
        handleAlbumCommand:function(command){
            if(command=="login"){
                window.location.href='/';
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
        addToSongList: function(index){
            index = (this.page - 1) * 20 + index;
            console.log(this.songs);
            var song = this.songs[index];
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
            for(var i = 0; i < this.songs.length; i++){
                this.$store.state.songList.push(this.songs[i]);
            }
            this.$store.state.currentSong = this.songs[index];
            this.$store.state.currentIndex = index;
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