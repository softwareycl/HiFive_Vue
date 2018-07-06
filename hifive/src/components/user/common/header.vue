<template>
	<div class="header">
		<div class="icon" @click="home()">
			<img src="../../../assets/LOGO0.png">
		</div>
		<ul class="menu_1">
			<li v-for="list in headNav" :class="{ list_color:curTitle == list.title}" @click="cur_title(list.title)">
				{{list.title}}
			</li>
		</ul>
		<div class="search">
			<el-input size="medium" placeholder="搜索歌手、歌曲、专辑" v-model="inputTxt" @keyup.enter.native="onSearch">
				<el-button slot="append" icon="el-icon-search" @click='onSearch'></el-button>
			</el-input>
		</div>
		<div class="head_image">
			<span v-if="!isLogin" style="color:black;cursor:pointer;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';" @click="dialogFormVisible = true">登录</span>

			<div v-if="isLogin">
				<el-dropdown placement="bottom-start" @command="handleCommand">
					<router-link tag="a" to="/user/mymusic">
						<img :src="this.$store.state.user.image" class="user_image">
					</router-link>
					<el-dropdown-menu slot="dropdown">
						<!-- <el-dropdown-item command="a">
							<router-link tag="a" to="/user/mymusic">
								<img :src="this.$store.state.user.image" class="inner_userImage">
								<span style="color:black;text-align:center">{{this.$store.state.user.name}}</span>
							</router-link>
						</el-dropdown-item> -->

						<el-dropdown-item command="b" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">修改个人资料</el-dropdown-item>

						<el-dropdown-item command="c" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">修改密码</el-dropdown-item>

						<el-dropdown-item command="d" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<el-dialog title="修改密码" :visible.sync="modifyPwdVisible" style="font-weight:bold;" width="40%" :center="true">
			<el-form :model="modifyPwd" :rules="rules" ref="modifyPwd" label-width="100px">
				<el-form-item label="旧密码" prop="oldPwd">
					<el-input type="password" v-model="modifyPwd.oldPwd"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newPwd">
					<el-input type="password" v-model="modifyPwd.newPwd"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="modifyPwd.checkPass"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="finishModifyPwd('modifyPwd')">提交</el-button>
					<el-button @click="modifyPwdVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog title="修改个人资料" :visible.sync="modifyDataVisible" style="font-weight:bold;" :center="true" width="40%">
			<el-form :model="modifyData" :rules="rules1" ref="modifyData" label-width="100px" style="text-align:left">
				<el-form-item label="昵称" prop="name">
					<el-input v-model="modifyData.name" style="width:70%"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop="image">
					<img :src="modifyData.image" class="avatar" style="margin-right:20px">
					<el-upload class="avatar-uploader" ref="upload" :on-change="previewImg"
					action="http://192.168.20.99:8080/hifive/upload/uploadUserImage" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" accept=".jpg, .jpeg, .png" :auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">点击更改头像</el-button>
						<!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button> -->
						<div>
							<div>图片大小不超过2M</div>				
							<div>上传图片格式为:jpg/jpeg/png</div>
						</div>
					</el-upload>
					<div style="clear:both"></div>
				</el-form-item>
				<el-form-item label="性别" prop="gender">
					<el-radio v-model="modifyData.gender" :label="1">男</el-radio>
					<el-radio v-model="modifyData.gender" :label="2">女</el-radio>
				</el-form-item>
				<el-form-item>
					<el-button @click="finishModifyData('modifyData')">完成</el-button>
					<el-button @click="modifyDataVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="欢迎来到云音乐" :visible.sync="dialogFormVisible" style="font-weight:bold" :center="true">
			<template>
				<el-tabs v-model="activeName" class="login_form" style="margin:0 75px;text-align:left">
					<el-tab-pane label="登录" name="first">
						<el-form :model="loginUser" :rules="rules2" ref="loginUser" label-width="50px">
							<el-form-item label="账号" prop="id">
								<el-input v-model="loginUser.id" placeholder="请输入账号，账号为注册时的邮箱"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="pwd">
								<el-input type="password" v-model="loginUser.pwd" placeholder="请输入密码"></el-input>
							</el-form-item>
						</el-form>
						<div class="dialog-footer" style="text-align:center">
							<el-button type="primary" @click="login('loginUser')">登录</el-button>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<div style="margin-top:20px">
								<router-link tag="a" to="/user/findpwd" style="text-decoration:none;out-line: none;">
									<span style="color:#848484;cursor:pointer">忘记密码</span>
								</router-link>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="注册" name="second">
						<el-form :model="registerUser" :rules="rules3" ref="registerUser" label-width="85px">
							<el-form-item label="昵称" prop="name">
								<el-input v-model="registerUser.name" placeholder="请输入昵称"></el-input>
							</el-form-item>
							<el-form-item label="邮箱" prop="id">
								<el-input v-model="registerUser.id" placeholder="请输入邮箱"></el-input>
							</el-form-item>
							<el-form-item label="性别" prop="gender">
								<el-radio v-model="registerUser.gender" :label="1">男</el-radio>
								<el-radio v-model="registerUser.gender" :label="2">女</el-radio>
							</el-form-item>
							<el-form-item label="密码" prop="pwd">
								<el-input v-model="registerUser.pwd" placeholder="请输入密码"></el-input>
							</el-form-item>
							<el-form-item label="密保问题" prop="securityQuestion">
								<el-select v-model="registerUser.securityQuestion" placeholder="请选择密保问题">
									<el-option label="你的家乡在哪里？" value="1"></el-option>
									<el-option label="你的父亲名字？" value="2"></el-option>
									<el-option label="你的母亲名字？" value="3"></el-option>
									<el-option label="你的生日？" value="4"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="密保答案" prop="securityAnswer">
								<el-input v-model="registerUser.securityAnswer" placeholder="请输入密保问题的答案"></el-input>
							</el-form-item>
						</el-form>
						<div class="dialog-footer" style="text-align:center">
							<el-button type="primary" @click="register('registerUser')">注册</el-button>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
						</div>
					</el-tab-pane>
				</el-tabs>
			</template>
		</el-dialog>
		<div style="clear: both;"></div>
	</div>
