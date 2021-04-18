let findButton  = document.querySelector('#findButton')
let searchInput = document.querySelector('#search')
let totalResult = document.querySelector('#totalResult')
let albumList   = document.querySelector('.album-list')
let nextButton  = document.querySelector('.next')

async function getData (value) {
    let response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + value, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0540c2b4a1mshfafba11fd229e45p1b9796jsn33b70550180e",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })
    let data = await response.json()
    let realData = data.data
    totalResult.textContent = data.total
    realData.map((element) => {
        let li = document.createElement('li')
        let div = document.createElement('div')
        let h2 = document.createElement('h2')
        let a = document.createElement('a')
        let img = document.createElement('img')
        let audio = document.createElement('audio')
        let source = document.createElement('source')

        li.classList.add('album-item')
        div.classList.add('audio-wrapper')
        h2.classList.add('audio-name')

        li.style.backgroundImage = `url(${element.album.cover_big})`
        h2.innerHTML = `<span>${element.artist.name}</span> - ${element.title}`
        a.textContent = 'full song'
        a.setAttribute('href', element.link)
        img.setAttribute('src', element.artist.picture_big)
        audio.controls = true
        source.setAttribute('src',  element.preview)
        source.setAttribute('type', 'audio/mp3')

        audio.appendChild(source)
        div.appendChild(h2)
        div.appendChild(a)
        div.appendChild(img)
        div.appendChild(audio)
        li.appendChild(div)

        albumList.appendChild(li)
    })
}

findButton.onclick = () => {
    albumList.innerHTML = null
    if (searchInput.value != '') {
        getData(searchInput.value)
        searchInput.value = null
    }
}

document.addEventListener('play', (e) => {
    let audios = document.querySelectorAll('audio')
    for (let audio of audios) {
        if (audio != e.target) {
            audio.pause()
        }
    }
}, true)