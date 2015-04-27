var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var FRONT_WALL_DIVISIONS = 100;
var BOARD_A_DIVISIONS = 100;
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

    // Enables Textures
    this.enableTextures(true);

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.materialA = new CGFappearance(this);
    this.materialA.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialA.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialA.setSpecular(0, 0.2, 0.8, 1);
    this.materialA.setShininess(120);

    this.materialB = new CGFappearance(this);
    this.materialB.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialB.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialB.setSpecular(0.8, 0.8, 0.8, 1);
    this.materialB.setShininess(120);

    this.materialFrontWallUp = new CGFappearance(this);
    this.materialFrontWallUp.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialFrontWallUp.setDiffuse(0.4784, 0.0784, 0.0784, 1);
    this.materialFrontWallUp.setSpecular(0, 0.2, 0.8, 1);
    this.materialFrontWallUp.setShininess(120);
    this.materialFrontWallUp.loadTexture('resources/images/wallUpTexture.png');
    this.materialFrontWallUp.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.materialFrontWallDown = new CGFappearance(this);
    this.materialFrontWallDown.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialFrontWallDown.setDiffuse(0.4784, 0.0784, 0.0784, 1);
    this.materialFrontWallDown.setSpecular(0, 0.2, 0.8, 1);
    this.materialFrontWallDown.setShininess(120);
    this.materialFrontWallDown.loadTexture('resources/images/wallDownTexture.png');
    this.materialFrontWallDown.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.materialFloor = new CGFappearance(this);
    this.materialFloor.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialFloor.setDiffuse(0, 0.2, 0.4, 1);
    this.materialFloor.setSpecular(0.2, 0.2, 0.2, 1);
    this.materialFloor.setShininess(50);

    this.materialTableBoard = new CGFappearance(this);
    this.materialTableBoard.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialTableBoard.setDiffuse(0.4, 0.2, 0, 1);
    this.materialTableBoard.setSpecular(0.1, 0.1, 0.1, 1);
    this.materialTableBoard.setShininess(80);

    this.tableTopAppearance = new CGFappearance(this);
    this.tableTopAppearance.loadTexture('resources/images/table.png');
    this.tableTopAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tableTopAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.tableTopAppearance.setShininess(30);

    this.tableLegsAppearance = new CGFappearance(this);
    this.tableLegsAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.tableLegsAppearance.setDiffuse(0.8784, 0.8745, 0.8588, 1);
    this.tableLegsAppearance.setSpecular(0.9, 0.9, 0.9, 1);
    this.tableLegsAppearance.setShininess(200);

    this.floorAppearance = new CGFappearance(this);
    this.floorAppearance.loadTexture('resources/images/floor.png');

    this.windowAppearance = new CGFappearance(this);
    this.windowAppearance.loadTexture('resources/images/window.png');
    this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.slidesAppearance = new CGFappearance(this);
    this.slidesAppearance.loadTexture('resources/images/slides.png');
    this.slidesAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.slidesAppearance.setShininess(30);
    this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.boardAppearance = new CGFappearance(this);
    this.boardAppearance.loadTexture('resources/images/board.png');
    this.boardAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.boardAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.boardAppearance.setShininess(120);
    this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.clockAppearance = new CGFappearance(this);
    this.clockAppearance.loadTexture('resources/images/clock.png');
    this.clockAppearance.setDiffuse(1, 1, 1, 1);
    this.clockAppearance.setSpecular(0, 0, 0, 1);
    this.clockAppearance.setShininess(1);
    this.clockAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.hourHandApperance = new CGFappearance(this);
    this.hourHandApperance.setDiffuse(0.4, 0.7, 0.7, 1);
    this.hourHandApperance.setSpecular(0, 0, 0, 1);
    this.hourHandApperance.setShininess(1);

    this.minuteHandAppearance = new CGFappearance(this);
    this.minuteHandAppearance.setDiffuse(0.8, 0.8, 0.2, 1);
    this.minuteHandAppearance.setSpecular(0, 0, 0, 1);
    this.minuteHandAppearance.setShininess(1);

    this.secondHandAppearance = new CGFappearance(this);
    this.secondHandAppearance.setDiffuse(0.4, 0.2, 0.1, 1);
    this.secondHandAppearance.setSpecular(0, 0, 0, 1);
    this.secondHandAppearance.setShininess(1);

    // Scene elements
    this.table = new MyTable(this, this.tableTopAppearance, this.tableLegsAppearance);
    this.floor = new MyQuad(this, 0.0, 10.0, 0.0, 12.0);
    this.leftWall = new MyQuad(this, -1.5, 2.5, -0.55, 1.55);
    this.frontWallUp = new Plane(this, BOARD_WIDTH, BOARD_HEIGHT, FRONT_WALL_DIVISIONS);
    this.frontWallDown = new Plane(this, BOARD_WIDTH, BOARD_HEIGHT, FRONT_WALL_DIVISIONS);
    this.boardA = new Plane(this, BOARD_WIDTH, BOARD_HEIGHT, BOARD_A_DIVISIONS);
    this.boardB = new Plane(this, BOARD_WIDTH, BOARD_HEIGHT, BOARD_B_DIVISIONS);
    this.lamp = new MyLamp(this, 8, 20);
    //this.cylinder = new MyCylinder(this, 8, 20);
    this.chair = new MyChair(this, this.tableTopAppearance);
    this.clock = new MyClock(this, this.clockAppearance,
                             this.hourHandApperance, this.minuteHandAppearance, this.secondHandAppearance, this.clockAppearance, undefined, undefined);

    this.setUpdatePeriod(100);

};

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
    this.setGlobalAmbientLight(0, 0, 0, 1.0);

    this.shader.bind();

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[1].setPosition(10.5, 6, 1, 1);
    this.lights[2].setPosition(7.5, 4, 7.5, 1.0);
    this.lights[3].setPosition(0.5, 4, 7.5, 1.0);

    this.lights[0].setAmbient(0.5, 0.5, 0.5, 1);
    this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();

    this.lights[1].setAmbient(0.5, 0.5, 0.5, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();

    this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setConstantAttenuation(0);
    this.lights[2].setQuadraticAttenuation(0);
    this.lights[2].setLinearAttenuation(1.0);
    this.lights[2].enable();

    this.lights[3].setAmbient(0.5, 0.5, 0.5, 1);
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
};

