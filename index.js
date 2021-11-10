//alert('index.js')
let  start = () => {
	structurePage()
	postsList()
}

let manageEvents = () => {
	
	let readMores = document.getElementsByName('readMore')
	for(var i=0; i<readMores.length; i++){
		console.log(readMores[i])
		readMores[i].onclick = (e) => {
			e.target.parentElement.parentElement.getElementsByClassName('contentText')[0].style.display = ''
		}
	}
}

let postsList = () => {
	
	// lister les posts
	let req = getRequest('datas/posts.json')
	req.send()
	req.onload = function () {
		
		req.response.posts.forEach(post => {
			let reqPost = getRequest('datas/posts/'+post)
			reqPost.send()
			reqPost.onload = function () {
				makePostCard(reqPost.response)
				document.getElementById('loadingPosts').style.display = 'none'
				manageEvents()
			}
		})
		
	}
}

let makeTags = (tags) => {
	
	let div = createNode('div', {
		class: 'tags level-right'
	}) 
	tags.forEach(tag => {
		let tagHtml = createNode('span', { 
			class: 'tag is-dark',
			txt: tag
		})
		div.appendChild(tagHtml)
	})
	return div
}

let makePostCardCover = (post) => {
	
	let cardCover = createNode('div', { 
		class: 'card-image' 
	})
	let figureCardCover = createNode('figure', { 
		class: 'image is-4by3' 
	})
	let imgFigureCardCover = createNode('img', { 
		src: post.cover,
		alt: post.title
	})
	figureCardCover.appendChild(imgFigureCardCover)
	cardCover.appendChild(figureCardCover)
	return cardCover
}

let makeContentPostCard = (post) => {
	
	let div = createNode('div', { 
		class: 'content is-medium'
	})
	
	if(post.intro){
		let intro = createNode('p', { 
			txt: post.intro
		})
		
		let lirePlus = createNode('button', { 
			class: 'button is-light',
			txt: 'Lire +',
			name: 'readMore'
		})
		intro.appendChild(lirePlus)
		div.appendChild(intro)
	}
	
	let content = createNode('div', { 
		class: 'contentText',
		txt: post.text,
		style: (post.intro)?'display:none;':'display:default;'
	})
	content.appendChild(createNode('br'))
	let time = createNode('time', { 
		datetime: post.publication,
		txt: post.publication
	})
	content.appendChild(time)
	div.appendChild(content)
	
	return div
}

let makePostCardContent = (post) => {
	
	let cardContent = createNode('div', { 
		class: 'card-content' 
	})
	
	let tags = makeTags(post.tags)
	cardContent.appendChild(tags)
	
	let title = createNode('h1', {
		class: 'title',
		txt: post.title
	})
	cardContent.appendChild(title)
	
	// outdatable content
	if(post.outdatable){
		let div = createNode('div', {
			class: 'notification is-warning is-light',
			txt: 'Cet article a été créé il y a quelques temps.<br />Il est succeptible de comporter des informations n\'étant plus exactes aujourd\'hui.' 
		})
		cardContent.appendChild(div)
	}
	
	
	let content = makeContentPostCard(post)
	cardContent.appendChild(content)
	
	let mediaCardContent = makePostCardContentAuthor(post)
	cardContent.appendChild(mediaCardContent)
	
	return cardContent
}

let makePostCardContentAuthor = (post) => {
	
	// media left
	let img = createNode('img', { 
		src: post.authorCover,
		alt: post.author
	})
	let figure = createNode('figure', { 
		class: 'image is-48x48' 
	})
	figure.appendChild(img)
	let mediaLeft = createNode('div', { 
		class: 'media-left' 
	})
	mediaLeft.appendChild(figure)
	
	// media content
	let mediaContent = createNode('div', { 
		class: 'media-content' 
	})
	let title = createNode('p', { 
		class: 'title is-4',
		txt: post.author
	})
	mediaContent.appendChild(title)
	
	let subtitle = createNode('p', { 
		class: 'subtitle is-6',
		txt: post.authorContact
	})
	mediaContent.appendChild(subtitle)
	
	let author = createNode('div', { 
		class: 'media' 
	})
	author.appendChild(mediaLeft)
	author.appendChild(mediaContent)
	return author
}

let makePostCard = (post) => {
	
	let card = createNode('div', { 
		class: 'card' 
	})
	
	
	// card image
	if(post.cover){
		let cardCover = makePostCardCover(post)
		card.appendChild(cardCover)
	}
	
	// card content
	let cardContent = makePostCardContent(post)
	card.appendChild(cardContent)
	
	document.getElementById('indexPosts').appendChild(card)
}

let readMore = (e) => {
	console.dir(e)
}

