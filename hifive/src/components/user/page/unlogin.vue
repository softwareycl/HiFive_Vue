<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-nav></v-nav>
		<div class="main">
			<p @click='search' style="text-align:center;">search</p>
		</div>
		<v-foot></v-foot>
	</div>
</template>

<script>
	import vHead from '../common/header.vue'
	import vNav from '../common/navigation.vue'
	import vFoot from '../common/footer.vue'

	export default {
		components: {
			vHead,
			vNav,
			vFoot
		},
		data () {
			return {

			}
		},
		methods: {
			search: function() {
				this.$router.push('/user/search')
			}
		}
	};
</script>

<style>
	.main {
		min-height: 380px;
	}
</style>