</template>

<script>

	export default {
		created() {
			if(!this.$store.state.isLogin) {
				this.$store.state.isLogin = JSON.parse(sessionStorage.getItem('isLogin'));
				if(this.$store.state.isLogin) {
					this.$store.state.user = JSON.parse(sessionStorage.getItem('user'));
					this.$store.state.likeSongs = JSON.parse(sessionStorage.getItem('likeSongs'));
					this.$store.state.likeAlbums = JSON.parse(sessionStorage.getItem('likeAlbums'));
					this.$store.state.playlistList = JSON.parse(sessionStorage.getItem('playlistList'));
					this.$store.state.search.name = sessionStorage.getItem('inputTxt');

					// this.$store.state.rankType = JSON.parse(sessionStorage.getItem('rankType'));
					// this.$store.state.currentIndex = JSON.parse(sessionStorage.getItem('currentIndex'));
					// this.$store.state.currentSong = JSON.parse(sessionStorage.getItem('currentSong'));
					// this.$store.state.songList = JSON.parse(sessionStorage.getItem('songList'));
				}
			}
		},
		mounted () {
			// if(sessionStorage.getItem('curTitle'))
			// 	this.curTitle = sessionStorage.getItem('curTitle');
			this.isLogin = this.$store.state.isLogin;
			this.curTitle = this.$route.name;
			if(this.$route.name == '搜索') {
				this.inputTxt = this.$store.state.search.name;
			}
			if(this.curTitle != '我的音乐' && this.curTitle != '搜索')
				this.curTitle = '音乐馆';
		},
		data () {
			var checkOldPwd = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('旧密码不能为空'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				var reg = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,20}$/
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if(!reg.test(value)) {
					callback(new Error('请输入6-20位密码,且包含字母和数字'));
				} else {
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.modifyPwd.newPwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var validateName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入昵称'));
				} else {
					callback();
				}
			};
			var validateId = (rule, value, callback) => {
				// alert(reg.test(value));
				if (value === '') {
					callback(new Error('请输入帐号'));
				} else {
					callback();
				}
			};
			var validatePwd = (rule, value, callback) => {
				// alert(reg.test(value));
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			return {
				isLogin: '',
				curTitle: '',
				modifyPwdVisible: false,
				modifyDataVisible: false,
				dialogFormVisible: false,
				flag: false,
				img_change: false,
				activeName: 'first',
				user: {
					id: '',
					name: '',
					gender: '',
					image: '',
				},
				headNav: [
				{
					title:"音乐馆"  
				},
				{
					title:"我的音乐"                   
				}
				],
				modifyPwd: {
					oldPwd: '',
					newPwd: '',
					checkPass: '',
				},
				modifyData: {
					id: '',
					name: '',
					gender: '',
					image: ''
				},
				loginUser: {
					id: '',
					pwd: '',
				},
				registerUser: {
					id: '',
					name: '',
					gender: '',
					pwd: '',
					securityQuestion: '',
					securityAnswer: '',
				},
				inputTxt: '',

				rules: {
					newPwd: [
					{ validator: validatePass, trigger: 'blur' }
					],
					checkPass: [
					{ validator: validatePass2, trigger: 'blur' }
					],
					oldPwd: [
					{ validator: checkOldPwd, trigger: 'blur' }
					]
				},
				rules1: {
					name: [
					{ validator: validateName, trigger: 'blur' },
					{ max: 5, message: '最多5个字符', trigger: 'blur'}
					],
					gender: [
					{ required: true, message: '请选择性别', trigger: 'blur' }
					],
				},
				rules2: {
					id: [
					{ validator: validateId, trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
					],
					pwd: [
					{ validator: validatePwd, trigger: 'blur' },
					],
				},
				rules3: {
					name: [
					{ required: true, message: '请输入昵称', trigger: 'blur' },
					{ max: 5, message: '最多5个字符', trigger: 'blur' }
					],
					id: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
					],
					gender: [
					{ required: true, message: '请选择性别', trigger: 'blur' },
					],
					pwd: [
					{ required: true, validator: validatePass, trigger: 'blur' },
					],
					securityQuestion: [
					{ required: true, message: '请选择密保问题', trigger: 'blur' },
					],
					securityAnswer: [
					{ required: true, message: '请输入密保问题的答案', trigger: 'blur' },
					],

				},

			}
		},
		methods: {
			home: function() {
				this.$router.push('/user/home')
			},
			cur_title: function(title) {
				this.curTitle = title;
				// sessionStorage.setItem('curTitle', this.curTitle);
				switch (title) { 
					case '音乐馆': this.$router.push('/user/home') 
					break
					case '我的音乐': {
						if(this.isLogin == true)
							this.$router.push('/user/mymusic')
						else
							this.$router.push('/')
					} 
					break
				}

			},
			onSearch: function() {
				if(this.inputTxt == '') {
					this.$notify.info({
						title: '消息',
						message: '请输入搜索内容'
					});
					return;
				}
				this.$store.state.search.name = this.inputTxt;
				sessionStorage.setItem('inputTxt', this.$store.state.search.name);
				this.$router.push('/user/black');
			},
			// getUserMesg: function() {
			// 	this.axios.get(this.serverUrl + "/user/getInfo", {
			// 		params: {
						
			// 		}
			// 	})
			// 	.then(res => {
			// 		this.user = res.data;
			// 		for(var i = 0; i < res.data.length; i++){
			// 			this.user[i].image = this.serverUrl + this.user[i].image;
			// 		}
			// 	})
			// 	.catch(function (error) {
			// 		console.log(error);
			// 	});
			// },
			handleCommand: function(command) {
				if(command == 'a') {

				} else if(command == 'b') {
					this.modifyDataVisible = true;
					this.img_change = false;
					this.modifyData.id = this.$store.state.user.id;
					this.modifyData.name = this.$store.state.user.name;
					this.modifyData.gender = this.$store.state.user.gender;
					this.modifyData.image = this.$store.state.user.image;

				} else if(command == 'c') {
					this.modifyPwdVisible = true;

				} else if(command == 'd'){
					this.$store.state.user = {};
					this.$store.state.isLogin = false;
					sessionStorage.removeItem('user');
					sessionStorage.removeItem('isLogin');
					sessionStorage.removeItem('likeSongs');
					sessionStorage.removeItem('likeAlbums');
					sessionStorage.removeItem('playlistList');
					if(this.$route.name == '我的音乐') {
						this.$router.push('/');
					}
					else {
						this.$router.push('/user/black_login');
					}
				}
			},
			login: function(_loginUser) {
				this.submitForm(_loginUser);
				if(this.flag) {
					this.flag = false;
					this.axios.post(this.$store.state.serverUrl + "/user/login", {
						id: this.loginUser.id,
						pwd: this.loginUser.pwd
					})
					.then(res => {
						var tip = res.data;
						if(tip == 0) {
							this.dialogFormVisible = false;
							this.$router.push('/admin/artist');
							this.$store.state.isLogin = true;
							sessionStorage.setItem('isLogin', this.$store.state.isLogin);
							this.axios.get(this.$store.state.serverUrl + "/user/getInfo", {
								params: {
									id: this.loginUser.id
								}
							})
							.then(res => {
								this.user = res.data;
								this.user.image = this.$store.state.serverUrl + this.user.image;
								this.$store.state.user = this.user;
								sessionStorage.setItem('user', JSON.stringify(this.$store.state.user));
							})
							.catch(function (error) {
								console.log(error);
							});
						}
						if(tip == 1) {
							this.dialogFormVisible = false;
							this.$store.state.isLogin = true;
							sessionStorage.setItem('isLogin', this.$store.state.isLogin);
							this.axios.get(this.$store.state.serverUrl + "/user/showMyMusic", {
								params: {
									id: this.loginUser.id
								}
							})
							.then(res => {
								this.user = res.data;
								this.user.image = this.$store.state.serverUrl + this.user.image;
								this.$store.state.user = this.user;
								sessionStorage.setItem('user', JSON.stringify(this.$store.state.user));
								// this.$store.state.likeSongs = res.data.likeSongList;
								this.$store.state.likeSongs = this.user.likeSongList;
								this.$store.state.likeAlbums = this.user.likeAlbumList;
								// for(var i=0; i<this.us)
								for(var i=0; i<this.$store.state.likeSongs.length; i++) {
									this.$store.state.likeSongs[i].image = this.$store.state.serverUrl + this.$store.state.likeSongs[i].image;
									this.$store.state.likeSongs[i].filePath = this.$store.state.serverUrl + this.$store.state.likeSongs[i].filePath;
									this.$store.state.likeSongs[i].lyricsPath = this.$store.state.serverUrl + this.$store.state.likeSongs[i].lyricsPath;
								}
								for(var i=0; i<this.$store.state.likeAlbums.length; i++) {
									this.$store.state.likeAlbums[i].image = this.$store.state.serverUrl + this.$store.state.likeAlbums[i].image;
									this.$store.state.likeAlbums[i].releaseDate = this.timestampToTime(this.$store.state.likeAlbums[i].releaseDate);
								}
								
								this.$store.state.playlistList = this.user.playlistList;
								sessionStorage.setItem('likeSongs', JSON.stringify(this.$store.state.likeSongs));
								sessionStorage.setItem('likeAlbums', JSON.stringify(this.$store.state.likeAlbums));
								sessionStorage.setItem('playlistList', JSON.stringify(this.$store.state.playlistList));
								if(this.$route.name == '我的音乐')
									this.$router.push('/user/mymusic');
								else
									this.$router.push('/user/black_login');
							})
							.catch(function (error) {
								console.log(error);
							});
						}
						else if(tip == 2) {
							alert("用户不存在");
						}
						else if(tip == 3) {
							alert("账号密码不正确");
						}
					})
					.catch(function (error) {
						console.log(error);
					});
				}
			},
			register: function(_registerUser) {
				this.submitForm(_registerUser);
				if(this.flag) {
					this.flag = false;
					this.axios.post(this.$store.state.serverUrl + "/user/register", {
						id: this.registerUser.id,
						name: this.registerUser.name,
						gender: this.registerUser.gender,
						pwd: this.registerUser.pwd,
						securityQuestion: parseInt(this.registerUser.securityQuestion),
						securityAnswer: this.registerUser.securityAnswer
					})
					.then(res => {
						var tip = res.data;
						if(tip == true) {
							alert("注册成功");
							// this.dialogFormVisible = false;
							this.activeName = 'first';
						}
						else if(tip == false) {
							alert("注册失败，请重新注册");
						}
					})
					.catch(function (error) {
						console.log(error);
					});
				}
			},
			finishModifyPwd: function(_modifyPwd) {
				this.submitForm(_modifyPwd);
				if(this.flag) {
					this.flag = false;
					this.axios.post(this.$store.state.serverUrl + "/user/modifyPassword", {
						oldPwd: this.modifyPwd.oldPwd,
						newPwd: this.modifyPwd.newPwd
					})
					.then(res => {
						var tip = res.data;
						if(tip == true) {
							alert("修改成功，请重新登录");
							this.$store.state.user = {};
							this.$store.state.isLogin = false;
							this.modifyPwdVisible = false;
							this.dialogFormVisible = true;
							sessionStorage.removeItem('user');
							sessionStorage.removeItem('isLogin');
							sessionStorage.removeItem('likeSongs');
							sessionStorage.removeItem('likeAlbums');
							sessionStorage.removeItem('playlistList');
						}
						else if(tip == false) {
							alert("修改密码失败");
						}
					})
					.catch(function (error) {
						console.log(error);
					});
				}
			},
			finishModifyData: function(_modifyData) {
				this.submitForm(_modifyData);
				if(this.flag) {
					this.flag = false;
					if(this.img_change) {
						this.$refs.upload.submit();
						this.img_change = false;
					}
					this.axios.post(this.$store.state.serverUrl + "/user/modify", {
						id: this.modifyData.id,
						name: this.modifyData.name,
						gender: this.modifyData.gender
					})
					.then(res => {
						var tip = res.data;
						if(tip == true) {
							alert("修改成功");
							this.modifyDataVisible = false;
							this.axios.get(this.$store.state.serverUrl + "/user/getInfo", {
								params: {
									id: this.$store.state.user.id
								}
							})
							.then(res => {
								this.user = res.data;
								this.user.image = this.$store.state.serverUrl + this.user.image;
								this.$store.state.user = this.user;
								sessionStorage.setItem('user', JSON.stringify(this.$store.state.user));
							})
							.catch(function (error) {
								console.log(error);
							});
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
			submitForm(formName) {
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
			timestampToTime: function(timestamp) {
				var date = new Date(timestamp);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = date.getDate();
				if(D < 10) D = '0' + D;
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
				alert("上传成功");
			},
			previewImg: function(file) {
				this.modifyData.image = file.url;
			}
		},
		computed: {
			search () {
				return this.$store.state.search
			},
			state () {
				return this.$store.state
			}
		}
	};
</script>

<style>
	body {
		margin: 0;
	}
	a {
		 text-decoration:none;
		 out-line: none;
	}
	.header {
		border-bottom: 1px solid #E6E6E6;
		margin: 0 200px;
	}
	.icon {
		margin-right: 30px;
		cursor: pointer;
		height: 80px;
	}
	.icon img {
		width: 145px;
		height: 80px;
	}
	.icon,.menu_1,.search {
		float: left;
	}
	.menu_1 {
		padding: 0px;
		margin: 0px;
	}
	.menu_1 li {
		float: left;
		list-style-type: none;
		font-size: 16px;
		line-height: 80px;
		padding: 0px 20px;
		text-align: center;
		cursor: pointer;
	}
	.menu_1 li:hover {
		color: #31C27C;
	}
	.list_color {
		background-color: #31C27C;
		color: #FFFFFF !important;
	}
	.search {
		margin-top: 25px;
		margin-left: 100px;
	}
	.head_image {
		float: left;
	}
	.head_image span {
		display: block;
		margin-top: 30px;
		margin-left: 25px;
	}
	.user_image{
		width:40px;
		height:40px;
		border-radius:100%;
		margin-top:22px;
		margin-left:25px;
		cursor: pointer;
	}
	.inner_userImage {
		width:80px;
		height:80px;
		border-radius:100%;
	}
	/*.header-dialog-footer {
		margin: 0;
		padding: 0;
	}*/

	.avatar {
		width: 120px;
		height: 120px;
		float: left;
		display: block;
		border-radius: 100%;
	}
</style>