/**
 * @desc 动态加载脚本
 * @param {String} url 地址
 */
const loadScript = url => {
  const script = document.createElement('script')

  script.type = 'text/javascript'

  return new Promise((resolve, reject) => {
    if(script.readyState){ // IE
      script.onreadystatechange = function(){
        let {readyState} = this
        
        if(readyState === 'loaded' || readyState === 'complete'){
          this.onreadystatechange = null // 防止事件触发两遍
          resolve('loaded')
        }
      }
    }else{ // 其他浏览器
      script.onload = function(){
        resolve('loaded')
      }
      script.onerror = function(err){
        reject(err)
      }
    }
    
    script.src = url
    document.head.appendChild(script)
  })
}

export default loadScript