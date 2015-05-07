/**
 * MyInterface
 * @constructor
 */

function MyInterface() {
    //call CGFinterface constructor
    CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a button:
    // the first parameter is the object that is being controlled (in this case the scene)
    // the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
    // e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

    //this.gui.add(this.scene, 'doSomething');

    // add a group of controls (and open/expand by defult)

    //var group = this.gui.addFolder('Options');
    //group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    //group.add(this.scene, 'option1');
    //group.add(this.scene, 'option2');

    // add a slider
    // must be a numeric variable of the scene, initialized in scene.init e.g.
    // this.speed=3;
    // min and max values can be specified as parameters

    //this.gui.add(this.scene, 'speed', -5, 5);

    // Pause / Resume clock button
    var pauseClockString = 'Pause Clock';
    var resumeClockString = 'Resume Clock';
    var clockStateButton = this.gui.add(this.scene, 'pauseResumeClock');
    clockStateButton.clockActive = true;
    clockStateButton.name(pauseClockString).onChange(
        function() {

            console.log(this);
            console.log(pauseClockString);
            console.log(resumeClockString);

            if (this.clockActive) {
                this.name(resumeClockString);
                this.clockActive = false;
            } else {
                this.name(pauseClockString);
                this.clockActive = true;
            }
        }
    );

    // Lights check boxes
    var lightsGroup = this.gui.addFolder('Lights');
    lightsGroup.open();

    lightsGroup.add(this.scene, 'frontLeftLightOn').name('Front Left');
    lightsGroup.add(this.scene, 'frontRightLightOn').name('Front Right');
    lightsGroup.add(this.scene, 'backRightLightOn').name('Back Right');
    lightsGroup.add(this.scene, 'backLeftLightOn').name('Back Left');

    return true;
};

/**
 * processKeyboard
 * @param {Event} event
 */
MyInterface.prototype.processKeyboard = function(event) {
    // call CGFinterface default code (omit if you want to override)
    //CGFinterface.prototype.processKeyboard.call(this, event);

    // Check key codes e.g. here: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    // or use String.fromCharCode(event.keyCode) to compare chars

    // for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
    // w, s, a, d
    switch (event.which || event.keyCode) {
        case (119):
            this.scene.robot.moveForwards();
            break;
        case (115):
            this.scene.robot.moveBackwards();
            break;
        case (97):
            this.scene.robot.rotateCounterClockWise();
            break;
        case (100):
            this.scene.robot.rotateClockWise();
            break;
    }
};

