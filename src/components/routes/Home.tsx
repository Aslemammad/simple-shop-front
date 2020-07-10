import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Product as ProductType, ContextInterface } from '../../interfaces'

import { useStateContext, useSetStateContext } from '../../Context';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';
import Product from '../Product';

const Home: React.FC = () => {
    const [
        state,
        setState
    ] = [
            useStateContext(),
            useSetStateContext()
        ];
    const [
        token,
        setToken
    ] = useLocalStorage('token', '');
    useEffect(() => {
        const API_URL = process.env['API_URL'];


        axios
            .get(`${API_URL}/api/products`, {
                headers: {
                    'x-access-token': token
                }
            })
            .then(({ data }: any) => {
                setState((prevState: ContextInterface) => ({ ...prevState, products: data.products }));
            })
            .catch(({ response }: any) => {
                if (response.data.statusCode == 401 || response.data.statusCode == 500) setToken('');
            });


        axios
            .get(`${API_URL}/api/cart`, {
                headers: {
                    'x-access-token': token
                }
            })
            .then(({ data }: any) => {

                setState((prevState: ContextInterface) => ({ ...prevState, carts: data.items }));
            })
            .catch(({ response }: any) => {
                if (response.data.statusCode == 401 || response.data.statusCode == 500) setToken('');
            });
    }, []);

    return (
        <Container fluid >
            <Row className='mt-3' >
                {state.products.map((product: ProductType) => <Col key={product._id} className='mb-3' lg='4' xl='3' sm='6' md='6' xs='10' ><Product {...product} addToCart={!state.carts.includes(product._id)} /></Col>)}
            </Row>

        </Container>

    );
};

export default Home;
