
import React from 'react' 
import crochet from './assets/crochet.png'  
import cro from './assets/cro.png'  
const body = () => {
  return (
    <div className='body'>
        <h1 className='h1'>HELLO WELCOME TO KLEFTY DESIGNS</h1>
        <img className="crochet" src= {crochet} alt="" />
        <img className="cro" src= {cro} alt="" />

<h2> OUR MISSION </h2>
        <p>Our mission is to provide the best quality of crochet products to our customers
            and to make sure that they are satisfied with our products. We also aim to provide
            the best customer service to our customers and to make sure that they are happy with
            their purchase.
        </p>        
    </div>
  )
}

export default body