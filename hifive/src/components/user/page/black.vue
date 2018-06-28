<template>
	
</template>

<script>
	export default {
		data() {
			this.$router.push('/user/search');
			return {
				
			}
		}
	}
</script>

<!-- <template>
	<div>
		<img :src="headImage" style="width:100px;height:100px">
		<input type="file" id="head" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" @change="changeImage">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				headImage: '',
			}
		},
		methods: {
			changeImage: function() {
				this.getImgURL(document.getElementById('head'));
			},
			getImgURL: function(node) {
				alert(node.files[0].name);
				var imgURL = "";
				try{
					var file = null;
					if(node.files && node.files[0] ){
						file = node.files[0];
					}else if(node.files && node.files.item(0)) {
						file = node.files.item(0);
						// alert(imgURL);
					}

					try{

						imgURL =  file.getAsDataURL();

					}catch(e){

						imgURL = window.URL.createObjectURL(file);

					}
				}catch(e){

					if (node.files && node.files[0]) {
						var reader = new FileReader();
						reader.onload = function (e) {
							imgURL = e.target.result;
						};
						reader.readAsDataURL(node.files[0]);
					}
				}
				this.headImage = imgURL;
				return imgURL;
			},

		}
	}
</script> -->