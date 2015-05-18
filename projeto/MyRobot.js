/**
 * MyRobot
 * @constructor
 */
function MyRobot(scene,
                 headTetaDivisions, headPhiDivisions, bodySlices, bodyStacks, armsSlices, armsStacks, wheelsSlices, wheelsStacks,
                 headAppearance, bodyFirstBaseAppearance, bodySecondBaseAppearance, bodyLateralFacesAppearance,
                 leftArmAppearance, rightArmAppearance, leftWheelAppearance, rightWheelAppearance,
                 minHeadS, maxHeadS, minHeadT, maxHeadT,
                 minBodyFirstBaseS, maxBodyFirstBaseS, minBodyFirstBaseT, maxBodyFirstBaseT,
                 minBodySecondBaseS, maxBodySecondBaseS, minBodySecondBaseT, maxBodySecondBaseT,
                 minBodyLateralFacesS, maxBodyLateralFacesS, minBodyLateralFacesT, maxBodyLateralFacesT,
                 minLeftArmS, maxLeftArmS, minLeftArmT, maxLeftArmT,
                 minRightArmS, maxRightArmS, minRightArmT, maxRightArmT,
                 minLeftWheelS, maxLeftWheelS, minLeftWheelT, maxLeftWheelT,
                 minRightWheelS, maxRightWheelS, minRightWheelT, maxRightWheelT) {
    CGFobject.call(this, scene);

    this.head = new MySemiSphericalSurface(this.scene, headTetaDivisions, headPhiDivisions, headAppearance, minHeadS, maxHeadS, minHeadT, maxHeadT);
    this.body = new MyCylinder(this.scene, bodySlices, bodyStacks,
                    bodyFirstBaseAppearance, bodySecondBaseAppearance, bodyLateralFacesAppearance,
                    minBodyFirstBaseS, maxBodyFirstBaseS, minBodyFirstBaseT, maxBodyFirstBaseT,
                    minBodySecondBaseS, maxBodySecondBaseS, minBodySecondBaseT, maxBodySecondBaseT,
                    minBodyLateralFacesS, maxBodyLateralFacesS, minBodyLateralFacesT, maxBodyLateralFacesT);

    this.leftArm = new MyCylinder(this.scene, armsSlices, armsStacks,
                    leftArmAppearance, minLeftArmS, maxLeftArmS, minLeftArmT, maxLeftArmT,
                    minLeftArmS, maxLeftArmS, minLeftArmT, maxLeftArmT);

    this.rightArm = new MyCylinder(this.scene, armsSlices, armsStacks,
                    rightArmAppearance, minRightArmS, maxRightArmS, minRightArmT, maxRightArmT);

    this.leftWheel = new MyCylinder(this.scene, wheelsSlices, wheelsStacks,
                    leftWheelAppearance, minLeftWheelS, maxLeftWheelS, minLeftWheelT, maxLeftWheelT);

    this.rightWheel = new MyCylinder(this.scene, wheelsSlices, wheelsStacks,
                    rightWheelAppearance, minRightWheelS, maxRightWheelS, minRightWheelT, maxRightWheelT);

    this.translationFromReference = {x: 0, z: 0};
    this.angleFromReference = 0;

    this.movementDifferential = 0.1;
    this.rotationDifferential = Math.PI / 180;

    this.headScale = {x: 1, y: 1, z: 1};
    this.bodyScale = {x: 1, y: 1, z: 1};
    this.armsScale = {x: 0.5, y: 0.15, z: 0.15};
    this.wheelsScale = {x: 0.20, y: 0.50, z: 0.50};

    this.halfHead = {};
    this.halfBody = {};
    this.halfArms = {};
    this.halfWheels = {};
    for (var property in this.headScale) {
        this.halfHead[property] = this.headScale[property] / 2;
        this.halfBody[property] = this.bodyScale[property] / 2;
        this.halfArms[property] = this.armsScale[property] / 2;
        this.halfWheels[property] = this.wheelsScale[property] / 2;
    }
    this.armsInsideBodyDeltaX = this.halfArms.x / 4;
    this.wheelsInsideBodyDeltaX = this.halfBody.x / 2;

    this.speed = 1;
}

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.display = function() {

    this.scene.pushMatrix();

        this.scene.translate(0, this.wheelsScale.y + this.halfBody.y, 0);
        this.scene.pushMatrix();
            this.scene.scale(this.bodyScale.x, this.bodyScale.y, this.bodyScale.z);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.body.display();
        this.scene.popMatrix();
        // Head Area
        this.scene.pushMatrix();
            this.scene.translate(0, this.halfBody.y, 0);
            this.scene.scale(this.headScale.x, this.headScale.y, this.headScale.z);
            this.head.display();
        this.scene.popMatrix();
        // Arms Area
        this.scene.pushMatrix();
            var armsFromCenterX = -this.halfArms.x - this.bodyScale.x + this.armsInsideBodyDeltaX;
            // Left Arm
            this.scene.pushMatrix();
                this.scene.translate(armsFromCenterX, 0, 0);
                this.scene.scale(this.armsScale.x, this.armsScale.y, this.armsScale.z);
                this.scene.rotate(Math.PI / 2, 0, 1, 0);
                this.leftArm.display();
            this.scene.popMatrix();
            // Right Arm
            this.scene.pushMatrix();
                this.scene.translate(-armsFromCenterX, 0, 0);
                this.scene.scale(this.armsScale.x, this.armsScale.y, this.armsScale.z);
                this.scene.rotate(Math.PI / 2, 0, 1, 0);
                this.rightArm.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
        // Wheels Area
        this.scene.pushMatrix();
            // Left Wheel
            var wheelsFromCenterX = -this.bodyScale.x + this.halfWheels.x + this.wheelsInsideBodyDeltaX;
            this.scene.pushMatrix();
                this.scene.translate(wheelsFromCenterX, -this.halfBody.y, 0);
                this.scene.scale(this.wheelsScale.x, this.wheelsScale.y, this.wheelsScale.z);
                this.scene.rotate(Math.PI / 2, 0, 1, 0);
                this.leftWheel.display();
            this.scene.popMatrix();
            // Right Wheel
            this.scene.pushMatrix();
                this.scene.translate(-wheelsFromCenterX, -this.halfBody.y, 0);
                this.scene.scale(this.wheelsScale.x, this.wheelsScale.y, this.wheelsScale.z);
                this.scene.rotate(Math.PI / 2, 0, 1, 0);
                this.rightWheel.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
    this.scene.popMatrix();
};

MyRobot.prototype.moveForwards = function() {
    this.translationFromReference.x += this.speed * this.movementDifferential * Math.sin(this.angleFromReference);
    this.translationFromReference.z += this.speed * this.movementDifferential * Math.cos(this.angleFromReference);
};

MyRobot.prototype.moveBackwards = function() {
    this.translationFromReference.x -= this.speed * this.movementDifferential * Math.sin(this.angleFromReference);
    this.translationFromReference.z -= this.speed * this.movementDifferential * Math.cos(this.angleFromReference);
};

MyRobot.prototype.rotateCounterClockWise = function() {
    this.angleFromReference += this.speed * this.rotationDifferential;
};

MyRobot.prototype.rotateClockWise = function() {
    this.angleFromReference -= this.speed * this.rotationDifferential;
};

MyRobot.prototype.setSpeed = function(speed) {
    this.speed = speed ? speed : 1;
};
