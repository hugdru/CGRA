var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.floor = new MyQuad(this, 0.0, 10.0, 0.0, 12.0);
	this.leftWall = new MyQuad(this, -1.5, 2.5, -0.55, 1.55);
	this.wall = new Plane(this);
	this.boardA = new Plane(this, BOARD_WIDTH, BOARD_HEIGHT, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_WIDTH, BOARD_HEIGHT, BOARD_B_DIVISIONS);

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(0.3,0.3,0.3,1);
	this.materialWall.setDiffuse(0.4784,0.0784,0.0784,1);
	this.materialWall.setSpecular(0,0.2,0.8,1);
	this.materialWall.setShininess(120);
	
	this.materialFloor = new CGFappearance(this);
	this.materialFloor.setAmbient(0.3,0.3,0.3,1);
	this.materialFloor.setDiffuse(0,0.2,0.4,1);
	this.materialFloor.setSpecular(0.2,0.2,0.2,1);
	this.materialFloor.setShininess(50);

	this.materialTableLegs = new CGFappearance(this);
	this.materialTableLegs.setAmbient(0.3,0.3,0.3,1);
	this.materialTableLegs.setDiffuse(0.8784,0.8745,0.8588,1);
	this.materialTableLegs.setSpecular(0.9,0.9,0.9,1);
	this.materialTableLegs.setShininess(200);

	this.materialTableBoard = new CGFappearance(this);
	this.materialTableBoard.setAmbient(0.3,0.3,0.3,1);
	this.materialTableBoard.setDiffuse(0.4,0.2,0,1);
	this.materialTableBoard.setSpecular(0.1,0.1,0.1,1);
	this.materialTableBoard.setShininess(80);

	// Enables Textures
	this.enableTextures(true);

	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.loadTexture("resources/images/table.png");
	this.tableAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.tableAppearance.setSpecular(0.2, 0.2, 0.2, 1);	
	this.tableAppearance.setShininess(30);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("resources/images/floor.png");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture("resources/images/slides.png");
	this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);	
	this.slidesAppearance.setShininess(30);
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("resources/images/board.png");
	this.boardAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.boardAppearance.setSpecular(0.5, 0.5, 0.5, 1);	
	this.boardAppearance.setShininess(120);
	this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0,1.0);

	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6, 1, 1);
	this.lights[2].setPosition(7.5, 4, 7.5, 1.0);
	this.lights[3].setPosition(0.5, 4, 7.5, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setSpecular(1.0,1.0,0.0,1.0);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].setLinearAttenuation(1.0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].enable();
	
	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);

		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);

		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);

		this.materialWall.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display(this.materialTableLegs,this.tableAppearance);
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display(this.materialTableLegs,this.tableAppearance);
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// ---- END Primitive drawing section

	this.shader.unbind();
};
