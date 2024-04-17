export default function useFacebookLogin() {
  const isLoading = ref(false);
  const { $swal } = useNuxtApp()
  const error = ref(null);

  const initializeFacebookSDK = () => {
    return new Promise((resolve, reject) => {
      // Initialize the Facebook SDK asynchronously
      window.fbAsyncInit = function () {
        FB.init({
          appId: '1604230333665059',
          cookie: true,
          xfbml: true,
          version: 'v12.0',
        });

        // Resolve the promise when the SDK is ready
        resolve();
      };

      // Load the Facebook SDK script
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => {
        // SDK script loaded, trigger initialization
        window.fbAsyncInit();
      });
      script.addEventListener('error', () => {
        // Error loading SDK script
        reject(new Error('Failed to load Facebook SDK script.'));
      });

      document.head.appendChild(script);
    });
  };

  const handleFacebookLogin = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      // Initialize the Facebook SDK and wait for it to be ready
      await initializeFacebookSDK();

      // Now you can use the Facebook SDK functions to handle the login process
      try{
        FB.login(function (response) {
          if (response.authResponse) {
  
            facebookLogin(response.authResponse.accessToken)
  
          } else {
            $swal.fire({
              icon: 'error',
              title: 'فشل عملية التسجيل',
              text: "برجاء التواصل مع الدعم الفنى او التسجل بحسابك الخاص",
              confirmButtonText: 'تاكيد',
            });
          }
        });

      }catch(error ){
        console.log("Error al inciar sesión con Facebook: ", error );
      }
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  };

  const facebookLogin = async (facebookToken) => {
    const requestBody={
      "access_token":facebookToken
    }

    let { data: res } = await useBFetch('/login/facebook', 
      { method: 'post' ,
        body: JSON.stringify(requestBody), // Convert the object to a JSON string
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
      }
    );

    if(res){
      // localStorage.setItem("token",JSON.stringify(res.value.token));
      // localStorage.setItem("id",JSON.stringify(res.value.user_id));
      setCookie("token",res.value.token,7);
      setCookie("user_id",res.value.user_id,7);
      navigateTo('/', {
        external: true
      })

    }
  }

  const handleFacebookShare = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      // Initialize the Facebook SDK and wait for it to be ready
      await initializeFacebookSDK();

      // Now you can use the Facebook SDK functions to handle the login process
      try {
        FB.login(function (response) {
          if (response.authResponse) {

            facebookLogin(response.authResponse.accessToken)

          } else {
            $swal.fire({
              icon: 'error',
              title: 'فشل عملية التسجيل',
              text: "برجاء التواصل مع الدعم الفنى او التسجل بحسابك الخاص",
              confirmButtonText: 'تاكيد',
            });
          }
        });

      } catch (error) {
        console.log("Error al inciar sesión con Facebook: ", error);
      }
    } catch (e) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  };
  
  return {
    isLoading,
    error,
    handleFacebookLogin,
  };
}
