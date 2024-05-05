<template>
	<div class="chat-window-text-input">

		<form method="post" @submit.prevent="sendUserChat" class="model-text-input-container row">
			<div class="position-relative">
				<textarea v-model="formData.user_chat" type="text" name="user_chat" :placeholder="placeholderText"
					class="form-control input" @change="v$.user_chat.$touch" :class="{
						'border border-danger focus-border-danger': v$.user_chat.$error,
						'border-[#42d392] ': !v$.user_chat.$invalid,
					}" aria-label="Enter your message" id="textarea" maxlength="2500" style="resize: vertical;scrollbar-width: none;"
					:rows="max_rows" />
				<span class="character-counter">{{ formData.user_chat.length }}/2500</span>
			</div>

			<div class="icons-btns-group" v-if="formData.user_chat.length > 0 && !userState.Responseisloading">
				<button id="imageUploader" class="icon-btn" aria-label="Upload Image">
					<i class="bi bi-image-fill fs-4"></i>
				</button>
				<button id="voiceRecognition" class="icon-btn" aria-label="Use Voice Recognition">
					<i class="bi bi-mic fs-4"></i>
				</button>
				<button id="send" type="submit" class="icon-btn text-success">
					<i class="bi bi-send-check fs-4"></i>
				</button>
			</div>
		</form>



		<div class="sub_Chat_Window_Footer clearfix mb-0 text-muted">
			<p>2023 &copy;Nebulla may display inaccurate info, including about people, so double-check its
				responses.
				<a href="#">Nebulla Team</a>
			</p>
		</div>

	</div>
</template>

<script setup>
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useStore } from '~/store/useStore';
import PerfectScrollbar from "perfect-scrollbar"


const { $swal } = useNuxtApp()
const userState = useStore()
const route = useRoute();
let max_rows = ref(2);
const formData = reactive({
	user_chat: '',
});

const rules = computed(() => {
	return {
		user_chat: {
			required: helpers.withMessage('The user_chat field is required', required),
			//username: helpers.withMessage('Invalid username format', username),
		},
	};
});

const placeholderText = computed(() => {
	return "Ask me a question";
});
console.log(route.params.collectionid)
const v$ = useVuelidate(rules, formData);
const sendUserChat = async () => {
	v$.value.$validate();
	if (!v$.value.$error) {
		try {
			userState.Responseisloading = true;
			if (!route.params.collectionid) {
				let res = await useBFetch('aiapp/StartInteractionView/', {
					method: 'POST',
					body: formData
				});

				if (res && res.data.value) {
					await getUserlistColections()
					await getUserlistInteractions(res.data.value.collection.id);
					console.log(res.data.value)
					setTimeout(() => {
						navigateTo(`collection/${res.data.value.collection.id}`)
					}, 500);
				} else if (res.error.value.statusCode === 401) {
					$swal.fire({
						icon: 'error',
						title: 'Invalid credentials!',
						text: 'Invalid username or password! Please try again',
						confirmButtonText: 'ok'
					});
				}
			}else {
				let res = await useBFetch(`aiapp/StartInteractionView/${route.params.collectionid}/`, {
					method: 'POST',
					body: formData
				});

				if (res && res.data.value) {
					await getUserlistColections()
					await getUserlistInteractions(route.params.collectionid);
					console.log(res.data.value)
					//setTimeout(() => {
					//	navigateTo(`collection/${res.data.value.collection.id}`)
					//}, 500);
				} else if (res.error.value.statusCode === 401) {
					$swal.fire({
						icon: 'error',
						title: 'Invalid credentials!',
						text: 'Invalid username or password! Please try again',
						confirmButtonText: 'ok'
					});
				}
			}
			formData.user_chat = ''
		} catch (e) {
			console.log(e.message)
		} finally {
			userState.Responseisloading = false;
		}
	}
}

watch(() => formData.user_chat, (newValue, oldValue) => {
	if (newValue.length > 150 && newValue.length < 300) {
		max_rows.value = 4; // Set max_rows to 5 if the length exceeds 150
	} else if (newValue.length > 300) {
		max_rows.value = 6; // Otherwise, set max_rows to 2
	}
});

</script>

<style lang="scss" scoped>

</style>