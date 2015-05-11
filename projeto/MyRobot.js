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

    this.speed = 1;
}

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.display = function() {

    this.scene.pushMatrix();
        this.scene.scale(5, 5, 5);
        //this.head.display();
        this.body.display();
        //this.leftArm.display();
        //this.rightArm.display();
        //this.leftWheel.display();
        //this.rightWheel.display();
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
