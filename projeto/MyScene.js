var degToRad = Math.PI / 180.0;

var CONTENT_SPACING = 0.01;

var FRONT_WALL_DIVISIONS = 30;
var PROJECTION_WIDTH = 6.0;
var PROJECTION_HEIGHT = 4.0;
var PROJECTION_DIVISIONS = 50;
var PROJECTION_SPACING = 0.35;

var LEFT_WALL_DIVISIONS = 30;
var WINDOW_DIVISIONS = 15;

var FLOOR_DIVISIONS = 25;
var CARPET_DIVISIONS = 10;
var MAP_DIVISIONS = 5;
var PAPER_DIVISIONS = 3;
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

    //this.axis = new CGFaxis(this);

    // Enables Textures
    this.enableTextures(true);

    // Materials
    this.materialDefault = new CGFappearance(this);

    /** Floor and related Appearances **/
    this.floorAppearance = new CGFappearance(this);
    this.floorAppearance.setAmbient(0.5, 0.5, 0.5, 1);
    this.floorAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
    this.floorAppearance.setSpecular(0.15, 0.15, 0.15, 1);
    this.floorAppearance.setShininess(2.5);
    this.floorAppearance.loadTexture('resources/images/floor.jpg');
    this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');

    this.robotAppearances = new Array(2);
    this.robotAppearances.push(
        {
            head: {
                tetaDivisions: 10,
                phiDivisions: 10,
                appearance: this.robotHeadAppearance0,
                minS: 0,
                maxS: 2,
                minT: 0,
                maxT: 2
            },
            body: {
                slices: 10,
                stacks: 10,
                baseAppearance: this.robotBodyBaseAppearance0,
                lateralFacesAppearance: this.robotBodyLateralFacesAppearance0,
                minBaseS: 0,
                maxBaseS: 2,
                minBaseT: 0,
                maxBaseT: 2,
                minLateralFacesS: 0,
                maxLateralFacesS: 3,
                minLateralFacesT: 0,
                maxLateralFacesT: 3
            },
            arms: {
                slices: 10,
                stacks: 10,
                baseAppearance: this.robotArmsBaseAppearance0,
                lateralFacesAppearance: this.robotArmsLateralFacesAppearance0,
                minBaseS: 0,
                maxBaseS: 2,
                minBaseT: 0,
                maxBaseT: 2,
                minLateralFacesS: 0,
                maxLateralFacesS: 3,
                minLateralFacesT: 0,
                maxLateralFacesT: 3
            },
            wheels: {
                slices: 10,
                stacks: 10,
                baseAppearance: this.robotWheelsFirstBaseAppearance0,
                lateralFacesAppearance: this.robotWheelsLateralFacesAppearance0,
                minBaseS: 0,
                maxBaseS: 2,
                mindBaseT: 0,
                maxBaseT: 2,
                minLateralFacesS: 0,
                maxLateralFacesS: 3,
                minLateralFacesT: 0,
                maxLateralFacesT: 3
            }
        }
    );
    this.robotAppearances.push(
        {
            head: {
                tetaDivisions: 10,
                phiDivisions: 10,
                appearance: this.robotHeadAppearance1,
                minS: 0,
                maxS: 2,
                minT: 0,
                maxT: 2
            },
            body: {
                slices: 10,
                stacks: 10,
                baseAppearance: this.robotBodyBaseAppearance1,
                lateralFacesAppearance: this.robotBodyLateralFacesAppearance1,
                minBaseS: 0,
                maxBaseS: 2,
                minBaseT: 0,
                maxBaseT: 2,
                minLateralFacesS: 0,
                maxLateralFacesS: 3,
                minLateralFacesT: 0,
                maxLateralFacesT: 3
            },
            arms: {
                slices: 10,
                stacks: 10,
                baseAppearance: this.robotArmsBaseAppearance1,
                lateralFacesAppearance: this.robotArmsLateralFacesAppearance1,
                minBaseS: 0,
                maxBaseS: 2,
                minBaseT: 0,
                maxBaseT: 2,
                minLateralFacesS: 0,
                maxLateralFacesS: 3,
                minLateralFacesT: 0,
                maxLateralFacesT: 3
            },
            wheels: {
                slices: 10,
                stacks: 10,
                baseAppearance: this.robotLegsFirstBaseAppearance1,
                lateralFacesAppearance: this.robotLegsLateralFacesAppearance1,
                minBaseS: 0,
                maxBaseS: 2,
                mindBaseT: 0,
                maxBaseT: 2,
                minLateralFacesS: 0,
                maxLateralFacesS: 3,
                minLateralFacesT: 0,
                maxLateralFacesT: 3
            }
        }
    );

    this.carpetAppearance = new CGFappearance(this);
    this.carpetAppearance.setAmbient(0.5, 0.5, 0.5, 1);
    this.carpetAppearance.setDiffuse(0.25, 0.25, 0.25, 1);
    this.carpetAppearance.setSpecular(0, 0, 0, 1);
    this.carpetAppearance.setShininess(1);
    this.carpetAppearance.loadTexture('resources/images/carpetTexture.jpg');
    this.carpetAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        /** Garbage Bin and Column **/
        this.columnLateralAppearance = new CGFappearance(this);
        this.columnLateralAppearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.columnLateralAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
        this.columnLateralAppearance.setSpecular(0.15, 0.15, 0.15, 1);
        this.columnLateralAppearance.setShininess(5);
        this.columnLateralAppearance.loadTexture('resources/images/columnLateralTexture.jpg');
        this.columnLateralAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.columnBasesAppearance = new CGFappearance(this);
        this.columnBasesAppearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.columnBasesAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
        this.columnBasesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.columnBasesAppearance.setShininess(5);
        this.columnBasesAppearance.loadTexture('resources/images/columnBaseTexture.jpg');
        this.columnBasesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.garbageBinAppearance = new CGFappearance(this);
        this.garbageBinAppearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.garbageBinAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
        this.garbageBinAppearance.setSpecular(0.3, 0.3, 0.3, 1);
        this.garbageBinAppearance.setShininess(30);
        this.garbageBinAppearance.loadTexture('resources/images/garbageBinTexture.jpg');
        /** End of Garbage Bin and Column **/

        this.mapAppearance = new CGFappearance(this);
        this.mapAppearance.setAmbient(0.6, 0.6, 0.6, 1);
        this.mapAppearance.setDiffuse(0.35, 0.35, 0.35, 1);
        this.mapAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.mapAppearance.setShininess(1);
        this.mapAppearance.loadTexture('resources/images/mapTexture.jpg');
        this.mapAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.paperAppearance = new CGFappearance(this);
        this.paperAppearance.setAmbient(0.6, 0.6, 0.6, 1);
        this.paperAppearance.setDiffuse(0.35, 0.35, 0.35, 1);
        this.paperAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.paperAppearance.setShininess(1);
        this.paperAppearance.loadTexture('resources/images/paperTexture.jpg');
        this.paperAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        /** Tables and Chairs Appearances **/
        this.tableTopAppearance = new CGFappearance(this);
        this.tableTopAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tableTopAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.tableTopAppearance.setShininess(1);
        this.tableTopAppearance.loadTexture('resources/images/table.png');
        this.tableTopAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.chairEncostoAppearance = new CGFappearance(this);
        this.chairEncostoAppearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.chairEncostoAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.chairEncostoAppearance.setSpecular(0, 0, 0, 1);
        this.chairEncostoAppearance.setShininess(1);
        this.chairEncostoAppearance.loadTexture('resources/images/chairEncostoTexture.jpg');

        this.chairTampoAppearance = new CGFappearance(this);
        this.chairTampoAppearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.chairTampoAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.chairTampoAppearance.setSpecular(0, 0, 0, 1);
        this.chairTampoAppearance.setShininess(1);
        this.chairTampoAppearance.loadTexture('resources/images/chairTampoTexture.jpg');

        this.pernasAppearance = new CGFappearance(this);
        this.pernasAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
        this.pernasAppearance.setSpecular(0.4, 0.4, 0.4, 1);
        this.pernasAppearance.setShininess(60);
        this.pernasAppearance.loadTexture('resources/images/chairPernasTexture.jpg');
        /** End of Tables and Chairs Appearances**/
    /** End of Floor and related Appearances **/

    this.wallDownAppearance = new CGFappearance(this);
    this.wallDownAppearance.setAmbient(0.7, 0.7, 0.7, 1);
    this.wallDownAppearance.setDiffuse(0.5, 0.5, 0.5, 1);
    this.wallDownAppearance.setSpecular(0.3, 0.3, 0.3, 1);
    this.wallDownAppearance.setShininess(60);
    this.wallDownAppearance.loadTexture('resources/images/wallDownTexture.jpg');
    this.wallDownAppearance.setTextureWrap('REPEAT', 'REPEAT');

    /** Front Wall and related Appearances **/
    this.frontWallUpAppearance = new CGFappearance(this);
    this.frontWallUpAppearance.setAmbient(0.7, 0.7, 0.7, 1);
    this.frontWallUpAppearance.setDiffuse(0.4, 0.4, 0.4, 1);
    this.frontWallUpAppearance.setSpecular(0.3, 0.3, 0.3, 1);
    this.frontWallUpAppearance.setShininess(60);
    this.frontWallUpAppearance.loadTexture('resources/images/frontWallUpTexture.jpg');
    this.frontWallUpAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.slideProjectionAppearance = new CGFappearance(this);
    this.slideProjectionAppearance.setDiffuse(0.99, 0.99, 0.99, 1);
    this.slideProjectionAppearance.setSpecular(0.25, 0.25, 0.25, 1);
    this.slideProjectionAppearance.setShininess(5);
    this.slideProjectionAppearance.loadTexture('resources/images/slideProjection.png');
    this.slideProjectionAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.cgraProjectionAppearance = new CGFappearance(this);
    this.cgraProjectionAppearance.setDiffuse(0.99, 0.99, 0.99, 1);
    this.cgraProjectionAppearance.setSpecular(0.25, 0.25, 0.25, 1);
    this.cgraProjectionAppearance.setShininess(5);
    this.cgraProjectionAppearance.loadTexture('resources/images/cgraProjection.png');
    this.cgraProjectionAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.clockAppearance = new CGFappearance(this);
    this.clockAppearance.setDiffuse(0.99, 0.99, 0.99, 1);
    this.clockAppearance.setSpecular(0.35, 0.35, 0.35, 1);
    this.clockAppearance.setShininess(5);
    this.clockAppearance.loadTexture('resources/images/clock.png');
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
    this.leftWallUpAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.leftWallUpAppearance.setDiffuse(0.4, 0.4, 0.4, 1);
    this.leftWallUpAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.leftWallUpAppearance.setShininess(5);
    this.leftWallUpAppearance.loadTexture('resources/images/leftWallUpTexture.jpg');
    this.leftWallUpAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.leftWallWindowAppearance = new CGFappearance(this);
    this.leftWallWindowAppearance.setAmbient(0.2, 0.2, 0.2, 1);
    this.leftWallWindowAppearance.setDiffuse(0.4, 0.4, 0.4, 1);
    this.leftWallWindowAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.leftWallWindowAppearance.setShininess(10);
    this.leftWallWindowAppearance.loadTexture('resources/images/window.png');
    this.leftWallWindowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

    this.lampAppearance = new CGFappearance(this);
    this.lampAppearance.setAmbient(0.55, 0.55, 0.55, 1);
    this.lampAppearance.setDiffuse(0.4, 0.4, 0.4, 1);
    this.lampAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.lampAppearance.setShininess(120);
    this.lampAppearance.loadTexture('resources/images/lampSurfaceTexture.jpg');
    this.lampAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    /** End of Left Wall and related Appearances **/

    // Scene elements
    this.table = new MyTable(this,
                             this.tableTopAppearance, this.pernasAppearance,
                             TABLE_TOP_DIVISIONS, TABLE_LEGS_DIVISIONS);
    this.floor = new Plane(this, FLOOR_DIVISIONS, 0, 4, 0, 4);
    this.leftWallWindow = new Plane(this, LEFT_WALL_DIVISIONS);
    this.frontWallUp = new Plane(this, FRONT_WALL_DIVISIONS);
    this.leftWallUp = new Plane(this, LEFT_WALL_DIVISIONS);
    this.wallDown = new Plane(this, LEFT_WALL_DIVISIONS, 0, 4, 0, 1);
    this.slideProjection = new Plane(this, PROJECTION_DIVISIONS);
    this.cgraProjection = new Plane(this, PROJECTION_DIVISIONS);
    this.lamp = new MyLamp(this, SPHERE_TETA_DIVISIONS, SPHERE_PHI_DIVISIONS, this.lampAppearance);
    this.column = new MyCylinder(this, CYLINDER_SLICES, CYLINDER_STACKS,
                                   this.columnBasesAppearance, undefined, this.columnLateralAppearance);
    this.garbageBin = new MyCylinder(this, CYLINDER_SLICES, CYLINDER_STACKS,
                                   this.garbageBinAppearance);
    this.chair = new MyChair(this,
                             this.chairEncostoAppearance, this.chairTampoAppearance, this.pernasAppearance,
                             CHAIR_ENCOSTO_DIVISIONS, CHAIR_TAMPO_DIVISIONS, CHAIR_LEGS_DIVISIONS
                            );
    this.clock = new MyClock(this, this.clockAppearance,
                             this.hourHandApperance, this.minuteHandAppearance, this.secondHandAppearance, this.materialDefault, this.clockAppearance, this.materialDefault);

    this.carpet = new Plane(this, CARPET_DIVISIONS);
    this.map = new Plane(this, MAP_DIVISIONS);
    this.paper = new Plane(this, PAPER_DIVISIONS);

    // Robot
    this.robot = new MyRobot(this, this.robotAppearances[0]);
    this.robotSpeed = 1;

    // Lights state
    this.frontRightLightOn = true;
    this.frontLeftLightOn = true;
    this.backRightLightOn = true;
    this.backLeftLightOn = true;

    // Clock state
    this.clockOn = true;

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
    this.toggleLights();
    this.robot.setSpeed(this.robotSpeed);
    if (this.clockOn) {
        if (!this.previousClockOn && (typeof this.previousClockOn !== 'undefined')) {
            this.previousClockOn = true;
            this.clock.resume();
        }
        this.clock.update(currTime);
    }
};