LightingScene.prototype.update = function(currTime) {
    this.clock.update(currTime);
};


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


    // ---- END Background, camera and axis setup


    // ---- BEGIN Geometric transformation section

    // ---- END Geometric transformation section


    // ---- BEGIN Primitive drawing section

    // Clock
    this.pushMatrix();
        this.translate(1 + 6 + 0.25, 8 - 0.7, 0.1 + 0.05);
        this.scale(0.7, 0.7, 0.10);
        this.clock.display();
    this.popMatrix();

    this.materialDefault.apply();
    // MyLamp
    this.pushMatrix();
        this.translate(7.5, 8 - 1.2, 7.5);
        this.scale(1.2, 1.2, 1.2);
        this.lamp.display();
    this.popMatrix();

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

    // The front wall
    this.pushMatrix();
        this.translate(7.5, 6, 0);
        this.scale(15, 4, 0.2);
        this.materialFrontWallUp.apply();
        this.frontWallUp.display();
    this.popMatrix();
    this.pushMatrix();
        this.translate(7.5, 2, 0);
        this.scale(15, 4, 0.2);
        this.materialFrontWallDown.apply();
        this.frontWallDown.display();
    this.popMatrix();

    // First Table And Chair
    this.pushMatrix();
        this.translate(5, 0, 8);
        this.table.display();
        this.translate(0, 0, 1.5);
        this.chair.display();
    this.popMatrix();

    // Second Table And Chair
    this.pushMatrix();
        this.translate(12, 0, 8);
        this.table.display();
        this.translate(0, 0, 1.5);
        this.chair.display();
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
