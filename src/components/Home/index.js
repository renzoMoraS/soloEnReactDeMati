import React, { Component } from 'react';
import {parse} from "query-string";

var ciudad
var status
var level_id
var seller_status
var transacciones_canceladas
var transacciones_completadas
var transacciones_periodo
var transacciones_total
var nombreDelUsuario
var fechaDeRegistro
var pais
var tipoDeUsuario
var puntos
var idDelSitio

var options = {
  form: {
    "grant_type":"authorization_code",
    "client_id": '6722315906287226',
    "client_secret": 'su5nxkJECtvTyYp5GGVlGcy8QicnzeAI',
    "redirect_uri": "http://localhost:3000/",
    "code": ""
  },
  method: "POST", 
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json' 
  }
};
var el_auth_code_anterior

function miFuncion(textitoQueDevolvioToken) {
  if (this.state.termino) {
    if (this.state.termino == 'si') {
      return null
    }
  }

  fetch('/pantallaInicio', {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json',
    }
  })
  .then((response) => {

    if (response.ok) {
      var lasvaloraciones = response.json();

      lasvaloraciones.then(value => {
        var valoracionesObtenidas = value

        if (textitoQueDevolvioToken==='1') {
          localStorage.setItem('valoracionesObtenidas', JSON.stringify(value));
  

          console.log(this.ciudad)
          
          this.setState({ termino: 'si', valoraciones: [], text: '', userok: 'true'});
          console.log('primerif')
          console.log(textitoQueDevolvioToken)
        } else {
          this.setState({ termino: 'no', valoraciones: [], text: '', userok: 'true'});
          console.log('segundoif')
          console.log(textitoQueDevolvioToken)
        //console.log('estado'+JSON.stringify(valoracionesObtenidas))
        }

        }
     
      )

    } else {
      this.setState({ termino: 'no', valoraciones: [], text: '', userok: 'false'});
      console.log('elseif')
      console.log(textitoQueDevolvioToken)
    }
  })
  /*.catch(function(error) {
    unavariablequemeindicaquetodoanduvomal=<p>No Existe tal usuario</p>
    this.setState({userok: 'false', termino:'si'});
  });*/
};



var url = 'https://api.mercadolibre.com/oauth/token?';
//var unavariablequemeindicaquetodoanduvomal = "";

class Home extends Component {
  constructor(props) {
      super(props)
      this.state = { termino: 'no', valoraciones: [], text: '', userok: 'false'};
      miFuncion = miFuncion.bind(this);
    }

  componentWillMount(){

    const URLSearchParams = window.URLSearchParams;

    var burl = new URLSearchParams();
    console.log(burl)
    if (!parse(this.props.location.search).code || el_auth_code_anterior !== undefined) {
      console.log('pinché')
      return
    } else {
      console.log('el auth code anterior es')
      console.log(el_auth_code_anterior)
      el_auth_code_anterior = parse(this.props.location.search).code
    }

    burl.append("grant_type","authorization_code")
    burl.append("client_id", '6722315906287226')
    burl.append("client_secret", 'su5nxkJECtvTyYp5GGVlGcy8QicnzeAI',)
    burl.append("code",parse(this.props.location.search).code);
    burl.append("redirect_uri",options.form.redirect_uri)

    var aurl = url + burl

    console.log(aurl)
    
    
    console.log('cijasd')
    console.log(this.state.termino)
    
    console.log('sadfasfd')
    console.log(this.state.userok)
    if (this.state.termino==='no' && this.state.userok==='false'){
      fetch('/token', {
        method: 'POST',
        body: JSON.stringify({
          "url": aurl
        }),
        headers:{
          'Content-Type': 'application/json',
        }
      })
      .then(function(response){
        miFuncion('1')
      });
    
    } else if(el_auth_code_anterior === parse(this.props.location.search).code || (this.state.termino==='si' && this.state.userok==='true')) {
      miFuncion('1')
    }


  }
  
  
 

  render() {
    //if (this.state.valoraciones.length > 0) {
      if (this.state.termino==='si' && this.state.userok==='false') {
        console.log('va a recargar la pagina llamando de nuevo a mi funcion oh no')
        miFuncion('0');
      }

      var algo = JSON.parse(localStorage.getItem('valoracionesObtenidas'))

      if (algo !== null){
        console.log(algo.address.city)
        ciudad = algo.address.city
        status = algo.status.site_status
        level_id = algo.seller_reputation.level_id
        seller_status = algo.seller_reputation.power_seller_status
        transacciones_canceladas = algo.seller_reputation.transactions.canceled
        transacciones_completadas = algo.seller_reputation.transactions.completed
        transacciones_periodo = algo.seller_reputation.transactions.period
        transacciones_total = algo.seller_reputation.transactions.total
        nombreDelUsuario = algo.nickname
        fechaDeRegistro = algo.registration_date
        pais = algo.country_id
        tipoDeUsuario = algo.user_type
        puntos = algo.points
        idDelSitio = algo.site_id
      }


      
      /*if (unavariablequemeindicaquetodoanduvomal = 1) {
        var elMensajeDeError = <p>Se rompió todo</p>;
      } else {
        var elMensajeDeError = <p>funca</p>
      }*/

      return (
        
        <div>
          
          <table class="tabla">
            <tr>
              <th>Datos de la Empresa</th>
              <th><a href="https://auth.mercadolibre.com/authorization?client_id=6722315906287226&response_type=code&state=5ca75bd30" class="btn btn-warning" role="button" aria-pressed="true">Sign In</a></th>
            </tr>
            <tr>
              <td>Nombre de la empresa</td>
              <td>{nombreDelUsuario}</td>
            </tr>
            <tr>
              <td>Fecha de registro</td>
              <td>{fechaDeRegistro}</td>
            </tr>
            <tr>
              <td>País</td>
              <td>{pais}</td>
            </tr>
            <tr>
              <td>Ciudad</td>
              <td>{ciudad}</td>
            </tr>
            <tr>
              <td>Tipo de usuario</td>
              <td>{tipoDeUsuario}</td>
            </tr>
            <tr>
              <td>Puntos</td>
              <td>{puntos}</td>
            </tr>
            <tr>
              <td>ID del sitio</td>
              <td>{idDelSitio}</td>
            </tr>
            <tr>
              <td>Estado del sitio</td>
              <td>{status}</td>
            </tr>
          </table>

          <table class="tabla">
            <tr>
              <th>Reputación del usuario</th>
              <th></th>
            </tr>
            <tr>
              <td>Nivel</td>
              <td>{level_id}</td>
            </tr>
            <tr>
              <td>Estado del vendedor</td>
              <td>{seller_status}</td>
            </tr>
          </table>

          <table class="tabla">
            <tr>
              <th>Ventas</th>
              <th></th>
            </tr>
              <td>Canceladas</td>
              <td>{transacciones_canceladas}</td>
            <tr>
              <td>Completadas</td>
              <td>{transacciones_completadas}</td>
            </tr>
            <tr>
              <td>Periodo</td>
              <td>{transacciones_periodo}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{transacciones_total}</td>
            </tr>
          </table>
          
      </div>
    );    
  }
}

export default Home;