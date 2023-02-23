module.exports = {
	name: 'err',
	execute(err) {
		console.error(`Error ocurred with databse: \n${err}`);
	},
};
