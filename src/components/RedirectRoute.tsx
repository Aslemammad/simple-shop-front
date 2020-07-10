import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import axios from 'axios';
import { ContextInterface } from '../interfaces';

import { useStateContext, useSetStateContext } from '../Context';

const RedirectRoute = (props: any) => {
    const history = useHistory()
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
    useEffect(() => {
        const API_URL = process.env['API_URL'];
        if (token) {
            axios
                .get(`${API_URL}/api`, {
                    headers: {
                        'x-access-token': token
                    }
                })
                .then(({ data }: any) => {
                    setToken(data.token);
                    setState((prevState: ContextInterface) => ({ ...prevState, user: data.username }));

                })
                .catch(({ response }: any) => {
                    if (response.data.statusCode == 401 || response.data.statusCode == 500) setToken('');
                });
        }
    }, []);
    useEffect(() => {

        if (!token) {
            history.push('/sign')
        }
    }, [token]);

    // if (redirectTo) {
    // }
    return props.children;
};

export default RedirectRoute;
