const REG_EXP = {
  EMPTY: /^[\s]*$/,
  PHONE: /^(0|86|17951)?(1[356789])[0-9]{9}$/,
  CHINESE: /^[\u4e00-\u9fa5]{2,4}$/,
  NAME:/^[a-zA-Z\u4e00-\u9fa5]+$/,//只包含中文和英文
  IDCARD:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
  PWd:/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,//6-20位字符；数字、字母、特殊字符（除空格），起码其中两种组合
}

export const validate = function(pattern){
  return function(val){
    return pattern.test(val)
  }
}

export const isPhone = validate(REG_EXP.PHONE)
export const isEmpty = validate(REG_EXP.EMPTY)
export const isChinese = validate(REG_EXP.CHINESE)
export const isIdCard = validate(REG_EXP.IDCARD)
export const isPwd = validate(REG_EXP.PWd)
export const isName = validate(REG_EXP.NAME)