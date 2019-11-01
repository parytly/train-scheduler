var Config = {
    apiKey: "AIzaSyDi_ILcaJwV3D7dnuMzA9MvO2XL_1p1u6Q",
    authDomain: "train-schedule-8331a.firebaseapp.com",
    databaseURL: "https://train-schedule-8331a.firebaseio.com",
    projectId: "train-schedule-8331a",
    storageBucket: "train-schedule-8331a.appspot.com",
    messagingSenderId: "143576722746",
    appId: "1:143576722746:web:3daee1aba32c8f14673403"
  };
  console.log("jack")

  firebase.initializeApp(Config);

  var database = firebase.database();

  
  
//  SUBMIT THE INPUT INFORMATION
$(".btn").on("click", function(event){
    event.preventDefault();

    var trainName1 = $("#trainInput").val();
    var destination1 = $("#destinationInput").val();
    var arrival = $("#trainTime").val();
    var frequency1 = $("#frequencyInput").val();
    console.log(trainName1)

    // NEW ROW IN THE DOM OF SCHEDULE
    var newRow = $("<tr>");
    var trainNameTd = $("<td>").text(trainName1);
    var destinationTd = $("<td>").text(destination1);
    var arrivalTd = $("<td>").text(arrival);
    var frequencyTd = $("<td>").text(frequency1);
    
    

    newRow.append(trainNameTd, destinationTd, frequencyTd, arrivalTd,);
    $("tbody").append(newRow);

    // EMPTYS THE INPUT FIELD AFTER SUBMIT BUTTON CLICKED
    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("#trainTime").val("");
    $("#frequencyInput").val("");
  
    var tFrequency = frequency1

    // Time is 3:30 AM
    var firstTime = "03:30";
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

    database.ref().set({
        trainName: trainName1,
        destination: destination1,
        frequency: frequency1,
        nextArrival: arrival,
        minutesAway:0
    });
})



