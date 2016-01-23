let events = {
	terminal: {}
};

let tasks = [];


module.exports = {
	module: require('./terminal.js'),
	permissions: [],
	exposed: true,
	tasks: tasks,
	events: {
		group: 'terminal',
		shorthands: events.terminal
	}
};