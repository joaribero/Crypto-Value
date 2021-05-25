import React from 'react';
import styled from '@emotion/styled';

const ResultDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;

    span {
        font-weight: bold;
    }
`;

const Value = styled.p`
    font-size: 30px;

    span {
        font-weight: bold;
    }
`;

const Quote = ({result}) => {
    
    if (Object.keys(result).length === 0) return null;
    
    return (
        <ResultDiv>
            <Value>Value is: <span>{result.PRICE}</span></Value>
            <Info>Higher value of the day: <span>{result.HIGHDAY}</span></Info>
            <Info>Lower value of the day: <span>{result.LOWDAY}</span></Info>
            <Info>Variation last 24H: <span>{result.CHANGEPCT24HOUR}</span></Info>
            <Info>Last update: <span>{result.LASTUPDATE}</span></Info>
        </ResultDiv>
    );
}
 
export default Quote;