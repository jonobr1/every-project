/**
 * Generate initial JSON 
 */

var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var filenames = fs.readdirSync(path.resolve(__dirname, '../images/'));

var data = _.map(filenames, function(filename, i) {

  var date = filename
    .match(/^[0-9]*\-[0-9]*\-/i)[0].replace(/\-?$/, '').split('-');

  return {
    id: i,
    year: parseInt(date[0]),
    month: parseInt(date[1]),
    url: filename,
    type: filename.match(/\.([a-zA-Z]*)$/i)[1]
  };

});

fs.writeFileSync(path.resolve(__dirname, '../data/base.json'), JSON.stringify(data));

console.log('Created base.json');

