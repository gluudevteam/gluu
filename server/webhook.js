const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Use raw body middleware for Stripe webhook verification
router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    console.log('--- Incoming webhook ---');
    console.log('Headers:', req.headers);
    // req.body is a Buffer when using express.raw, convert to string for logging
    console.log('Raw body:', req.body.toString());
    console.log('Stripe Signature:', sig);

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('Webhook verified! Event type:', event.type);

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerId = session.customer;
        const email = session.customer_email;

        console.log(`Updating Supabase user: email=${email}, customerId=${customerId}`);

        const { error } = await supabase
            .from('users')
            .update({
                plan: 'client_plus',
                upload_limit: 200,
                stripe_customer_id: customerId,
            })
            .eq('email', email);

        if (error) {
            console.error('Failed to update Supabase user:', error);
            return res.status(500).send('Failed to update user data');
        }

        console.log(`Successfully updated user ${email} in Supabase`);
    } else {
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
});

module.exports = router;
