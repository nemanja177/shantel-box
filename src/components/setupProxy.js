// const { createProxyMiddleware } = require("http-proxy-middleware")

// module.exports = app => {
//     app.use(
//         createProxyMiddleware('/box/bodovi/check', {
//             target: 'https://bigalslist.com',
//             changeOrigin: 'true',
//             router: {
//                 'https://bigalslist.com:3000': 'https://bigalslist.com:8080',
//             }
//         })
//     )
//     app.listen(8080)
// }

// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// // proxy middleware options
// /** @type {import('http-proxy-middleware/dist/types').Options} */
// const options = {
//   target: 'https://bigalslist.com', // target host
//   changeOrigin: true, // needed for virtual hosted sites
//   ws: true, // proxy websockets
//   pathRewrite: {
//     '^/api/old-path': '/api/new-path', // rewrite path
//     '^/api/remove/path': '/path', // remove base path
//   },
//   router: {
//     // when request.headers.host == 'dev.localhost:3000',
//     // override target 'http://www.example.org' to 'http://localhost:8000'
//     'https://bigalslist.com:3000': 'https://bigalslist.com:8000',
//   },
// };

// // create the proxy (without context)
// const exampleProxy = createProxyMiddleware(options);

// // mount `exampleProxy` in web server
// const app = express();
// app.use('/api', exampleProxy);
// app.listen(3000);