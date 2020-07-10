import React, { useEffect, MouseEvent } from 'react';
import { Product as ProductType, ContextInterface } from '../interfaces';
import { useStateContext, useSetStateContext } from '../Context';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import useLocalStorage from 'react-use-localstorage';

interface Props extends ProductType {
    addToCart: boolean;
}
const Product = (props: Props) => {
    const [
        token,
        setToken
    ] = useLocalStorage('token', '');
    const [
        state,
        setState
    ] = [
            useStateContext(),
            useSetStateContext()
        ];
    const handleClick = (event: any) => {
        const API_URL = process.env['API_URL'];

        axios
            .post(`${API_URL}/api/${props.addToCart ? 'cart' : 'remove-cart'}/${props._id}`, undefined, {
                headers: {
                    'x-access-token': token
                }
            })
            .then(({ data }: any) => {
                setState((prevState: ContextInterface) => ({ ...prevState, carts: props.addToCart ? [...prevState.carts, props._id] : prevState.carts.filter((cart: string) => cart !== props._id) }));
            })
            .catch(({ response }: any) => {
                if (response.data.statusCode == 401 || response.data.statusCode == 500) setToken('');
            });
    };
    return (
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>${props.price}</Card.Subtitle>
                <Card.Text>{props.description}</Card.Text>
                <Button
                    variant={props.addToCart ? 'secondary' : 'outline-secondary'}
                    style={{ width: '100%' }}
                    onClick={handleClick}>
                    {props.addToCart ? 'Add to Cart' : 'Delete from Cart'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Product;
