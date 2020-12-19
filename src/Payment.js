import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
// import { getBasketTotal } from "./reducer";
// import CurrencyFormat from "react-currency-format";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe=useStripe();
  const elements=useElements();

const [succeeded, setSucceeded] = useStateValue(false);
const [processing, setProcessing]= useState("");
  const [error,setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(()  => {
      // generate the special stripe secret which  allows us to charge a customer
      const getclientSecret = async () =>{
          const response =await axios({
              method: 'post',
              //stripe expects the toatal in a currencies subunits
              url: '/payments/create?total=${getBasketTotal(basket) * 100}'
          });
          setClientSecret(response.data.clientSecret)
      }
      getclientSecret();
  },   [basket])

 
  const handleSubmit = async  (event) => {
      // do all the fancy stripe....
      event.preventDefault();
      setProcessing(true);


      const payload= await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
              card: elements.getElement(CardElement)
          }
      }).then(({ paymentIntent}) => {

        // paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null)
        setProcessing(false)

        history.replace('/orders')
      })
  }

  const handleChange = event => {
      // listen for change in the card elements
      // and display any errors as the customers types their card detatils
      setDisabled(event.empty);
      setError(event.error ? event.error.message: "" );

  }

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
            </h1>


            {/* Payment section - delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>Firozabad</p>
                    <p>Uttar Pradesh</p>
                </div>
            </div>

            {/* Payment section - Review Items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>
        

            {/* Payment section - Payment method */}
            <div className='payment__section'>
                <div className="payment__title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment__details">
                        {/* Stripe magic will go */}

                        {/* <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                              {/* Errors */}
                              <form  onSubmit={handleSubmit}>
                                  <CardElement onChange={handleChange} />
                                  <div className='payment__priceContainer'>
                                      <CurrencyFormat
                                      renderText={(value) => (
                                          <h3>Order total: {value}</h3>
                                      )}
                                      decimalSacle={2}
                                      value={getBasketTotal(basket)}
                                      displayType={"text"}
                                      thousandSeparators={true}
                                      prefix={"$"}
                                      />
                                      <button disabled={processing || disabled ||  
                                        succeeded}>
                                        <span>{processing ? <p>Processing</p> :"Buy now"}</span>
                                      </button>
                                  </div>
                                  {/* errors */}
                                  {error && <div>{error}</div>}
                              </form>
                           
                </div>
            </div>
        </div>
    </div>
)
}

export default Payment