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
			//'Content-Type': 'application/json'
        }
    }

    const abortController = new AbortController()


    const { data, error } = await useFetch(request, { baseURL: config.public.baseURL, ...opts })

    if (error && error.value && error.value.statusCode == 200) {
        $swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your session has been ended, please login again",
            footer: '<a href="auth/login">are you want to relogin?</a>',
            });
        // Handle other cases as needed
        reject(error); // Reject the Promise with the error
    }
  
    if (error && error.value && error.value.statusCode == 440) {
        $swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your session has been ended, please login again",
            footer: '<a href="auth/login">are you want to relogin?</a>',
            });
        abortController.abort()
        navigateTo('/auth/login', {
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
            footer: '<a href="auth/login">are you want to relogin?</a>',
        });
    }
    
    return { data, error }

}

