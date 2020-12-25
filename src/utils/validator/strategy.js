import {
  isPhone,
  isEmpty,
  isChinese,
  isIdCard,
  isName
} from './validate'

export const strategies = {
  isEmpty(value, errorMsg) {
    if (!value) return errorMsg
  },
  isNotEmpty(value, errorMsg) {
    if (!isEmpty(value)) return errorMsg
  },
  isPhone(value, errorMsg) {
    if (!isPhone(value)) return errorMsg
  },
  isName(value, errorMsg){
    if (!isName(value)) return errorMsg
  },
  isChinese(value, errorMsg) {
    if (!isChinese(value)) return errorMsg
  },
  minLength(value, length, errorMsg) {
    if (value.length < length) return errorMsg
  },
  isIdCard(value, errorMsg) {
    if (!isIdCard(value)) return errorMsg
  },
  isPwd(value, errorMsg) {
    if (!isPwd(value)) return errorMsg
  },
}
