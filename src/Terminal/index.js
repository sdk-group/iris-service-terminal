'use strict'

let events = {
	terminal: {}
};

let tasks = [];


module.exports = {
	module: require('./terminal.js'),
	name: 'terminal',
	permissions: [],
	exposed: true,
	tasks: tasks,
	events: {
		group: 'terminal',
		shorthands: events.terminal
	}
};