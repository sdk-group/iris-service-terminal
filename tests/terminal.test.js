'use strict'

let Terminal = require("./Terminal/terminal");
let config = require("./config/db_config.json");

describe("Terminal service", () => {
	let service = null;
	let bucket = null;
	before(() => {
		service = new Terminal();
		service.init();
	});
	describe("Terminal service", () => {
		it("should mark ticket called", (done) => {
			return service.actionTicketCalled()
				.then((res) => {
					console.log(res);
					done();
				})
				.catch((err) => {
					done(err);
				});
		})
	})

});