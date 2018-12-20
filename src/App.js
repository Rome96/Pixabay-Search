import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';


class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron')
    elemento.scrollIntoView('smooth', 'start')
  }


  paginaAnterior = () => {
     // Leer states de la pagina actual
     let pagina = this.state.pagina

     // Si la page es 1, ya no ir hacia atras
     if(pagina === 1) return null

     // Resta 1 a la pagina actual
       // pagina = -1
       pagina--
 
     // Agg el cambio al state
     this.setState({
       pagina
     }, () => {
       this.consultarAPi();
       this.scroll();
     })
 
    // console.log(pagina)
  }
  paginaSiguiente = () => {
    // Leer states de la pagina actual
    let pagina = this.state.pagina

    // Sumas 1 a la pagina actual
      // pagina = +1
      pagina++

    // Agg el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarAPi();
      this.scroll();

    })

   // console.log(pagina)
  }

  consultarAPi = async () => {
    const pagina = this.state.pagina
    const termino = this.state.termino
    const url = `https://pixabay.com/api/?key=11041748-02db916c25cbaa12ee02e60e6&q=${termino}&page=${pagina}`

    //fetch(url).then(respuesta => respuesta.json()).then(resultado => this.setState({ imagenes: resultado.hits}))
    console.log(url)
    const respuesta = await fetch(url)
    const data = await respuesta.json()
    this.setState({ imagenes: data.hits })
  }

  datosBusqueda = (termino) => { // recibimos los datos del input
    this.setState({ //reescribe el state
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarAPi()
    })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center"> Buscador De Imágenes </p>
          <Buscador datosBusqueda={this.datosBusqueda} /> {/** aqui se llama al componente */}
        </div>

        <div className="row justify-content-center">
          <Resultado 
           imagenes = {this.state.imagenes} 
           paginaAnterior = {this.paginaAnterior}
           paginaSiguiente = {this.paginaSiguiente}
           />
        </div>

      </div>
    );
  }
}

export default App;
