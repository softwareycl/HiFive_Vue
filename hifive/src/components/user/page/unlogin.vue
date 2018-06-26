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
							<el-tabs v-model="activeName" @tab-click="handleClick" class="login_form" style="margin:0 75px;text-align:left">
								<el-tab-pane label="登录" name="first">
									<el-form :model="loginUser">
										<el-form-item label="账号">
											<el-input v-model="loginUser.id" placeholder="请输入账号，账号为注册时的邮箱" style="width:400px"></el-input>
										</el-form-item>
										<el-form-item label="密码">
											<el-input v-model="loginUser.pwd" placeholder="请输入密码" style="width:400px"></el-input>
										</el-form-item>
									</el-form>
									<div class="dialog-footer">
										<el-button type="primary" @click="login">登录</el-button>
										<el-button @click="dialogFormVisible = false">取 消</el-button>
										<div style="margin-top:20px">
											<router-link tag="a" to="" style="text-decoration:none;out-line: none;">
												<span style="color:#848484;cursor:pointer">忘记密码</span>
											</router-link>
										</div>
									</div>
								</el-tab-pane>
								<el-tab-pane label="注册" name="second">
									<el-form :model="registerUser" :rules="rules" ref="registerUser">
										<el-form-item label="昵称" prop="name" style="padding-left:30px">
											<el-input v-model="registerUser.name" placeholder="请输入昵称" style="width:400px"></el-input>
										</el-form-item>
										<el-form-item label="邮箱" prop="email" style="padding-left: 30px">
											<el-input v-model="registerUser.id" placeholder="请输入邮箱" style="width:400px"></el-input>
										</el-form-item>
										<el-form-item label="性别" prop="gender" style="padding-left: 30px">
											<el-radio-group v-model="registerUser.gender">
												<el-radio label="男"></el-radio>
												<el-radio label="女"></el-radio>
											</el-radio-group>
										</el-form-item>
										<el-form-item label="密码" prop="pwd" style="padding-left: 30px">
											<el-input v-model="registerUser.pwd" placeholder="请输入密码" style="width:400px"></el-input>
										</el-form-item>
										<el-form-item label="密保问题" prop="sq">
											<el-select v-model="registerUser.securityQuestion" placeholder="请选择密保问题" style="width:400px">
												<el-option label="问题一" value="question1"></el-option>
												<el-option label="问题二" value="question2"></el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="密保答案" prop="sa">
											<el-input v-model="registerUser.securityAnswer" placeholder="请输入密保问题的答案" style="width:400px"></el-input>
										</el-form-item>
									</el-form>
									<div class="dialog-footer">
										<el-button type="primary" @click="register">注册</el-button>
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
		data () {
			return {
				dialogFormVisible: false,
				activeName: 'first',
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

				},
				rules: {
					name: [
					{ required: true, message: '请输入昵称', trigger: 'blur' },
					],
					email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
					],
					gender: [
					{ required: true, message: '请选择性别', trigger: 'blur' },
					],
					pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					],
					sq: [
					{ required: true, message: '请选择密保问题', trigger: 'blur' },
					],
					sa: [
					{ required: true, message: '请输入密保问题的答案', trigger: 'blur' },
					],

				},
			}
		},
		methods: {
			login: function() {
				this.dialogFormVisible = false;
			},
			register: function() {
				this.submitForm(registerUser);
				this.dialogFormVisible = false;
			},
			change_dialogFormVisible: function() {
				this.dialogFormVisible = true;
				this.activeName = 'first';
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
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
	}
</style>