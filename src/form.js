import './App.css';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';


export const Form = ({handleInptChng, storeValues, containExpiryDay, containExpiryYear, handleCvvNumber}) => {

    const navigate = useNavigate();
    
    const schema = yup.object().shape({
        cardHolderName: yup.string()
            .required("can't be blank")
            .matches(/^[A-Za-z\s]*$/, "wrong format, letters only"),
        cardNumber: yup.string()
            .required("can't be blank")
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(16, "card number length must be 16")
            .max(16, "card number length can't exceed 16"),
        expMonth: yup.number()
            .required("can't be blank")
            .typeError("wrong format, numbers only")
            .min(1, "invalid month")
            .max(12, "invalid month"),
        expYear: yup.number()
            .required("can't be blank")
            .typeError("wrong format, numbers only")
            .min(20, "year not available")
            .max(70, "year not avaliable"),
        cvc: yup.number()
            .required("can't be blank")
            .typeError("wrong format, numbers only")
            .min(100, "invalid cvc")
            .max(999, "invalid cvc")

    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm(
        {
            resolver: yupResolver(schema),
        }
    );

    const onSubmit = (data) => {
        console.log(data);
        reset();
        navigate("/Thankyou");
    };

    let cardnameclassname = "inputs";
    if (errors.cardHolderName) cardnameclassname += " err";

    let cardnumclassname = "inputs";
    if (errors.cardNumber) cardnumclassname += " err";

    let monthInputs = "dateinputs";
    if (errors.expMonth) monthInputs += " dateerr";

    let yearInputs = "dateinputs";
    if (errors.expYear) yearInputs += " dateerr";

    let cvcc = "cvcinput";
    if (errors.cvc) cvcc += " cvcerr";

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>CARDHOLDER NAME</label>
            <input
                name='cardHolderName'
                className={cardnameclassname}
                type={"text"}
                placeholder={"e.g Jane AppleSeed"}
                {...register("cardHolderName",{onChange:handleInptChng})}
            />
            <p className='error'> {errors.cardHolderName?.message} </p>

            <label>CARD NUMBER</label>
            <input
                className={cardnumclassname}
                type={"number"}
                placeholder={"e.g 1234 5678 9123 0000"}
                {...register("cardNumber", {
                    setValueAs: (v) => {
                        return v === "" ? undefined : parseInt(v, 10);
                    },
                    onChange:storeValues
                })}
            />
            <p className='error'> {errors.cardNumber?.message} </p>

            <div className='dateNdCvcContainer'>

                <div className='dateContainer'>
                    <label className='dateCvcLabel'>EXP. DATE (MM/YY)</label>
                    <div className='dateInnerContainer'>
                        <input
                            className={monthInputs}
                            type={"number"}
                            placeholder={"MM"}
                            {...register("expMonth", {
                                setValueAs: (v) => {
                                    return v === "" ? undefined : parseInt(v, 10);
                                },
                                onChange:containExpiryDay,
                            })}
                            />

                        <input
                            className={yearInputs}
                            type={"number"}
                            placeholder={"YY"}
                            {...register("expYear", {
                                setValueAs: (v) => {
                                    return v === "" ? undefined : parseInt(v, 10);
                                },
                                onChange:containExpiryYear,
                            })}
                        />
                    </div>
                    <p className='error'> {errors.expYear?.message || errors.expMonth?.message} </p>
                </div>

                <div className='cvcContainer'>
                    <div className='cvcInnerContainer'>
                        <label className='dateCvcLabel'>CVC</label>
                        <input
                            className={cvcc}
                            type={"number"}
                            placeholder={"e.g 123"}
                            {...register("cvc", {
                                setValueAs: (v) => {
                                    return v === "" ? undefined : parseInt(v, 10);
                                },
                                onChange:handleCvvNumber,
                            })}
                        />
                        <p className='error'> {errors.cvc?.message} </p>
                    </div>
                </div>

            </div>

            <button
                className='btn'
                type="submit">Confirm</button>
        </form>
    )
};
export default Form;