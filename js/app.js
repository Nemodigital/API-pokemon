console.log('funciona');

// función randon que nos marca MDN Web Docs. Pero la retocamos y la combertimos a una fucnión flecha
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
//   }

// Usamos DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado, antes de hacer la petición fetch
document.addEventListener('DOMContentLoaded', () => {
    //   llamamos a la función hasta el 151 para que sea hasta el 150
    const random = getRandomInt(1, 151);
    // ahora cargamos el fetchData
    fetchData(random);
});

//   función Randon de flecha
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

// ahora hacemos la solicitud para traer los pokemones.
// el RANDOM lo mandamos aquí como un id
const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // lo transformamos a JSON
        const data = await res.json();

        console.log(data);

        // Creamos un objeto con los datos que vamos a mostrar en la función pintarCard para usalo en los clone
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat
        }


        // llamamos a la función pintarCard. No es necessario que espere con await y se va a pintar con la data
        pintarCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}

// esta función pinta la card del template
const pintarCard = (pokemon) => {
    console.log(pokemon);
    // 1º capturamos el div donde vamos a pintar la card. Donde va a ir nuestro template
    const flex = document.querySelector('.flex');
    // 2º capturamos y accedemos al template
    const template = document.querySelector('#template-card').content;
    // 3º Cremos un clon del template. Se suele utilizar cuando hacemos un recorrido de un array
    const clone = template.cloneNode(true);
    // 4º creamos el fragment
    const fragment = document.createDocumentFragment();


    // ahora vamos a modificar los datos del template para que se muestren. Lo pintamos en la card:
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + 'Experiencia';
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + 'K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial + 'K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa + 'K';
    

    // pasamos el clone al fragment
    fragment.appendChild(clone);
    flex.appendChild(fragment);
}
