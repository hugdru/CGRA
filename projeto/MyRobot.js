/**
 * MyRobot
 * @constructor
 */
function MyRobot(scene, robotAppearanceList) {
    CGFobject.call(this, scene);

    this.head = new MySemiSphericalSurface(
        this.scene,
        robotAppearanceList.head.tetaDivisions, robotAppearanceList.head.phiDivisions, robotAppearanceList.head.appearance,
        robotAppearanceList.head.minS, robotAppearanceList.head.maxS, robotAppearanceList.head.minT, robotAppearanceList.head.maxT);

    this.body = new MyCylinder(
        this.scene,
        robotAppearanceList.body.slices, robotAppearanceList.body.stacks,
        robotAppearanceList.body.baseAppearance, undefined, robotAppearanceList.body.lateralFacesAppearance,
        robotAppearanceList.body.minBaseS, robotAppearanceList.body.maxBaseS, robotAppearanceList.body.minBaseT, robotAppearanceList.body.maxBaseT,
        robotAppearanceList.body.minBaseS, robotAppearanceList.body.maxBaseS, robotAppearanceList.body.minBaseT, robotAppearanceList.body.maxBaseT,
        robotAppearanceList.body.minLateralFacesS, robotAppearanceList.body.maxLateralFacesS, robotAppearanceList.body.minLateralFacesT, robotAppearanceList.body.maxLateralFacesT);


    this.leftArm = new MyCylinder(
        this.scene, robotAppearanceList.arms.slices, robotAppearanceList.arms.stacks,
        robotAppearanceList.arms.baseAppearance, undefined, robotAppearanceList.arms.lateralFacesAppearance,
        robotAppearanceList.arms.minBaseS, robotAppearanceList.arms.maxBaseS, robotAppearanceList.arms.minBaseT, robotAppearanceList.arms.maxBaseT,
        robotAppearanceList.arms.minBaseS, robotAppearanceList.arms.maxBaseS, robotAppearanceList.arms.minBaseT, robotAppearanceList.arms.maxBaseT,
        robotAppearanceList.arms.minLateralFacesS, robotAppearanceList.arms.maxLateralFacesS, robotAppearanceList.arms.minLateralFacesT, robotAppearanceList.arms.maxLateralFacesT);

    this.rightArm = this.leftArm;

    this.leftWheel = new MyCylinder(
        this.scene, robotAppearanceList.wheels.slices, robotAppearanceList.wheels.stacks,
        robotAppearanceList.wheels.baseAppearance, undefined, robotAppearanceList.wheels.lateralFacesAppearance,
        robotAppearanceList.wheels.minBaseS, robotAppearanceList.wheels.maxBaseS, robotAppearanceList.wheels.minBaseT, robotAppearanceList.wheels.maxBaseT,
        robotAppearanceList.wheels.minBaseS, robotAppearanceList.wheels.maxBaseS, robotAppearanceList.wheels.minBaseT, robotAppearanceList.wheels.maxBaseT,
        robotAppearanceList.wheels.minLateralFacesS, robotAppearanceList.wheels.maxLateralFacesS, robotAppearanceList.wheels.minLateralFacesT, robotAppearanceList.wheels.maxLateralFacesT);

    this.rightWheel = this.leftWheel;

    this.headScale = {x: 1, y: 1, z: 1};
    this.bodyScale = {x: 1, y: 1, z: 1};
    this.armsScale = {x: 0.15, y: 0.5, z: 0.15};
    this.wheelsScale = {x: 0.20, y: 0.50, z: 0.50};

    this.halfBody = {};
    this.halfArms = {};
    this.halfWheels = {};
    for (var property in this.headScale) {
        this.halfBody[property] = this.bodyScale[property] / 2;
        this.halfArms[property] = this.armsScale[property] / 2;
        this.halfWheels[property] = this.wheelsScale[property] / 2;
    }
    this.armsInsideBodyDeltaX = this.halfArms.x / 4;
    this.wheelsInsideBodyDeltaX = this.halfBody.x / 2;

    // Robot Simple Movement
    this.translationFromReference = {x: 0, z: 0};
    this.angleFromReference = 0;
    this.movementDifferential = 0.1;
    this.rotationDifferential = (Math.PI / 180) * 2;
    this.wheelsRotation = {left: 0, right: 0};
    this.speed = 1;

    // Robot Arms Animation
    this.armsSwingRotation = 0;
    this.armsSwingIncrementorSign = -1;
    this.armsMaxSwingRotation = Math.PI / 4;
    this.armsSwingRotationStep = 0.1;

    // SayHi Animation
    this.angleSayHiMaxElevation = Math.PI / 1.4;
    this.angleDiffSayHiElevation = 0.2;
    this.angleSayHiMaxSpan = Math.PI / 5;
    this.angleDiffSayHiSpan = 0.3;
}

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.display = function() {

    this.scene.pushMatrix();

        /** Simple Movement of the Robot**/
        this.scene.translate(this.translationFromReference.x, 0, this.translationFromReference.z);
        this.scene.rotate(this.angleFromReference, 0, 1, 0);
        /** End of Simple Movement of the Robot**/

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
            var armsFromCenterX = -this.armsScale.x - this.bodyScale.x;
            // Right Arm
            this.scene.pushMatrix();
                this.scene.translate(armsFromCenterX, 0, 0);
                if (this.sayHiOn) {
                    this.sayHi();
                    this.scene.rotate(this.armsSwingRotationSaved, 1, 0, 0);
                } else {
                    this.scene.rotate(this.armsSwingRotation, 1, 0, 0);
                }
                this.scene.translate(0, -this.halfArms.y, 0);
                this.scene.scale(this.armsScale.x, this.armsScale.y, this.armsScale.z);
                this.scene.rotate(Math.PI / 2, 1, 0, 0);
                this.leftArm.display();
            this.scene.popMatrix();
            // Left Arm
            this.scene.pushMatrix();
                this.scene.translate(-armsFromCenterX, 0, 0);
                this.scene.rotate(-this.armsSwingRotation, 1, 0, 0);
                this.scene.translate(0, -this.halfArms.y, 0);
                this.scene.scale(this.armsScale.x, this.armsScale.y, this.armsScale.z);
                this.scene.rotate(Math.PI / 2, 1, 0, 0);
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
                this.scene.rotate(this.wheelsRotation.left, 1, 0, 0);
                this.scene.rotate(Math.PI / 2, 0, 1, 0);
                this.leftWheel.display();
            this.scene.popMatrix();
            // Right Wheel
            this.scene.pushMatrix();
                this.scene.translate(-wheelsFromCenterX, -this.halfBody.y, 0);
                this.scene.scale(this.wheelsScale.x, this.wheelsScale.y, this.wheelsScale.z);
                this.scene.rotate(this.wheelsRotation.right, 1, 0, 0);
                this.scene.rotate(Math.PI / 2, 0, 1, 0);
                this.rightWheel.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
    this.scene.popMatrix();
};

