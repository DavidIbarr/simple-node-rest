const products = require('../data/products.json')
// const products = require('./data/products.json')

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

module.exports = {
	findAll,
	findById
}