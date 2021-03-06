

$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyDMwbivMeY11oaq111n6B3yLM1BcxLZjG8",
        authDomain: "train-scheduler-743bd.firebaseapp.com",
        databaseURL: "https://train-scheduler-743bd.firebaseio.com",
        projectId: "train-scheduler-743bd",
        storageBucket: "train-scheduler-743bd.appspot.com",
        messagingSenderId: "958326611486"
      };
      firebase.initializeApp(config);

    // A variable to reference the database.
    var database = firebase.database();

    // Variables for the onClick event
    var name;
    var destination;
    var firstTrainTime;
    var frequency = 0;

    $("#add-train").on("click", function() {
        event.preventDefault();
        // Storing and retreiving new train data
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = $("#first-train").val().trim();
        frequency = $("#frequency-input").val().trim();

        var capsName = name.toUpperCase();
        var capsDestination = destination.toUpperCase();

        // Pushing to database
        database.ref().push({
            name: capsName,
            destination: capsDestination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset();
    });

    database.ref().on("child_added", function(childSnapshot) {
        var nextArr;
        var minAway;
        // Chang year so first train comes before now
        var firstTrainNew = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
        // Difference between the current and firstTrainTime
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        var remainder = diffTime % childSnapshot.val().frequency;
        // Minutes until next train
        var minAway = childSnapshot.val().frequency - remainder;
        // Next train time
        var nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        
           
        $(".new-train").append("<tr><td>" + childSnapshot.val().name +
                "</td><td>" + childSnapshot.val().destination +
                "</td><td>" + childSnapshot.val().frequency +
               "</td><td>" + nextTrain + 
               "</td><td>" + minAway + "</td></tr>");
         
         
     
            // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
    });

   
});