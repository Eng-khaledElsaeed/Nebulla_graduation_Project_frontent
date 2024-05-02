import { useStore } from "~/store/useStore";

export function isUserLogin() {
  const token = getCookie('token');
  return token != undefined
}

//import { useRoute } from 'vue-router';

export function userLogout() {
  const { $swal } = useNuxtApp()
  const route = useRoute();
  removeCookie('token')
  removeCookie('user_id')
  removeCookie('User_info')
  $swal.fire({
    icon: 'warning',
    title: 'تم تسجيل الخروج بنجاح',
    showConfirmButton: false,
    timer: 1500
  })
}

export function userLogin() {
  return navigateTo('/auth/login'); 
}

export async function IsProvider(){
  const userState = useStore()
  try {
    userState.isloading = true;
    let res =await useBFetch('IsProvider', {
        method: 'GET',
    });

    return res.data.value;
  } catch (error) {
    console.error('Error during user transaction:', error);
  } finally {
    userState.isloading = false;
  }
}

export async function ExtractIdentityData(frontIdentity) {
  const userState = useStore()
  const { $swal } = useNuxtApp()
  try {
    const formData = new FormData();
    userState.isloading = true;
    formData.append("image", frontIdentity);
    const response = await useBFetch('/NationalId/verification', {
      method: 'POST',
      body: formData,
    });
    if (response.data) {
      $swal.fire({
        icon: 'success',
        title: 'تم رفع صورة الرقم القومى بنجاح',
        confirmButtonText: 'تاكيد',
      })
    } else {
      $swal.fire({
        icon: 'error',
        title: 'فشل عملية الرفع',
        text: "برجاء محاولة الرفع مره اخرى",
        confirmButtonText: 'تاكيد',
      });
    }
    return response;
  } catch (error) {
    console.error('Error during user transaction:', error);
  } finally {
    userState.isloading = false;
  }
}

export async function updateProfile(formData, typeFlag = "المستخدم"){
  const userState = useStore()
  const { $swal } = useNuxtApp()
  let response = await useBFetch('/updateUser', {
    method: 'POST',
    body: formData,
  });
  if (response.data.value = "success") {
    $swal.fire({
      position: 'center',
      icon: 'success',
      title: 'تم تعديل ' + typeFlag + ' بنجاح ',
      showConfirmButton: false,
      timer: 4000,
      width: 500,
    });
    setUserInfo()
  } else {
    $swal.fire({
      icon: 'error',
      title: 'حدثت مشكله !',
      text: 'لم يتم تعديل ' + typeFlag,
    });
  }
};

export function getClintUrl(name,facebookProfile){
  if (facebookProfile) {
      return `<a href="${facebookProfile}" target="_blank" style="color:#1010ff;text-decoration: underline;">${name}</a>`;
  } else {
      return `<a href="https://www.facebook.com/khalet.elsaeed/" target="_blank" style="color:#1010ff;text-decoration: underline;">ITExperts</a>`;
  }
  // If no Facebook profile is available, simply display the customer's name
  return name;
};

export async function setUserInfo(userdata){
  try {
    console.log(userdata)
    setCookie("User_info",JSON.stringify(userdata),7)
  } catch (error) {
    console.error('Error during user transaction:', error);
  }
}

export async function getUserInfo(){
  const userState = useStore()
  try {
    userState.isloading = true;
    const userResponse = await useBFetch('getUser', { method: 'GET' });
    return userResponse.data.value.data[0]
  } catch (error) {
    console.error('Error during user transaction:', error);
  } finally {
    userState.isloading = false;
  }
}