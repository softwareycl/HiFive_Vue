<template>
	<div class="navigator">	
		<ul class="menu_2">
			<li v-for="list in headNav" :class="{ nav_color:curTitle == list.title}" @click="cur_title(list.title)" @mouseover="mo()">
				{{list.title}}
			</li>

		</ul>
		<div style="clear: both;"></div>
	</div>
</template>

<script>

	export default {
		mounted () {
			if(sessionStorage.getItem('navTitle'))
				this.curTitle = sessionStorage.getItem('navTitle');
		},
		data () {
			return {
				curTitle: '首页',
				headNav: [
					{
						title:"首页"  
					},
					{
						title:"歌手"                   
					},
					{
						title:"专辑"  
					},
					{
						title:"排行榜"                   
					}
				]
			}
		},
		methods: {
			cur_title: function(title) {
				this.curTitle = title;
				sessionStorage.setItem('navTitle', this.curTitle);
				switch (title) { 
					case '首页': this.$router.push('/') 
					break
					case '歌手': this.$router.push('/user/artist') 
					break
					case '专辑': this.$router.push('/user/albumdetail') 
					break
					case '排行榜': this.$router.push('/') 
					break
				}

			}
		}
	};
</script>

<style>
	.navigator {
		border-bottom: 1px solid #E6E6E6;
		margin: 0 100px;
	}
	.menu_2 {
		padding: 0px;
		margin: 0px;
		padding-left: 210px;
		margin-right: -50px;
	}
	.menu_2 li {
		float: left;
		list-style-type: none;
		line-height: 50px;
		margin-right: 47px;
		cursor: pointer;
	}
	.menu_2 li:hover {
		color: #31C27C;
	}
	.nav_color {
		color: #31C27C;
	}
</style>