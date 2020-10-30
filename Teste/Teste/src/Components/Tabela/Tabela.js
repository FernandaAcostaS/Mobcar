import React, { Component } from 'react';





function TableHead() {
    return (
        <thead>
            <tr>
                <th>Carros</th>
                <th>Ano</th>
                <th>Preços</th>
                <th>Editar</th>
                <th>Remover</th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const linhas = props.carros.map((linha) => {
        return (
            <tr key={linha.id}>

                <td>{linha.nome} 
 

               <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img  class="activator"  src={"./images/car.svg"}></img> 
                    </div>  
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4"><i class="material-icons right">@</i></span>
                    </div>  
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Carro<i class="material-icons right">X</i></span>
                        <p>Descrição do carro.</p>
                    </div> 
                </div> 
                </td>

                <td>{linha.ano}</td>
                <td>{linha.preco}</td>
                <td>
                   <router-link  to="/editar">
                       <button onClick = { () => { props.editarCarros(linha.id) }} className="waves-effect waves-light teal accent-3 btn">Editar</button> 
                   </router-link>
                    
                    
                </td>
                <td><button onClick = { () => { props.removeCarros(linha.id) }} className="waves-effect waves-light teal accent-3 btn">Remover</button></td>
            </tr>
        );
    });

    return(
        <tbody>
            {linhas}
        </tbody>
    );
}

class Tabela extends Component {
    
    render() {

        const { carros, removeCarros } = this.props;

        return (
            <table className="centered highlight m-3">
                <TableHead />
                <TableBody carros = { carros } removeCarros = {removeCarros}/>
               
            </table>
        );
    }
}

export default Tabela;