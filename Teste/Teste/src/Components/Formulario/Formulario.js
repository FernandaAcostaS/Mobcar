import React, { Component } from 'react';
import FormValidator from '../../utils/FormValidator';
import PopUp from '../../utils/PopUp'

class Formulario extends Component {

    constructor(props) {
        super(props);

        this.validador = new FormValidator([
            {
                campo: 'nome',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Entre com um nome'
            },
            {
                campo: 'ano',
                metodo: 'isInt',
                args: [{min: 0, max: 2999}],
                validoQuando: true,
                mensagem: 'Entre com um ano'
            },
            {
                campo: 'preco',
                metodo: 'isInt',
                args: [{min: 0, max: 99999999999999}],
                validoQuando: true,
                mensagem: 'Entre com um valor numérico'
            }
        ])

        this.stateInicial = {
            nome: '',
            ano: '',
            preco: '',
            validacao: this.validador.valido()
        }

        this.state = this.stateInicial;

    }

    escutadorDeInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    submitFormulario = () => {
        const validacao = this.validador.valida(this.state);

        if(validacao.isValid){
            this.props.escutadorDeSubmit(this.state);
            this.setState(this.stateInicial);
        }else{
            const { nome, ano, preco } = validacao;
            const campos = [nome, ano, preco];
            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid;
            });
            camposInvalidos.forEach(campo => {
                PopUp.exibeMensagem('error', campo.mensagem);
            });
        }
        
    }

    render() {

        const { nome, ano, preco } = this.state;

        return (
            <form>
                <div className="row">

                    <div className="container m-5">

                        <input type="file" />

                    </div>

                    <div className="input-field col s4">

                    

                        <label className="input-field" htmlFor="nome">Carro</label>
                        <input
                            className="validate"
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={this.escutadorDeInput} />
                    </div>

                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="ano">Ano</label>
                        <input
                            className="validate"
                            id="ano"
                            type="text"
                            name="ano"
                            value={ano}
                            onChange={this.escutadorDeInput} />

                    </div>
                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="preco">Preço</label>
                        <input
                            className="validate"
                            id="preco"
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={this.escutadorDeInput} />
                    </div>
                </div>
                <button className="waves-effect waves-light teal accent-4 btn" onClick={this.submitFormulario} type="button">Salvar
                </button>
            </form>
        );
    }
}
export default Formulario;