<script setup lang="ts">
import { getUserlistInteractions } from '~/composables/global/bard_apis';
import { useStore } from '~/store/useStore';
import { ref, watch, computed, onMounted } from "vue";
const { $swal } = useNuxtApp()
import { useRoute } from 'nuxt/app';
definePageMeta({
  middleware: ["auth"],
  layout: 'chatwindow',
})

const route = useRoute();
const store = useStore()

const isSidebarActive = computed(() => store.isSidebarActive)


await getUserlistColections()
await getUserlistInteractions(route.params.collectionid);

</script>

<template>
	<div class="chat-container">
		<!--<div></div>-->
		<div class="chat-window">
			<div class="chat-content">
				<section id="Prompts" class="row">
					<div class="col-12">
						<div class="prompt-container" v-for="prompt in store.interactions">
							<ClintPromptRequest :userPromotText="prompt.user_chat" />
							<ServerPromptResponse :ModelResponseText="prompt.response_chat" />
						</div>
					</div>
				</section>
				<ModelTextInput></ModelTextInput>
			</div>
		</div>
	</div>
</template>
