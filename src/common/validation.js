/*
이부분도 충분히 뺄 수 있을 듯
*/
export const required = value => value ? undefined : 'Required'
export const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength15 = maxLength(15)
export const upper = value => value && value.toUpperCase()
/**
 * const uppper (value){
 * if(value!=undefined && value===true){
 *      return value.toUpperCase()
 *  }
 * }
 * 
 */