MyRobot.prototype.moveForwards = function() {

    // Robot Simple Movement
    var arc = this.movementDifferential * this.speed;

    this.translationFromReference.x += arc * Math.sin(this.angleFromReference);
    this.translationFromReference.z += arc * Math.cos(this.angleFromReference);

    this.wheelsRotation.left += arc; // arc / 1 ~= teta
    this.wheelsRotation.right += arc;

    this.armsSwing(false);

    this.lastLinearMoveWasForwards__ = true;
};

MyRobot.prototype.moveBackwards = function() {

    // Robot Simple Movement
    var arc = this.movementDifferential * this.speed;

    this.translationFromReference.x -= arc * Math.sin(this.angleFromReference);
    this.translationFromReference.z -= arc * Math.cos(this.angleFromReference);

    this.wheelsRotation.left -= arc;
    this.wheelsRotation.right -= arc;

    this.armsSwing(true);

    this.lastLinearMoveWasForwards__ = false;
};

MyRobot.prototype.rotateCounterClockWise = function() {

    this.angleFromReference += this.speed * this.rotationDifferential;

    var wheelsRads = this.rotationDifferential * this.speed;

    this.wheelsRotation.left += wheelsRads;
    this.wheelsRotation.right -= wheelsRads;
};

MyRobot.prototype.rotateClockWise = function() {
    this.angleFromReference -= this.speed * this.rotationDifferential;

    var wheelsRads = this.rotationDifferential * this.speed;

    this.wheelsRotation.left -= wheelsRads;
    this.wheelsRotation.right += wheelsRads;
};

