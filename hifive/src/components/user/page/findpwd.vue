<template>
	<div>
	<div class="main">
		<div class="Nav">
		<div class="NavMenu">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<div style="margin: 2% 25%">
					<el-breadcrumb-item :to="{ path: '/' }" style="font-size: 25px;font-family: Microsoft YaHei">云音乐网站</el-breadcrumb-item>
  					<el-breadcrumb-item style=" margin-top: 4px;font-size: 20px; font-family:Microsoft YaHei">找回密码</el-breadcrumb-item>
				</div>
			</el-breadcrumb>
		</div>
		</div>
		<div class="Steps">
			<el-steps :active="active" finish-status="success" align-center>
  				<el-step title="填写邮箱" icon="el-icon-edit"></el-step>
  				<el-step title="密保问题" icon="el-icon-question"></el-step>
  				<el-step title="重置密码" icon="el-icon-refresh"></el-step>
			</el-steps>
		</div>
		<div class="Step">
			<template>
				<div id = 'div1' style="width: 400px; height: 50px; margin: auto; display: block;">
					<el-form :model="email" :rules="rules1" ref="email" label-width="85px">
						<el-form-item label="邮箱" prop="id">
							<el-input style="width: 300px" v-model="email.id" placeholder="请输入邮箱" prefix-icon="el-icon-search" clearable></el-input>
						</el-form-item>
					</el-form>
				</div> 
				<div id = 'div2' style="width: 400px; height: 100px; margin: auto; display: none;">
					<el-form :model="security" :rules="rules2" ref="security">
						<el-form-item label="密保问题：" prop="securityQuestion">
							<li style="list-style-type:none">{{security.securityQuestion}}</li>
						</el-form-item>
						<el-form-item label="密保答案：" prop="securityAnswer">
							<el-input  style="width: 300px;" placeholder="请输入答案"  v-model="security.securityAnswer" clearable></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div id = 'div3' style="width: 400px; height: 100px; margin: auto; display: none;">
					<el-form :model="password" :rules="rules3" ref="password">
						<el-form-item label="新密码：" prop="newPwd">
							<el-input  style="width: 300px; float: right;" placeholder="请输入新密码" v-model="password.newPwd" clearable></el-input>
						</el-form-item>
						<el-form-item label="确认密码：" prop="confirmedNewPwd">
							<el-input  style="width: 300px; float: right;" placeholder="请确认新密码" v-model="password.confirmedNewPwd" clearable></el-input>
						</el-form-item>
					</el-form>
				</div>
			</template>
		</div>
		<div style="width: 200px; margin: auto; margin-top: 50px">
			<el-button @click="last()">上一步</el-button>
			<el-button @click="next()">下一步</el-button>			
		</div>
	</div>
	<v-foot></v-foot>
	</div>
</template>

