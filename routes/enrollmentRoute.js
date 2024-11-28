const express = require('express');
const router = express.Router();
const { childInfoModel, parentInfoModel, medicalInfoModel } = require('../models/enrollment');

// GET all students listing
router.get('/', async (req, res) => {
  try {
    const [childInfo, parentInfo, medicalInfo] = await Promise.all([
      childInfoModel.find(),
      parentInfoModel.find(),
      medicalInfoModel.find()
    ]);

    res.status(200).send({
      status: 200,
      message: "Child Enrollment Data Fetched Successfully!",
      data: { childInfo, parentInfo, medicalInfo }
    });

  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Unable to fetch the child enrollment data",
      error: err.message
    });
  }
});

// POST new student data
router.post('/add', async (req, res) => {
  try {
    const { childInfo, parentInfo, medicalInfo } = req.body;

    if (!childInfo || !parentInfo || !medicalInfo) {
      return res.status(400).send({
        status: 400,
        message: 'Missing required data for childInfo, parentInfo or medicalInfo.'
      });
    }

    const childInfoObj = new childInfoModel(childInfo);
    const parentInfoObj = new parentInfoModel(parentInfo);
    const medicalInfoObj = new medicalInfoModel(medicalInfo);

    const savedChildInfo = await childInfoObj.save();
    const savedParentInfo = await parentInfoObj.save();
    const savedMedicalInfo = await medicalInfoObj.save();

    res.status(200).send({
      status: 200,
      message: 'Child, Parent, Medical Information added successfully',
      childInfo: savedChildInfo,
      parentInfo: savedParentInfo,
      medicalInfo: savedMedicalInfo
    });

  } catch (err) {
    res.status(500).send({
      status: 500,
      message: 'Unable to add a new child',
      error: err.message
    });
  }
});

// PUT /update logic
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { childInfo, parentInfo, medicalInfo } = req.body;

  try {
    const updatedChildInfo = await childInfoModel.findByIdAndUpdate(id, childInfo, { new: true });
    const updatedParentInfo = await parentInfoModel.findByIdAndUpdate(id, parentInfo, { new: true });
    const updatedMedicalInfo = await medicalInfoModel.findByIdAndUpdate(id, medicalInfo, { new: true });

    if (!updatedChildInfo || !updatedParentInfo || !updatedMedicalInfo) {
      return res.status(404).send({
        status: 404,
        message: 'Student not found or could not be updated'
      });
    }

    res.status(200).send({
      status: 200,
      message: 'Student updated successfully',
      childInfo: updatedChildInfo,
      parentInfo: updatedParentInfo,
      medicalInfo: updatedMedicalInfo
    });

  } catch (err) {
    res.status(500).send({
      status: 500,
      message: 'Unable to update student',
      error: err.message
    });
  }
});

// DELETE /delete logic
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedChildInfo = await childInfoModel.findByIdAndDelete(id);
    const deletedParentInfo = await parentInfoModel.findByIdAndDelete(id);
    const deletedMedicalInfo = await medicalInfoModel.findByIdAndDelete(id);

    if (!deletedChildInfo || !deletedParentInfo || !deletedMedicalInfo) {
      return res.status(404).send({
        status: 404,
        message: 'Student not found or could not be deleted'
      });
    }

    res.status(200).send({
      status: 200,
      message: 'Student deleted successfully'
    });

  } catch (err) {
    res.status(500).send({
      status: 500,
      message: 'Unable to delete student',
      error: err.message
    });
  }
});

module.exports = router;
