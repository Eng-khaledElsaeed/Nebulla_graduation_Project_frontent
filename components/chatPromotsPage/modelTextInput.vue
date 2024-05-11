<template>
	<div class="chat-window-text-input">

		<div class="model-text-input-container row">
			<div class="image-preview" v-if="showUploadImage">
				<img :src="uploadedImageSrc" alt="" />
			</div>
			<div class="position-relative">
				<textarea v-model="formData.user_chat" type="text" name="user_chat" :placeholder="placeholderText"
					class="form-control input" @change="v$.user_chat.$touch" :class="{
						'border border-danger focus-border-danger': v$.user_chat.$error,
						'border-[#42d392] ': !v$.user_chat.$invalid,
					}" aria-label="Enter your message" id="textarea" maxlength="2500" style="resize: vertical;scrollbar-width: none;"
					:rows="max_rows" />
				<span class="character-counter">{{ formData.user_chat.length }}/2500</span>
			</div>

			<div class="icons-btns-group">
				<button id="imageUploader" class="icon-btn" aria-label="Upload Image" @click="handleImageUpload">
					<i class="bi bi-image-fill fs-4"></i>
				</button>
				<input type="file" id="imageInput" accept="image/*" class="d-none" @change="uploadImage">
				<button id="voiceRecognition" class="icon-btn" aria-label="Use Voice Recognition"
					@click="handlevoiceRecognition">
					<i class="bi bi-mic fs-4"></i>
				</button>
				<button id="send" type="submit" class="icon-btn text-success" @click="sendUserChat"
					v-if="formData.user_chat.length > 0 && !userState.Responseisloading">
					<i class="bi bi-send-check fs-4"></i>
				</button>
				<button class="icon-btn text-success spinner" v-if="userState.Responseisloading">
					<i class="bi bi-arrow-repeat fs-4"></i>
				</button>
			</div>
		</div>

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
let showUploadImage = ref(false)
let uploadedImageSrc = ref(null)

const formData = reactive({
	user_chat: '',
	image: null,
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

const handleImageUpload = () => {
	let input = document.querySelector('#imageInput')
	input.click();
};
const uploadImage = (event) => {
	const file = event.target.files[0];
	if (file) {
		formData.image = file;
		const reader = new FileReader();

		reader.onload = function (event) {
			uploadedImageSrc.value = event.target.result;
		};

		reader.readAsDataURL(file);
		showUploadImage.value = true;
	}
}

const handlevoiceRecognition = (event) => {
	const file = event.target.files[0];
	if (file) {
		formData.image = file;
	}
}
console.log(route.params.collectionid)
const v$ = useVuelidate(rules, formData);
const sendUserChat = async () => {
	const data = new FormData();
	v$.value.$validate();
	if (!v$.value.$error) {
		try {
			userState.Responseisloading = true;
			console.log(formData)
			data.append('user_chat',JSON.stringify(formData.user_chat)); // Add user_chat to FormData
			if (formData.image) {
				data.append('image', formData.image); // Add image to FormData if it exists
			}
			if (!route.params.collectionid) {
				let res = await useBFetch('aiapp/StartInteractionView/', {
					method: 'POST',
					body: data
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
					body: data
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
			showUploadImage.value = false;
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