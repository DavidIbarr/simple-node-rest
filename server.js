const http = require('http')
const { getProducts, getProduct, createProduct } = require('./controllers/productController') 

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
	// res.statusCode = 200
	// res.setHeader('Content-Type', 'text/html')
	// res.write('<h1>Hello World</h1>')
	// res.end()

	if(req.url === '/api/products' && req.method === 'GET') {
		getProducts(req, res)
	} else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'GET') {
		const id = req.url.split('/')[3]
		getProduct(req, res, id)
	} else if(req.url === '/api/products' && req.method === 'POST') {
		createProduct(req, res)
	} else {
		res.writeHead(404, {'Content-Type': 'application/json'})
		res.end(JSON.stringify({ message: 'Route Not Found' }))
	}
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
