export function removeCookie(name) {
  // To remove a cookie, set its expiration date to a past date
  const pastDate = new Date(0).toUTCString();
  document.cookie = name + "=; expires=" + pastDate + "; path=/";
}

export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const index = cookie.indexOf("="); // Find the position of the first "=" character
    const cookieName = cookie.substring(0, index); // Extract the cookie name
    const cookieValue = cookie.substring(index + 1); // Extract the cookie value
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null; // Cookie not found
}


export function setCookie(name, value, daysToExpire){
  const date = new Date();
  date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}