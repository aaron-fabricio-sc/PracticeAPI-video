console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUserAll = new Promise(function(todoBien, todoMal) {
  // llamar a un api
  setTimeout(function() {
    // luego de 3 segundos
    todoBien('se acabó el tiempo');
  }, 5000)
})

const getUser = new Promise(function(todoBien, todoMal) {
  // llamar a un api
  setTimeout(function() {
    // luego de 3 segundos
    todoBien('se acabó el tiempo 3');
  }, 3000)
})

// getUser
//   .then(function() {
//     console.log('todo está bien en la vida')
//   })
//   .catch(function(message) {
//     console.log(message)
//   })

Promise.race([
  getUser,
  getUserAll,
])
.then(function(message) {
  console.log(message);
})
.catch(function(message) {
  console.log(message)
});





(async function(){
  //TELEMENTOS DEL DOM

  const $home = document.getElementById('home');
  const $featuringContainer = document.getElementById('featuring');
  const $contenedorAccion =document.getElementById('action')
  const $contenedorDrama =document.getElementById('drama')
  const $contenedorAnimacion =document.getElementById('animation')
    const $formulario = document.getElementById('form')
   const $modal = document.getElementById('modal')
   const $overley = document.getElementById('overlay') 
   const $boton_modal = document.getElementById('hide-modal') 
   const modal_imagen = $modal.querySelector('img')
   const modal_titulo= $modal.querySelector('h1')
   const modal_descripcion = $modal.querySelector('p')

//--------------------

const URL_BASE = 'https://yts.mx/api/v2/'
   const API_USER = 'https://randomuser.me/api/'
 
  async function respuestaURL(url){
    const respuesta =  await fetch(url)
    const datos = await respuesta.json()
    if(datos.data.movie_count > 0){
      return (datos)
    }
    else{

    throw new Error('No se encontro los datos de la pelicula')
    }
  };

  async function respuestaApiUsuarios(API_USER){
    const respuestaUser = await fetch(API_USER)
    var datosUser = await respuestaUser.json()
    console.log('datoss',datosUser)

  }
const nombreuser = await respuestaApiUsuarios(API_USER)
console.log(nombreuser)





  function templatesListaDeAmigos(nombre, picture){
    return(
      `<li class="playlistFriends-item">
         <a href="#">
           <img src="src/images/covers/echame-la-culpa.jpg" alt="echame la culpa" />
           <span>
           Luis Fonsi
           </span>
          </a>
      </li>

      `   )       
  } 


  // async function renderisarAmigos (){
  //   var cajaAmigos = document.getElementById('listaDeAmigos')
  //   var usuarios =  respuestaApiUsuarios(API_USER)
  //   // var nombreusuarios = await usuarios.results[0].name
  //  console.log('hoa',usuarios)
  // }
  
 




  function crearAtributos(elemento, atributos){
    for(const atributo in atributos){
      elemento.setAttribute(atributo,atributos[atributo])
      
    }
  };




  function templateDelBuscador(pelicula){
    return (
      `  <div class="featuring">
      <div class="featuring-image">
        <img src="${pelicula.medium_cover_image}" width="70" height="100" alt="">
      </div>
      <div class="featuring-content">
        <p class="featuring-title">Pelicula encontrada</p>
        <p class="featuring-album">${pelicula.title}</p>
      </div>
    </div>`
    )
  }

    // EVENTO DEL FORMULARIO
    $formulario.addEventListener('submit', async(event)=>{
      event.preventDefault()
      $home.classList.add('search-active')
      const cargarBusqueda = document.createElement('img');
      crearAtributos(cargarBusqueda, {
        src : 'src/images/loader.gif',
        height:50,
        width:50,
      })
      $featuringContainer.append(cargarBusqueda)

      const data = new FormData($formulario);

      try{
        const {data:{movies:peli}} = await respuestaURL(`${URL_BASE}list_movies.json?limit=1&query_term=${data.get('name')}`)

  
        const HTMLbuscador = templateDelBuscador(peli[0])
  
        $featuringContainer.innerHTML = HTMLbuscador
      }
      catch(error){
        alert(error.message)
        cargarBusqueda.remove()
        $home.classList.remove('search-active')
      }
      
      
      
      
    });
    // EVENTO MODAL
    $boton_modal.addEventListener('click', hideModal)
  function hideModal(){
    $overley.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  }
    //----------------------------


   const URLpelisAccion = `${URL_BASE}list_movies.json?genre=action` 
  const URLpelisDrama = `${URL_BASE}list_movies.json?genre=drama` 
  const URLpelisAnimacion = `${URL_BASE}list_movies.json?genre=animation` 

 

  // RENDERIZACION DE LA LISTA DE PELICULAS


  function templatesListaVideos(movie,category){
    return(
      ` <div class="primaryPlaylistItem" data-id='${movie.id}' data-category="${category}">
      <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
        ${movie.title}
      </h4>
      </div>`
    )
  }
 // RENDERISADO DE LAS IMAGENES

  function renderImagenes(HTML_LISTA_VIDEOS){
    const html = document.implementation.createHTMLDocument()
    html.body.innerHTML = HTML_LISTA_VIDEOS
    return html.body.children[0]
    
  }
  function agregarEventoClick(render){
    render.addEventListener('click', ()=>{
      showModal(render);
    })
  }
  function renderisarContenedores(tipoPelicula,$contenedor, category){{
    $contenedor.children[0].remove();
    tipoPelicula.forEach((movie)=>{
      const HTML_LISTA_VIDEOS = templatesListaVideos(movie,category)
    
      const render = renderImagenes(HTML_LISTA_VIDEOS)

      $contenedor.append(render)

      //EFECTOAL RENDERIZAR
     const image = render.querySelector('img')
     image.addEventListener('load',(event)=>{
      event.srcElement.classList.add('fadeIn')
     })
      
      agregarEventoClick(render)
    })
  }}


  const {data:{movies:listaPeliculasAccion}} = await respuestaURL(URLpelisAccion)
  const {data:{movies:listaPeliculasDrama}} = await respuestaURL(URLpelisDrama)
  const {data:{movies:listaPeliculasAnimacion}} = await respuestaURL(URLpelisAnimacion)
  console.log(listaPeliculasAnimacion)
  renderisarContenedores(listaPeliculasAccion, $contenedorAccion,'accion')
  renderisarContenedores(listaPeliculasDrama, $contenedorDrama,'drama') 
  renderisarContenedores(listaPeliculasAnimacion, $contenedorAnimacion,'animacion')


  function busquedaID(lista,id){

   return lista.find(movie => movie.id === parseInt(id,10))
  }

  function findMovie(id, categoria){

      switch(categoria){
        case 'accion':{
         return busquedaID(listaPeliculasAccion, id)
   
        }
        case 'drama':{
          return busquedaID(listaPeliculasDrama, id)
          

        }
        default:{
          return busquedaID(listaPeliculasAnimacion, id)
          
        }
        
      }
  }  
    
  function showModal(render){
    $overley.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = render.dataset.id
    const categoria = render.dataset.category
    const datos = findMovie(id,categoria)
  
    modal_titulo.textContent = datos.title
    modal_imagen.setAttribute('src' , datos.medium_cover_image)
    modal_descripcion.textContent = datos.description_full 
   
  }
  
})() 