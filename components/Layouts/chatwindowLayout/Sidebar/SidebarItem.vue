<script lang="ts" setup>
import { defineProps, ref, computed, onMounted } from 'vue';


const { $bootstrap } = useNuxtApp();

const props = defineProps({
	item: {
		type: Object,
	}
});

const route = useRoute();
const sidebarItem = ref<HTMLElement>();

onMounted(() => {
	let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new $bootstrap.Tooltip(tooltipTriggerEl);
	});
});

const isUrlActive = (id: number) => `/collection/${id}` == route.path;
const isActive = computed(() => {
	// Check if the item object and its id property are defined
	if (props.item && props.item.id) {
		return route.path == `/collection/${props.item.id}`;
	}
});

const itemTitle = (title: string, maxLength: number = 20) => {
	
	if (!title) {
		return ''; // or any default value
	}

	let Title = title; // Initialize with the original title
	if (title.length > maxLength) {
		Title = Title.slice(0, maxLength) + "..."; // Truncate if length exceeds maxLength
	}
	return Title;
}

console.log(props.item)
</script>

<template>
	<li class="sidebar-item" :class="{ 'active': isActive }" ref="sidebarItem">
		<div class="sidebar-link">
			<nuxt-link :to="`/collection/${props.item.id}`" data-bs-toggle="tooltip" data-bs-placement="top"
				:title="props.item.title">
				<div>
					<i class="bi bi-menu-up"></i>
					<span>{{ itemTitle(props.item.title, 20) }}</span>
				</div>
			</nuxt-link>

			<div class="btn-group dropend me-1 mb-1">
				<button type="button" class="sideitemAction" data-bs-toggle="dropdown" aria-haspopup="true"
					aria-expanded="false">
					<i class="bi bi-three-dots-vertical"></i>
				</button>
				<div class="dropdown-menu position-fixed ms-4 w-2">
					<a class="dropdown-item" href="#">
						<i class="bi bi-pin"></i>
						<span>Pin</span>
					</a>
					<a class="dropdown-item" href="#">
						<i class="bi bi-pencil-square"></i>
						<span>Rename</span>
					</a>
					<hr class="dropdown-divider">
					<a class="dropdown-item" href="#">
						<i class="bi bi-trash"></i>
						<span>Delete</span>
					</a>
				</div>
			</div>
		</div>
	</li>
</template>

<style>
.submenu {
	transition: all .5s !important;
}
</style>
