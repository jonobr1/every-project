
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var json = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/projects.json')));
var statistics = json.schema.statistics;

_.each(json.list, function(project, i) {

  _.each(statistics, function(stat, name) {

    var value = project[name];
    stat.total += value;
    stat.max = Math.max(stat.max, value);
    stat.min = Math.min(stat.min, value);

  });

});

_.each(statistics, function(stat) {

  stat.average = stat.total / json.list.length;

});

fs.writeFileSync(path.resolve(__dirname, '../data/projects-calculated.json'), JSON.stringify(json));

console.log('Finished formating');