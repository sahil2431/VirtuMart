import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const hostname = 'https://virtu-mart-ten.vercel.app/'; // Change to your deployed URL

const staticRoutes = [
  '/', '/about', '/contact', '/forgotPassword',
  '/login', '/signup', '/productDetails',
  '/products', '/loginError', '/verify'
];

const dynamicExamples = [
  '/resetPassword/sample-token',
  '/profile/sample-user/sample-id',
  '/accountInformation/sample-user/sample-id',
  '/deleteAccount/sample-user',
  '/updatePassword/sample-user/sample-id',
  '/cart/sample-user/sample-id',
  '/orders/sample-user/sample-id',
  '/wishlists/sample-user/sample-id',
  '/address/sample-user/sample-id',
  '/addAddress/sample-user/sample-id',
  '/orderConfirm/sample-user/sample-id',
  '/orderConfirm/sample-user/sample-id/success',
  '/orderDetails/sample-user/sample-order/sample-product'
];

// Combine all
const allRoutes = [...staticRoutes, ...dynamicExamples].map(url => ({
  url,
  changefreq: 'weekly',
  priority: 0.7
}));

const stream = new SitemapStream({ hostname });

streamToPromise(Readable.from(allRoutes).pipe(stream)).then(data => {
  fs.writeFileSync('./public/sitemap.xml', data.toString());
  console.log('✅ Sitemap generated in /public');
});
