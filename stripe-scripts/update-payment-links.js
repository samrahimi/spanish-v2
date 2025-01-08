import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const paymentLinks = [
    {
        id: 'plink_1QXybZJt26FTYQESn4JlcZkw',  // Mar 27 Level 1
        level: 1,
        date: 'March 27, 2025',
        time: '9:15 AM CST'
    },
    {
        id: 'plink_1QXybYJt26FTYQESUt2emMsH',  // Mar 25 Level 1
        level: 1,
        date: 'March 25, 2025',
        time: '9:00 AM CST'
    },
    {
        id: 'plink_1QXybXJt26FTYQESfS7Ch6j8',  // Jan 23 Level 3
        level: 3,
        date: 'January 23, 2025',
        time: '10:30 AM CST'
    },
    {
        id: 'plink_1QXybXJt26FTYQESt39G84Cf',  // Jan 21 Level 1
        level: 1,
        date: 'January 21, 2025',
        time: '10:30 AM CST'
    },
    {
        id: 'plink_1QXybWJt26FTYQES6vktdXDT',  // Jan 23 Level 1
        level: 1,
        date: 'January 23, 2025',
        time: '9:15 AM CST'
    },
    {
        id: 'plink_1QXybVJt26FTYQESVz5VmcHy',  // Jan 21 Level 2
        level: 2,
        date: 'January 21, 2025',
        time: '9:15 AM CST'
    }
];

const levelDescriptions = {
    1: "Learn to speak, understand, read, and write Spanish for basic day to day interactions.",
    2: "Go deeper and gain fluency in natural, spontaneous conversations in Spanish",
    3: "Discuss complex topics in Spanish, and master the skills to confidently handle real life situations"
};

const levelNames = {
    1: "Foundational Flow",
    2: "Conversational Flow",
    3: "360 Flow"
};

async function updatePaymentLinks() {
    try {
        for (const link of paymentLinks) {
            try {
                // Enable promo codes and update basic settings
                const updatedLink = await stripe.paymentLinks.update(
                    link.id,
                    {
                        allow_promotion_codes: true,
                        after_completion: { type: 'redirect', redirect: { url: 'https://fastandfunlanguage.com/welcome' } }
                    }
                );

                // Update the payment link's line items with the description
                const lineItems = await stripe.paymentLinks.listLineItems(link.id);
                if (lineItems.data.length > 0) {
                    const priceId = lineItems.data[0].price.id;
                    await stripe.prices.update(priceId, {
                        nickname: `Level ${link.level}: ${levelNames[link.level]} - ${link.date} ${link.time}`,
                        metadata: {
                            description: levelDescriptions[link.level]
                        }
                    });
                }

                console.log(`Updated payment link ${link.id}:`);
                console.log(`- Level ${link.level}: ${levelNames[link.level]}`);
                console.log(`- ${levelDescriptions[link.level]}`);
                console.log(`- Class starts: ${link.date} at ${link.time}\n`);
            } catch (err) {
                console.error(`Error updating payment link ${link.id}:`, err.message);
            }
        }
        
        console.log('\nAll payment links have been processed.');
        console.log('\nPromo codes that can now be used:');
        console.log('RENEE - $20 off');
        console.log('RENEESIB - $30 off');
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

updatePaymentLinks();