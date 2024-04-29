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
								<!-- 2 column grid layout with text inputs for the first and last names -->
								<div class="row">
									<div class="col-md-6 form-outline mb-4">
										<label class="form-label" for="form4first">First name</label>
										<div class="position-relative">
											<input v-model="formData.firstName" type="text" id="form4first" name="email"
												placeholder="e.g. example@email.com" class="form-control"
												@change="v$.firstName.$touch" :class="{
													'border border-danger focus-border-danger': v$.firstName.$error,
													'border-[#42d392] ': !v$.firstName.$invalid,
												}" />
											<i v-if="!v$.firstName.$invalid || v$.firstName.$error"
												style="top: 0;right: -22px;"
												:class="`bi ${!v$.firstName.$error ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} ${!v$.firstName.$invalid ? 'text-success' : 'text-warning'}  fs-5`"
												class="position-absolute end-2 h-full text-success"></i>
										</div>

										<div class="input-errors" v-for="error of v$.firstName.$errors"
											:key="error.$uid">
											<div class="text-danger">{{ error.$message }}</div>
										</div>
									</div>

									<div class="col-md-6 form-outline mb-4">
										<label class="form-label" for="form4last">Last name</label>
										<div class="position-relative">
											<input v-model="formData.lastName" type="text" id="form4last" name="email"
												placeholder="e.g. example@email.com" class="form-control"
												@change="v$.lastName.$touch" :class="{
													'border border-danger focus-border-danger': v$.lastName.$error,
													'border-[#42d392] ': !v$.lastName.$invalid,
												}" />
											<i v-if="!v$.lastName.$invalid || v$.lastName.$error"
												style="top: 0;right: -22px;"
												:class="`bi ${!v$.lastName.$error ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} ${!v$.lastName.$invalid ? 'text-success' : 'text-warning'}  fs-5`"
												class="position-absolute end-2 h-full text-success"></i>
										</div>

										<div class="input-errors" v-for="error of v$.lastName.$errors"
											:key="error.$uid">
											<div class="text-danger">{{ error.$message }}</div>
										</div>
									</div>
								</div>


								<!-- username input -->
								<div class="form-outline mb-4">
									<label class="form-label" for="form4Username">username</label>
									<div class="position-relative">
										<input v-model="formData.username" type="username" id="form4Username"
											name="username" placeholder="e.g. example_E3" class="form-control"
											@change="v$.username.$touch" :class="{
												'border border-danger focus-border-danger': v$.username.$error,
												'border-[#42d392] ': !v$.username.$invalid,
											}" />
										<i v-if="!v$.username.$invalid || v$.username.$error"
											style="top: 0;right: -22px;"
											:class="`bi ${!v$.username.$error ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} ${!v$.username.$invalid ? 'text-success' : 'text-warning'}  fs-5`"
											class="position-absolute end-2 h-full text-success"></i>
									</div>

									<div class="input-errors" v-for="error of v$.username.$errors" :key="error.$uid">
										<div class="text-danger">{{ error.$message }}</div>
									</div>
								</div>

								<!-- Email input -->
								<div class="form-outline mb-4">
									<label class="form-label" for="form4Email">Email</label>
									<div class="position-relative">
										<input v-model="formData.email" type="email" id="form4Email" name="email"
											placeholder="e.g. example@email.com" class="form-control"
											@change="v$.email.$touch" :class="{
												'border border-danger focus-border-danger': v$.email.$error,
												'border-[#42d392] ': !v$.email.$invalid,
											}" />
										<i v-if="!v$.email.$invalid || v$.email.$error" style="top: 0;right: -22px;"
											:class="`bi ${!v$.email.$error ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} ${!v$.email.$invalid ? 'text-success' : 'text-warning'}  fs-5`"
											class="position-absolute end-2 h-full text-success"></i>
									</div>

									<div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
										<div class="text-danger">{{ error.$message }}</div>
									</div>
								</div>



								<!-- Password input -->
								<div class="form-outline mb-4">
									<label class="form-label" for="form4pass">Password</label>

									<div class="position-relative">
										<input v-model="formData.password" type="password" id="form4pass"
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


								<!-- Password input -->
								<div class="form-outline mb-4">
									<label class="form-label" for="form4confPass">confirm Password</label>

									<div class="position-relative">
										<input v-model="formData.confirmation_password" type="password"
											id="form4confPass" class="form-control" name="pass" placeholder="........"
											@change="v$.confirmation_password.$touch" :class="{
												'border border-danger focus-border-danger': v$.confirmation_password.$error,
												'border-[#42d392] ': !v$.confirmation_password.$invalid,
											}" />
										<i v-if="!v$.confirmation_password.$invalid || v$.confirmation_password.$error"
											style="top: 0;right: -22px;"
											:class="`bi ${!v$.confirmation_password.$error ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} ${!v$.confirmation_password.$invalid ? 'text-success' : 'text-warning'}  fs-5`"
											class="position-absolute end-2 h-full text-success"></i>
										<div class="input-errors" v-for="error of v$.confirmation_password.$errors"
											:key="error.$uid">
											<div class="text-danger">{{ error.$message }}</div>
										</div>
									</div>
								</div>

								<!-- Submit button -->
								<button type="submit" class="btn btn-primary btn-block mb-4">
									Sign up
								</button>

								<div class="authinticatin-role mb-4">
									<span>i have account,i need to - </span> <a href="login"> login ?</a>
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
	username: '',
	email: '',
	firstName:'',
	lastName:'',
	password: '',
	confirmation_password:''
});

const rules = computed(() => {
	return {
		username: {
			required: helpers.withMessage('The username field is required', required),
		},
		email: {
			required: helpers.withMessage('The email field is required', required),
			email: helpers.withMessage('Invalid email format', email),
		},
		password: {
			required: helpers.withMessage('The password field is required', required),
			minLength: minLength(6),
		},
		confirmation_password: {
			required: helpers.withMessage('The confirmation password field is required', required),
			sameAsPassword: helpers.withMessage('Passwords do not match', sameAs(formData.password)),
		},
		firstName: {
			required: helpers.withMessage('The first name field is required', required),
		},
		lastName: {
			required: helpers.withMessage('The last name field is required', required),
		}
	};
});

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
	v$.value.$validate();
	if (!v$.value.$error) {
		try {
			let res = await useBFetch('account/register', {
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
					confirmButtonText: 'حسنا'
				});
			}
		} catch (e) {
			console.log(e.message)
		} finally {

		}
	}
}

</script>

<style lang="scss" scoped></style>
