<template>
	<div class="chat-windo-text-input navbar-expand navbar-light">
		<div id="modelTextInput" class="row">
			<div class="col-12">
				<ModelTextInput></ModelTextInput>

				<div class="sub_Chat_Window_Footer clearfix mb-0 text-muted">
					<p>2023 &copy;Nebulla may display inaccurate info, including about people, so double-check its
						responses.
						<a href="#">Nebulla Team</a>
					</p>
				</div>

			</div>
		</div>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.chat-windo-text-input{
	position: sticky;
	background-color: var(--bs-body-bg);
	z-index: 9;
	top: 0;
	width: inherit;

	//position: sticky;
	//bottom: 0;
	//z-index: 1;
	#modelTextInput {
		width: 100%;
		margin: 0 auto;
		overflow: hidden;
		.sub_Chat_Window_Footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
		}
	}
}

</style>