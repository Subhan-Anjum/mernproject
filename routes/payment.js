const express=require('express');
const router=express.Router();
var stripe=require('stripe')('sk_test_51Na9yOIAe3govj2SOdigmOUC8MwYZ1BzlEAdJLggEqH4cGSStaEpEtbH8cPXH2B6vZAmP3nh006xsYzi6h53fUnX00scOsj4ch');

router.get('/',(req,response)=>{
    async function checkout(){
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data:{
                    currency: 'pkr',
                    product_data:{
                        name: 'Bike',
                        images:['https://bd.gaadicdn.com/processedimages/yamaha/mt-15-2-0/source/mt-15-2-062e4b1d700b63.jpg?tr=w-375'],
                    },
                    unit_amount: 200000 * 100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `http://localhost:4000/?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:4000',
          });
          return session.url;
    }

    checkout().then((url)=>response.redirect(url))
    .catch((error)=>console.log(error));
})
module.exports=router
