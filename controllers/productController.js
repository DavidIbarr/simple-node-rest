const Product = require('../models/productModel')

// @desc 		Get all products
// #route 	GET /api/products
async function getProducts(req, res) {
	try {
		const products = await Product.findAll()

		res.writeHead(200, {'Content-Type': 'application/json'})
		res.end(JSON.stringify(products))
	} catch(error) {
		console.log(error);
	}
}

// @desc 		Get single product
// #route 	GET /api/product/id
async function getProduct(req, res, id) {
	try {
		const product = await Product.findById(id)
		if(!product) {
			res.writeHead(404, {'Content-Type': 'application/json'})
			res.end(JSON.stringify({ message: 'Product Not Found' }))
		} else {
			res.writeHead(404, {'Content-Type': 'application/json'})
			res.end(JSON.stringify(product))
		}
	} catch(error) {
		console.log(error);
	}
}

// @desc 		Create a products
// #route 	POST /api/products
async function createProduct(req, res) {
	try {
		// get the body of the post request as json

		let body = ''
		req.on('data', (chunk) => {
			// convert the buffer to a string
			body += chunk.toString()
		})
		req.on('end',  async () => {
			// parse the json string
			const { title, description, price } = JSON.parse(body)

			const product = {
				title,
				description,
				price
			}

			// use the model to create the product, file "database" access is async
			const newProduct = await Product.create(product)
			res.writeHead(201, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify(newProduct))
		})

	} catch(error) {
		console.log(error);
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct
}











