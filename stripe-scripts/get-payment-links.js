import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_API_KEY);

async function listPaymentLinks() {
    try {
        const paymentLinks = await stripe.paymentLinks.list({
            limit: 100 // Get up to 100 most recent payment links
        });

        console.log('Found payment links:\n');
        paymentLinks.data.forEach(link => {
            console.log(`URL: ${link.url}`);
            console.log(`ID: ${link.id}`);
            console.log('---\n');
        });
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

listPaymentLinks();