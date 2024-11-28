const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const choosePlanModel = require('../models/chooseplan');

/* GET all chosen plans */
router.get('/', async function(req, res, next) {
  try {
    const choosePlans = await choosePlanModel.find();

    res.status(200).send({
      status: 200,
      message: "Chosen Plans fetched successfully",
      data: choosePlans
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: "Unable to fetch choose plan data",
      error: err.message
    });
  }
});

/* Create a new choose plan */
router.post('/add', async (req, res, next) => {
  try {
    const { fullTime, schoolDay, threeDayProgram, halfDayProgram } = req.body;

    if (!fullTime || !schoolDay || !threeDayProgram || !halfDayProgram) {
      return res.status(400).send({
        status: 400,
        message: 'Missing required fields in the request body'
      });
    }

    const choosePlanObj = new choosePlanModel({
      fullTime,
      schoolDay,
      threeDayProgram,
      halfDayProgram
    });

    const savedChoosePlan = await choosePlanObj.save();

    res.status(200).send({
      status: 200,
      message: 'Fulltime, SchoolDay, ThreeDay, HalfDay program information added successfully',
      choosePlan: savedChoosePlan
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: 'Unable to add a new choose plan',
      error: err.message
    });
  }
});

/* Update an existing choose plan */
router.put('/update/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedChoosePlan = await choosePlanModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedChoosePlan) {
      return res.status(404).send({
        status: 404,
        message: 'Choose plan not found'
      });
    }

    res.status(200).send({
      status: 200,
      message: 'Choose plan updated successfully',
      choosePlan: updatedChoosePlan
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: 'Unable to update choose plan',
      error: err.message
    });
  }
});

/* Delete an existing choose plan */
router.delete('/delete/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedChoosePlan = await choosePlanModel.findByIdAndDelete(id);

    if (!deletedChoosePlan) {
      return res.status(404).send({
        status: 404,
        message: 'Choose plan not found'
      });
    }

    res.status(200).send({
      status: 200,
      message: 'Choose plan deleted successfully'
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: 'Unable to delete choose plan',
      error: err.message
    });
  }
});

/* Search for a choose plan */
router.get('/search', async (req, res, next) => {
  try {
    const searchCriteria = req.query;

    const choosePlans = await choosePlanModel.find(searchCriteria);

    res.status(200).send({
      status: 200,
      message: 'Choose plans fetched successfully',
      data: choosePlans
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      message: 'Unable to search for choose plans',
      error: err.message
    });
  }
});

module.exports = router;
