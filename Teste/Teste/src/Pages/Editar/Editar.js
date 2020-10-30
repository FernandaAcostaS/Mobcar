import React, { Component } from 'react';
import ApiService from '../../utils/ApiService';
import Header from '../../Components/Header/Header';
import DataTable from '../../Components/DataTable/DataTable';

import PopUp from '../../utils/PopUp';

export class Editar extends Component {

    constructor(props){
        super(props);
    
        this.state = {
          carros_: [],
          nome : "",
          ano_c : "",
          preco : ""
    
        };
    }

    inserir = (e) => {

        e.preventDefault();
        console.log(this.state);

      let data = this.state;

    }

    componentDidMount(){

        let id =this.props.match.params.id;
        this.ListaCarros(id);

    }

    EditarCarros =(id) => {

        fetch(ApiService+'/'+id)
        .then(res => res.json())
        .then(data => {

        let d = data[0];
        this.setState({carros : d.nome});

        });
    
    }

    render() {

        return (

            <form onSubmit={this.inserir}>

                <div className="container">
                    <h2>Editar</h2>
                    <hr />
                        <label>Nome</label>
                        <input defaultValue={this.state.nome} onChange={ (e) => this.setState({nome : e.target.value})} className="form-control"/>
                        <br/> <button className="btn btn-info"> Alterar</button>
                </div>
            </form>

        )

    }














}