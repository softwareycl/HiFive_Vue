<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-nav></v-nav>
		<div class="song_detail">
			<el-row :gutter="50">
				<el-col :span="4" :offset="4">
					<div>
						<img align=right style="margin-top:30px" :src="song.image">
					</div>
				</el-col>
				<el-col :span="9">
					<div>
						<p class="font_songName">{{song.name}}</p>
						<i class="el-icon-service"></i>
						<router-link tag="a" :to="{path:'/user/artistdetail',query:{id:song.artistId}}">
							<span class="font_songArtist"  style="cursor:pointer;color:#2C3E50" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#2C3E50';">{{song.artistName}}</span>
						</router-link>
						<div>
							<router-link tag="a" :to="{path:'/user/artistdetail',query:{id:song.artistId}}">
								<p class="font_other" style="float:left;width:250px;color:#2C3E50;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#2C3E50';">专辑 : {{song.albumName}}</p>
							</router-link>
							<p class="font_other" style="float:left">语种 : {{song.language}}</p>
							<div style="clear:both"></div>
						</div>
						<div>
							<!-- <p class="font_other" style="float:left;width:250px">流派 : {{song.style}}</p>
							<p class="font_other" style="float:left">发行时间 : {{song.releaseDate}}</p>
							<div style="clear:both"></div> -->
							<span class="font_other" style="display:block;width:250px;float:left">流派 : {{song.style}}</span>
							<span class="font_other">发行时间 : {{song.releaseDate}}</span>
						</div>
						<div style="margin-top:20px">
							<el-button type="primary" icon="el-icon-caret-right" style="background-color:#31C27C" onmouseover="this.style.backgroundColor='#2CAF6F';" onmouseout="this.style.backgroundColor='#31C27C';" v-on:click="playSong">播放</el-button>
							<el-button v-if="song.isCollected" icon="el-icon-star-on" v-on:click="cancelCollect">已收藏</el-button>
							<el-button v-else icon="el-icon-star-off" v-on:click="collect">收藏</el-button>
							<el-dropdown trigger="click" id="dropdown" @command="handleSongCommand">
								<el-button icon="el-icon-plus" v-on:click="getPlaylistList">添加到<i class="el-icon-arrow-down el-icon--right"></i>
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
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="50" style="margin-top:30px;">
				<el-col :span="4" :offset="4">
					<p class="font_songLry" style="font-size:20px">歌词</p>
					<p style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;" id="lyr">{{this.id}}</p>
				</el-col>
			</el-row>
		</div>
		<v-foot></v-foot>
	</div>
</template>

<script>
	import vHead from '../common/header.vue'
	import vNav from '../common/navigation.vue'
	import vFoot from '../common/footer.vue'

	export default {
		created() {
			this.id = this.$route.query.id;
		},
		mounted() {
			if(this.$store.state.isLogin == true) {
				this.state = true;
			}
			this.getIntro(this.id);
		},
		components: {
			vHead,
			vNav,
			vFoot
		},
		computed: {
			song () {
				return this.$store.state.song;
			},
			state () {
				return this.$store.state;
			}
		},
		data () {
			return {
				id: '',
				song:{
					id:'001',
					name:'心之科学',
					artistId: '01',
					artistName:'容祖儿',
					language: '中文',
					style:'Pop流行',
					albumId: '01',
					albumName:'污污污',
					duration: '03:55',
					releaseDate:'2018-06-16',
					lyricsPath: "/static/lyr.txt",
					filePath: '',
					image: "/src/assets/logo.png",
					isCollected:false
				},
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
				state:true,
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
			}
		},
		methods: {
			playSong: function() {

			},
			collect:function(){
				this.song.isCollected=true;
			},
			cancelCollect:function(){ 
				this.song.isCollected=false;
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
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
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

			getIntro: function(_id) {
				this.axios.get(this.serverUrl + "/song/getInfo", {
					params: {
						id: _id,
					}
				})
				.then(res => {
					this.song = res.data;
					this.song.image = this.serverUrl + this.song.image;
					this.song.lyricsPath = this.serverUrl + this.song.lyricsPath;
				})
				.catch(function (error) {
					console.log(error);
				});
			},
		},
	};
</script>

<style>
	.song_detail {
		min-height: 500px;
	}
	.font_songName{
		font-family:"Microsoft YaHei";
		font-size:xx-large;
	}
	a {
		text-decoration:none;
		 out-line: none;
	}
</style>