<script>
  import vFoot from "../common/footer.vue"

  export default {
  	components: {
      vFoot
    },

    data() {		
     	var validatePass = (rule, value, callback) => {
			var reg = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,20}$/
				// alert(reg.test(value));
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if(!reg.test(value)) {
				callback(new Error('输入密码要6-20位,要包含字母和数字'));
			} else {
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.password.newPwd) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
      return {
        active: 0,
        flag: 'false',
        email: {
			id: '',
		},
		security: {
			securityQuestion: '',
			securityAnswer: '',
		},
		password: {
		    newPwd: '',
		    confirmedNewPwd: '',
		},
		rules1: {
			id: [
			{ required: true, message: '请输入邮箱', trigger: 'blur' },
			{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
			],
		},
		rules2: {
			securityQuestion: [{required: true}],
			securityAnswer: [
			{ required: true, message: '请输入答案', trigger: ['blur', 'change'] },
			],
		},
		rules3: {
			newPwd:[{required: true, validator: validatePass, trigger: ['blur', 'change']}],
			confirmedNewPwd:[{required:true, validator: validatePass2, trigger: ['blur', 'change']}],
		}
		}
      },

    computed: {
      serverUrl() {
        return this.$store.state.serverUrl;
      },
      state() {
        return this.$store.state;
      }
    },

    methods: {
    	/* 点击下一步按钮实现步骤切换*/
      next() {
      	if(this.active == 0) this.checkUserExisted(this.email.id);
      	if(this.active == 1) this.checkAnswer(this.email.id, this.security.securityAnswer);
      	if(this.active == 2) this.resetPassword(this.password.newPwd);    	
      },
      /* 点击上一步按钮实现步骤切换*/
      last() {
      	if (this.active-- < 1) this.active = 0;
      	this.hidden(this.active);
      },
      /* 隐藏div使当前展示的div与步骤条同步*/
      hidden: function(_active){
      	if(_active == 0) { //对应步骤条第一步
        	document.getElementById('div1').style.display = 'block';
        	document.getElementById('div2').style.display = 'none';
        	document.getElementById('div3').style.display = 'none';
      	} else if(_active == 1) { //对应步骤条第二步
        	document.getElementById('div2').style.display = 'block';
        	document.getElementById('div1').style.display = 'none';
        	document.getElementById('div3').style.display = 'none';
        } else if(_active == 2) { //对应步骤条第三步
        	document.getElementById('div3').style.display = 'block';
        	document.getElementById('div1').style.display = 'none';
        	document.getElementById('div2').style.display = 'none';
        } else if(_active == 3) { //页面跳转
        	// setTimeout(function () { 
            this.$router.push({
              path: '/user/unlogin'}); 
          // }, 4000);
        }
      },
      /* 判断用户是否存在*/
      checkUserExisted: function(_email){
      	this.checkInput('email')
      	// if(_email != '') {
      		if(this.flag){
		  		this.flag = false;
		  	    this.axios.get(this.serverUrl+'/user/checkUserExisted',{
		            params:{
		              id:_email,
		            }
		          })
		  		  .then(res => {
		  		  	var tip = res.data;
		  		  	if(!tip) {
		  		  		this.$message({
          					message: '用户不存在！',
          					type: 'error'
        				});
        				this.active = -1;
        			}
        			if (this.active++ > 2) {
        				this.active = 3;
        			}
        			this.hidden(this.active);
		  		  	var ID = this.email.id;
		  		  	this.getQuestion(ID);
		  		  })
		  		  .catch(function (error) {
							console.log(error);
						});
      		} else{
      			this.active = 0;
      			}
      },
      /* 获取用户密保问题*/
      getQuestion: function(_email){
      	this.axios.get(this.serverUrl+'/user/getQuestion',{
                params:{
                  id:_email,
                }
              })
      		.then(res => {
      			if(res.data == 1) this.security.securityQuestion = '你的家乡在哪里';
      			else if(res.data == 2) this.security.securityQuestion = '你的父亲名字？';
      			else if(res.data == 3) this.security.securityQuestion = '你的母亲名字？';
      			else if(res.data == 4) this.security.securityQuestion = '你的生日？';
      		})
      		.catch(function (error) {
				console.log(error);
			});
      },
      /* 判断用户密保答案是否正确*/
      checkAnswer: function(_id, _answer){
      	this.checkInput('security');
      	// if(_answer != ''){
      		if(this.flag){
      			this.flag = false;
      			this.axios.post(this.$store.state.serverUrl+'/user/checkAnswer',{
                  id:_id,
                  securityAnswer:_answer,
              })
      		.then(res => {
      			var isright = res.data;
      			if(!isright){
      				this.$message({
      					message: '答案错误！',
      					type: 'error'
    				});
      				this.active = 0;
        			}
        		if (this.active++ > 2) {
        			this.active = 3;
        			}
        		this.hidden(this.active);
      		})
      		.catch(function (error) {
				console.log(error);
			});
      	} else {
      		this.active = 1;
      		}
      },
      /* 重置密码*/
      resetPassword: function(_newPwd){
      	this.checkInput('password');
      	if(this.flag){
      		this.flag = false;
  			this.axios.post(this.$store.state.serverUrl + '/user/resetPassword',{
              newPwd:_newPwd, 
          })
  		.then(res => {
  			var isright = res.data;
  			if(!isright){
  				this.$message({
  					message: '密码修改失败！',
  					type: 'error'
				});
  			} else {
  				this.$message({
  					message: '密码修改成功！',
  					type: 'success'
				});
  			}
  			if (this.active++ > 2) {
				this.active = 3;
			}
			this.hidden(this.active);
  		})
  		.catch(function (error) {
					console.log(error);
				});
      	} else {
      		this.active = 2;
      		}
      },

      /* 判断用户输入是否合法*/
      checkInput: function(formName){
      	this.$refs[formName].validate((valid) => {
      		if(valid) {
      			this.flag = true;
      			return true;
      		} else {
      			console.log('error submit!!');
      			this.flag = false;
      			return false;
      		}
      	});
      },
    }
}

</script>

<style scoped>
	.main{
		height: 550px;
		margin-bottom: 50px;
	}
	.Nav{
		height: 60px;
		background-color: #d3dce6;
		margin-bottom: 50px;
	}
	.NavMenu{
		width: 1000px;
	}
	.Steps{
		width: 1200px;
		margin: auto;
		margin-bottom: 50px;
		/*background-color: #e5e9f2;*/
	}
	.el-steps{
		width: 1000px;
		height: 100px; 
		margin: 0 auto;
		font-family: "Microsoft YaHei";
	}
	.el-button{
		margin: 0 auto;
	}
</style>