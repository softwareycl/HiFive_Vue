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
			<span v-if="isLogin" style="color:black;cursor:pointer;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">登录</span>
			<div v-if="!isLogin">
				<el-dropdown placement="bottom-start">
					<img :src="user.image" class="user_image">
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>
							<img :src="user.image" class="inner_userImage">
							<span style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">{{user.name}}</span>
						</el-dropdown-item>
						<el-dropdown-item style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">修改个人资料</el-dropdown-item>
						<el-dropdown-item style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">修改密码</el-dropdown-item>
						<el-dropdown-item style="color:black;cursor:pointer" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
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
			return {
				isLogin: '',
				curTitle: '',
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
				inputTxt: '',
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