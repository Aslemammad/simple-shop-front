import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import { StateProvider } from './Context';
import { Button } from 'react-bootstrap';


import Header from './components/Header';
import RedirectRoute from './components/RedirectRoute';
import AddProduct from './components/AddProduct'
import Home from './components/routes/Home';
import Sign from './components/routes/Sign';

const App: React.FC = () => {

    return (<>
        <StateProvider >
            <Header />

            <Router>
                <RedirectRoute>
                    <Route exact path="/"  >
                        <AddProduct />
                        <Home />
                    </Route>
                    <Route exact path="/sign" >

                        <Sign />
                    </Route>

                </RedirectRoute>
            </Router>
        </StateProvider>

    </>);
};

export default App;
