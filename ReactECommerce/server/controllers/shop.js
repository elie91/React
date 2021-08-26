const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res, next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'eur',
            // Verify your integration in this guide by including this parameter
            metadata: {integration_check: 'accept_a_payment'},
        });
        res.status(200).send(paymentIntent)
    } catch (err) {
        res.status(500).send(err.message)
    }

};