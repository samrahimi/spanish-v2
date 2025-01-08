import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_API_KEY);

async function createPromoCodes() {
  try {
    // Create RENEE promo code ($20 off)
    const reneePromo = await stripe.promotionCodes.create({
      code: 'RENEE',
      coupon: (await stripe.coupons.create({
        amount_off: 2000, // $20.00
        currency: 'usd',
        duration: 'forever',
        name: 'RENEE $20 off'
      })).id
    });
    console.log('Created RENEE promo code:', reneePromo.code);

    // Create RENEESIB promo code ($30 off)
    const reneeSibPromo = await stripe.promotionCodes.create({
      code: 'RENEESIB',
      coupon: (await stripe.coupons.create({
        amount_off: 3000, // $30.00
        currency: 'usd',
        duration: 'forever',
        name: 'RENEESIB $30 off'
      })).id
    });
    console.log('Created RENEESIB promo code:', reneeSibPromo.code);

    // Get all active prices
    const prices = await stripe.prices.list({
      active: true,
      expand: ['data.product']
    });

    console.log(`Found ${prices.data.length} active prices`);
    
    // Log details about each price/product
    prices.data.forEach(price => {
      console.log(`- ${price.product.name}: $${price.unit_amount/100} (${price.id})`);
    });

    console.log('\nPromo codes have been created and are automatically valid for all products/prices.');
    console.log('\nPromo code details:');
    console.log('RENEE - $20 off');
    console.log('RENEESIB - $30 off');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

createPromoCodes();