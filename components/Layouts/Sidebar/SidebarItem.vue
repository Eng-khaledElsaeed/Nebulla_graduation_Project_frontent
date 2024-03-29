<script lang="ts" setup>
const { $bootstrap } = useNuxtApp();
interface Menu {
	name: string
	isTitle: boolean
	key?: string
	icon?: string
	url?: string
	submenu: {
		name: string
		url: string
	}[]
}

const props = defineProps<{
	item: Menu
}>();

const route = useRoute();
const sidebarItem = ref<HTMLElement>();
const submenu = ref<HTMLElement>();
const submenuOriginalHeight = ref(0);
const submenuHeight = ref('auto');
const isSubActive = ref(true);
const isActive = computed(() => {
	return route.path == props.item.url || (props.item.submenu && props.item.submenu.some((sub) => sub.url == route.path));
});

onMounted(() => {
	if (submenu.value) {
		submenuOriginalHeight.value = submenu.value.offsetHeight

		isSubActive.value = isActive.value
		submenuHeight.value = (isSubActive.value ? submenuOriginalHeight.value : 0) + "px"
	}

	let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new $bootstrap.Tooltip(tooltipTriggerEl);
	});
})


const hasSub = computed(() => {
	if (props.item.hasOwnProperty("submenu")) {
		if (props.item.submenu.length > 0) {
			return true;
		}
	}
	return false;
})

const menuClick = (event: MouseEvent) => {
	if (isSubActive.value)
		submenuHeight.value = "0";
	else submenuHeight.value = submenuOriginalHeight.value + "px"
	isSubActive.value = !isSubActive.value;
}

const isUrlActive = (url: string) => url == route.path;
const itemTitle = (title: string, Maxlength: number = 20) => {
	let Title = title; // Initialize with the original title
	if (title.length > Maxlength) {
		Title = Title.slice(0, Maxlength) + "..."; // Truncate if length exceeds Maxlength
	}
	return Title;
}
</script>

<template>
	<li class="sidebar-item" :class="{ 'active': isActive, 'has-sub': hasSub }" ref="sidebarItem">
		<template v-if="hasSub">
			<a class="sidebar-link" href="#" @click="menuClick">
				<i :class="`bi bi-${item.icon}`"></i>
				<span>{{ item.name }}</span>
			</a>
			<ul class="submenu" :class="{ 'active': isSubActive }" ref="submenu" :style="{ height: submenuHeight }">
				<li v-for="(sub, i) in item.submenu" :key="i" class="submenu-item"
					:class="{ 'active': isUrlActive(sub.url) }">
					<nuxt-link :to="sub.url">{{ sub.name }}</nuxt-link>
				</li>
			</ul>
		</template>
		<template v-else>
			<div class="sidebar-link">
				<nuxt-link :to="item.url" data-bs-toggle="tooltip" data-bs-placement="top" :title="item.name">
					<div>
						<i :class="`bi bi-${item.icon}`"></i>
						<span>{{ itemTitle(item.name, 20) }}</span>
					</div>
				</nuxt-link>

				<div class="btn-group dropend me-1 mb-1">
					<button type="button" class="sideitemAction" data-bs-toggle="dropdown" aria-haspopup="true"
						aria-expanded="false">
						<i :class="`bi bi-three-dots-vertical`"></i>
					</button>
					<div class="dropdown-menu position-fixed ms-4 w-2">
						<a class="dropdown-item" href="#">
							<i :class="`bi bi-pin`"></i>
							<span>Pin</span>
						</a>
						<a class="dropdown-item" href="#">
							<i :class="`bi bi-pencil-square`"></i>
							<span>Rename</span>
						</a>
						<hr class="dropdown-divider">
						<a class="dropdown-item" href="#">
							<i :class="`bi bi-trash`"></i>
							<span>Delete</span>
						</a>
					</div>
				</div>

			</div>
		</template>
	</li>
</template>
<style>
.submenu {
	transition: all .5s !important;
}
</style>
