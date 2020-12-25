import {strategies} from './strategy'

export default class Validator {
  constructor(){
    this.cache = []
  }

  add(value, rules){
    rules.forEach(rule => {
      let strategyAry = rule.strategy.split(':')
      let errorMsg = rule.errorMsg

      this.cache.push(() => {
        let strategy = strategyAry.shift()

        strategyAry.unshift(value)
        strategyAry.push(errorMsg)

        return strategies[strategy].apply(this, strategyAry)
      })
    })
  }

  start(){
    for(let i = 0, validatorFn; validatorFn = this.cache[i++]; ){
      let errorMsg = validatorFn()

      if(errorMsg) return errorMsg
    }
  }
}