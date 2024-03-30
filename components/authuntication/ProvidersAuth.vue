<template>
	<div class="d-none d-sm-block">
		<div class="row align-items-center p-1">
			<div class="col">
				<hr class="m-0">
			</div>
			<div class="col-auto">
				<span class="mx-4">or</span> <!-- Replace with your text -->
			</div>
			<div class="col">
				<hr class="m-0">
			</div>
		</div>

		<!-- Auth providers -->
		<div class="row justify-content-center p-1">
			<div class="col-12 text-center">
				<button class="btn btn-link" :style="{ color: authProviders.facebook.colorInDark }">
					<i class="bi bi-facebook fs-3"></i>
				</button>
				<button class="btn btn-link" :style="{ color: authProviders.google.colorInDark }">
					<i class="bi bi-google fs-3"></i>
				</button>
				<button class="btn btn-link" :style="{ color: authProviders.github.colorInDark }">
					<i class="bi bi-github fs-3"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
const authProviders = ref({
facebook: {
	icon: 'facebook',
	color: '#4267b2',
	colorInDark: '#4267b2',
},
google: {
	icon: 'google',
	color: '#db4437',
	colorInDark: '#db4437',
},
github:{
	icon: 'github',
	color: '#272727',
	colorInDark: '#fff',
}
})

</script>

<style lang="scss" scoped>

</style>
