function TPscene() {
    CGFscene.call(this);
}

TPscene.prototype = Object.create(CGFscene.prototype);
TPscene.prototype.constructor = TPscene;

TPscene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);
    this.table = new MyTable(this);
    this.floor = new MyFloor(this);
};

TPscene.prototype.initLights = function() {

    this.shader.bind();

    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 0.5, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.shader.unbind();
};

TPscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(0, 0, 25), vec3.fromValues(0, 0, 0));
};

TPscene.prototype.setDefaultAppearance = function() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
};

TPscene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup
    this.shader.bind();

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    this.axis.display();

    this.setDefaultAppearance();

    // ---- END Background, camera and axis setup

    this.translate(4, 0.05, 3); // (8, 0.1, 3)/2
    this.floor.display();
    this.translate(0, 1.80, 0); // (_, 3.50/2 + 0.1/2, _)
    this.table.display();

    this.shader.unbind();
};
