var degToRad = Math.PI / 180.0;

var FRONT_WALL_DIVISIONS = 30;
var PROJECTION_WIDTH = 6.0;
var PROJECTION_HEIGHT = 4.0;
var PROJECTION_DIVISIONS = 50;
var PROJECTION_SPACING = 0.35;

var LEFT_WALL_DIVISIONS = 30;
var WINDOW_DIVISIONS = 15;

var FLOOR_DIVISIONS = 25;
var TABLE_SPACING_FROM_CENTER = 3.5;
var TABLE_TOP_DIVISIONS = 15;
var TABLE_LEGS_DIVISIONS = 5;
var CHAIR_ENCOSTO_DIVISIONS = 10;
var CHAIR_TAMPO_DIVISIONS = 7;
var CHAIR_LEGS_DIVISIONS = 5;

var CYLINDER_SLICES = 8;
var CYLINDER_STACKS = 20;

var SPHERE_TETA_DIVISIONS = 8;
var SPHERE_PHI_DIVISIONS = 20;

function MyScene() {
    CGFscene.call(this);
}

MyScene.prototype = Object.create(CGFscene.prototype);
MyScene.prototype.constructor = MyScene;

MyScene.prototype.init = function(application) {
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

    /** Floor and related Appearances **/
    this.floorAppearance = new CGFappearance(this);
    this.floorAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.floorAppearance.setDiffuse(0, 0.2, 0.4, 1);
    this.floorAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.floorAppearance.setShininess(50);
    this.floorAppearance.loadTexture('resources/images/floor.jpg');
    /** End of Floor and related Appearances **/

    /** Tables and Chairs Appearances**/
    this.tableTopAppearance = new CGFappearance(this);
    this.tableTopAppearance.loadTexture('resources/images/table.png');
    this.tableTopAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.tableTopAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.tableTopAppearance.setShininess(30);

    this.chairEncostoAppearance = new CGFappearance(this);
    this.chairEncostoAppearance.loadTexture('resources/images/chairEncostoTexture.jpg');
    this.chairEncostoAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.chairEncostoAppearance.setDiffuse(0.8784, 0.8745, 0.8588, 1);
    this.chairEncostoAppearance.setSpecular(0.9, 0.9, 0.9, 1);
    this.chairEncostoAppearance.setShininess(200);

    this.chairTampoAppearance = new CGFappearance(this);
    this.chairTampoAppearance.loadTexture('resources/images/chairTampoTexture.jpg');
    this.chairTampoAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.chairTampoAppearance.setDiffuse(0.8784, 0.8745, 0.8588, 1);
    this.chairTampoAppearance.setSpecular(0.9, 0.9, 0.9, 1);
    this.chairTampoAppearance.setShininess(200);

    this.pernasAppearance = new CGFappearance(this);
    this.pernasAppearance.loadTexture('resources/images/chairPernasTexture.jpg');
    this.pernasAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.pernasAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.pernasAppearance.setShininess(30);
    /** End of Tables and Chairs Appearances**/

    /** Front Wall and related Appearances **/
    this.frontWallUpAppearance = new CGFappearance(this);
    this.frontWallUpAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.frontWallUpAppearance.setDiffuse(0.4784, 0.0784, 0.0784, 1);
    this.frontWallUpAppearance.setSpecular(0, 0.2, 0.8, 1);
    this.frontWallUpAppearance.setShininess(120);
    this.frontWallUpAppearance.loadTexture('resources/images/vintage_27.jpg');

    this.frontWallDownAppearance = new CGFappearance(this);
    this.frontWallDownAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.frontWallDownAppearance.setDiffuse(0.4784, 0.0784, 0.0784, 1);
    this.frontWallDownAppearance.setSpecular(0, 0.2, 0.8, 1);
    this.frontWallDownAppearance.setShininess(120);
    this.frontWallDownAppearance.loadTexture('resources/images/floor.jpg');
    this.frontWallDownAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.slideProjectionAppearance = new CGFappearance(this);
    this.slideProjectionAppearance.loadTexture('resources/images/slideProjection.png');
    this.slideProjectionAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
    this.slideProjectionAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.slideProjectionAppearance.setShininess(30);
    this.slideProjectionAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.cgraProjectionAppearance = new CGFappearance(this);
    this.cgraProjectionAppearance.loadTexture('resources/images/cgraProjection.png');
    this.cgraProjectionAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.cgraProjectionAppearance.setSpecular(0.5, 0.5, 0.5, 1);
    this.cgraProjectionAppearance.setShininess(120);
    this.cgraProjectionAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

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
    /** End of Front Wall and related Appearances **/

    /** Left Wall and related Appearances **/
    this.leftWallUpAppearance = new CGFappearance(this);
    this.leftWallUpAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.leftWallUpAppearance.setDiffuse(0.4784, 0.0784, 0.0784, 1);
    this.leftWallUpAppearance.setSpecular(0, 0.2, 0.8, 1);
    this.leftWallUpAppearance.setShininess(120);
    this.leftWallUpAppearance.loadTexture('resources/images/leftWallUpTexture.jpg');
    this.leftWallUpAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.leftWallDownAppearance = new CGFappearance(this);
    this.leftWallDownAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.leftWallDownAppearance.setDiffuse(0.4784, 0.0784, 0.0784, 1);
    this.leftWallDownAppearance.setSpecular(0, 0.2, 0.8, 1);
    this.leftWallDownAppearance.setShininess(120);
    this.leftWallDownAppearance.loadTexture('resources/images/leftWallDownTexture.jpg');
    this.leftWallDownAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.leftWallWindowAppearance = new CGFappearance(this);
    this.leftWallWindowAppearance.loadTexture('resources/images/window.png');
    this.leftWallWindowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    /** End of Left Wall and related Appearances **/

    // Scene elements
    this.table = new MyTable(this,
                             this.tableTopAppearance, this.pernasAppearance,
                             TABLE_TOP_DIVISIONS, TABLE_LEGS_DIVISIONS);
    this.floor = new Plane(this, FLOOR_DIVISIONS, 0, 4, 0, 4);
    this.leftWallWindow = new Plane(this, LEFT_WALL_DIVISIONS);
    this.frontWallUp = new Plane(this, FRONT_WALL_DIVISIONS, 0, 1, 0, 1);
    this.frontWallDown = new Plane(this, FRONT_WALL_DIVISIONS, 0, 5, 0, 7);
    this.leftWallUp = new Plane(this, LEFT_WALL_DIVISIONS, 0, 1, 0, 1);
    this.leftWallDown = new Plane(this, LEFT_WALL_DIVISIONS, 0, 4, 0, 1);
    this.slideProjection = new Plane(this, PROJECTION_DIVISIONS, 0, 1, 0, 1);
    this.cgraProjection = new Plane(this, PROJECTION_DIVISIONS, 0, 1, 0, 1);
    this.lamp = new MyLamp(this, SPHERE_TETA_DIVISIONS, SPHERE_PHI_DIVISIONS, 0, 7, 0, 7);
    this.column = new MyCylinder(this, CYLINDER_SLICES, CYLINDER_STACKS,
                                   this.floorAppearance, this.floorAppearance, this.floorAppearance);
    this.chair = new MyChair(this,
                             this.chairEncostoAppearance, this.chairTampoAppearance, this.pernasAppearance,
                             CHAIR_ENCOSTO_DIVISIONS, CHAIR_TAMPO_DIVISIONS, CHAIR_LEGS_DIVISIONS
                            );
    this.clock = new MyClock(this, this.clockAppearance,
                             this.hourHandApperance, this.minuteHandAppearance, this.secondHandAppearance, this.clockAppearance, undefined, undefined);

    this.setUpdatePeriod(100);

};

MyScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

MyScene.prototype.initLights = function() {
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

MyScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
};

MyScene.prototype.update = function(currTime) {
    this.clock.update(currTime);
};


MyScene.prototype.display = function() {
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

    // Cylinder
    this.pushMatrix();
        this.scale(10, 10, 10);
        this.column.display();
    this.popMatrix();

    // The Left Wall and objects on it
    this.pushMatrix();
        this.translate(0, 0, 7.5);

        // The upper wall
        this.pushMatrix();
            this.translate(0, 5, 0);
            this.rotate(90 * degToRad, 0, 1, 0);
            this.scale(15, 6, 0.2);
            this.leftWallUpAppearance.apply();
            this.leftWallUp.display();
        this.popMatrix();

        // The lower wall
        this.pushMatrix();
            this.translate(0, 1, 0);
            this.rotate(90 * degToRad, 0, 1, 0);
            this.scale(15, 2, 0.2);
            this.leftWallDownAppearance.apply();
            this.leftWallDown.display();
        this.popMatrix();

        // The window
        this.pushMatrix();
            this.translate(0.1, 5, 0);
            this.rotate(90 * degToRad, 0, 1, 0);
            this.scale(3.5, 3.5, 1);
            this.leftWallWindowAppearance.apply();
            this.leftWallWindow.display();
        this.popMatrix();
    this.popMatrix();

    // The front wall and objects on it
    this.pushMatrix();
        this.translate(7.5, 0, 0);

        // The upper wall
        this.pushMatrix();
            this.translate(0, 5, 0);
            this.scale(15, 6, 0.2);
            this.frontWallUpAppearance.apply();
            this.frontWallUp.display();
        this.popMatrix();

        // The lower wall
        this.pushMatrix();
            this.translate(0, 1, 0);
            this.scale(15, 2, 0.2);
            this.frontWallDownAppearance.apply();
            this.frontWallDown.display();
        this.popMatrix();

        // The clock
        this.pushMatrix();
            this.translate(0, 8 - 0.7, 0.1 + 0.05);
            this.scale(0.7, 0.7, 0.10);
            this.clock.display();
        this.popMatrix();

        // The slide projection
        this.pushMatrix();
            this.translate(-PROJECTION_WIDTH / 2 - PROJECTION_SPACING, 4.5, 0.2);
            this.scale(PROJECTION_WIDTH, PROJECTION_HEIGHT, 1);
            this.slideProjectionAppearance.apply();
            this.slideProjection.display();
        this.popMatrix();

        // The CGRA projection
        this.pushMatrix();
            this.translate(PROJECTION_WIDTH / 2 + PROJECTION_SPACING, 4.5, 0.2);
            this.scale(PROJECTION_WIDTH, PROJECTION_HEIGHT, 1);
            this.cgraProjectionAppearance.apply();
            this.cgraProjection.display();
        this.popMatrix();
    this.popMatrix();

    // The Floor and objects on it
    this.pushMatrix();
        this.translate(7.5, 0, 7.5);

        // The Lamp
        this.pushMatrix();
            this.translate(0, 8 - 1.2, 0);
            this.scale(1.2, 1.2, 1.2);
            this.floorAppearance.apply();
            this.lamp.display();
        this.popMatrix();

        // The Floor
        this.pushMatrix();
            this.rotate(-90 * degToRad, 1, 0, 0);
            this.scale(15, 15, 0.2);
            this.floorAppearance.apply();
            this.floor.display();
        this.popMatrix();

        // First Table And Chair

        this.translate(0, 0, TABLE_SPACING_FROM_CENTER);

        var centerOnProjection = (PROJECTION_WIDTH - 5) / 2;
        this.pushMatrix();
            this.translate(-2.5 - PROJECTION_SPACING - centerOnProjection, 0, 0);
            this.table.display();

            this.pushMatrix();
                this.translate(0, 0, 1.5);
                this.chair.display();
            this.popMatrix();

            this.rotate(Math.PI, 0, 1, 0);
            this.translate(0, 0, 1.5);
            this.chair.display();
        this.popMatrix();

        // Second Table And Chair
        this.pushMatrix();
            this.translate(2.5 + PROJECTION_SPACING + centerOnProjection, 0, 0);
            this.table.display();

            this.pushMatrix();
                this.translate(0, 0, 1.5);
                this.chair.display();
            this.popMatrix();

            this.rotate(Math.PI, 0, 1, 0);
            this.translate(0, 0, 1.5);
            this.chair.display();
        this.popMatrix();
    this.popMatrix();

    // ---- END Primitive drawing section

    this.shader.unbind();
};
