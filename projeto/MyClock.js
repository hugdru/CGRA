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

    this.clockDegreeStepSecondsMinutes = 6;
    this.clockDegreeStepHour = 30;

    this.getCurrentTime();

    this.cylinder = new MyCylinder(this.scene, 12, 1, firstBaseAppearance, secondBaseAppearance, lateralFacesAppearance);
    this.hourHand = new MyClockHand(this.scene, 0.050, 0.50, this.referenceHours * this.clockDegreeStepHour);
    this.minuteHand = new MyClockHand(this.scene, 0.035, 0.80, this.referenceMinutes * this.clockDegreeStepSecondsMinutes);
    this.secondHand = new MyClockHand(this.scene, 0.010, 0.85, this.referenceSeconds * this.clockDegreeStepSecondsMinutes);

    this.referenceSystemTime = Date.now();
}

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.update = function(currentSystemTime) {

    var diffTime = currentSystemTime - this.referenceSystemTime;

    var seconds = diffTime / 1000;
    this.secondHand.setAngle(Math.round(this.referenceSeconds + seconds) * this.clockDegreeStepSecondsMinutes);

    var minutes = seconds / 60;
    this.minuteHand.setAngle((this.referenceMinutes + minutes) * this.clockDegreeStepSecondsMinutes);

    var hours = minutes / 60;
    this.hourHand.setAngle((this.referenceHours + hours) * this.clockDegreeStepHour);
};

MyClock.prototype.getCurrentTime = function() {
    var date = new Date();

    this.referenceSeconds = date.getSeconds();
    this.referenceMinutes = date.getMinutes() + this.referenceSeconds * (1 / 60);
    this.referenceHours = date.getHours() + this.referenceMinutes * (1 / 60);
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

MyClock.prototype.resume = function() {

    this.referenceSeconds = this.secondHand.getAngle() / this.clockDegreeStepSecondsMinutes;
    this.referenceMinutes = this.minuteHand.getAngle() / this.clockDegreeStepSecondsMinutes;
    this.referenceHours = this.hourHand.getAngle() / this.clockDegreeStepHour;

    this.referenceSystemTime = Date.now();
};
