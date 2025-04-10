import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const hostname = 'https://virtu-mart-ten.vercel.app/'; // Change to your deployed URL

const staticRoutes = [
  '/', '/about', '/contact', '/forgotPassword',
  '/login', '/signup', '/productDetails',
  '/products', '/loginError', '/verify'
];

// Combine all
const allRoutes = [...staticRoutes].map(url => ({
  url,
  changefreq: 'weekly',
  priority: 0.7
}));

const stream = new SitemapStream({ hostname });

streamToPromise(Readable.from(allRoutes).pipe(stream)).then(data => {
  fs.writeFileSync('./public/sitemap.xml', data.toString());
  console.log('✅ Sitemap generated in /public');
});
