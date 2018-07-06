<template>
	<div class="wrapper">
		<v-head></v-head>
		<div class="Asong_detail">
			<el-row :gutter="50">
				<el-col :span="4" :offset="4">
					<div>
						<img align=right style="margin-top:25px;height:235px;width:235px" :src="song.image">
					</div>
				</el-col>
				<el-col :span="9">
					<div>
						<p class="font_songName" style="margin-bottom:10px">{{song.name}}</p>
						<i class="el-icon-service"></i>
						<router-link tag="a" :to="{path:'/admin/artistdetail',query:{id:song.artistId}}">
							<span class="font_songArtist"  style="cursor:pointer;color:#2C3E50" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#2C3E50';">{{song.artistName}}</span>
						</router-link>
						<div>
							<router-link tag="a" :to="{path:'/admin/artistdetail',query:{id:song.artistId}}">
								<p class="font_other" style="float:left;width:250px;color:#2C3E50;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#2C3E50';">专辑 : {{song.albumName}}</p>
							</router-link>
							<p class="font_other" style="float:left">语种 : {{song.language}}</p>
							<div style="clear:both"></div>
						</div>
						<div>
							<span class="font_other" style="display:block;width:250px;float:left">流派 : {{song.style}}</span>
							<span class="font_other">发行时间 : {{song.releaseDate}}</span>
						</div>
						<div style="margin-top:20px">
							<el-button type="primary" icon="el-icon-edit" style="background-color:#31C27C" onmouseover="this.style.backgroundColor='#2CAF6F';" onmouseout="this.style.backgroundColor='#31C27C';" v-on:click="edit">编辑</el-button>
							<el-button icon="el-icon-delete" v-on:click="deleteSong">删除</el-button>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="50" style="margin-top:30px;">
				<el-col :span="8" :offset="3">
					<div style="margin-bottom:30px;">
						<p class="font_songLry" style="font-size:20px">歌词</p>
						<el-upload class="lyr-uploader" action="http://192.168.20.99:8080/hifive/upload/uploadLyrics" :data={id:this.song.id} :limit="1" :on-exceed="exceedTip" :on-success="handleLyrSuccess">
							<el-button slot="trigger" size="small" type="primary">上传歌词</el-button>

						</el-upload>
						<div v-bind:class="{fold: isfold}" id="lyr"></div>
						<button v-if="isfold" @click="isfold = false" style="border:0px;background-color:transparent;margin-top:10px;outline:none;cursor:pointer;color:#31C27C">[展开]</button>
						<button v-if="!isfold" @click="isfold = true" style="border:0px;background-color:transparent;margin-top:10px;outline:none;cursor:pointer;color:#31C27C">[收起]</button>
					</div>
				</el-col>
			</el-row>
			<el-dialog title="编辑歌曲信息" :visible.sync="dialogVisible" width="40%" center="true">
				<el-form :model="editSong" :rules="rules" ref="editSong" label-width="100px">
					<el-form-item label="歌名" prop="name">
						<el-input v-model="editSong.name"></el-input>
					</el-form-item>
					<el-form-item label="歌曲图片" prop="image">
						<img :src="editSong.image" class="avatar" style="margin-right:20px">
						<el-upload class="avatar-uploader" ref="upload" :data={id:editSong.id} :on-change="previewImg" action="http://192.168.20.99:8080/hifive/upload/uploadSongImage" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-error="handleLyrError" accept=".jpg, .jpeg, png" :auto-upload="false">
							<el-button slot="trigger" size="small" type="primary">点击更改图片</el-button>
							<div>
								<div>图片大小不超过2M</div>				
								<div>上传图片格式为:jpg/jpeg/png</div>
							</div>
						</el-upload>
						<div style="clear:both"></div>
					</el-form-item>
					<el-form-item label="歌手名" prop="artistName">
						<el-input v-model="editSong.artistName" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="专辑" prop="albumName">
						<el-input v-model="editSong.albumName" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="语种" prop="language">
						<el-input v-model="editSong.language" ></el-input>
					</el-form-item>
					<el-form-item label="流派" prop="style">
						<el-select v-model="editSong.style" :placeholder="editSong.style">
							<el-option label="POP 流行" value="POP 流行"></el-option>
							<el-option label="ELECTRONIC 电子" value="ELECTRONIC 电子"></el-option>
							<el-option label="ROCK 摇滚" value="ROCK 摇滚"></el-option>
							<el-option label="CLASSIC 古典" value="CLASSIC 古典"></el-option>
							<el-option label="FOLK 民谣" value="FOLK 民谣"></el-option>
							<el-option label="R&B" value="R&B"></el-option>
							<el-option label="其他" value="其他"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发行时间" prop="releaseDate">
						<!-- <el-input v-model="editSong.artistName" ></el-input> -->
						<el-date-picker type="date" :placeholder="editSong.releaseDate" v-model="editSong.releaseDate" style="width: 100%;"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="finishEdit('editSong')">完成</el-button>
						<el-button @click="dialogVisible=false">取消</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
		<v-foot></v-foot>
	</div>
