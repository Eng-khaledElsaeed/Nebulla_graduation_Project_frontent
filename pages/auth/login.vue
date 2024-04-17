<template>
	<section class="background-radial-gradient overflow-hidden">
		<div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
			<div class="row gx-lg-5 align-items-center mb-5">
				<div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
					<h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
						Nebulla AI Ecosystem <br />
						<span style="color: hsl(218, 81%, 75%)">for your life development</span>
					</h1>
					<!--<p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
						
					</p>-->
				</div>

				<div class="col-lg-6 mb-5 mb-lg-0 position-relative">
					<div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
					<div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

					<div class="card bg-glass">
						<div class="card-body px-4 py-5 px-md-5">
							<form method="post" @submit.prevent="handleSubmit">
								<!-- Email input -->
								<div class="form-outline mb-4">
									<label class="form-label" for="form3Email">Email</label>
									<div class="position-relative">
										<input v-model="formData.email" type="email" id="form3Email" name="email"
											placeholder="e.g. example@email.com" class="form-control"
											@change="v$.email.$touch" :class="{
												'border border-danger focus-border-danger': v$.email.$error,
												'border-[#42d392] ': !v$.email.$invalid,
											}" />
										<i v-if="!v$.email.$invalid || v$.email.$error" style="top: 0;right: -22px;"
											:class="`bi ${!v$.email.$error ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} ${!v$.email.$invalid ? 'text-success' :'text-warning'}  fs-5`"
											class="position-absolute end-2 h-full text-success"></i>
									</div>

									<div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
										<div class="text-danger">{{ error.$message }}</div>
									</div>
								</div>

								<!-- Password input -->
								<div class="form-outline mb-4">
									<label class="form-label" for="form3Pass">Password</label>

									<div class="position-relative">
										<input v-model="formData.password" type="password" id="form3Pass"
											class="form-control" name="pass" placeholder="........"
											@change="v$.password.$touch" :class="{
												'border border-danger focus-border-danger': v$.password.$error,
												'border-[#42d392] ': !v$.password.$invalid,
											}" />
										<i v-if="!v$.password.$invalid || v$.password.$error"
											style="top: 0;right: -22px;"
											:class="`bi ${!v$.password.$error ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} ${!v$.password.$invalid ? 'text-success' : 'text-warning'}  fs-5`"
											class="position-absolute end-2 h-full text-success"></i>
										<div class="input-errors" v-for="error of v$.password.$errors"
											:key="error.$uid">
											<div class="text-danger">{{ error.$message }}</div>
										</div>
									</div>
								</div>

								<!-- Submit button -->
								<button type="submit" class="btn btn-primary btn-block mb-4">
									login
								</button>

								<div class="authinticatin-role mb-4">
									<span>i not have account!,i need to - </span> <a href="signup"> Sign up ?</a>
								</div>

								<!-- Register buttons -->
								<ProvidersAuth></ProvidersAuth>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';



definePageMeta({
	layout: 'blank',
})

const formData = reactive({
	email: '',
	password: '',
});



const rules = computed(() => {
	return {
		email: {
			required: helpers.withMessage('The email field is required', required),
			email: helpers.withMessage('Invalid email format', email),
		},
		password: {
			required: helpers.withMessage('The password field is required', required),
			minLength: minLength(6),
		},
	};
});

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
	v$.value.$validate();
	if (!v$.value.$error) {
		try {
			let res = await useBFetch('auth/login', {
				method: 'POST',
				body: { email: formData.email, password: formData.password }
			});
	
			if (res && res.data.value) {
				$swal.fire({
					icon: 'success',
					title: 'Registration Successful!',
					showConfirmButton: false,
					timer: 1500
				})

				setCookie("token", res.data.value.token, 7);
				setCookie("user_id", res.data.value.user_id, 7);
				await setUserInfo();
				// navigateTo()
				setTimeout(() => {
					navigateTo('/')
				}, 500);
			} else if (res.error.value.statusCode === 401) {
				$swal.fire({
					icon: 'error',
					title: 'Invalid credentials!',
					text: 'Invalid email or password! Please try again',
					confirmButtonText: 'ok'
				});
			}
		} catch (e) {
			console.log(e.message)
		} finally {
		
		}
	}
}

</script>

<style lang="scss" scoped>

</style>




