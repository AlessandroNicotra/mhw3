let lista = [];
let count = 0;
let prevdiv_one;
let prevdiv_two;
let prevdiv_three;

const div = document.querySelectorAll('div[data-question-id]');
div.forEach(div => {
    div.addEventListener('click', premuto)
})

const button = document.querySelector('button#reset');
button.addEventListener('click', reset)

const section = document.querySelector('section#risultato');

function premuto(event){
    switch (event.currentTarget.getAttribute("data-question-id")){
        case "one":
            if(lista[0] === undefined){
                count++
            }
            lista[0] = event.currentTarget.getAttribute("data-choice-id");
            if (prevdiv_one !== undefined){
                prevdiv_one.style.backgroundColor = '#f4f4f4';
                prevdiv_one.querySelector('img.checkbox').src = 'images/unchecked.png'
                prevdiv_one.style.opacity = 0.6;
            }
            else{
                div.forEach(div => {
                    if(div.getAttribute("data-choice-id") !== event.currentTarget.getAttribute("data-choice-id") && div.getAttribute("data-question-id") === event.currentTarget.getAttribute("data-question-id")){
                        div.style.opacity = 0.6;
                    }
                })
            }
            prevdiv_one = event.currentTarget;
            event.currentTarget.style.backgroundColor = '#cfe3ff';
            event.currentTarget.querySelector('img.checkbox').src = 'images/checked.png'
            event.currentTarget.style.opacity = 1;
            break;
        case "two":
            if(lista[1] === undefined){
                count++
            }
            lista[1] = event.currentTarget.getAttribute("data-choice-id");
            if (prevdiv_two !== undefined){
                prevdiv_two.style.backgroundColor = '#f4f4f4';
                prevdiv_two.querySelector('img.checkbox').src = 'images/unchecked.png'
                prevdiv_two.style.opacity = 0.6;
            }
            else{
                div.forEach(div => {
                    if(div.getAttribute("data-choice-id") !== event.currentTarget.getAttribute("data-choice-id") && div.getAttribute("data-question-id") === event.currentTarget.getAttribute("data-question-id")){
                        div.style.opacity = 0.6;
                    }
                })
            }
            prevdiv_two = event.currentTarget;
            event.currentTarget.style.backgroundColor = '#cfe3ff';
            event.currentTarget.querySelector('img.checkbox').src = 'images/checked.png'
            event.currentTarget.style.opacity = 1;
            break;
        case "three":
            if(lista[2] === undefined){
                count++
            }
            lista[2] = event.currentTarget.getAttribute("data-choice-id");
            if (prevdiv_three !== undefined){
                prevdiv_three.style.backgroundColor = '#f4f4f4';
                prevdiv_three.querySelector('img.checkbox').src = 'images/unchecked.png'
                prevdiv_three.style.opacity = 0.6;
            }
            else{
                div.forEach(div => {
                    if(div.getAttribute("data-choice-id") !== event.currentTarget.getAttribute("data-choice-id") && div.getAttribute("data-question-id") === event.currentTarget.getAttribute("data-question-id")){
                        div.style.opacity = 0.6;
                    }
                })
            }
            prevdiv_three = event.currentTarget;
            event.currentTarget.style.backgroundColor = '#cfe3ff';
            event.currentTarget.querySelector('img.checkbox').src = 'images/checked.png'
            event.currentTarget.style.opacity = 1;
            break;
    }

    if(count === 3){
        div.forEach(div => {
            div.removeEventListener('click', premuto)
        })

        let risultato;
        let n = 0;

        for(let i = 0; i < lista.length; i++){
            let nj = 0;
            for(let j = 0; j < lista.length; j++){
                if(lista[i] === lista[j]){
                    nj++
                }
            }
            if(nj > n){
                n = nj
                risultato = lista[i];
            }
        }

        const titolo = document.querySelector('section#risultato h1');
        titolo.textContent = RESULTS_MAP[risultato].title

        const contenuto = document.querySelector('section#risultato p');
        contenuto.textContent = RESULTS_MAP[risultato].contents

        section.style.display = "block"
    }
}

function reset(){
    div.forEach(div => {
        div.addEventListener('click', premuto)
        div.style.opacity = 1;
        div.style.backgroundColor = '#f4f4f4';
        div.querySelector('img.checkbox').src = 'images/unchecked.png'
    })
    prevdiv_one = undefined;
    prevdiv_two = undefined;
    prevdiv_three = undefined;
    count = 0
    lista = []
    section.style.display = "none"
}

