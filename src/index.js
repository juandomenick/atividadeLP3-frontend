import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    
    <BrowserRouter>
        <Switch>
            <Route path='/'>
                <App/>
            </Route>
            <Route>
                
            </Route>
        </Switch>
    </BrowserRouter> 
,document.getElementById('root'));