import React,{useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Error from './Error.jsx';
import useCurrency from '../hooks/useCurrency.jsx';
import useCryptoCurrency from '../hooks/useCryptoCurrency.jsx';
import axios from 'axios';


const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 25px;
    padding: 10x;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Form = ({setCurrency, setCryptoCurrency}) => {

    //state
    const [cryptoList,setCrypto] = useState([]);

    const [error, setError] = useState(false);
    
    const CURRENCY = [
        {code: 'USD', name: 'US Dollar'},
        {code: 'ARS', name: 'Peso Argentino'},
        {code: 'MXN', name: 'Peso Mexicano'},
        {code: 'Euro', name: 'Euro'},
        {code: 'GBP', name: 'Libra Esterlina'},
    ];
    

    //------------------------------Hooks-------------------------------------
    //useCoin
    const [currency, SelectCurrency] = useCurrency('Choose your currency','',CURRENCY);

    //useCryptoCoin
    const [cryptoCurrency,SelectCrypto] = useCryptoCurrency('Choose your crypto','',cryptoList);

    //request the API
    useEffect(() => {
        const requestAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const result = await axios.get(url);

            setCrypto(result.data.Data);
        }
        requestAPI();
    },[])
    
    //on submit form
    const quoteCurrency = e => {
        e.preventDefault();

        if(currency === '' || cryptoCurrency === '') {
            setError(true);
            return;
        } else {
            setError(false);
            setCurrency(currency);
            setCryptoCurrency(cryptoCurrency)
        }
    }

    return ( 
        <form onSubmit={quoteCurrency}>
            
            {error ? <Error message="All fields are required"/>: null}

            <SelectCurrency/>

            <SelectCrypto/>
            
            <Button
                type="submit"
                value="Calculate"
            />
        </form>
    );
}
 
export default Form;