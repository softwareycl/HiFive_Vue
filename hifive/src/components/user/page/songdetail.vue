<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-nav></v-nav>
		<div class="song_detail">
			<el-row :gutter="50" style="background: linear-gradient(#F2F2F2, #FFFFFF);">
				<el-col :span="4" :offset="4">
					<div>
						<img align=right style="margin-top:25px;height:235px;width:235px" :src="song.image">
					</div>
				</el-col>
				<el-col :span="12">
					<div>
						<p class="font_songName" style="margin-bottom:10px">{{song.name}}</p>
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
							<el-button icon="el-icon-download" v-on:click="downloadSong">下载</el-button>
							<el-dropdown trigger="click" id="dropdown" @command="handleSongCommand">
								<el-button icon="el-icon-plus" v-on:click="getPlaylistList">添加到<i class="el-icon-arrow-down el-icon--right"></i>
								</el-button>
								<el-dropdown-menu slot="dropdown" :data="playlistList">
									<el-dropdown-item command="playqueue">播放队列</el-dropdown-item>
									<div v-if="isLogin">
										<el-dropdown-item v-for="playlist in playlistList" :key="playlist.id" :command='{type:"playlist",params:playlist.id}'>{{playlist.name}}</el-dropdown-item>
										<el-dropdown-item command="newplaylist" divided>添加到新歌单</el-dropdown-item>
									</div>
									<el-dropdown-item v-else command="login" divided>登录后添加到歌单</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
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
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="50" style="margin-top:30px;">
				<el-col :span="8" :offset="3">
					<div style="margin-bottom:30px;">
						<p class="font_songLry" style="font-size:20px">歌词</p>
						<div v-bind:class="{fold: isfold}" id="lyr"></div>
						<button v-if="isfold" @click="isfold = false" style="border:0px;background-color:transparent;margin-top:10px;outline:none;cursor:pointer;color:#31C27C">[展开]</button>
						<button v-if="!isfold" @click="isfold = true" style="border:0px;background-color:transparent;margin-top:10px;outline:none;cursor:pointer;color:#31C27C">[收起]</button>
					</div>
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
			// sessionStorage.setItem('songDetail_id', this.$route.query.id);
			this.id = this.$route.query.id;
			window.scrollTo(0,0);
		},
		mounted() {
			this.isLogin=this.state.isLogin;
			this.getIntro(this.id);  
		},
		components: {
			vHead,
			vNav,
			vFoot
		},
		computed: {
			state () {
				return this.$store.state;
			},
			serverUrl(){
          		return this.$store.state.serverUrl;
        	}
		},
		data () {
			return {
				isfold: true,
				id: '',
				isLogin: '',
				song:{
					id:'',
					name:'',
					artistId: '',
					artistName:'',
					language: '',
					style:'',
					albumId: '',
					albumName:'',
					duration: '',
					releaseDate:'',
					lyricsPath: "",
					filePath: '',
					image: "",
				},
				newPlaylist: {
					id:'',
					name: '',
					intro: '',
					type:'',
					info:''
				},
				playlistList:[],
				dialogVisible:false,
				rules: {
					name: [
					{ required: true, message: '请输入歌单名称', trigger: 'blur' },
					{ min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
					],
					intro: [
					{ min: 1, max: 680, message: '长度在 680 个字符以内', trigger: 'blur' }
					]
				},
				style: ['', 'POP 流行', 'ELECTRONIC 电子','ROCK 摇滚', 'CLASSIC 古典','FOLK 民谣', 'R&B', '其他'],
			}
		},
		methods: {
			//播放歌曲
			playSong: function() {
				this.$store.dispatch("play", [this.song, 0, true]);
			},

			//收藏歌曲到我喜欢
			collect:function(){
				if(this.isLogin){
					this.axios.get(this.serverUrl+'/user/likeSong',{
						params:{
							songId:this.song.id
						}
					})
					.then(response =>{
						if(response){
							this.state.likeSongs.push(this.song);
							this.song.isCollected=true;
							sessionStorage.setItem('likeSongs', JSON.stringify(this.$store.state.likeSongs));
							this.$message({
								showClose: true,
								message: '收藏歌曲成功',
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
				else{
					this.$confirm('还未登录,是否现在登录?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(() => {
						this.$router.push({
					        path: '/user/unlogin'
					    });
					}).catch(() => {
					});
				}
			},

			//取消收藏
			cancelCollect:function(){ 
				this.axios.get(this.serverUrl+'/user/unlikeSong',{
					params:{
						songId:this.song.id
					}
				})
				.then(response =>{
					if(response){
						for(var i=0;i<this.state.likeSongs.length;i++){
							if(this.state.likeSongs[i].id==this.song.id){
								this.state.likeSongs.splice(i,1);
								break;
							}
						}
						this.song.isCollected=false;
						this.$message({
							showClose: true,
							message: '取消收藏成功',
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

			//处理点击添加到时候的事件
			handleSongCommand:function(command){
				if(command=="login"){
					this.$router.push({
				        path: '/user/unlogin'
				    });
				}
				else if(command=="newplaylist"){
					this.dialogVisible=true;
					this.newPlaylist.type="song";
					this.newPlaylist.info=this.song.id;
				}
				else if(command=="playqueue"){
					
				}
				else{
					this.addSongToPlaylist(command.params);
				}
			},

			//处理取消弹出框时候的操作
			handleClose(done) {
				this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {});
			},

			//验证表单
			submitForm:function(formname){
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
								this.addSongToPlaylist(response.data);
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

			//获取歌曲详细信息
			getIntro: function(_id) {
				this.axios.get(this.serverUrl + "/song/getInfo", {
					params: {
						id: _id,
					}
				})
				.then(res => {
					this.song = res.data;
					if(this.song.image == null) {
						this.song.image = "../../../assets/暂无图片.png";
					}
					else
						this.song.image = this.serverUrl + this.song.image;
					this.song.lyricsPath = this.serverUrl + this.song.lyricsPath;
					this.song.releaseDate = this.timestampToTime(this.song.releaseDate);
					this.song.filePath = this.serverUrl + this.song.filePath;
					this.song.style = this.style[this.song.style];
					this.$set(this.song,'isCollected',false);
					this.getIsCollected();
					this.axios.get(this.song.lyricsPath, {
						params: {
						}
					})
					.then(res => {
						var textHTML=res.data;
						document.getElementById("lyr").innerHTML=textHTML.replace(/(\n)+|(\r\n)+/g,"<br>");

					})
					.catch(function (error) {
						console.log(error);
					});
					// var xmlhttp=new XMLHttpRequest();
					// xmlhttp.onreadystatechange=function()
					// {
					// 	var textHTML=xmlhttp.responseText;
					// 	textHTML=textHTML.replace(/(\n)+|(\r\n)+/g,"<br>");
					// 	document.getElementById("lyr").innerHTML=textHTML;
					// }
					// xmlhttp.open("GET",this.song.lyricsPath,true);
					// xmlhttp.overrideMimeType("text/html;charset=gb2312");
					// xmlhttp.send();
				})
				.catch(function (error) {
					console.log(error);
				});
			},

			//转换时间格式
			timestampToTime: function(timestamp) {
		        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		        var Y = date.getFullYear() + '-';
		        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        var D = date.getDate();
		        if(D < 10)
		        	D = '0' + D;
		        return Y+M+D;
	      	},

	      	//下载歌曲
	      	downloadSong: function(){
	      		if(this.isLogin){
					window.location.href = this.serverUrl + "/download/downloadSong?id=" + this.song.id;
				} else {
					this.$confirm('还未登录,是否现在登录?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(() => {
						this.$router.push({
					        path: '/user/unlogin'
					    });
					}).catch(() => {
					});
				}
	      	},

	      	//获取我的歌单
	      	getPlaylistList:function(){
	      		if(this.isLogin){
	      			this.playlistList=this.state.playlistList;
	      		}
	      		else{
	      			return false;
	      		}
	      	},

	      	//获取歌曲是否已经被收藏
	      	getIsCollected:function(){
	      		var flag=false;
	      		for(var i=0;i<this.state.likeSongs.length;i++){
	      			if(this.song.id==this.state.likeSongs[i].id){
	      				flag=true;
	      				break;
	      			}
	      		}
	      		this.song.isCollected=flag;
	      	},

	      	// 添加歌曲到已有歌单
	      	addSongToPlaylist:function(playlistId){
	      		this.axios.get(this.serverUrl+'/playlist/addSong',{
	      			params:{
	      				songId:this.song.id,
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
		},
	};
</script>

<style scoped>
	.song_detail {
		min-height: 600px;
		padding: 5px 30px;
	}
	.font_songName{
		font-family:"Microsoft YaHei";
		font-size:xx-large;
	}
	a {
		text-decoration:none;
		 out-line: none;
	}

	.fold {
		max-height: 400px;
		overflow: hidden;
	}
</style>