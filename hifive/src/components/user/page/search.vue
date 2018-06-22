<template>
	<div class="wrapper">
		<v-head></v-head>
		<div class="search_nav">	
			<ul class="menu_2">
				<li v-for="list in headNav" :class="{ nav_color:curTitle == list.title}" @click="cur_title(list.title)" @mouseover="mo()">
					{{list.title}}
				</li>
			</ul>
			<div style="clear: both;"></div>
		</div>
		<div class="search_main">
			<div class="search_song" v-if="curTitle == '歌曲'">
				<el-table :data="songList" style="width: 100%" stripe="true" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" class="spHeight">
					<el-table-column label="歌曲">
						<template slot-scope="scope">
							<a herf="" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.name}}</a>
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
							<span v-if="scope.row.Flag"> <el-button icon="el-icon-download" circle v-on:click="downloadSong(scope.row)"></el-button> </span>
						</template>
					</el-table-column>
					<el-table-column label="歌手">
						<template slot-scope="scope">
							<a herf="" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.artistName}}</a>
						</template>
					</el-table-column>
					<el-table-column label="专辑">
						<template slot-scope="scope">
							<a herf="" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{scope.row.albumName}}</a>
						</template>
					</el-table-column>
					<el-table-column prop="time" label="时长">
						<template slot-scope="scope">
							<span style="margin-left: 10px">{{ scope.row.duration }}</span>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination-footer" style="margin-top:50px">	
					<el-pagination @current-change="handleCurrentChange" :current-page="page.cur" :page-size="20" background="#31C27C" layout="total, prev, pager, next" :total="page.total"> </el-pagination>
				</div>
			</div>
			<div class="search_artist" v-if="curTitle == '歌手'">
				<el-row gutter="20">
					<el-col :data="artistList" v-for="list in artistList" style='width:20%'>
						<el-card :body-style="{ padding: '0px'}" shadow="never" style="border:none;margin-bottom:20px;">							
							<div style="line-height:8px;font-size:5px;text-align:center">
								<img src="../../../assets/icon.jpg" class="image">	
								<p>{{list.name}}</p>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<div class="pagination-footer">	
					<el-pagination @current-change="handleCurrentChange" :current-page="page.cur" :page-size="20" background="#31C27C" layout="total, prev, pager, next" :total="page.total"> </el-pagination>
				</div>
			</div>
			<div class="search_artist" v-if="curTitle == '专辑'">
				<el-row gutter="20">
					<el-col :data="albumList" v-for="list in albumList" style='width:20%'>
						<el-card :body-style="{ padding: '0px'}" shadow="never" style="border:none;margin-bottom:20px;">
							<img src="../../../assets/icon.jpg" class="image">
							<div style="line-height:8px;font-size:5px;">
								<p>{{list.name}}</p>
								<p>{{list.artistName}}</p>
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
			}
		},
		mounted () {
			this.getPlaylistList();
			if(this.curTitle == '歌曲') {
				this.getSongList(this.$store.state.search.name,this.page.cur);
				this.getSongTotal(this.$store.state.search.name);
			}					
			else if(this.curTitle == '歌手') {
				this.getArtistList(this.$store.state.search.name,this.page.cur);
				this.getArtistTotal(this.$store.state.search.name);
			}
			else {
				this.getAlbumList(this.$store.state.search.name,this.page.cur);
				this.getAlbumTotal(this.$store.state.search.name);
			}
		},
		data () {
			return {
				dialogVisible:false,
				ruleForm: {
					name: '',
					des: ''
				},
				rules: {
					name: [
					{ required: true, message: '请输入歌单名称', trigger: 'blur' },
					{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
					],
					des: [
					{ min: 1, max: 140, message: '长度在 140 个字符以内', trigger: 'blur' }
					]
				},
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
				songList: [{
					id: '1',
					name: '心之科学',
					duration: '03:55',
					albumId: '1',
					albumName: 'qqqq',
					artistId: '1',
					artistName: '容祖儿',
					filePath: '',
					image: '',
					lyricsPath: '',
					Flag:false,
					isopen:false
				}],
				artistList: [{
					id: '1',
					name: '郭吉吉',
					image: ''
				},
				{
					id: '1',
					name: '郭吉吉',
					image: ''
				},
				{
					id: '1',
					name: '郭吉吉',
					image: ''
				},
				{
					id: '1',
					name: '郭吉吉',
					image: ''
				},
				{
					id: '1',
					name: '郭吉吉',
					image: ''
				},
				{
					id: '1',
					name: '郭吉吉',
					image: ''
				},],
				albumList: [{
					id: '1',
					name: '郭吉吉',
					image: '',
					artistId: '1',
					artistName: '郭喆',
					count: 1
				}],
				page: {
					cur: 1,
					total: 100,
				}
			}
		},
		methods: {
			cur_title: function(title) {
				this.curTitle = title;
				this.page.cur = 1;
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
				else if(command=="newplaylist"){
					this.dialogVisible=true;
				}
				else if(command=="playqueue"){

				}
				else{
					console.log(command.param1);
					console.log(command.param2.ID)
				}
			},

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

			downloadSong:function(row){

			},

			getPlaylistList:function(){

			},

			playSong:function(row){

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
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			getArtistList: function(name, page) {      //获取一页歌手
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
			getAlbumList: function(name, page) {      //获取一页专辑
				this.axios.get(this.serverUrl + "/album/searchAlbum", {
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
			getSongTotal: function(name) {
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
			getArtistTotal: function(name) {
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
			getAlbumTotal: function(name) {
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
		}
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
		min-height: 400px;
		margin: 10px 100px;
	}

	.spHeight td{
		height: 65px;
	}


	.image {
		width: 100%;
		display: block;
	}

	.pagination-footer {
		text-align: center;
		margin-bottom: 40px;
		margin-top: 20px; 
	}
</style>