const pokemonName = document.querySelector('.pokemon_name'); 
const pokemonNumber = document.querySelector('.pokemon_number'); 
const pokemonImg = document.querySelector ('.pokemon_img'); 
const form = document.querySelector('.form');
const search = document.querySelector('.input_search'); 
const btnPrev = document.querySelector('.btn_prev'); 
const btnNext = document.querySelector('.btn_next'); 
let searchIDPokemon = 1; 



const fetchPokemon = async(pokemon)=>{
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIresponse.status === 200){    
    const data = await APIresponse.json();
    return data;
    } 
}

const renderPokemon = async (pokemon)=>{

    pokemonName.innerHTML = 'Loading...'; 
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonName.innerHTML = data.name ;
        pokemonNumber.innerHTML = data.id + ' -';
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        search.value = ''
        searchIDPokemon = data.id; 
    }
    else{
        pokemonName.innerHTML = 'Not found'; 
        pokemonNumber.innerHTML = '404'; 
        pokemonImg.src = '';
        search.value = '';
    }
};

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(search.value.toLowerCase());
}); 

btnPrev.addEventListener('click', ()=>{
    if(searchIDPokemon > 1){
        searchIDPokemon -= 1; 
        renderPokemon(searchIDPokemon);
    }
   
})
btnNext.addEventListener('click', ()=>{
    searchIDPokemon += 1; 
    renderPokemon(searchIDPokemon);
})

renderPokemon(searchIDPokemon);