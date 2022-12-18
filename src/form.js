import './App.css';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


export const Form = (props) => {

    

    const schema = yup.object().shape({
        cardHolderName: yup.string()
            .required("can't be blank")
            .matches(/^[a-z]+$/, "wrong format, letters only"),
        cardNumber: yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .required("can't be blank")
            .min(16, "card number length must be 16")
            .max(16, "card number length can't exceed 16"),
        expMonth: yup.number()
            .typeError("wrong format, numbers only")
            .max(12, "invalid month")
            .required("can't be blank")
            .positive("invalid format")
            .integer("must be whole number"),
        expYear: yup.string()
            .matches(/^[0-9]+$/, "wrong format, numbers only")
            .min(2, "year not available")
            .max(2, "year not avaliable")
            .required("can't be blank"),
        cvc: yup.string()
            .matches(/^[0-9]+$/, "wrong format, numbers only")
            .min(3, "invalid cvc")
            .max(3, "invalid cvc")
            .required("can't be blank")

    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm(
        {
            resolver: yupResolver(schema),
        }
    );

    const onSubmit = (data) => {
        console.log(data);
        reset();
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
                onChange={props.handleInptChng}
                {...register("cardHolderName")}
            />
            <p className='error'> {errors.cardHolderName?.message} </p>

            <label>CARD NUMBER</label>
            <input
                className={cardnumclassname}
                type={"number"}
                placeholder={"e.g 1234 5678 9123 0000"}
                onChange={props.storeValues}
                {...register("cardNumber", {
                    setValueAs: (v) => {
                        return v === "" ? undefined : parseInt(v, 10);
                    }
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
                            onChange={props.containExpiryDay}
                            {...register("expMonth", {
                                setValueAs: (v) => {
                                    return v === "" ? undefined : parseInt(v, 10);
                                }
                            })}
                        />

                        <input
                            className={yearInputs}
                            type={"number"}
                            placeholder={"YY"}
                            onChange={props.containExpiryYear}
                            {...register("expYear", {
                                setValueAs: (v) => {
                                    return v === "" ? undefined : parseInt(v, 10);
                                }
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
                            onChange={props.handleCvvNumber}
                            placeholder={"e.g 123"}
                            {...register("cvc", {
                                setValueAs: (v) => {
                                    return v === "" ? undefined : parseInt(v, 10);
                                }
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