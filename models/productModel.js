const products = require('../data/products.json')
const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../utils/utils')
function findAll() {
	// return a promise after fetching data
	// function with resolve, reject
	return new Promise((resolve, reject) => {
		resolve(products)
	})
}

function findById(id) {
	return new Promise((resolve, reject) => {
		const product = products.find((p) => p.id === id)
		resolve(product)
	})
}

function create(product) {
	return new Promise((resolve, reject) => {
		const newProduct = {id: uuidv4(), ...product}
		products.push(newProduct)
		// async function
		writeDataToFile('./data/products.json', products)
		resolve(newProduct)
	})
}

module.exports = {
	findAll,
	findById,
	create
}