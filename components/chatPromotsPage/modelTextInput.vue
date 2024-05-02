<template>
	<div class="chat-window-text-input row">
		<div class="col-12">
			<div class="model-text-input-container row">
				<form method="post" @submit.prevent="sendUserChat">
					<div class="col-9 position-relative">
						<input v-model="formData.user_chat" type="text" id="form3user_chat" name="user_chat"
							:placeholder="placeholderText" class="form-control" @change="v$.user_chat.$touch" :class="{
								'border border-danger focus-border-danger': v$.user_chat.$error,
								'border-[#42d392] ': !v$.user_chat.$invalid,
							}" maxlength="250" aria-label="Enter your message" />
						<span class="character-counter">{{ formData.user_chat.length }}/250</span>
					</div>
					<div class="icons-btns-group col-3">
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
			</div>
		</div>

		<div class="col-12">
			<div class="sub_Chat_Window_Footer clearfix mb-0 text-muted">
				<p>2023 &copy;Nebulla may display inaccurate info, including about people, so double-check its
					responses.
					<a href="#">Nebulla Team</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useStore } from '~/store/useStore';
const { $swal } = useNuxtApp()
const userState = useStore()
const route = useRoute();

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
			userState.isloading = true;
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
			
		} catch (e) {
			console.log(e.message)
		} finally {
			userState.isloading = false;
		}
	}
}

</script>

<style lang="scss" scoped>

</style>