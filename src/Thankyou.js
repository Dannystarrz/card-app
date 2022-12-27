import './App.css';
import checkMark from './check mark.png';

export const Thankyou = () => {

    return (
        <div className='thankyou'>
            <img src={checkMark} alt='check' className='checkMark'/>
            <h2 className='thanks '>ThankYou!</h2>
            <p className='thanks '>We've added your card details</p>
            <button className='btn'>Continue
            </button>
        </div>
    )

};
export default Thankyou;