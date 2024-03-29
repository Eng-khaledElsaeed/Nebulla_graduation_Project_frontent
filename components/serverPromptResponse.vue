<template>
	<div class="card">
		<div class="card-body">
			<div class="d-flex align-items-start">
				<div class="avatar avatar-lg">
					<img src="~/assets/images/logo/logo.png" alt="Face 1">
				</div>
				<div class="ms-3 name">
					<h5 class="font-bold">{{ name }}</h5>
					<h6 class="text-muted mb-0">{{ username }}</h6>
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
})

</script>

<style lang="scss" scoped></style>