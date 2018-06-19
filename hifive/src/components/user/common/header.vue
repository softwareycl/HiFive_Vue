<template>
	<div class="header">
		<div class="icon" @click="home()">
			<img src="../../../assets/icon.jpg">
		</div>
		<ul class="menu_1">
			<li v-for="list in headNav" :class="{ list_color:curTitle == list.title}" @click="cur_title(list.title)" @mouseover="mo()">
				{{list.title}}
			</li>

		</ul>
		<div style="clear: both;"></div>
	</div>
</template>

<script>

	export default {
		mounted () {
			if(sessionStorage.getItem('curTitle'))
				// this.curTitle = this.$route.name;
				this.curTitle = sessionStorage.getItem('curTitle');
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
				]
			}
		},
		methods: {
			home: function() {
				this.$router.push('/')
			},
			cur_title: function(title) {
				this.curTitle = title;
				sessionStorage.setItem('curTitle', this.curTitle);
				switch (title) { 
					case '音乐馆': this.$router.push('/') 
					break
					case '我的音乐': this.$router.push('/user/mymusic') 
					break
				}

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
		margin: 0 100px;
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
	.icon,.menu_1 {
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
</style>