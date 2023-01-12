let products = require('../data/products.json')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/utils')

// retrieve all products from the database
function findAll() {
	// return a promise after fetching data
	// function with resolve, reject
	return new Promise((resolve, reject) => {
		resolve(products)
	})
}

// retrieve a single product from the database
function findById(id) {
	return new Promise((resolve, reject) => {
		const product = products.find((p) => p.id === id)
		resolve(product)
	})
}

// create a single product in the database
function create(productData) {
	return new Promise((resolve, reject) => {
		const newProduct = { id: uuidv4(), ...productData }
		products.push(newProduct)
		// async function
		writeDataToFile('./data/products.json', products)
		resolve(newProduct)
	})
}

// update a product in the database
function update(id, productData) {
	return new Promise((resolve, reject) => {
		const index = products.findIndex((p) => p.id === id)
		products[index] = { id, ...productData }
		// async function
		writeDataToFile('./data/products.json', products)
		resolve(products[index])
	})
}

// remove a product from the database
function remove(id) {
	return new Promise((resolve, reject) => {
		products = products.filter((p) => p.id !== id)
		writeDataToFile('./data/products.json', products)
		resolve()
	})
}

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove
}