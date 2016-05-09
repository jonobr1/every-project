(function() {

  var root = this;
  var previousLabel = root.Label || {};
  var geometry = new THREE.PlaneGeometry(25, 25, 1, 1);

  var Label = root.Label = function(message) {

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = canvas.height = 512;
    ctx.font = '72px Nuvo Pro, sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'center';
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 10;

    ctx.strokeText(message, canvas.width / 2, canvas.height / 2);
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);

    this.texture = new THREE.Texture(canvas);
    this.texture.needsUpdate = true;

    var material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true
    });

    THREE.Mesh.call(this, geometry, material);

    this.destination = {
      scale: new THREE.Vector3(1, 1, 1),
      position: new THREE.Vector3().copy(OFFSCREEN)
    };

    Label.elements.push(this);

  };

  Label.prototype = Object.create(THREE.Mesh.prototype);
  Label.prototype.constructor = THREE.Mesh;

  Label.elements = [];
  Label.hide = function() {

    var elements = Label.elements;

    for (var i = 0; i < elements.length; i++) {
      var label = elements[i];
      label.destination.position.copy(OFFSCREEN);
    }

    return Label;

  };

})();