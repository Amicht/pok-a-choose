`use strict`;
const cards_div = document.getElementById(`cards`);
const navs = document.getElementById(`navs`);
const progress_bar = document.getElementById(`prgress-bar`);
const screenTitle = document.getElementById(`title`);
const pok_card = document.getElementById(`myPokCard`);

const screen = {
    1: {title: `choose a pokemon-shape:`,progress: `0`,
    navs: [`shape`]},
    2: {title: `choose a pokemon-specie:`,progress: `33`,
    navs: [`shape`, `specie`]},
    3: {title: `choose a pokemon:`,progress: `66`,
    navs: [`shape`, `specie`, `pokemon`]},
    4: {title: `my pokemon`,progress: `100`,
    navs: [`shape`, `specie`, `pokemon`, `my pokemon`]}
};

async function updateScreen(screenNum) {
    const title = screen[screenNum].title;
    const progress = screen[screenNum].progress;
    const screenNavs = screen[screenNum].navs;
    let navsHTML = ``;

    screenTitle.innerHTML = title;

    progress_bar.innerHTML = 
        `<div class="progress-bar" 
        role="progressbar" 
        aria-valuenow="${progress}" 
        style="width: ${progress}%;" 
        aria-valuemin="0" 
        aria-valuemax="100">
            progress: ${progress}%
        </div>`;

    screenNavs.forEach((n,i) => {
        const screen = `screen${i+1}(event)`;
        if(i== (screenNavs.length-1)){
            navsHTML  += 
            `<li onclick="${screen}" class="breadcrumb-item active mx-1"
             aria-current="page" >${n}</li>`;
        }
        else{
            navsHTML  += 
            `<li onclick="${screen}" 
            class="breadcrumb-item mx-1" aria-current="page" ><a href="#">${n}</a></li>`;
        }
    })
    navs.innerHTML = navsHTML;
}

loadCards = (arr, fn) => {
    let dataToHTML = ``;
    const clickFn = `onclick="${fn}(event)"`
    arr.forEach(e => {
        if(clickFn == `onclick="screen4(event)"`){
        dataToHTML += `<div class="card m-1 col-sm-3" >
            <div class="card-header">
            ${e}</div>
            <div class="card-body pok-btn">
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" 
            data-bs-target="#staticBackdrop" ${clickFn} data-id="${e}">select</a>
            </div></div>`;
        
        }else{
            dataToHTML += `<div class="card m-1 col-sm-3">
            <div class="card-header">
            ${e}</div>
            <div class="card-body pok-btn">
            <a href="#" class="btn btn-primary" ${clickFn} data-id="${e}">select</a>
            </div></div>`;
        }
    })
    cards_div.innerHTML = dataToHTML;
}


screen1 = async (event) => {
    updateScreen(1);
    const myShapes = await getShapes();
    loadCards(myShapes, `screen2`);
}
screen2 = async (event) => {
    let shape = event.target.dataset.id || user.shape;
    updateScreen(2);
    const mySpecies = await getSpecies(shape);

    loadCards(mySpecies, `screen3`);
}
screen3 = async (event) => {
    let specie = event.target.dataset.id || user.specie;
    updateScreen(3);
    const myPokemons = await getPokemons(specie);
    
    loadCards(myPokemons, `screen4`);
}
screen4 = async (event) => {
    const  pokemon = event.target.dataset.id;
    updateScreen(4);
    await getMyPokemon(pokemon);
    
    pok_card.innerHTML = 
        `<img src="${user.pokemon.img}" class="card-img-top" alt="...">
        <div class="card-body ">
        <h5 class="card-title" id="pok-img">${user.pokemon.name}</h5>
        <p class="card-text">
            shape: ${user.shape} <br>
            specie: ${user.specie}
        </p>
        </div class="modal-footer">
              <button id="close-btn" type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
              <button id="start-btn" type="button" class="btn btn-primary mt-1" data-bs-dismiss="modal" >start over</button>
          </div>
    </div>`;    
    
    document.getElementById(`close-btn`).addEventListener(`click`, screen3);    
    document.getElementById(`start-btn`).addEventListener(`click`, screen1);   
    document.querySelector(`button`).addEventListener(`click`, screen3); 
}

screen1(); //set  initial screen