import React,{useState, useEffect} from 'react';
import './App.scss';
import colorArray from './colorsArray';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'






let API = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"


function App() {
   const [quote, setQuote] = useState("When you are week pretend to be strong, when you are strong pretend to be weak");
   const [author, setAuthor] = useState("Albert Einstein");
    const [randomNumber, setRandomNumber] = useState(0);
    const [quotesArray, setQuotesArray] = useState(null);
    const [color, setColor] = useState("#FF6633");
   
    const  fetchQuotes = async (url) => {
     
       let response = await fetch(url);
        let data = await response.json();
        setQuotesArray(data.quotes);
        console.log(data); 
       };
       
       useEffect(() => {
       fetchQuotes(API)
    }, []);

    const getRandomQuote = () => {
      let randomInteger = Math.floor(Math.random() * quotesArray.length);
      setRandomNumber(randomInteger);
      setColor(colorArray[randomInteger]);
      setQuote(quotesArray[randomInteger].quote);
      setAuthor(quotesArray[randomInteger].author);
    }
 
    return(   
    <div className="App">
      <header className="App-header" style={{backgroundColor:color}}>
        <div id="quote-box" style={{color:color}}>
               <p id="text">"{quote}"</p>
        <p id="author"> - {author}</p>
        <div className="buttons">
        <button id="new-quote" onClick={()=>getRandomQuote()}>Generate a Random Quote</button>
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quote}-${author}&hashtags=quote`}><FontAwesomeIcon icon={faTwitter} /></a>
        </div>
        </div>
   </header>
    </div>
    );
}

export default App;