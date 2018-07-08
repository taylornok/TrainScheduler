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

        //Grab values entered in forms
        name = $("#nameInput").val().trim();
        destination = $("#destInput").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        frequency = parseInt 
        ($("#frequency").val().trim());
  
        database.ref().push({
          name: name,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency,
        });
  
    });
    


    database.ref().on("child_added", function(childSnapshot) {

      console.log(childSnapshot.val());
      var name = (childSnapshot.val().name);
      var destination = (childSnapshot.val().destination);
      var firstTrain = (childSnapshot.val().firstTrain);
      var frequency = (childSnapshot.val().frequency);

      var initTrain = firstTrain;
      var tFrequency = frequency;

      // First Time (pushed back 1 year to make sure it comes before current time)
      var initTrainConvert = moment(firstTrain, "HH:mm").subtract(1, "years");
      console.log(initTrainConvert);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(initTrainConvert), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))


      //Add everythin to the html
      var row = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
        $("<td>").text(tMinutesTillTrain)
      );


      $("tbody").append(row);
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });




  });