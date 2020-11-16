'user strict';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function isDebug() {
  //  return true
  return false
}

function isExperimental() {
  return false
}

function fetchURL(url, init) {
  return new Promise((resolve, reject) => {
    fetch(url, init).then(response => {
      return response.json()
    }).then(json => { // response from server
      if (json.error) {
        //console.log(json)
        reject(json.error)
        return
      }
      resolve(json)
    }).catch( error => {
      //console.error(error)
      reject(error)
    })
  })
}

function loadCSS(url) {
  const link = document.createElement('link')
  link.href = url
  link.type = 'text/css'
  link.rel = 'stylesheet';
  (document.head || document.documentElement).appendChild(link)
}

function loadScript(url, aSync = false) {
  let s = document.createElement('script')
  s.type = "text/javascript"
  s.src = url
  s.async = aSync;
  (document.head || document.documentElement).appendChild(s)
}

function makeid(length) {
  let result           = ''
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < length; i++ ) 
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  return result
}

export { isExperimental, isDebug, wait, makeid, loadCSS, loadScript, fetchURL }
