import { useStore } from "~/store/useStore";

export async function getUserlistColections() {
	const userState = useStore()
	try {
		userState.isloading = true;
		let res = await useBFetch('aiapp/getUserlistColections/', {
			method: 'GET',
		});
		
		//for (let i = 0; i < res.data.value.collections.length; ++i) {
		//	userState.collections=[]
		//	let collection_id = res.data.value.collections[i].id
		//	let collection_title = res.data.value.collections[i].title
		//	let created_at = res.data.value.collections[i].created_at
		//	let updated_at = res.data.value.collections[i].updated_at
		//	if (collection_id) {
		//		userState.collections.push({
		//			"name": `${collection_title}`,
		//			"url": `/collection/${collection_id}`,
		//			"created_at": `${created_at}`,
		//			"updated_at": `${updated_at}`,
		//			"icon": "menu-up"
		//		})
		//	}
		//}

		userState.collections = res.data.value.collections;
		console.log(userState.collections)
		return userState.collections;	
	} catch (error) {
		console.error('Error during get collectons:', error);
	} finally {
		userState.isloading = false;
	}
}

export async function getUserlistInteractions(collectionid) {
	const userState = useStore()
	try {
		userState.interactions=[]
		userState.isloading = true;
		let res = await useBFetch(`aiapp/getUserlistInteractions/${collectionid}/`, {
			method: 'GET',
		});

		console.log(res.data.value.interactions)
		userState.interactions = res.data.value.interactions;
		return userState.interactions;	
		
	} catch (error) {
		console.error('Error during get collectons:', error);
	} finally {
		userState.isloading = false;
	}
}


