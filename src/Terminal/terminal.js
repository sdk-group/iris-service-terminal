'use strict'

let emitter = require("global-queue");
let ServiceApi = require('resource-management-framework').ServiceApi;

class Terminal {
	constructor() {
		this.emitter = emitter;
	}

	init() {
		this.iris = new ServiceApi();
		this.iris.initContent();
	}

	//API
	actionServices({
		query
	}) {
		console.log("TODO: GET ENTRIES", query);
		return Promise.resolve(true);
	}

}

module.exports = Terminal;