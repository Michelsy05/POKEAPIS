const $=qs=>document.querySelector(qs);
const mostrarAlerta=mensaje=>{
    const alerta=$('.alerta');
    alerta.innerHTML=`
        <div class="alert alert-danger mt-2 text-center" role="alert">
        <strong>${mensaje}</strong>
        </div>
    `;
    setTimeout(() => {
       alerta.innerHTML=''; 
    }, 2000);
}
const mostraInfo=({sprites:{front_default},name,types})=>{
    const info=$('.info');
    const div=document.createElement('div');
    div.classList.add('ml-3')
    div.innerHTML=`
        <div class="pokemon w-25 my-2">
        <img src="${front_default}" style="width: 100%;"></img>
        </div>
        <h6 class="text-warning">Nombre: </h6><h5 class="text-white text-uppercase">${name}</h5>
        <h6 class="text-warning">Tipo: </h6>
    `;
    types.forEach(({type:{name}})=>{
        let ul=document.createElement('ul');
        ul.innerHTML=`
            <li class="text-info"><h5 class="text-white text-uppercase">${name}</h5></li>
        `;
        div.appendChild(ul)
    })
    info.appendChild(div);
}
const url='https://pokeapi.co/api/v2/pokemon/';
const obtenerPokemon=async pokemon=>{
    try {
        const respuesta = await fetch(`${url}${pokemon}`);
        if (!respuesta.ok) {
            mostrarAlerta('No registrado en la pokedex');
            return;
        }
        const buscado=await respuesta.json();
        return buscado;
    } catch (error) {
        mostrarAlerta(error)
    }

}
(function(){
    const formulario=$('#formulario');
    formulario.addEventListener('submit', validarForm);

    async function validarForm(e){
        e.preventDefault();
        const pokemon=$('#pokemonInput').value;
        if(pokemon.length==0){
            mostrarAlerta('El campo es Obligatorio');
            return;
        }
        const infoPokemon=await obtenerPokemon(pokemon);
        const info=$('.info');
        info.innerHTML='';
        mostraInfo(infoPokemon);
    }

})();