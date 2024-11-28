const mongoose = require('mongoose');

// Full Time Plan Schema
const fullTimeSchema = mongoose.Schema({
  InfantRoom: { type: Boolean, required: true },
  ToddlerRoom: { type: Boolean, required: true },
  PrimaryRoom: { type: Boolean, required: true }
});

// School Day Plan Schema
const schoolDaySchema = mongoose.Schema({
  InfantRoom: { type: Boolean, required: true },
  ToddlerRoom: { type: Boolean, required: true },
  PrimaryRoom: { type: Boolean, required: true }
});

// Three Day Program Schema
const threeDayProgramSchema = mongoose.Schema({
  InfantRoom: { type: Boolean, required: true },
  ToddlerRoom: { type: Boolean, required: true },
  PrimaryRoom: { type: Boolean, required: true }
});

// Half Day Program Schema
const halfDayProgramSchema = mongoose.Schema({
  ToddlerRoom: { type: Boolean, required: true },
  PrimaryRoom: { type: Boolean, required: true }
});

// Choose Plan Schema with custom validation for selecting only one program
const choosePlanSchema = new mongoose.Schema({
  fullTime: { type: fullTimeSchema },
  schoolDay: { type: schoolDaySchema },
  threeDayProgram: { type: threeDayProgramSchema },
  halfDayProgram: { type: halfDayProgramSchema }
});

// Custom validation to ensure only one program is selected
choosePlanSchema.methods.validateProgramSelection = function() {
  const selectedPrograms = [
    this.fullTime,
    this.schoolDay,
    this.threeDayProgram,
    this.halfDayProgram
  ];

  // Count how many programs have been selected (non-null and non-undefined)
  const selectedCount = selectedPrograms.filter(program => program !== undefined && program !== null).length;

  // Only one program should be selected
  if (selectedCount !== 1) {
    throw new Error('You must select exactly one program.');
  }
};

choosePlanSchema.pre('save', function(next) {
  try {
    this.validateProgramSelection(); // Call custom validation before saving
    next();
  } catch (err) {
    next(err);
  }
});

// Choose Plan Model
const ChoosePlanModel = mongoose.model('ChoosePlan', choosePlanSchema);

module.exports = ChoosePlanModel;
