const Product = require('../models/productModel')
const { getPostData } = require('../utils/utils')

// @desc 	Get all products
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

// @desc 	Get a single product
// #route 	GET /api/product/:id
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

// @desc 	Create a product
// #route 	POST /api/products
async function createProduct(req, res) {
	try {
		// return body data from the function
		const body = await getPostData(req)
		const { title, description, price } = JSON.parse(body)

		const product = {
			title,
			description,
			price
		}

		// use the model to create the product, file "database" access is asynchronous
		const newProduct = await Product.create(product)
		res.writeHead(201, { 'Content-Type': 'application/json' })
		return res.end(JSON.stringify(newProduct))

	} catch(error) {
		console.log(error);
	}
}

// @desc 	Update a product
// #route 	PUT /api/products/:id
async function updateProduct(req, res, id) {
	try {
		const product = await Product.findById(id)

		if(!product) {
			res.writeHead(404, {'Content-Type': 'application/json'})
			res.end(JSON.stringify({ message: 'Product Not Found' }))
		} else {
			// get the updated data for the product in the req body
			const body = await getPostData(req)
			const { title, description, price } = JSON.parse(body)
			// either get the body data or existing fields
			const productData = {
				title: 		title || product.title,
				description: 	description || product.description,
				price: 		price || product.price
			}

			const updatedProduct = await Product.update(id, productData)

			res.writeHead(200, { 'Content-Type': 'application/json' })
			return res.end(JSON.stringify(updatedProduct))
		}
		
	} catch(error) {
		console.log(error);
	}
}

// @desc 	Delete a product
// #route 	DELETE /api/product/:id
async function deleteProduct(req, res, id) {
	try {
		const product = await Product.findById(id)

		if(!product) {
			res.writeHead(404, {'Content-Type': 'application/json'})
			res.end(JSON.stringify({ message: 'Product Not Found' }))
		} else {
			await Product.remove(id)

			res.writeHead(404, {'Content-Type': 'application/json'})
			res.end(JSON.stringify({ message: `Product ${id} deleted`}))
		}
	} catch(error) {
		console.log(error);
	}
}

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct
}











