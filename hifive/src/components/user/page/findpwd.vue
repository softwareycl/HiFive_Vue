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
<!-- 				<div id = '1' style="width: 400px; height: 50px; margin: auto;">
				<el-form>
					<el-form-item label="邮箱：">
						<el-input  style="width: 300px;" placeholder="请输入邮箱" prefix-icon="el-icon-search" v-model="input" clearable></el-input>
					</el-form-item>
				</el-form>
				</div>  -->
<!-- 				<div id = '2' style="width: 400px; height: 100px; margin: auto;">
					<el-form>
						<el-form-item label="密保问题：">
							<li style="list-style-type:none">您母亲的名字是?</li>
						</el-form-item>
						<el-form-item label="密保答案：">
							<el-input  style="width: 300px;" placeholder="请输入答案" prefix-icon="el-icon-search" v-model="input" clearable></el-input>
						</el-form-item>
					</el-form>
				</div>  -->
				<div id = '3' style="width: 390px; height: 100px; margin: auto;">
					<el-form>
						<el-form-item label="新密码：">
							<el-input  style="width: 300px; float: right;" placeholder="请输入新密码" prefix-icon="el-icon-search" v-model="input" clearable></el-input>
						</el-form-item>
						<el-form-item label="确认密码：">
							<el-input  style="width: 300px; float: right;" placeholder="请确认新密码" prefix-icon="el-icon-search" v-model="input" clearable></el-input>
						</el-form-item>
					</el-form>
				</div>
			</template>
		</div>
		<div style="width: 200px; margin: auto; margin-top: 100px">
			<el-button @click="last">上一步</el-button>
			<el-button @click="next">下一步</el-button>			
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
      return {
        active: 0,
        input: '',
      };
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      last() {
      	if (this.active-- < 1) this.active = 0;
      }
    }
  }
</script>

<style>
	.main{
		height: 550px;
		margin-bottom: 50px;
	}
	.Nav{
		width: 1500px;
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