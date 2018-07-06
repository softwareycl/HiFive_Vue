<template>
	<div class="wrapper">
		<v-head></v-head>
		<div class="search_nav">	
			<ul class="menu_2">
				<li v-for="list in headNav" :class="{ nav_color:curTitle == list.title}" @click="cur_title(list.title)">
					{{list.title}}
				</li>
			</ul>
			<div style="clear: both;"></div>
		</div>
		<div class="search_main">
			<div class="search_song" v-if="curTitle == '歌曲'">
				<el-table :data="songList" style="width: 100%" :stripe="true" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="search_spHeight">
					<el-table-column label="歌曲">
						<template slot-scope="scope">
							<router-link tag="a" :to="{path:'/user/songdetail',query:{id:scope.row.id}}">
								<span style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</span>
							</router-link>
						</template>
					</el-table-column>
					<el-table-column label=" ">
						<template slot-scope="scope">
							<span v-if="scope.row.Flag"> <el-button icon="el-icon-caret-right" circle v-on:click="playSong(scope.$index)"></el-button> </span>
							<span v-if="scope.row.Flag"> 
								<el-dropdown trigger="click" placement="bottom-start" @visible-change="handle(scope.row,$event)" @command="handleSongCommand">
									<el-button icon="el-icon-plus" circle></el-button>
									<el-dropdown-menu slot="dropdown" :data="playlistList">
										<el-dropdown-item :command='{type:"playqueue",params:scope.$index}'>播放队列</el-dropdown-item>
										<div v-if="isLogin">
											<el-dropdown-item disabled divided>我喜欢</el-dropdown-item>
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
					<el-table-column label="歌手">
						<template slot-scope="scope">
							<router-link tag="a" :to="{path:'/user/artistdetail',query:{id:scope.row.artistId}}">
								<span style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</span>
							</router-link>
						</template>
					</el-table-column>
					<el-table-column label="专辑">
						<template slot-scope="scope">
							<router-link tag="a" :to="{path:'/user/albumdetail',query:{id:scope.row.albumId}}">
								<span style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.albumName}}</span>
							</router-link>
						</template>
					</el-table-column>
					<el-table-column prop="time" label="时长">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.duration }}</span>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination-footer" style="margin-top:50px">	
					<el-pagination @current-change="handleCurrentChange" :current-page="page.cur" :page-size="20" background layout="total, prev, pager, next" :total="page.total"> </el-pagination>
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
			</div>

			<div class="search_artist" v-if="curTitle == '歌手'">
				<ul id="singerlist">
					<li v-for="item in artistList" class="singerli">
						<div class="singer">
							<router-link tag="a" :to="{path:'/user/artistdetail',query:{id:item.id}}">
								<img :src="item.image" alt="" style="border-radius:100%;padding:35px;">
								<p style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{item.name}}</p>
							</router-link>
						</div>
					</li>
				</ul>
				<div style="clear:both"></div>
				<div class="pagination-footer">	
					<el-pagination @current-change="handleCurrentChange" :current-page="page.cur" :page-size="20" background layout="total, prev, pager, next" :total="page.total"> </el-pagination>
				</div>
			</div>

			<div class="search_artist" v-if="curTitle == '专辑'">
				<el-row gutter="20">
					<el-col :data="albumList" v-for="list in albumList" :key="list.id" style='width:20%'>
						<el-card :body-style="{ padding: '0px'}" shadow="never" style="border:none;margin-bottom:20px;">
							<router-link tag="a" :to="{path:'/user/albumdetail',query:{id:list.id}}">
								<img :src="list.image" class="image">
							</router-link>
							<div style="line-height:8px;font-size:5px;">
								<router-link tag="a" :to="{path:'/user/albumdetail',query:{id:list.id}}">
									<p style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{list.name}}</p>
								</router-link>
								<router-link tag="a" :to="{path:'/user/artistdetail',query:{id:list.artistId}}">
									<p style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{list.artistName}}</p>
								</router-link>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<div class="pagination-footer">	
					<el-pagination @current-change="handleCurrentChange" :current-page="page.cur" :page-size="20" background layout="total, prev, pager, next" :total="page.total"> </el-pagination>
				</div>
			</div>
		</div>
		<v-foot></v-foot>
	</div>
