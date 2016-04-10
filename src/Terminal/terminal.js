'use strict'


let ServiceApi = require('resource-management-framework')
	.ServiceApi;

class Terminal {
	constructor() {
		this.emitter = message_bus;
	}

	init(cfg) {
		this.iris = new ServiceApi();
		this.iris.initContent();
		this.warmup_prebook_cache_days = cfg.warmup_prebook_cache_days || 30;
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
		let term;
		return this.emitter.addTask('workstation', {
				_action: 'by-id',
				user_id,
				user_type,
				workstation
			})
			.then((res) => {
				term = _.find(res, (val) => (val.device_type === 'terminal'));

				return Promise.props({
					views: this.iris.getServiceTree({
						keys: term.bound_service_groups,
						options: {}
					}),
					workstation: this.emitter.addTask('workstation', {
							_action: 'occupy',
							user_id,
							user_type,
							workstation
						})
						.then((res) => {
							return res.workstation;
						}),
					fields_model: this.iris.getUserInfoFields()
				});
			});
	}

	actionReady({
		user_id,
		workstation
	}) {
		return this.emitter.addTask('prebook', {
				_action: 'warmup-days-cache',
				workstation,
				start: 0,
				end: this.warmup_prebook_cache_days
			})
			.then(() => {
				return Promise.resolve({
					success: true
				});
			})
	}
}

module.exports = Terminal;
