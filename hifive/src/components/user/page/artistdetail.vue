<template>
	<div>
      <v-head></v-head>
      <v-nav></v-nav>
      <div class="main" id="artistdetail" :data="artist" style="width: auto;">
      	<el-row>
      		<el-col :span="4" :offset="4">
      			<div>
      				<img align=right style="float:left;margin-top:30px; border-radius:100%; width:230px; height: 230px; overflow:hidden;" :src=artist.image>
      			</div>
      		</el-col>
      		<el-col :span="8" style="margin-left: 30px; margin-top: 25px">
      			<div style="width: 300px;">
      				<p class="font_artistName">{{artist.name}}</p>
      			</div>
      			<div style=" width: 800px; height: 5px;">
      				<p class="font_other" style="float: left; margin-right: 10px;">国籍:{{artist.country}}</p>
      				<p class="font_other" style="float: left; margin-right: 10px;">出生地:{{artist.birthplace}}</p>
      				<p class="font_other" style="float: left; margin-right: 10px;">生日:{{artist.birthday}}</p>
      				<p class="font_other" style="float: left; margin-right: 10px;">职业:{{artist.occupation}}</p>
      			</div>
      			<div style=" width: 900px; margin-top: 5px;">
      				<p class="font_rep" style="float: left; margin-right: 10px; margin-bottom: 20px;">代表作:{{artist.representative}}</p>
      				<p style="width: 100px; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden; float: left;" class="font_des">简介:{{artist.intro}}</p>
      				<el-popover placement="left" title="歌手简介" trigger="click" style="float: left;">
      					<p class="font_des" style="width: 600px">{{artist.intro}}</p>
      					<el-button type="text" slot="reference" style="color: black; margin-left: 20px; padding-top: 8px;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">[更多]</el-button>
      				</el-popover>
      			</div>
      			<el-button type="primary" icon="el-icon-caret-right" style="background-color:#31C27C" onmouseover="this.style.backgroundColor='#2CAF6F';" onmouseout="this.style.backgroundColor='#31C27C';" v-on:click="playAllSong">播放全部</el-button>
      		</el-col>
      	</el-row>
        <div style="width:900px; margin: auto;">
          <p style="font-family:'Microsoft YaHei'; font-size:x-large; margin-left: 50px">热门歌曲</p>
        </div>
      	<el-row>
      		<el-col :span="15" :offset="4">
      			<div style="margin: auto; ">
      				<el-table :data="songListView" style="height: 100%; width: 100%; margin-left:50px;" stripe="true" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
      					<el-table-column type="index" label= " " :index="indexMethod"></el-table-column>
      					<el-table-column label="歌曲">
      						<template slot-scope="scope">
                    <router-link :to="{path:'/user/songdetail',query:{id:scope.row.id}}">
      							<a href="" style="color: black; cursor:  pointer; text-decoration:none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</a>
                    </router-link>   
      						</template>
      					</el-table-column>
      					<el-table-column label=" ">
      						<template slot-scope="scope">
      							<span v-if="scope.row.Flag">
      								<el-button icon="el-icon-caret-right" circle v-on:click="playSong(scope.$index)"></el-button>
      							</span>
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
                 		 		<span v-if="scope.row.Flag"> <el-button icon="el-icon-download" circle v-on:click="downloadSong(scope.row)"></el-button> </span>
                		</template>
              </el-table-column>
       					<el-table-column label="专辑" width=300>
      						<template slot-scope="scope">
                    <router-link :to="{path:'/user/albumdetail',query:{id:scope.row.albumId}}">
      							<a href="" style="margin-right: 50px; color:black;cursor:pointer;text-decoration:none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.albumName}}</a>
                  </router-link>
      						</template>
      					</el-table-column>
      					<el-table-column prop= "duration" label="时长"></el-table-column>
      				</el-table>
      			</div>
      		</el-col>
      	</el-row>
      	<el-pagination style="margin-top: 30px; margin-bottom: 30px" layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="songPageCount" class="pagination"></el-pagination>
        <el-dialog title="创建歌单" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="playlist" :rules="rules" ref="playlist" label-width="100px">
                <el-form-item label="歌单名称" prop="name">
                  <el-input v-model="playlist.name" placeholder="请输入歌单名称"></el-input>
                </el-form-item>
                <el-form-item label="歌单简介" prop="intro">
                  <el-input type="textarea" v-model="playlist.intro" placeholder="请输入歌单简介"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm">完成</el-button>
                  <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <div style="width:900px; margin: auto;">
          <p style="font-family:'Microsoft YaHei'; font-size:x-large; margin-left: 50px">专辑</p>
        </div>
        <el-row style="width:1100px; height: 200px; margin: auto; margin-left: 240px;">
          <ul id="albumlist" data="albumView">
            <li v-for="item in albumView" class="albumli" style="list-style: none;">
              <div class="album">
                <router-link :to="{path:'/user/albumdetail',query:{id:item.id}}">
                  <img class="albumImage" :src=item.image alt=""  @click="setAlbum(item)">
                  <p style="color: black; width: 150px;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';" @click="setAlbum(item)">{{item.name}}</p>
                </router-link>
              </div>
            </li>
          </ul>          
        </el-row>
        <div style="clear: both;"></div>
         <el-pagination style="margin-top: 30px; margin-bottom: 30px" layout="prev, pager, next" @current-change="handleCurrentChange2" :page-count="albumPageCount" class = "pagination">
           </el-pagination>
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
    		dialogVisible:false,
        songPage: 1,
        songPageCount:0,
        albumPage: 1,
        albumPageCount: 0,
        playlist: {
          id:0,
          name: '',
          intro: ''
        },
    		rules: {
    			name: [
    			{required: true, message: '请输入歌单名称', trigger: 'blur'},
    			{min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
    			],
    			intro: [
    			{min: 1, max: 140, message: '长度在 140 个字符以内', trigger: 'blur' }
    			]
    		},
    		userID:'',
    		isLogin:'',
    		artist:{},
        songListView: [],
    		
    		playlistList:[],
        albumView:[],
    	}
    },

    computed: {
      serverUrl() {
        return this.$store.state.serverUrl;
      },
      state() {
        return this.$store.state;
      }
    },

    created() {
      this.artist.id = this.$route.query.id;
    },

      mounted(){
        this.isLogin = this.$store.state.isLogin;
        this.getArtistInfo(this.artist.id);
        this.getPlaylistList();
      },

    methods: {
      /*每页显示十行*/
      S_pagination: function(_page, _songList){
        this.songPageCount = Math.ceil(parseFloat(_songList.length) / 10);
        if(_page != this.songPage){
          this.songPage = _page;
          this.songListView.splice(0,this.songListView.length);
        } 
  
        var len = _songList.length < 10 ? _songList.length : 10;
        for(var i = 0; i < len; i++){
          if(_songList[((this.songPage - 1)*10) + i] != null){
            //var list = [];
            
            var song = _songList[((_page - 1)*10) + i];
            this.songListView.push(song);
          }
        }

      },
      A_pagination: function(_albums,_albumPage){
        this.albumPageCount = Math.ceil(parseFloat(_albums.length) / 4);
        if(_albumPage != this.albumPage){
          this.albumPage = _albumPage;
          this.albumView.splice(0,this.albumView.length);
        }
        for (var i = 0; i < 4; i++) {
          if(_albums[((this.albumPage - 1)*4)+i] != null){
            var album = _albums[((this.albumPage - 1)*4)+i];
            this.albumView.push(album);
          }
        } 
      },
      setAlbum: function(item){
        this.$store.state.albums = item
      },
    	indexMethod(index) {
        
          return (this.songPage - 1)*10 + index + 1;
    	},


    	handleClose(done) {
        this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
        },

      albumDisplay: function(){
          this.axios.get(this.serverUrl + "/artist/getInfo",{

          })
        },
      handleCurrentChange: function(val){
        this.S_pagination(val,this.artist.songList);
      },
      handleCurrentChange2: function(val){
        this.A_pagination(this.artist.albumList,val);
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
		  this.$store.state.songList=this.artist.songList;
		},

		handlealbumNameCommand:function(command){
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
		playSong:function(row){
		  this.$store.state.songList=this.artist.songList[index];
	},
    handleSongCommand:function(command){
      if(command=="login"){
        window.location.href='/';
      }
      else if(command=="newplaylist"){
        this.dialogVisible=true;
      }
      else if(command=="playqueue"){
        this.$store.state.songList.push(this.artist.songList[index]);
      }
      else{
        this.axios.get(this.serverUrl + '/playlist/addSong',{
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
		submitForm:function(){
			this.$refs["playlist"].validate((valid) => {
            if (valid) {
              this.axios.get(this.serverUrl+'/playlist/create',{
                params:{
                  name:this.playlist.name,
                  intro:this.playlist.intro
                }
              })
              .then(response =>{
                if(response!=-1){
                  this.playlist.id=response.data;
                  this.$store.state.playlistList.push(this.playlist);
                  this.getPlaylistList();
                  this.$message({
                    showClose: true,
                    message: '已成功添加到新歌单',
                    type: 'success'
                  });
                  this.dialogVisible=false;
                  this.$refs["playlist"].resetFields();
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

    timestampToTime: function(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate();
        if(D < 10)
          D = '0' + D;
        return Y+M+D;
      },

		getArtistInfo:function(artistId){
          this.axios.get(this.serverUrl+'/artist/getInfo',{
                params:{
                  id:this.artist.id
                }
              })
              .then(response => {
                //console.log(response.data);
                this.artist = response.data;
                console.log(this.artist);
                this.artist.image = this.serverUrl + this.artist.image;
                this.artist.birthday = this.timestampToTime(this.artist.birthday);
                for (var i = 0; i < this.artist.albumList.length; i++) {
                  this.artist.albumList[i].image = this.serverUrl + this.artist.albumList[i].image;
                 }
                // this.artist.songList = response.data.songList
                // this.artist.albumList = response.data.albumList;
                for(var i = 0; i < this.artist.songList.length; i++){
                  this.artist.songList[i].image = this.serverUrl + this.artist.songList[i].image;
                  this.artist.songList[i].filePath = this.serverUrl + this.artist.songList[i].filePath;
                  this.artist.songList[i].lyricsPath = this.serverUrl + this.artist.songList[i].lyricsPath;
                  this.$set(this.artist.songList[i],'Flag',false);
                  this.$set(this.artist.songList[i],'isopen',false);
                 }
                this.$set(this.artist,'isCollected',false);
                this.S_pagination(this.songPage,this.artist.songList);
                this.A_pagination(this.artist.albumList,this.albumPage);
              })
              .catch(function(err){
                console.log(err);
              });
        },

		getPlaylistList:function(){
  		if(this.isLogin){
          this.playlistList=this.$store.state.playlistList;
        }
        else{
          return false;
        }
  		},
	},
}
</script>

<style scoped>
  a {text-decoration: none;}

	.main {
      width:1349px;
   		height: auto;
      margin: auto;
    	opacity: 0.95;
    	position: relative;
      font-family: "Microsoft YaHei";
    	color: #333;
  	}
  .albumli {
      text-align: top;
      float: left;
      width: 20%;
      height: 200px;
      margin-bottom: 30px;
      margin-right: 5px;
    }
  .album {
      background-color: #f6f6f6;
      height: 180px;
      width: 180px;
    }
	.el-popover{
		width:550px;
		height:400px;
		word-wrap: break-word; 
    word-break: normal; 
    overflow-x:hidden;
    overflow-y:scroll;
	}
	.font_artistName{
        font-family:"Microsoft YaHei";
        font-size:xx-large;
        margin-top: 50px;
        margin-bottom: 5px;
	}
  .font_name{
        font-family: "Microsoft YaHei";
        font-size:smaller;
        color: #333333;
        cursor: pointer;
  }
	.font_other{
        font-family:"Microsoft YaHei";
        font-size:Medium;
    }
   	.font_des{
        font-family:"Microsoft YaHei";
        font-size:Medium;
        margin-top: 5px;
    }
    .font_rep{
    	font-family:"Microsoft YaHei";
    	font-size:Medium;
    	margin-top: 5px;
    }

    .spHeight td{
      height:65px;
    }

    .pagination {
    text-align: center;
    font-size: 20px;
    &:hover {
        cursor: pointer;
        color: #31c27c;
      }
    }
    .albumImage{
      width: 180px;
      height: 180px;
      box-sizing: border-box;
      &:hover {
        cursor: pointer;
        opacity: 0.9;
      }
    }
</style>