</template>

<script>
	import vHead from '../common/header.vue'
	import vFoot from '../common/footer.vue'

	export default {
		components: {
			vHead,
			vFoot
		},
		computed: {
			serverUrl() {
				return this.$store.state.serverUrl;
			},
			search() {
				return this.$store.state.search;
			},
			state() {
				return this.$store.state;
			}
		},
		mounted () {
			this.isLogin=this.state.isLogin;
			this.getPlaylistList();
			if(this.curTitle == '歌曲') {
				this.getSongList(this.$store.state.search.name,this.page.cur);
				this.getSongTotal(this.$store.state.search.name);
			}					
			else if(this.curTitle == '歌手') {
				this.getArtistList(this.$store.state.search.name,this.page.cur);
				this.getArtistTotal(this.$store.state.search.name);
			}
			else if(this.curTitle == '专辑'){
				this.getAlbumList(this.$store.state.search.name,this.page.cur);
				this.getAlbumTotal(this.$store.state.search.name);
			}
		},
		data () {
			return {
				dialogVisible:false,
				isLogin: '',
				ruleForm: {
					name: '',
					des: ''
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
				newPlaylist: {
					id:'',
					name: '',
					intro: '',
					type:'',
					info:''
				},

				curTitle: '歌曲',
				headNav: [
				{
					title:"歌曲"  
				},
				{
					title:"歌手"                   
				},
				{
					title:"专辑"  
				}],
				songList: [],
				artistList: [],
				albumList: [],
				playlistList:[],
				page: {
					cur: 1,
					total: 0,
				}
			}
		},
		methods: {
			playSong: function(index) {
				this.$store.dispatch("play", [this.songList, index, false]);
			},
			cur_title: function(title) {
				this.curTitle = title;
				this.page.cur = 1;
				if(this.curTitle == '歌曲') {
					this.getSongList(this.$store.state.search.name,this.page.cur);
					this.getSongTotal(this.$store.state.search.name);
				}					
				else if(this.curTitle == '歌手') {
					this.getArtistList(this.$store.state.search.name,this.page.cur);
					this.getArtistTotal(this.$store.state.search.name);
				}
				else if(this.curTitle == '专辑'){
					this.getAlbumList(this.$store.state.search.name,this.page.cur);
					this.getAlbumTotal(this.$store.state.search.name);
				}
			},

			handleMouseEnter:function(row, column, cell, event){				
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
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
			},
			handleSongCommand:function(command){
				if(command=="login"){
					window.location.href='/';
				}
				else if(command.type=="newplaylist"){
					this.dialogVisible=true;
					this.newPlaylist.type="song";
					this.newPlaylist.info=command.params.id;
				}
				else if(command.type=="playqueue"){
					var song = this.songList[command.params];
					var songs = [song];
					this.$store.dispatch("addToSongList", songs);
				}
				else{
					this.addSongToPlaylist(command.param2.id,command.param1);
				}
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
								sessionStorage.setItem('playlistList', JSON.stringify(this.$store.state.playlistList));
								this.getPlaylistList();
								this.dialogVisible=false;
								this.$refs["newPlaylist"].resetFields();
								this.$message({
									showClose: true,
									message: '歌单创建成功',
									type: 'success'
								});
								this.addSongToPlaylist(this.newPlaylist.info,response.data);
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
				} else {
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

			handleCurrentChange: function(c){
				this.page.cur = c;
				if(this.curTitle == '歌曲')
					this.getSongList(this.$store.state.search.name,this.page.cur)
				else if(this.curTitle == '歌手')
					this.getArtistList(this.$store.state.search.name,this.page.cur)
				else
					this.getAlbumList(this.$store.state.search.name,this.page.cur)
			},

			getSongList: function(_name, _page) {      //获取一页歌曲
				this.axios.get(this.serverUrl + "/song/searchSong", {
					params: {
						name: _name,
						page: _page
					}
				})
				.then(res => {
					this.songList = res.data;
					for(var i = 0; i < this.songList.length; i++){
						this.$set(this.songList[i],'Flag',false);
						this.$set(this.songList[i],'isopen',false);
						this.songList[i].image = this.serverUrl + this.songList[i].image;
						this.songList[i].lyricsPath = this.serverUrl + this.songList[i].lyricsPath;
						this.songList[i].filePath = this.serverUrl + this.songList[i].filePath
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			getArtistList: function(_name, _page) {      //获取一页歌手
				this.axios.get(this.serverUrl + "/artist/searchArtist", {
					params: {
						name: _name,
						page: _page
					}
				})
				.then(res => {
					this.artistList = res.data;
					for(var i = 0; i < res.data.length; i++){
						this.artistList[i].image = this.serverUrl + this.artistList[i].image;
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			getAlbumList: function(_name, _page) {      //获取一页专辑
				this.axios.get(this.serverUrl + "/album/searchAlbum", {
					params: {
						name: _name,
						page: _page,
					}
				})
				.then(res => {
					this.albumList = res.data;
					for(var i = 0; i < res.data.length; i++){
						this.albumList[i].image = this.serverUrl + this.albumList[i].image;
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			getSongTotal: function(_name) {
				this.axios.get(this.serverUrl + "/song/searchSongCount", {
					params: {
						name: _name,
					}
				})
				.then(res => {
					this.page.total = res.data;					
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			getArtistTotal: function(_name) {
				this.axios.get(this.serverUrl + "/artist/searchArtistCount", {
					params: {
						name: _name,
					}
				})
				.then(res => {
					this.page.total = res.data;					
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			getAlbumTotal: function(_name) {
				this.axios.get(this.serverUrl + "/album/searchAlbumCount", {
					params: {
						name: _name,
					}
				})
				.then(res => {
					this.page.total = res.data;					
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			// setSong: function(item){
   //      		this.$store.state.song.id = item
   //    		},
   //    		setAlbum: function(item){
   //      		this.$store.state.album = item
   //    		},
   //    		setArtist: function(item){
   //      		this.$store.state.album = item
   //    		},
		},
		
	};
</script>

<style>
	.search_nav {
		/*border-bottom: 1px solid #E6E6E6;*/
		margin: 0 200px;
	}
	.search_nav .menu_2 {
		padding: 0px;
		margin: 0px;
		padding-left: 30px;
		padding-top: 20px;
		margin-right: -50px;
	}
	.search_nav .menu_2 li {
		float: left;
		list-style-type: none;
		line-height: 50px;
		margin-right: 47px;
		cursor: pointer;
	}
	.search_nav .menu_2 li:hover {
		color: #31C27C;
	}
	.nav_color {
		color: #31C27C;
	}

	.search_main {
		min-height: 500px;
		margin: 10px 100px;
	}

	.search_spHeight td{
		height: 65px;
	}


	.image {
		width: 100%;
		max-height: 200px;
		display: block;
	}

	.pagination-footer {
		text-align: center;
		margin-bottom: 40px;
		margin-top: 20px; 
	}

	a {
		 text-decoration:none;
		 out-line: none;
	}
</style>

<style lang="scss" scoped>
	#singerlist{

		.singerli {
			text-align: top;
			float: left;
			width: 20%;
			height: 300px;
			.singer {
				background-color: rgb(251,251,253);
				margin-top: 0px;
				height: 250px;
				width: 210px;
				margin-left: 12px;
			}
			img {
				width: 210px;
				height: 210px;
				box-sizing: border-box;
				&:hover {
					cursor: pointer;
					opacity: 0.9;
				}
			}
			p {
				margin-left: 60px;
				margin-right: 60px;
				margin-top: 0px;
				font-size: 16px;
				text-align: center;
				&:hover {
					cursor: pointer;
					color: #31c27c;
				}
			}
		}
	}

	.search_artist {
		ul {
			margin: 0 auto;
			height: 100%;
			max-width: 1200px;
			list-style-type:none;
		}
	}
</style>