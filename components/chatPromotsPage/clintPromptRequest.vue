<template>
	<div class="clint-promot">
		<div class="card">
			<div class="card-body">
				<div class="d-flex align-items-start">
					<div class="avatar avatar-md">
						<img :src="avatarSrc" alt="Face 1">
					</div>
					<!--<div class="ms-3">
						<h5 class="prompt-Text">{{ userPromotText }}</h5>
					</div>-->
					<div class="ms-3" markdown=1>
						<Suspense>
							<MDCRenderer v-if="ast?.body" :body="ast.body" :data="ast.data" />
						</Suspense>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	imageFace: {
		type: String,
	},
	userPromotText: {
		type: String,
		default: "@johnducky"
	},
	name: {
		type: String,
		default: "khaled Elsaeed"
	},
	username: {
		type: String,
		default: "@KhaledElsaeed"
	},
})
const avatarSrc =ref('')

onMounted(() => {
	avatarSrc.value = generate(props.name)
	//const avatarSrc = props.imageFace || generate(props.name)
})

const parse = useMarkdownParser()
const ast = await parse(props.userPromotText)

console.log(ast)
</script>

<style lang="scss" scoped>

</style>