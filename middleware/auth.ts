export default defineNuxtRouteMiddleware((to, from) => {
  const token = getCookie('bard_ai_token')





  const authorizedRoutes = [
    '/',
  ]


  // If not logged in, and confirm order return login page
  if ((authorizedRoutes.includes(to.fullPath) || authorizedRoutes.includes(to.fullPath.slice(0, -1))) && !token) {
    return navigateTo('/auth/login');     //prevent the user to access some pages without token
  }


  // if (!token && to.fullPath === '/ConfirmOrder')  return navigateTo('/auth/Login')
})