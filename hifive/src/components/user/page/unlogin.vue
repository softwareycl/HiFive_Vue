<template>
	<el-container>
		<el-header style="height:auto">
			<v-head></v-head>
			<v-nav></v-nav>
		</el-header>
		<el-main style="min-height:400px;">Main</el-main>
		<el-footer>
			<v-foot></v-foot>
		</el-footer>
	</el-container>
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

		}
	};
</script>

<style>
	el-header {
		margin: 0px 50px;
	}
	el-footer {
		margin: 0;
	}
</style>