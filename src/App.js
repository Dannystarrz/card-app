import './App.css';
import { Form } from "./form";
import { Thankyou } from "./Thankyou";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {

  // use state for Card Holder name
  const [inputValue, setInputValue] = useState("JANE APPLESEED");
  const handleInptChng = (event) => {
    setInputValue(event.target.value);
  }
  // useState for Card number
  const [cardNumber, setCardNumber] = useState('0000 0000 0000 0000')
  let storeValues = (numbers) => {
    let numbersArray = numbers.target.value.split('')

    setCardNumber(<div>
      <span style={{ marginRight: "10px" }}>{[numbersArray[0], numbersArray[1], numbersArray[2], numbersArray[3]]}</span>

      <span style={{ marginRight: "10px" }}>{[numbersArray[4], numbersArray[5], numbersArray[6], numbersArray[7]]}</span>

      <span style={{ marginRight: "10px" }}>{[numbersArray[8], numbersArray[9], numbersArray[10], numbersArray[11]]}</span>

      <span>{[numbersArray[12], numbersArray[13], numbersArray[14], numbersArray[15]]}</span>
    </div>
    )
  }

  // Use state for Expiry date
  const [expiryDay, setExpiryDay] = useState("00");
  const containExpiryDay = (day) => {
    setExpiryDay(day.target.value);
  }

  const [expiryYear, setExpiryYear] = useState("00");
  const containExpiryYear = (year) => {
    setExpiryYear(year.target.value);
  }

  // useState for CVV number
  const [cvvNumber, setCvvNumber] = useState("000");
  const handleCvvNumber = (cvv) => {
    setCvvNumber(cvv.target.value);
  }

  return (
    <Router>
      <div className="App">
        <div className='first-half'></div>
        <div className='second-half'>
          <Routes>
            <Route path='/card-app'
            element={
              <Form
                handleInptChng={handleInptChng}
                storeValues={storeValues}
                containExpiryDay={containExpiryDay}
                containExpiryYear={containExpiryYear}
                handleCvvNumber={handleCvvNumber}
              />}/>
            <Route exact path='/Thankyou' element={<Thankyou />}/>
          </Routes>
        </div >
        <div className='card-front'>
          <div className='circle-container'>
            <div className='circle-one'></div>
            <div className='circle-two'></div>
          </div>
          <p className='card-num'> {cardNumber} </p>
          <div className='name-expd'>
            <p className='crd-name'> {inputValue} </p>
            <p className='expd'> {expiryDay}/{expiryYear} </p>
          </div>
        </div>
        <div className='card-back'>
          <p className='cvv-number'> {cvvNumber} </p>
        </div>
      </div >
    </Router>
  );
};

export default App;
