import React,{useState,useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Form from './components/Form.jsx';
import Quote from './components/Quote.jsx';
import Spinner from './components/Spinner.jsx';
import axios from 'axios';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);  
    column-gap: 2rem;
  }
`;

const Img = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {
  
  //state
  const [currency,setCurrency] = useState('');
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [result,setResult] = useState({});
  const [loading,setLoading] = useState(false);


  useEffect(() => {
    
    const quote = async () => {
      
      if (currency === '') return;

      //request the api for the values
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;

      const result = await axios.get(url);

      //show spinner
      setLoading(true);

      //hide spinner and show values
      setTimeout(() => {
        
        setLoading(false);
        setResult(result.data.DISPLAY[cryptoCurrency][currency]);

      },3000);

      
    };
    quote();

  },[currency,cryptoCurrency]);

  //Show spinner or result
  //const Component = (loading ? <Spinner/> : <Quote result={result}/> );
  
  return (
    <Container>
      <div>
        <Img 
          src={imagen}
          alt="crypto img"/>
      </div>
      <div>
        <Heading>Crypto values ATM</Heading>
        <Form
          setCurrency = {setCurrency}
          setCryptoCurrency = {setCryptoCurrency}
        />
        {loading ? <Spinner/> : <Quote result={result}/>}
        
      </div>
    </Container>
  );
}

export default App;