MyRobot.prototype.setSpeed = function(speed) {
    this.speed = speed ? speed : 1;
};

MyRobot.prototype.setAppearance = function(appearancesList) {
    this.head.setAppearance(appearancesList.head.appearance);
    this.body.setAppearance(appearancesList.body.baseAppearance, undefined, appearancesList.body.lateralFacesAppearance);
    this.leftArm.setAppearance(appearancesList.arms.baseAppearance, undefined, appearancesList.arms.lateralFacesAppearance);
    this.leftWheel.setAppearance(appearancesList.wheels.baseAppearance, undefined, appearancesList.wheels.lateralFacesAppearance);
};

MyRobot.prototype.armsSwing = function(backwards) {

    if (this.armsSwingRotation <= -this.armsMaxSwingRotation) {
        this.armsSwingIncrementorSign = 1;
    } else if (this.armsSwingRotation >= this.armsMaxSwingRotation) {
        this.armsSwingIncrementorSign = -1;
    }
    if (this.lastLinearMoveWasForwards__ && backwards) {
        this.armsSwingIncrementorSign *= -1;
    }
    this.armsSwingRotation += this.armsSwingRotationStep * this.speed * this.armsSwingIncrementorSign;
};

MyRobot.prototype.enableSayHi = function() {

    if (this.sayHiOn) return;

    this.sayHiOn = true;

    this.armsSwingRotationSaved = this.armsSwingRotation;

    this.sayHiState = 0;
    this.sayHiStateHiN = 0;

    this.angleSayHiElevation = 0;

    this.angleSayHiSpan = 0;
};

MyRobot.prototype.update = function() {
    if (this.sayHiOn) this.sayHiParemeters();
};

MyRobot.prototype.sayHiParemeters = function() {
    switch (this.sayHiState) {
        case 0:
            this.angleSayHiElevation += this.angleDiffSayHiElevation;
            if (this.angleSayHiElevation >= this.angleSayHiMaxElevation) {
                this.sayHiState = 1;
            }
            break;
        case 1:
            if (this.sayHiStateHiN == 4) {
                this.sayHiState = 3;
                break;
            }

            this.angleSayHiSpan -= this.angleDiffSayHiSpan;
            if (this.angleSayHiSpan <= -this.angleSayHiMaxSpan) {
                this.sayHiState = 2;
            }
            break;
        case 2:
            this.angleSayHiSpan += this.angleDiffSayHiSpan;
            if (this.angleSayHiSpan >= this.angleSayHiMaxSpan) {
                this.sayHiState = 1;
                ++this.sayHiStateHiN;
            }
            break;
        case 3:
            this.angleSayHiElevation -= this.angleDiffSayHiElevation;
            if (this.angleSayHiElevation <= this.angleSayHiMaxSpan) {
                this.sayHiOn = false;
            }
            break;
    }
};

MyRobot.prototype.sayHi = function() {
    this.scene.rotate(this.angleSayHiSpan, 0, 0, 1);
    this.scene.rotate(this.angleSayHiElevation, 0, 0, -1);
};
