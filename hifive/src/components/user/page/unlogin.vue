<template>
	<div class="wrapper">
		<v-head style="border:none"></v-head>
		<div class="mymusic_main" :style ="mymusic_main">
			<div class="section_inner">
				<h2 class="unlogin_tit">
					<div>私人音乐空间，听我想听的歌</div>
				</h2>
				<div class="unlogin_des">登录管理我的音乐</div>
				<div>
					<el-button plain @click="change_dialogFormVisible" style="backgroundColor:#31C27C;color:white;font-size:20px;border:none">立即登录</el-button>
					<el-dialog title="欢迎来到云音乐" :visible.sync="dialogFormVisible" style="font-weight:bold">
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
									<div class="dialog-footer">
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
									<el-form :model="registerUser" :rules="rules" ref="registerUser" label-width="85px">
										<el-form-item label="昵称" prop="name">
											<el-input v-model="registerUser.name" placeholder="请输入昵称"></el-input>
										</el-form-item>
										<el-form-item label="邮箱" prop="id">
											<el-input v-model="registerUser.id" placeholder="请输入邮箱"></el-input>
										</el-form-item>
										<el-form-item label="性别" prop="gender">
											<el-radio-group v-model="registerUser.gender">
												<el-radio label="1">男</el-radio>
												<el-radio label="2">女</el-radio>
											</el-radio-group>
										</el-form-item>
										<el-form-item label="密码" prop="pwd">
											<el-input type="password" v-model="registerUser.pwd" placeholder="请输入密码"></el-input>
										</el-form-item>
										<el-form-item label="确认密码" prop="checkPass">
											<el-input type="password" v-model="registerUser.checkPass"></el-input>
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
									<div class="dialog-footer">
										<el-button type="primary" @click="register('registerUser')">注册</el-button>
										<el-button @click="dialogFormVisible = false">取 消</el-button>
									</div>
								</el-tab-pane>
							</el-tabs>
						</template>
					</el-dialog>
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
			state () {
				return this.$store.state
			}
		},
		data () {
			var validatePass = (rule, value, callback) => {
				var reg = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,20}$/
				// alert(reg.test(value));
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if(!reg.test(value)) {
					callback(new Error('请输入6-20位密码,且包含字母和数字'));
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
			var validatePass3 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.registerUser.pwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};

			return {
				dialogFormVisible: false,
				activeName: 'first',
				flag: 'false',
				mymusic_main: {
					backgroundImage: 'url(' + require("../../../assets/unlogin.jpg") + ')',
					backgroundRepeat: "no-repeat",
					backgroundSize: '100% 100%',
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
					checkPass: '',
				},
				rules: {
					name: [
					{ required: true, message: '请输入昵称', trigger: 'blur' },
					{ max: 5, message: '最多5个字符', trigger: 'blur' }
					],
					id: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
					],
					gender: [
					{ required: true, message: '请选择性别', trigger: 'change' }
					],
					pwd: [
					{ required: true, validator: validatePass, trigger: 'blur' },
					],
					checkPass: [
					{ required: true, validator: validatePass3, trigger: 'blur' }
					],
					securityQuestion: [
					{ required: true, message: '请选择密保问题', trigger: 'blur' },
					],
					securityAnswer: [
					{ required: true, message: '请输入密保问题的答案', trigger: 'blur' },
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
			}
		},
		methods: {
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
							this.$store.state.isLogin0 = true;
							this.$store.state.isLogin = false;
							sessionStorage.setItem('isLogin0', this.$store.state.isLogin0);
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
							this.$store.state.isLogin0 = false;
							this.$store.state.isLogin = true;
							sessionStorage.setItem('isLogin0', this.$store.state.isLogin0);
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
						gender: parseInt(this.registerUser.gender),
						pwd: this.registerUser.pwd,
						securityQuestion: parseInt(this.registerUser.securityQuestion),
						securityAnswer: this.registerUser.securityAnswer
					})
					.then(res => {
						var tip = res.data;
						if(tip == true) {
							alert("注册成功");
							this.dialogFormVisible = false;
							this.$router.push('/');
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
			change_dialogFormVisible: function() {
				this.dialogFormVisible = true;
				this.activeName = 'first';
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
		}
	};
</script>

<style>
	.mymusic_main {
		height: 600px;
		overflow: hidden;
	}
	.section_inner {
		text-align: center;
		width: 100%;
		line-height: 30px;
		font-family: SimSun;
	}
	.unlogin_tit {
		color: white;
		font-size: 45px;
		font-weight: normal;
		margin-top: 190px;
	}
	.unlogin_des {
		color: #C7C7C6;
		font-size: 26px;
		margin-bottom: 36px;
	}
	.dialog-footer {
		text-align: center;
		margin-top: 30px;
	}
</style>