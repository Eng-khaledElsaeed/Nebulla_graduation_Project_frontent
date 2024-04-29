import { useRouter } from 'vue-router';
export const useBFetch = async (request, opts, withAuthenticate=true) => {
    // const router = useRouter();
    const config = useRuntimeConfig()
    const { $swal } = useNuxtApp()

    if (opts == undefined) opts = {}

    if (getCookie('token') && withAuthenticate) {
        opts.headers = {
            ...opts.headers,
            'Authorization': `Bearer ${getCookie('token')}`,
			'Content-Type': 'application/json'
        }
    }

    const abortController = new AbortController()


    const { data, error } = await useFetch(request, { baseURL: config.public.baseURL, ...opts })

    if (error && error.value && error.value.statusCode == 200) {
        $swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your session has been ended, please signin again",
            footer: '<a href="auth/signin">are you want to resignin?</a>',
            });
        // Handle other cases as needed
        reject(error); // Reject the Promise with the error
    }
  
    if (error && error.value && error.value.statusCode == 440) {
        $swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your session has been ended, please signin again",
            footer: '<a href="auth/signin">are you want to resignin?</a>',
            });
        abortController.abort()
        navigateTo('/auth/signin', {
            external: true
        })
    }


    if (error && error.value
        && error.value.statusCode == 500) {
            console.log(error.value)
        navigateTo('/auth/ServerError', {
           external: false
        })
    }


    if (error && error.value && error.value.statusCode == 400) {
        $swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.value.data.error.detials,
            footer: '<a href="auth/signin">are you want to resignin?</a>',
        });
    }
    
    return { data, error }

}

