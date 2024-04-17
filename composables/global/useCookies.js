export function removeCookie(name) {
  // To remove a cookie, set its expiration date to a past date
  const pastDate = new Date(0).toUTCString();
  document.cookie = name + "=; expires=" + pastDate + "; path=/";
}

export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
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