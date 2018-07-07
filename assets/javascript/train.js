var config = {
  apiKey: "AIzaSyAYxJeMd7VkjPgg0wsTvgGKJZbs0L43OaM",
  authDomain: "trainarrivals-6bcbc.firebaseapp.com",
  databaseURL: "https://trainarrivals-6bcbc.firebaseio.com",
  projectId: "trainarrivals-6bcbc",
  storageBucket: "trainarrivals-6bcbc.appspot.com",
  messagingSenderId: "103887691460"
};
firebase.initializeApp(config);



  var database = firebase.database();

  $(document).ready(function() {

    $("#submit").on("click", function(event) {
        event.preventDefault();
  
        name = $("#nameInput").val().trim();
        destination = $("#destInput").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        frequency = $("#frequency").val().trim();
  
        database.ref().push({
          name: name,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency,
        });
  
    });
    
    var startTime = moment(startTime, "HH:mm").subtract(1, "years");
    console.log(start);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(startTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var timeTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + timeTillTrain);

    // Next Train
    var nextTrain = moment().add(timeTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));  

    database.ref().on("child_added", function(childSnapshot) {

      console.log(childSnapshot.val());
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrain);
      console.log(childSnapshot.val().frequency);

      var startTime = changeDateToSec(childSnapshot.val().firstTrain);
      var currTime = new Date(childSnapshot.val().dateAdded);
      
      var nextTrain = monthDiff(startTime, currDate);

      console.log(monthsLapsed);

      var row = $("<tr>");
      row.append(`<td>${childSnapshot.val().name}`);
      row.append(`<td>${childSnapshot.val().destination}`);
      row.append(`<td>${childSnapshot.val().frequency}`)
      row.append(`<td>${nextTrain}`);
      row.append(`<td>${timeTillTrain}`);


      $("tbody").append(row);
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });




  });