<template>
	<div class="page-heading">
		<section class="section">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">{{ promptTitle }}</h4>
				</div>
				<div class="card-body">
					{{ promptText }}
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
const props = defineProps({
	promptTitle: {
		type: String,
		default: ""
	},
	promptText: {
		type: String,
		default: ""
	}
})
</script>