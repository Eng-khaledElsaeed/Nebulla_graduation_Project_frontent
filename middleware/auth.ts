export default defineNuxtRouteMiddleware((to, from) => {
  const token = getCookie('token')





  const authorizedRoutes = [
    '/',
  ]


  // If not logged in, and confirm order return signin page
  if ((authorizedRoutes.includes(to.fullPath) || authorizedRoutes.includes(to.fullPath.slice(0, -1))) && !token) {
    return navigateTo('/auth/signin');     //prevent the user to access some pages without token
  }


  // if (!token && to.fullPath === '/ConfirmOrder')  return navigateTo('/auth/signin')
})