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
$("#add-train").on("click", function () {
  event.preventDefault();
  trainName = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  firstTrainTime = $("#first-train").val().trim();

  //?????????????????????why cant i conole.log() here???????? All user unput is getting pushed to firebase just fine, so not sure why its not working//
  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(firstTrainTime);
  ////////////////???????????????????????????????????????/////////////////////
  var trainNameCaps = trainName.toUpperCase();
  var destinationCaps = destination.toUpperCase();

  //push data to firebase
  database.ref().push({
    trainName: trainNameCaps,
    destination: destinationCaps,
    frequency: frequency,
    firstTrainTime: firebase.database.ServerValue.TIMESTAMP
    //dateAdded: firebase.database.ServerValue.TIMESTAMP
  })
})

database.ref().on("child_added", function (snapshot) {
  //var sv = snapshot.val();


  var convertedTrainTime = moment(snapshot.val(), firstTrainTime, "HH:mm").subtract(1, "years");
  //console.log("convertedTime" + convertedTrainTime);
  // console.log(sv.trainName);
  // console.log(sv.destination);
  // console.log(sv.frequency);
  //console.log(sv.firstTrainTime);

  var currentTime = moment();



  function appendTable() {

  }



  $(".new-train").append(appendTable)
},
  function (errorObject) {
    console.log("errors handled: " + errorObject.code);
  }
)