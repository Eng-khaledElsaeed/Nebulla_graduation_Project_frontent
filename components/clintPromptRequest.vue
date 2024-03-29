<template>
	<div class="card">
		<div class="card-body">
			<div class="d-flex align-items-start">
				<div class="avatar avatar-lg">
					<img :src="avatarSrc" alt="Face 1">
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
	imageSrc: {
		type: String,
		default: "~assets/images/faces/1.jpg"
	},
	name: {
		type: String,
		default: "John Duck"
	},
	username: {
		type: String,
		default: "@johnducky"
	},
})

const avatarSrc = generate(props.name)
//const avatarSrc = props.imageSrc || generate(props.name)
</script>

<style lang="scss" scoped></style>