MyScene.prototype.pauseResumeClock = function() {
    if (this.clockOn) {
        this.clockOn = false;
        this.previousClockOn = true;
    } else {
        this.clockOn = true;
        this.previousClockOn = false;
    }
};

MyScene.prototype.toggleLights = function() {

    if (this.frontLeftLightOn) {
        this.lights[0].enable();
    } else {
        this.lights[0].disable();
    }

    if (this.frontRightLightOn) {
        this.lights[1].enable();
    } else {
        this.lights[1].disable();
    }

    if (this.backRightLightOn) {
        this.lights[2].enable();
    } else {
        this.lights[2].disable();
    }

    if (this.backLeftLightOn) {
        this.lights[3].enable();
    } else {
        this.lights[3].disable();
    }

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
    //this.axis.display();

    // ---- END Background, camera and axis setup


    // ---- BEGIN Geometric transformation section

    // ---- END Geometric transformation section


    // ---- BEGIN Primitive drawing section

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
            this.wallDownAppearance.apply();
            this.wallDown.display();
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
            this.wallDownAppearance.apply();
            this.wallDown.display();
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

        // The Floor
        this.pushMatrix();
            this.rotate(-90 * degToRad, 1, 0, 0);
            this.scale(15, 15, 0.2);
            this.floorAppearance.apply();
            this.floor.display();
        this.popMatrix();

        this.translate(0, CONTENT_SPACING, 0);

        // The robot
        this.pushMatrix();
            this.materialDefault.apply();
            this.robot.display();
        this.popMatrix();

        // The carpet
        this.pushMatrix();
            this.carpetAppearance.apply();
            this.translate(0, 0, -3);
            this.scale(8, 1, 4);
            this.rotate(Math.PI / 2, -1, 0, 0);
            this.carpet.display();
        this.popMatrix();

        // The cylinders
        this.pushMatrix();
            this.translate(0, 0, 6.5);
            // The garbage bin
            this.pushMatrix();
                this.translate(-6.5, 0.75, 0);
                this.scale(0.6, 1.5, 0.6);
                this.rotate(Math.PI / 2, 1, 0, 0);
                this.garbageBin.display();
            this.popMatrix();
            // The column
            this.pushMatrix();
                this.translate(6.5, 4, 0);
                this.scale(0.8, 8, 0.8);
                this.rotate(Math.PI / 2, 1, 0, 0);
                this.column.display();
            this.popMatrix();
        this.popMatrix();

        // The Lamp
        this.pushMatrix();
            this.translate(0, 8 - 1.2, 0);
            this.scale(1.2, 1.2, 1.2);
            this.lamp.display();
        this.popMatrix();

        // First Table And Chair

        this.translate(0, 0, TABLE_SPACING_FROM_CENTER);

        var centerOnProjection = (PROJECTION_WIDTH - 5) / 2;
        this.pushMatrix();
            this.translate(-2.5 - PROJECTION_SPACING - centerOnProjection, 0, 0);

            /* Objects on table */
            this.pushMatrix();
                this.translate(0, 3.8 + CONTENT_SPACING, 0);
                this.pushMatrix();
                    this.scale(3, 1, 1.9);
                    this.rotate(Math.PI / 2, -1, 0, 0);
                    this.mapAppearance.apply();
                    this.map.display();
                this.popMatrix();
            this.popMatrix();
            /* End of Objects on table */

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

            /* Objects on table */
            this.pushMatrix();
                this.translate(0, 3.8 + CONTENT_SPACING, 0);
                this.pushMatrix();
                this.translate(0, 0, 0.6);
                    this.scale(1.2, 1, 1.6);
                    this.rotate(Math.PI / 2, -1, 0, 0);
                    this.paperAppearance.apply();
                    this.paper.display();
                this.popMatrix();
            this.popMatrix();

            /* End of Objects on table */
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
