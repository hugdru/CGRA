/**
 * MyClock
 * @constructor
 */
function MyClock(scene, clockAppearance, hourHandAppearance, minuteHandAppearance, secondHandAppearance, firstBaseAppearance, secondBaseAppearance, lateralFacesAppearance) {
    CGFobject.call(this, scene);

    this.clockAppearance = clockAppearance;
    this.hourHandAppearance = hourHandAppearance;
    this.minuteHandAppearance = minuteHandAppearance;
    this.secondHandAppearance = secondHandAppearance;

    this.cylinder = new MyCylinder(this.scene, 12, 1, firstBaseAppearance, secondBaseAppearance, lateralFacesAppearance);
    this.hourHand = new MyClockHand(this.scene, 0.050, 0.50, 90);
    this.minuteHand = new MyClockHand(this.scene, 0.035, 0.80, 180);
    this.secondHand = new MyClockHand(this.scene, 0.010, 0.85, 210);

    this.clockDegreeStepSecondsMinutes = 6;
    this.clockDegreeStepHour = 30;
}

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.update = function(currTime) {
    if (typeof this.setStartingTime == 'undefined') {
        this.setStartingTime = currTime;
    } else {
        var diffTime = currTime - this.setStartingTime;

        var seconds = diffTime / 1000 * 100;
        this.secondHand.setAngle(Math.round(seconds) * this.clockDegreeStepSecondsMinutes);

        var minutes = seconds / 60;
        this.minuteHand.setAngle(minutes * this.clockDegreeStepSecondsMinutes);

        var hours = minutes / 60;
        this.hourHand.setAngle(hours * this.clockDegreeStepHour);

    }
};

MyClock.prototype.display = function() {

    if (typeof this.clockAppearance !== 'undefined') this.clockAppearance.apply();
    this.cylinder.display();
    this.scene.pushMatrix();
        if (typeof this.hourHandAppearance !== 'undefined') this.hourHandAppearance.apply();
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.51);
            this.hourHand.display();
        this.scene.popMatrix();
        if (typeof this.minuteHandAppearance !== 'undefined') this.minuteHandAppearance.apply();
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.53);
            this.minuteHand.display();
        this.scene.popMatrix();
        if (typeof this.secondHandAppearance !== 'undefined') this.secondHandAppearance.apply();
        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.55);
            this.secondHand.display();
        this.scene.popMatrix();
    this.scene.popMatrix();
};
