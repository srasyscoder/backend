const mongoose = require('mongoose');

// Child Info Schema
const childInfoSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dob: { type: Date, required: true },
  pob: { type: String, required: false }
});

// Parent Info Schema
const parentInfoSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
  relationship: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  phonetype: { type: String, required: true },
  phonenumber: { type: String, required: true },
  emailid: { type: String, required: true, match: /.+\@.+\..+/ } // Email validation
});

// Medical Info Schema
const medicalInfoSchema = mongoose.Schema({
  physicianInfo: {
    physicianname: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    phonetype: { type: String, required: true },
    phonenumber: { type: String, required: true }
  },
  carefacilityInfo: {
    carefacilityname: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    phonenumber: { type: String, required: true }
  }
});

// Models for each collection
const childInfoModel = mongoose.model('ChildInfo', childInfoSchema);
const parentInfoModel = mongoose.model('ParentInfo', parentInfoSchema);
const medicalInfoModel = mongoose.model('MedicalInfo', medicalInfoSchema);

module.exports = { childInfoModel, parentInfoModel, medicalInfoModel };
