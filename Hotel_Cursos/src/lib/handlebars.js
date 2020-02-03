const {format} = require('timeago.js');

const helpers = {};

//formato a la fecha
helpers.timeago =(timestamp) => {
    return format(timestamp);
}

module.exports = helpers;