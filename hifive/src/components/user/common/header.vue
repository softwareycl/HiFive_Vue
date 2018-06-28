<template>
	<div class="header">
		<div class="icon" @click="home()">
			<img src="../../../assets/icon.jpg">
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
			<span v-if="!isLogin" style="color:black;cursor:pointer;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">登录</span>
			<div v-if="isLogin">
				<el-dropdown placement="bottom-start" @command="handleCommand">
					<img :src="user.image" class="user_image">
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="a">
							<img :src="user.image" class="inner_userImage">
							<span style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{user.name}}</span>
						</el-dropdown-item>

						<el-dropdown-item command="b" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">修改个人资料</el-dropdown-item>

						<el-dropdown-item command="c" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">修改密码</el-dropdown-item>

						<el-dropdown-item command="d" style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<el-dialog title="修改密码" :visible.sync="modifyPwdVisible" style="font-weight:bold;text-align:center;" width="40%">
			<el-form :model="modifyPwd" :rules="rules" ref="modifyPwd" label-width="100px">
				<el-form-item label="旧密码" prop="oldPwd">
					<el-input v-model="modifyPwd.oldPwd"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newPwd">
					<el-input v-model="modifyPwd.newPwd"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input v-model="modifyPwd.checkPass"></el-input>
				</el-form-item>
				<el-form-item style="text-align:left">
					<el-button>提交</el-button>
					<el-button @click="modifyPwdVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog title="修改个人资料" :visible.sync="modifyDataVisible" style="font-weight:bold;text-align:center;" width="40%">
			<el-form :model="modifyData" :rules="rules1" ref="modifyData" label-width="100px" style="text-align:left">
				<el-form-item label="昵称" prop="name">
					<el-input v-model="modifyData.name" style="width:70%"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop="image">
					<img src="../../../assets/周杰伦.jpg" style="width:120px;height:120px">
				</el-form-item>
				<el-form-item label="性别" prop="gender">
					<el-radio v-model="modifyData.gender" label="1">男</el-radio>
					<el-radio v-model="modifyData.gender" label="2">女</el-radio>
				</el-form-item>
				<el-form-item>
					<el-button>完成</el-button>
					<el-button @click="modifyDataVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<div style="clear: both;"></div>
	</div>
</template>

<script>

	export default {
		mounted () {
			// if(sessionStorage.getItem('curTitle'))
			// 	this.curTitle = sessionStorage.getItem('curTitle');
			this.isLogin = this.$store.state.isLogin;
			this.curTitle = this.$route.name;
			if(this.isLogin == true) {
				this.getUserMesg();
			}
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
				} else if (value !== this.modifyPwd.pass) {
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
			var validateGender = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请选择性别'));
				} else {
					callback();
				}
			};
			return {
				isLogin: '',
				curTitle: '',
				modifyPwdVisible: false,
				modifyDataVisible: false,
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
					{ validator: validateGender, trigger: 'blur' }
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
				this.$router.push('/user/black');
			},
			getUserMesg: function() {
				this.axios.get(this.serverUrl + "/user/getInfo", {
					params: {
						
					}
				})
				.then(res => {
					this.user = res.data;
					for(var i = 0; i < res.data.length; i++){
						this.user[i].image = this.serverUrl + this.user[i].image;
					}
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			handleCommand: function(command) {
				if(command == 'a') {

				} else if(command == 'b') {
					this.modifyDataVisible = true;

				} else if(command == 'c') {
					this.modifyPwdVisible = true;
				} else {
					this.$store.state.userId = '';
					this.$store.state.isLogin = false;
					this.$router.push('/user/black_login');
				}
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

<style scope>
	body {
		margin: 0;
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
</style>