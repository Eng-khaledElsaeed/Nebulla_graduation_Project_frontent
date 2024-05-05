
<template>
	<div class="server-promot">
		<div class="card">
			<div class="card-body">
				<div class="d-flex align-items-start">
					<div class="avatar avatar-md">
						<img src="~/assets/images/logo/logo.png" alt="Face 1">
					</div>
					
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
import { onBeforeMount, ref, watch } from 'vue'
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



const md = ref(`
##### Just a Vue app

This is markdown content rendered via the \`<MDCRenderer>\` component,
including MDC below.

::alert
Hello MDC
::

\`\`\`ts
const a = 1;
\`\`\`
`);

const parse = useMarkdownParser()
//const ast = await parse(md.value)
const ast = await parse(props.ModelResponseText)

//onBeforeMount(async () => {
//	ast.value =
//})
console.log(ast)

</script>

<style lang="scss" scoped>

</style>




<!--

<template>
	<div class="server-promot">
		<div class="card">
			<div class="card-body">
				<div class="d-flex align-items-start">
					<div class="avatar avatar-md">
						<img src="~/assets/images/logo/logo.png" alt="Face 1">
					</div>

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
import { onBeforeMount, ref, watch } from 'vue'
import { parseMarkdown } from '@nuxtjs/mdc/runtime';
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

const modelResponseText = await parseMarkdown(props.ModelResponseText)
console.log(modelResponseText)


const md = ref(`
# Just a Vue app

This is markdown content rendered via the \`<MDCRenderer>\` component,
including MDC below.

::alert
Hello MDC
::

\`\`\`ts
const a = 1;
\`\`\`
`);

const ast = ref(null)
const parse = useMarkdownParser()

onBeforeMount(async () => {
	ast.value = await parse(md.value)
})

</script>

<style lang="scss" scoped></style>-->