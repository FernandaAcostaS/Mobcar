import React, { Component, Fragment } from 'react';
import Header from '../../Components/Header/Header';
import DataTable from '../../Components/DataTable/DataTable';
import ApiService from '../../utils/ApiService';
import PopUp from '../../utils/PopUp';

class Ano extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ano_c: [],
            titulo: 'Ano'
        };
    }

    componentDidMount(){
        ApiService.ListaAno()
                    .then(res => {
                        if(res.message === 'success'){
                            PopUp.exibeMensagem('success', 'Ano listados com sucesso');
                            this.setState({ano_c : [...this.state.ano_c, ...res.data]});

                        }
                    })
                    .catch(err => PopUp.exibeMensagem('error', 'Falha na comunicação com a API ao listar ano'));
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className='container'>
                    <h1>Ano dos carros</h1>
                    <DataTable dados={this.state.ano_c} titulo={this.state.titulo} colunas={['ano']} />
                </div>
            </Fragment>
        );
    }

}
export default Ano;