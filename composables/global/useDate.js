export function splitDateOnly(){
  let date = new Date().toISOString().split("T")[0];
  return date;
}


export function ConfertDateFromat_12(originalDateString){
  const originalDate = new Date(originalDateString);
  // Convert to a new format (e.g., 'yyyy-MM-dd HH:mm')
  const Fromat_12 = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const newDateFormat=Fromat_12.format(originalDate);
  return newDateFormat;
}


export function ConfertDateFromat_24(originalDateString){
  const originalDate = new Date(originalDateString);
  // Convert to a new format (e.g., 'yyyy-MM-dd HH:mm')
  const Fromat_24 = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const newDateFormat=Fromat_24.format(originalDate);
  return newDateFormat;
}




export function ConfertDateFromat_12_Ar(originalDateString){
  const originalDate = new Date(originalDateString);
  // Convert to a new format (e.g., 'yyyy-MM-dd HH:mm')
  const Fromat_12 = new Intl.DateTimeFormat('ar-eg', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const newDateFormat=Fromat_12.format(originalDate);
  return newDateFormat;
}


export function ConfertDateFromat_24_Ar(originalDateString){
  const originalDate = new Date(originalDateString);
  // Convert to a new format (e.g., 'yyyy-MM-dd HH:mm')
  const Fromat_24 = new Intl.DateTimeFormat('ar-eg', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const newDateFormat=Fromat_24.format(originalDate);
  return newDateFormat;
}