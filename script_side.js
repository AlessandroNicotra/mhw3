const menu = document.querySelector('div#wrap')
menu.addEventListener('click', prem)

const chiudi = document.querySelector('div#chiudi')
chiudi.addEventListener('click', close)

const media = window.matchMedia('(max-width: 700px)')
const side = document.querySelector('div.side')
const wrapper = document.querySelector('div#wrapper')
const body = document.querySelector('body')

function prem(){
    window.scrollTo(0, 0)
    body.style.overflowY = 'hidden'
    body.style.overflowX = 'hidden'
    body.className = 'a'
    if(media.matches){
        wrapper.style.marginLeft = '100vw'

        side.style.width = '80%'
        side.style.padding = '20px'
    }
    else{
        wrapper.style.marginLeft = '800px'

        side.style.width = '600px'
        side.style.padding = '20px'
    }
}

function close(){
    body.className = ''
    body.style.overflowY = ''

    side.style.width = '0'
    side.style.padding = '0'

    wrapper.style.marginLeft = ''
}