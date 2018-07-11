<template>
	<div class="header">
		<div class="icon" @click="home()">
			<img src="../../assets/LOGO0.png">
		</div>
		<div style="float:left;">
            <h1 style="font-size: xx-large;margin:18px 0px;">后台{{this.$route.name}}</h1>
		</div>
		<div class="search">
			<el-input size="medium" placeholder="搜索歌手、歌曲、专辑" v-model="inputTxt" @keyup.enter.native="onSearch">
				<el-button slot="append" icon="el-icon-search" @click='onSearch'></el-button>
			</el-input>
		</div>
		<div class="head_image">
			<span style="color:#C6C6C6;cursor:pointer;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#C6C6C6';" @click="home">首页</span>
		</div>
		<div class="head_image">
			<span style="color:#C6C6C6;cursor:pointer;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='#C6C6C6';" @click="exit">退出</span>
		</div>
		<div style="clear: both;"></div>
	</div>
</template>

<script>

	export default {
		created() {
			if(!this.$store.state.isLogin0) {
				this.$store.state.isLogin0 = JSON.parse(sessionStorage.getItem('isLogin0'));
				if(this.$store.state.isLogin0) {
					this.$store.state.user = JSON.parse(sessionStorage.getItem('user'));
					this.$store.state.search.name = sessionStorage.getItem('inputTxt');
				}
				else {
					alert('请以管理员身份登录');
					this.$router.push('/user/home');
				}
			}
		},
		mounted () {
			if(this.$route.name == '搜索页') {
				this.inputTxt = this.$store.state.search.name;
			}
		},
		data () {
			return {
				inputTxt: '',
			}
		},
		methods: {
			//返回系统管理界面首页
			home: function() {
				this.$router.push('/admin/artist')
			},

			//退出登录，返回用户界面
			exit: function() {
				this.$store.state.isLogin0 = false;
				this.$router.push('/user/unlogin');
				sessionStorage.removeItem('user');
				sessionStorage.removeItem('isLogin0');
			},

			//搜索
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
				this.$router.push('/admin/black');		
			},
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
	.search {
		margin-top: 25px;
		margin-left: 150px;
	}
	.head_image {
		float: left;
	}
	.head_image span {
		display: block;
		margin-top: 30px;
		margin-left: 25px;
	}
</style>