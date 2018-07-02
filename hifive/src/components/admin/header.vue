<template>
	<div class="header">
		<div class="icon" @click="home()">
			<img src="../../assets/icon.jpg">
		</div>
		<div style="float:left;margin-top:20px;">
            <h style="font-size: xx-large;">欢迎来到后台管理</h>
		</div>
		<div class="search">
			<el-input size="medium" placeholder="搜索歌手、歌曲、专辑" v-model="inputTxt" @keyup.enter.native="onSearch">
				<el-button slot="append" icon="el-icon-search" @click='onSearch'></el-button>
			</el-input>
		</div>
		<div class="head_image">
			<span style="color:black;cursor:pointer;" onmouseover="this.style.color='#31C27C';" onmouseout="this.style.color='black';">注销</span>
		</div>
		<div style="clear: both;"></div>
	</div>
</template>

<script>

	export default {
		mounted () {
		},
		data () {
			return {
				inputTxt: '',
			}
		},
		methods: {
			home: function() {
				this.$router.push('/admin/artist')
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
</style>