let getRequest = (requestURL) => {
	let request = new XMLHttpRequest()
	request.open('GET', requestURL)
	request.responseType = 'json'
	return request
}

// usage
/*let req = getRequest('datas/posts.json')
req.send()
req.onload = function () {
	console.dir(req.response)
}*/

