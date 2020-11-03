class _RequestService {
  request (method, url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.onload = () => {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.response)
        } else {
          reject(
            new Error(JSON.stringify({
              status: xhr.status,
              statusText: xhr.statusText
            }))
          )
        }
      }
      xhr.onerror = () => {
        reject(
          new Error(JSON.stringify({
            status: xhr.status,
            statusText: xhr.statusText
          }))
        )
      }
      xhr.send()
    })
  }
  get (url) {
    return this.request('GET', url)
  }
}
const RequestService = new _RequestService()
export {
  RequestService
}
