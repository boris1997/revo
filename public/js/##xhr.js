
class Xhr {
    static makeRequest(tempParams) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(tempParams))
        return xhr.onload = function () {
            if (xhr.responseText === 'success') {
                console.log('ok')
                return
            } else {
                console.log('some')
            }
        }
    }
}