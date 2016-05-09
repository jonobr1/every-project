
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var json = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/projects.json')));

_.each(json.timeline, function(project, i) {
  project.id = i;
});

fs.writeFileSync(path.resolve(__dirname, '../data/projects-formatted.json'), JSON.stringify(json));

console.log('Finished formating');