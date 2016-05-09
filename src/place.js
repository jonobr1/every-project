(function() {

  var root = this;
  var previousPlace = root.Place || {};

  var Place = root.Place = {

    elements: [],

    distance: 50,

    register: function(mesh) {

      Place.elements.push(mesh);
      return Place;

    },

    grid: function(name) {

      Label.hide();

      var amount = this.elements.length;
      var height = 4 * Place.distance * Math.tan(camera.fov);
      var width = camera.aspect * height;
      var margin = width / 12;

      var w = width - margin * 2;
      var h = height - margin * 2;

      var cols = 10;
      var rows = Math.ceil(amount / cols);

      for (var i = 0; i < amount; i++) {

        var mesh = this.elements[i];
        var col = i % cols;
        var row = Math.floor(i / cols);
        var forward = !!(row % 2);

        var cp = col / (cols - 1);
        var rp = row / (rows - 1);

        if (!forward) {
          cp = 1 - cp;
        }

        var x = w * cp + camera.position.x - width / 2 + margin + Math.random() - 0.5;
        var y = h * rp + camera.position.y - height / 2 + margin + Math.random() - 0.5;
        var z = camera.position.z - Place.distance;

        var s = 0.3, schema, value, minScale = 0.1;

        if (name) {
          schema = data.schema.statistics[name];
          value = mesh.data[name];
          s = (value - schema.min) / (schema.max - schema.min);
          s *= (1 - minScale);
          s += minScale;
        }

        mesh.destination.position.set(x, y, z);
        mesh.destination.scale.x = mesh.aspect * s;
        mesh.destination.scale.y = s;

      }

      return Place;

    },

    categorically: function(name) {

      Label.hide();

      var amount = this.elements.length;
      var r = Place.distance * Math.tan(camera.fov);
      var d = 1.5 * r;

      var amp = r * 0.66;

      var dimension = data.dimensions[name];
      var schema = data.schema.dimensions[name];
      var skip = Math.floor(Math.random() * schema.length);

      for (var i = 0, l = schema.length; i < l; i++) {

        var property = schema[i];
        var pct = i / l;
        var rad = 2 * Math.PI * pct;
        var projects = dimension[property];

        var ox = camera.position.x, oy = camera.position.y;

        if (l <= 2 || i !== skip) {
          ox += d * Math.cos(rad);
          oy += d * Math.sin(rad);
        }
        var oz = camera.position.z - Place.distance;

        dimension[property].label.destination
          .position.set(ox, oy, oz + 10);

        for (var j = 0, m = projects.length; j < m; j++) {

          var project = projects[j];
          var mesh = project.mesh;
          var n = j / m;
          var t = 2 * Math.PI * n;
          var a = 1.5 * Math.random() * d * m / amount;

          var x = a * Math.cos(t) + ox;
          var y = a * Math.sin(t) + oy;
          var z = oz + (Math.random() - 0.5);
          var s = 0.4;

          mesh.destination.position.set(x, y, z);
          mesh.destination.scale.x = mesh.aspect * s;
          mesh.destination.scale.y = s;

        }

      }

      return Place;


    },

    randomly: function() {

      Label.hide();

      for (var i = 0; i < Place.elements.length; i++) {

        var mesh = Place.elements[i];

        mesh.destination.position.set(
          2 * (Math.random() - 0.5),
          2 * (Math.random() - 0.5),
          2 * (Math.random() - 0.5)
        );
        mesh.destination.position.setLength(Math.random() * 950 + 50);
        mesh.destination.scale.x = mesh.aspect;
        mesh.destination.scale.y = 1;

      }

      return Place;

    }

  };

})();