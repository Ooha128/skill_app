const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("CodingQuestions");
  db_connect
    .collection("qsns")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb("CodingQuestions");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("qsns")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    qsnId: req.body.qsnId,
    title: req.body.title,
    difficulty: req.body.difficulty,
    description: req.body.description,
    inputFormat: req.body.inputFormat,
    outputFormat: req.body.outputFormat,
    SampleInput: req.body.SampleInput,
    SampleOutput: req.body.SampleOutput,
    testCases: req.body.testCases
  };
  db_connect.collection("qsns").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("CodingQuestions");
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
    qsnId: req.body.qsnId,
    title: req.body.title,
    difficulty: req.body.difficulty,
    description: req.body.description,
    inputFormat: req.body.inputFormat,
    outputFormat: req.body.outputFormat,
    SampleInput: req.body.SampleInput,
    SampleOutput: req.body.SampleOutput,
    testCases: req.body.testCases
    },
  };
  db_connect
    .collection("qsns")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("qsns").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

// This section will help you get a list of all the contests.
recordRoutes.route("/contests").get(function (req, res) {
  let db_connect = dbo.getDb("CodingQuestions");
  db_connect
    .collection("contests")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single contest by id
recordRoutes.route("/contests/:id").get(function (req, res) {
  let db_connect = dbo.getDb("CodingQuestions");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("contests")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/contests/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    code: req.body.code,
    name: req.body.name,
    startDate: req.body.startDate,
    startTime: req.body.startTime,
    endDate: req.body.endDate,
    endTime: req.body.endTime,
    organizationName: req.body.organizationName
  };
  db_connect.collection("contests").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/contests/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("CodingQuestions");
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      code: req.body.code,
      name: req.body.name,
      startDate: req.body.startDate,
      startTime: req.body.startTime,
      endDate: req.body.endDate,
      endTime: req.body.endTime,
      organizationName: req.body.organizationName
    },
  };
  db_connect
    .collection("contests")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/contests/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("contests").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});
module.exports = recordRoutes;
