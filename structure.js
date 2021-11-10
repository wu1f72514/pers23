let structurePage = () => {
	
	// données du site
	let req = getRequest('datas/site.json')
	req.send()
	req.onload = function () {
		let site = req.response
		document.title = site.name
		document.getElementById('pageTitle').innerHTML = site.name
		
		// top navbar
		site.menu.forEach(element => {
			let a = document.createElement('a')
			a.href = element.url
			a.target = element.target
			a.innerHTML = element.txt
			a.className = 'navbar-item'
			document.getElementById('topNavbar').appendChild(a)
		})
	}
}

let createNode = (element, datas) => {
	
	let newNode = document.createElement(element)
	for (const property in datas) {
		if(property === 'class'){
			newNode.classList = datas[property]
		}
		else if(property === 'src'){
			newNode.src = datas[property]
		}
		else if(property === 'alt'){
			newNode.alt = datas[property]
		}
		else if(property === 'txt'){
			newNode.innerHTML = datas[property]
		}
		else if(property === 'style'){
			newNode.style = datas[property]
		}
		else if(property === 'name'){
			newNode.name = datas[property]
		}
	}
	return newNode
}