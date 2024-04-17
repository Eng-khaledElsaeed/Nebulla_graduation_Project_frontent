const date = new Date();

export function IsNullOrWhiteSpace(str){
  return str === null || str.match(/^ *$/) !== null;
}

export function IsNullOrEmpty(str){
  return str === null || str== "";
}

//----------------- today formatter Using "ar" locale for Arabic --------------
export function formattedDateArabic(){
  return date.toLocaleString('ar', {
  weekday: 'long',
  month: 'long',
  year: 'numeric'
})};


