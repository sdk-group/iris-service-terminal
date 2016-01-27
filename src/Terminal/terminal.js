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
	actionServiceGroups({
		workstation,
		user_id,
		user_type = "SystemEntity",
			query
	}) {
		return this.emitter.addTask('agent', {
				_action: 'available-workstations',
				user_id,
				user_type: "SystemEntity"
			})
			.then((res) => {
				return this.iris.getServiceTree(query);
			})
	}

	actionBootstrap({
		workstation,
		user_id,
		user_type = "SystemEntity"
	}) {
		console.log("BOOTSTRAP", workstation, user_id);
		return this.emitter.addTask('workstation', {
				_action: 'by-id',
				user_id,
				user_type,
				workstation
			})
			.then((res) => {
				console.log("BOOTSTRAP WS", res, workstation, user_id);
				let term = _.find(res, (val) => (val.device_type === 'terminal'));
				return Promise.props({
					views: this.iris.getServiceTree({
						keys: term.bound_service_groups,
						options: {}
					}),
					ticket_prefix: this.iris.getEntry("Organization", {
							keys: term.attached_to
						})
						.then((res) => {
							console.log("OFFICE", res);
							return res[term.attached_to].pin_code_prefix;
						}),
					ws: this.emitter.addTask('workstation', {
						_action: 'occupy',
						user_id,
						user_type,
						workstation
					}),
					fields_model: this.iris.getFieldsModel()
				});
			})
	}
}

module.exports = Terminal;