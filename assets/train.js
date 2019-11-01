var Config = {
    apiKey: "AIzaSyDi_ILcaJwV3D7dnuMzA9MvO2XL_1p1u6Q",
    authDomain: "train-schedule-8331a.firebaseapp.com",
    databaseURL: "https://train-schedule-8331a.firebaseio.com",
    projectId: "train-schedule-8331a",
    storageBucket: "train-schedule-8331a.appspot.com",
    messagingSenderId: "143576722746",
    appId: "1:143576722746:web:3daee1aba32c8f14673403"
  };

  firebase.initializeApp(Config);

  var database = firebase.database();
  
var trainName = "";
var destination= "";
var frequency= 0;
var nextArrival= "";
var minutesAway = 0;
//  SUBMIT THE INPUT INFORMATION
$(".btn").on("click", function(event){
    event.preventDefault();

    var trainName1 = $("#trainInput").val();
    var destination1 = $("#destinationInput").val();
    var firstTime = $("#firstTrainTimeInput").val();
    var tFrequency = $("#frequencyInput").val();
   
   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
   console.log(firstTimeConverted);

    var currentTime = moment();

    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // NEW ROW IN THE DOM OF SCHEDULE
    var newRow = $("<tr>");
    var trainNameTd = $("<td>").text(trainName1);
    var destinationTd = $("<td>").text(destination1);
    var frequencyTd = $("<td>").text(tFrequency);
    var arrivalTd = $("<td>").text(nextTrain);
    var minAway = $("<td>").text(tMinutesTillTrain);

    newRow.append(trainNameTd, destinationTd, frequencyTd, arrivalTd, minAway);
    $("tbody").append(newRow);

    // EMPTYS THE INPUT FIELD AFTER SUBMIT BUTTON CLICKED
    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");
   
    database.ref().set({
        trainName: trainName1,
        destination: destination1,
        frequency: tFrequency,
        nextArrival: nextTrain,
        minutesAway: tMinutesTillTrain,
    })
})



