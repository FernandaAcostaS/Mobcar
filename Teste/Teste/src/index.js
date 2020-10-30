import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Pages/Home/Home';

import Ano from './Pages/Ano/Ano';
import Carros from './Pages/Carros/Carros';
import Editar from './Pages/Editar/Editar';
import NotFound from './Pages/NotFound/NotFound';

import { BrowserRouter, Switch, Route} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact={true} component={Home} />
 
            <Route path='/ano' component={Ano} />
            <Route path='/carro' component={Carros} />

            <Route component={NotFound} />

        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
