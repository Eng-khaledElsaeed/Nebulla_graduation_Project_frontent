
<template>
	<div class="server-promot">
		<div class="card">
			<div class="card-body">
				<div class="d-flex align-items-start">
					<div class="avatar avatar-md">
						<img src="~/assets/images/logo/logo.png" alt="Face 1">
					</div>

					<div class="ms-3">
						<h5 class="prompt-Text">{{ ModelResponseText }}</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	name: {
		type: String,
		default: "Nebulla"
	},
	username: {
		type: String,
		default: ""
	},
	ModelResponseText: {
		type: String,
		default: "@johnducky"
	},
})

</script>

<style lang="scss" scoped>

</style>