</template>

<script>
	import vHead from './header.vue'
	import vFoot from '../user/common/footer.vue'

	export default {
		created() {
			this.id = this.$route.query.id;
		},
		mounted() {
			this.getIntro(this.id);  
		},
		components: {
			vHead,
			vFoot
		},
		computed: {
			state () {
				return this.$store.state;
			},
		},
		data () {
			return {
				isfold: true,
				id: '',
				flag: false,
				img_change: false,
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
				editSong: {
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
				dialogVisible:false,
				ruleForm: {
					name: '',
					des: ''
				},
				rules: {
					name: [
					{ required: true, message: '请输入歌曲名称', trigger: 'blur' },
					{ min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
					],
					artistName: [
					{ required: true, message: '请输入歌手名称', trigger: 'blur' }
					],
					albumName: [
					{ required: true, message: '请输入专辑名称', trigger: 'blur' }
					],
					language: [
					{ required: true, message: '请输入语种', trigger: 'blur' }
					],
					style: [
					{ required: true, message: '请输入流派', trigger: 'blur' }
					],
					releaseDate: [
					{ required: true, message: '请输入发行时间', trigger: 'blur' }
					],
				},
				style: ['', 'POP 流行', 'ELECTRONIC 电子','ROCK 摇滚', 'CLASSIC 古典','FOLK 民谣', 'R&B', '其他'],
			}
		},
		methods: {
			deleteSong:function(){ 
				alert(this.song.name);
				this.$confirm('确认删除？')
				.then(_ => {
					this.axios.get(this.serverUrl+'/song/removeSong',{
						params:{
							id:this.song.id,
						}
					})
					.then(response =>{
						if(response){
							this.$message({
								showClose: true,
								message: '歌曲删除成功',
								type: 'success'
							});
							this.$router.go(-1);
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
			edit: function() {
				this.dialogVisible = true;
				this.img_change = false;
				this.editSong.id = this.song.id;
				this.editSong.name = this.song.name;
				this.editSong.artistId = this.song.artistId;
				this.editSong.artistName = this.song.artistName;
				this.editSong.language = this.song.language;
				this.editSong.style = this.song.style;
				this.editSong.albumId = this.song.albumId;
				this.editSong.albumName = this.song.albumName;
				this.editSong.duration = this.song.duration;
				this.editSong.releaseDate = this.song.releaseDate;
				this.editSong.lyricsPath = this.song.lyricsPath;
				this.editSong.filePath = this.song.filePath;
				this.editSong.image = this.song.image;
			},
			finishEdit: function(_song) {
				if(this.img_change) {
					this.$refs.upload.submit();
					this.img_change = false;
				}
				// this.submitForm(_song);
				// if(this.flag) {
				// 	this.flag = false;
				// 	if(this.img_change) {
				// 		this.$refs.upload.submit();
				// 		this.img_change = false;
				// 	}
				// 	this.axios.post(this.$store.state.serverUrl + "/song/modifySong", {
				// 		id: this.editSong.id,
				// 		name: this.editSong.name,
				// 		language: this.editSong.language,
				// 		style: this.getStyleNumber(this.editSong.style),
				// 		releaseDate: this.editSong.releaseDate
				// 	})
				// 	.then(res => {
				// 		var tip = res.data;
				// 		if(tip == true) {
				// 			alert("修改成功");
				// 			this.dialogVisible = false;
				// 			this.getIntro(this.id);
				// 		}
				// 		else if(tip == false) {
				// 			alert("修改失败");
				// 		}
				// 	})
				// 	.catch(function (error) {
				// 		console.log(error);
				// 	});
				// }
			},
			submitForm:function(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.flag = true;
						return true;
						// this.dialogFormVisible = false;
					} else {
						console.log('error submit!!');
						this.flag = false;
						return false;
					}
				});
			},

			getIntro: function(_id) {
				this.axios.get(this.$store.state.serverUrl + "/song/getInfo", {
					params: {
						id: _id,
					}
				})
				.then(res => {
					this.song = res.data;
					this.song.image = this.$store.state.serverUrl + this.song.image;
					this.song.lyricsPath = this.$store.state.serverUrl + this.song.lyricsPath;
					this.song.releaseDate = this.timestampToTime(this.song.releaseDate);
					this.song.style = this.style[this.song.style];

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
					this.editSong.id = this.song.id;
					this.editSong.name = this.song.name;
					this.editSong.artistId = this.song.artistId;
					this.editSong.artistName = this.song.artistName;
					this.editSong.language = this.song.language;
					this.editSong.style = this.song.style;
					this.editSong.albumId = this.song.albumId;
					this.editSong.albumName = this.song.albumName;
					this.editSong.duration = this.song.duration;
					this.editSong.releaseDate = this.song.releaseDate;
					this.editSong.lyricsPath = this.song.lyricsPath;
					this.editSong.filePath = this.song.filePath;
					this.editSong.image = this.song.image;
				})
				.catch(function (error) {
					console.log(error);
				});
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
	      	beforeAvatarUpload: function(file) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2M;
			},
			// submitUpload: function() {
			// 	this.$refs.upload.submit();
			// },
			handleAvatarSuccess: function() {
				this.submitForm(_song);
				if(this.flag) {
					this.flag = false;
					this.axios.post(this.$store.state.serverUrl + "/song/modifySong", {
						id: this.editSong.id,
						name: this.editSong.name,
						language: this.editSong.language,
						style: this.getStyleNumber(this.editSong.style),
						releaseDate: this.editSong.releaseDate
					})
					.then(res => {
						var tip = res.data;
						if(tip == true) {
							alert("修改成功");
							this.dialogVisible = false;
							this.getIntro(this.id);
						}
						else if(tip == false) {
							alert("修改失败");
						}
					})
					.catch(function (error) {
						console.log(error);
					});
				}
			},
			previewImg: function(file,fileList) {
				this.editSong.image = file.url;
				this.img_change = true;
				if(fileList.length > 1) {
					fileList.splice(0, 1);
				}
			},
			handleLyrError: function(err) {
				console.log(err);
				alert('上传失败');
				return;
			},
			handleLyrSuccess: function() {
				this.axios.get(this.$store.state.serverUrl + "/song/getInfo", {
					params: {
						id: this.song.id,
					}
				})
				.then(res => {
					this.song.lyricsPath = this.$store.state.serverUrl + res.data.lyricsPath;
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
					this.editSong.lyricsPath = this.song.lyricsPath;
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			getStyleNumber:function(style){
				var number=-1;
				for(var i=0;i<this.style.length;i++){
					if(style==this.style[i]){
						number=i;
					}
				}
				return number;
			},
			exceedTip: function() {
				this.$message('每次最多上传一个文件');
			},
		},
	};
</script>

<style scoped>
	.Asong_detail {
		min-height: 600px;
		padding: 50px;
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
	.avatar {
		width: 140px;
		height: 140px;
		float: left;
		display: block;
	}
	.lyr-uploader {
		height: 60px;
	}
</style>