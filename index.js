const pokemonName = document.getElementById('name');
const pokeSprite = document.getElementById('sprite');
const pokeDescription = document.getElementById('description');
const pokePS = document.getElementById('ps-number');
const pokeType = document.getElementById('pokeType');
const attackType = document.getElementById('attack-type');
const attackName = document.getElementById('attack-text');
const attackPower = document.getElementById('attack-dmg');

const basePokeApi = 'https://pokeapi.co/api/v2/pokemon/';
const pokeAPIDescription = 'https://pokeapi.co/api/v2/pokemon-species/';
const pokeAPIAbility = 'https://pokeapi.co/api/v2/ability/';


function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


const SetDesciptionByID=async(ID)=>{
    try{
        const response = await fetch(pokeAPIDescription + ID);
        const result = await response.json();

        const language = document.documentElement.lang;
       
        pokeDescription.innerHTML = result.flavor_text_entries.find((entry) => entry.language.name == language).flavor_text;
        
    }
    catch(error){
        console.log(error)
    }

}

const SetAttackType=async(ID)=>{
    try{
        const response = await fetch(ID);
        const result = await response.json();

        
        attackPower.innerHTML = result.power

        const language = document.documentElement.lang;
       
        attackName.innerHTML = result.names.find((entry) => entry.language.name == language).name;

        console.log(result.type.name);

        let Type = './assets/' + result.type.name + '.png';

        attackType.src = Type
    }
    catch(error){
        console.log(error)
    }
}

function SetImageType(types){

    let spriteType = './assets/' + types[0].type.name + '.png';
    pokeType.src = spriteType;

}


const ConfigCardByID=async(ID)=>{
    try{
        const response = await fetch(basePokeApi + ID);
        const result = await response.json();
    
        // Set name
        pokemonName.innerHTML = capitalizeFirstLetter(result.name);

        pokePS.innerHTML = result.stats[0].base_stat;
    
        // set description
        SetDesciptionByID(ID);
    
        // poke type
        SetImageType(result.types);

        // Set img
        pokeSprite.src = result.sprites.other.dream_world.front_default;
        pokeSprite.alt = result.name;

        
        SetAttackType(result.moves[attack].move.url)

    }
    catch(error){
        console.log(error)
    }

}


    let PokeNum = Math.floor(Math.random() * 600)
    ConfigCardByID(PokeNum);