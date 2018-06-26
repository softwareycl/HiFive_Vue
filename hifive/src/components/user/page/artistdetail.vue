<template>
	<div>
      <v-head></v-head>
      <v-nav></v-nav>
      <div class="main" id="artistdetail" :data="artist">
      	<el-row :gutter="50">
      		<el-col :span="4" :offset="4">
      			<div>
      				<img align=right style="float:left;margin-top:30px; border-radius:70%; height: 230px; overflow:hidden;" :src=artist.image>
      			</div>
      		</el-col>
      		<el-col :span="8">
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
      					<p class="font_des">{{artist.intro}}</p>
      					<el-button type="text" slot="reference" style="color: black; margin-left: 20px; padding-top: 8px;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">[更多]</el-button>
      				</el-popover>
      			</div>
      			<el-button type="primary" icon="el-icon-caret-right" style="background-color:#31C27C" onmouseover="this.style.backgroundColor='#2CAF6F';" onmouseout="this.style.backgroundColor='#31C27C';" v-on:click="playAllSong">播放全部</el-button>
      		</el-col>
      	</el-row>
        <div style="width:900px; margin: auto;">
          <p style="font-family:'Microsoft YaHei'; font-size:x-large;">热门歌曲</p>
        </div>
      	<el-row :gutter="50">
      		<el-col :span="15" :offset="4">
      			<div style="margin: auto; ">
      				<el-table :data="songListView" style="height: 690px;width: 100%; margin-left:50px;" stripe="true" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
      					<el-table-column type="index" label= " " :index="indexMethod"></el-table-column>
      					<el-table-column label="歌曲">
      						<template slot-scope="scope">
                    <router-link :to="{path:'/user/songdetail',query:{id:songListView.id}}">
      							<a href="" style="color: black; cursor:  pointer; text-decoration:none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</a>   
                    </router-link>   
      						</template>
      					</el-table-column>
      					<el-table-column label=" ">
      						<template slot-scope="scope">
      							<span v-if="scope.row.Flag">
      								<el-button icon="el-icon-caret-right" circle v-on:click="playSong(scope.row)"></el-button>
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
       					<el-table-column label="专辑">
      						<template slot-scope="scope">
                    <router-link :to="{path:'/user/albumdetail',query:{id:songListView.albumId}}">
      							<a href="" style="margin-right: 50px; color:black;cursor:pointer;text-decoration:none" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.albumName}}</a>
                  </router-link>
      						</template>
      					</el-table-column>
      					<el-table-column prop= "duration" label="时长"></el-table-column>
      				</el-table>
      			</div>
      		</el-col>
      	</el-row>
      	<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="songPageCount" class="pagination"></el-pagination>
        <div style="width:900px; margin: auto;">
          <p style="font-family:'Microsoft YaHei'; font-size:x-large;">专辑</p>
        </div>
        <el-row style="width:1000px; height: 200px; margin: auto">
          <ul id="albumlist" data="albumView">
            <li v-for="item in albumView" class="albumli" style="list-style: none; width: 150px">
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
         <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange2" :page-count="albumPageCount" class = "pagination">
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
    		ruleForm: {
    			name: '',
    			des: ''
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
    		isLogin:true,
    		artist:{},
        songListView: [],
    		
    		playlistList:[{
    			id:'1',
    			name:'1',
          count:'',
    	  },{
          id:'2',
          name:'2',
          count:'',
        },{
          id:'3',
          name:'3',
          count:'',
    		}],
        albumView:[],
    	}
    },

    computed: {
      serverUrl() {
        return this.$store.state.serverUrl;
      }
    },

    created() {
      this.artist.id = this.$route.query.id;
    },

      mounted(){
        this.getArtistInfo(this.artist.id);
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
            var song = _songList[((this.songPage - 1)*10) + i];
            this.songListView.push(song);
        }
      },
      A_pagination: function(_albums,_albumPage){
        this.albumPageCount = Math.ceil(parseFloat(_albums.length) / 5);
        if(_albumPage != this.albumPage){
          this.albumPage = _albumPage;
          this.albumView.splice(0,this.albumView.length);
        }
        var len = _albums.length < 5 ? _albums.length : 5;
        for (var i = 0; i < 5; i++) {
            var album = _albums[((this.albumPage - 1)*5)+i];
            album.image = this.serverUrl + album.image;
            this.albumView.push(album);
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
		//传递所有歌曲ID给player.vue
		},
		collect:function(albumNameID){
  			this.albumName.isCollected=true;
		//提交专辑id，返回true/false
		},
		cancelCollect:function(albumNameID){ 
  			this.albumName.isCollected=false;
		//提交专辑id，返回true/false
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
		//传递歌曲ID给player.vue
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
            this.$axios.get('',{
              params:{
                id:command.param2.id,
                playlistId:command.param1
              }
            })
            .then(function(response){
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
              console.log(err)
            });
          }
	},
		submitForm:function(formname){
		//提交playlist对象，包括歌单名称和简介，返回-1用户会话超时
			this.$refs[formname].validate((valid) => {
            if (valid) {
              this.$axios.get('',{
                params:{
                  
                }
              })
              .then(function(response){
                if(response){
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
                console.log(err)
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
		//提交歌曲ID，无返回
    this.axios.get('',{
                params:{
                  id:row.id
                }
              })
              .then(function(response){
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
                console.log(err)
              });
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
                // this.artist.songList = response.data.songList
                // this.artist.albumList = response.data.albumList;
                for(var i = 0; i < this.artist.songList.length; i++){
                   this.$set(this.artist.songList[i],'Flag',false);
                   this.$set(this.artist.songList[i],'isopen',false);
                 }
                this.$set(this.artist,'isCollected',false);
                this.S_pagination(this.songPage,this.artist.songList);
                this.A_pagination(this.artist.albumList,this.albumPage);
              })
              .catch(function(err){
                console.log(err)
              });
        },
		getPlaylistList:function(){
		//无提交，返回歌单列表
		},
	},



}
</script>

<style>
  a {text-decoration: none;}

	.main {
   		height: 1500px;
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
      margin-right: 40px;
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