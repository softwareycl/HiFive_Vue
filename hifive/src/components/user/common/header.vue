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
		<div style="clear: both;"></div>
	</div>
</template>

<script>

	export default {
		mounted () {
			// if(sessionStorage.getItem('curTitle'))
			// 	this.curTitle = sessionStorage.getItem('curTitle');
			this.curTitle = this.$route.name;
			if(this.$route.name == '搜索') {
				this.inputTxt = this.$store.state.search.name;
			}
			if(this.curTitle != '我的音乐')
				this.curTitle = '音乐馆';
		},
		data () {
			return {
				curTitle: '音乐馆',
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
				this.$router.push('/')
			},
			cur_title: function(title) {
				this.curTitle = title;
				// sessionStorage.setItem('curTitle', this.curTitle);
				switch (title) { 
					case '音乐馆': this.$router.push('/') 
					break
					case '我的音乐': this.$router.push('/user/mymusic') 
					break
				}

			},
			onSearch: function() {
				if(this.inputTxt == '') {
					this.$notify({
						title: '警告',
						message: '请输入搜索内容',
						type: 'warning'
					});
					return;
				}
				this.$store.state.search.name = this.inputTxt;
				this.$router.push('/user/black');		
			}
		},
		computed: {
			search () {
				return this.$store.state.search
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
</style>