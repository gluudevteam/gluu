require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const webhookRoutes = require('./webhook');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ MUST come first to preserve raw body for Stripe
app.use('/webhook', webhookRoutes);

// ✅ Safe to use after mounting /webhook
app.use(cors());
app.use(express.json());

// Checkout session creation
app.post('/create-checkout-session', async (req, res) => {
    const { userId, email } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            customer_email: email,
            line_items: [
                {
                    price: 'price_1RfujbGfOq83rEOMrV6saAg7',
                    quantity: 1,
                },
            ],
            metadata: { userId },
            success_url: 'http://localhost:5173/wallet?success=true',
            cancel_url: 'http://localhost:5173/wallet?canceled=true',
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error('Stripe error:', err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = 4242;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));


// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const Stripe = require('stripe');
// const bodyParser = require('body-parser');
// const webhookRoutes = require('./webhook');

// const app = express();
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// // General middleware
// app.use(cors());
// app.use(express.json());

// // Mount webhook (MUST come before express.json if using raw)
// app.use('/webhook', webhookRoutes);

// // All other routes go here
// app.post('/create-checkout-session', async (req, res) => {
//     const { userId, email } = req.body;
//     try {
//         const session = await stripe.checkout.sessions.create({
//             mode: 'subscription',
//             payment_method_types: ['card'],
//             customer_email: email,
//             line_items: [
//                 {
//                     price: 'price_1RfujbGfOq83rEOMrV6saAg7', // Replace with your price ID
//                     quantity: 1,
//                 },
//             ],
//             metadata: { userId },
//             success_url: 'http://localhost:5173/wallet?success=true',
//             cancel_url: 'http://localhost:5173/wallet?canceled=true',
//         });

//         res.json({ url: session.url });
//     } catch (err) {
//         console.error('Stripe error:', err);
//         res.status(500).json({ error: err.message });
//     }
// });

// const PORT = 4242;
// app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));


// // require('dotenv').config();
// // const express = require('express');
// // const cors = require('cors');
// // const Stripe = require('stripe');
// // const app = express();

// // const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// // app.use(cors());
// // app.use(express.json());

// // app.post('/create-checkout-session', async (req, res) => {
// //     console.log('Received request:', req.body);
// //     const { userId, email } = req.body;
// //     try {
// //         const session = await stripe.checkout.sessions.create({
// //             mode: 'subscription',
// //             payment_method_types: ['card'],
// //             customer_email: email,
// //             line_items: [
// //                 {
// //                     price: 'price_1RfujbGfOq83rEOMrV6saAg7', // <-- Use your correct Price ID
// //                     quantity: 1,
// //                 },
// //             ],
// //             metadata: { userId },
// //             success_url: 'http://localhost:5173/wallet?success=true',
// //             cancel_url: 'http://localhost:5173/wallet?canceled=true',
// //         });
// //         res.json({ url: session.url });
// //     } catch (err) {
// //         console.error('Stripe error:', err); // Log the error
// //         res.status(500).json({ error: err.message });
// //     }
// // });

// // const PORT = 4242;
// // app.listen(PORT, () => console.log(`Stripe backend running on port ${PORT}`));