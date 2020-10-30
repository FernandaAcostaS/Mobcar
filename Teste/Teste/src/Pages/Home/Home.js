import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';
import Header from '../../Components/Header/Header';
import Tabela from '../../Components/Tabela/Tabela';
import Form from '../../Components/Formulario/Formulario';
import PopUp from '../../utils/PopUp';
import ApiService from '../../utils/ApiService';

export class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      carros_: [],
      nome : "",
      ano_c : "",
      preco : ""

    };
  }

  
  removeCarros = id => {

    const { carros_ } = this.state;

    const carrosAtualizado = carros_.filter(carros => {
        return carros.id !== id;
    });
    ApiService.RemoveCarros(id)
              .then(res =>{
                if(res.message === 'deleted'){
                  this.setState({carros_ : [...carrosAtualizado]})
                  PopUp.exibeMensagem("error", "Carro removido com sucesso");
                }
              })
              .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a API ao tentar remover o carro"));
    
  }

 

  escutadorDeSubmit = carros => {
    ApiService.CriaCarros(JSON.stringify(carros))
              .then(res =>{  
                if(res.message === 'success'){
                  this.setState({ carros_:[...this.state.carros_, res.data] });
                  PopUp.exibeMensagem("success", "Carro adicionado com sucesso");
                }
                
              })
              .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a API ao tentar criar o carro"));

    
  }


  componentDidMount(){

    let id =this.props.match.params.id;
    ApiService.ListaCarros(id)
                .then(res => {
                  if(res.message === 'success'){
                    this.setState({carros_ : [...this.state.carros_, ...res.data]})
                  }
                  
                })
                .catch(err => PopUp.exibeMensagem("error", "Erro na comunicação com a API ao tentar listar os carros"));
  
 



    ApiService.EditarCarros =(id) => {

      fetch(ApiService+'/'+id)
      .then(res => res.json())
      .then(data => {

        this.setState({carros : data[0]});

      });
    }
  
  
  }



  render() {

    return (
      <Fragment>
        <Header />
        <div className="container mb-10  border m-3">
    
          <p>Adicionar carros</p>
          <Form escutadorDeSubmit={this.escutadorDeSubmit}/>
    
          <Tabela carros ={this.state.carros_} removeCarros={this.removeCarros} />

        </div>
      </Fragment>
    );
  }

}

export default Home;
