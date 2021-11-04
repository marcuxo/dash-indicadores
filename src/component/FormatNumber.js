const formatNumeral = (number) => {
  //console.log('||=>', number)
  if(number==="") return ""
  let numero = new Intl.NumberFormat('es-CL').format(number);
  //return numero.replace(/,/g,'.')
  return numero
};

const unFormatNumeral = (number) => {
  let numstr = number+""
  let strwdp = numstr.split('.').join('')
  return strwdp
}
module.exports = {
  formatNumeral,
  unFormatNumeral
}