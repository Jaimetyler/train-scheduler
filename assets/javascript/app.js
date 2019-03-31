console.log("I'm here!")

//initializing firebase
var config = {
    apiKey: "AIzaSyDMwbivMeY11oaq111n6B3yLM1BcxLZjG8",
    authDomain: "train-scheduler-743bd.firebaseapp.com",
    databaseURL: "https://train-scheduler-743bd.firebaseio.com",
    projectId: "train-scheduler-743bd",
    storageBucket: "train-scheduler-743bd.appspot.com",
    messagingSenderId: "958326611486"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //creating variables to be stored in database
  var trainName = "";
  var destination = "";
  var frequency = 0;
  var firstTrainTime = 0;

  //click event that will add the user's input to the database
  $("#add-train").on("click", function(){
    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    firstTrainTime = $("#frequency-input").val().trim();
    
    //push data to firebase
    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firebase.database.ServerValue.TIMESTAMP
    })
 
  })

