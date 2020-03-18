// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// Adds custom directory
require("customjs/location")

import 'leaflet'
import 'bootstrap'
import '../stylesheets/application'

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// Should be used to get user's current location  
//  window.alerty = function(){
//    //alert("COMENZAMOS")  
//   
//  }





 // optns ={
   //   enableHighAccuracy: false, // Do not use GPS as it will drain the battery
   //   timeout: 5000, // Will respond with an error after 5 seconds of no successful geolocation
   //   maximumAge: 0 // will not use cached results
   // }



console.log("Location JS loaded");

// Should be used to get user's current location  
//  window.alerty = function(){
//    //alert("COMENZAMOS")  
//   
//  }
let options
// Set User's current Location
window.myLocation = function(){

  var watchID = null

  if(navigator.geolocation) {
    options ={
     enableHighAccuracy: false, // Do not use GPS as it will drain the battery
     timeout: 30000, // Will respond with an error after 5 seconds of no successful geolocation
     maximumAge: 0 // will not use cached results
   }
  
    var watchID = navigator.geolocation.watchPosition(coordinates, error, options)

  }
  
  function coordinates(position) {
    console.log(position) // can be delted

    // Get Latitude and Longitude
    const nav_lat = position.coords.latitude,
          nav_lng = position.coords.longitude;

    document.getElementById('latitude').textContent =  nav_lat
    document.getElementById('longitude').textContent =  nav_lng

    console.log(nav_lat)
    console.log(nav_lng)

    console.log("(Lat - Lng): " + convertDMS(nav_lat, nav_lng));
    document.getElementById('latlng').textContent = convertDMS(nav_lat, nav_lng);

    map.setView([nav_lat, nav_lng], map.getZoom() ? map.getZoom() : 17);
    //var marker = L.marker([nav_lat,  nav_lng]).addTo(map)
    marker.setLatLng([nav_lat, nav_lng]);
 
  }

  function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  }
}


  $('anotherButton').click(function() {
    location.reload();
  });

// // Functions that listen for click on start/stop Buttons and orquestrate the app
  $(function() {    
    let intervalID 
    let count = 0  // can be REMOVED

    var startButton = document.getElementById('startButton');
    //Adds event listener to the click on startStopButton
    startButton.addEventListener('click', function (event) { 
      console.log("START WAS PRESSED")    // can be REMOVED 
        myLocation();

      //intervalID = setInterval(function () {
      //  myLocation();
      //  count += 1; // can be REMOVED
      //  console.log(count) // can be REMOVED
      //  }, 3000);
      })

    var stopButton = document.getElementById('stopButton');
    //if (watchID) 
    //  navigator.geolocation.watchPosition(watchID) 
//
    //  watchID = null

    stopButton.addEventListener('click', function (event) {
      console.log("STOP WAS PRESSED") // can be REMOVED
      navigator.geolocation.clearWatch(watchID) 
    })

    var anotherButton = document.getElementById('anotherButton');
    anotherButton.addEventListener('click', function (event) {      
      location.reload();
    })
  })


$( document ).on('turbolinks:load', function() {
  
  var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
    maxZoom = 19;

  L.tileLayer(tile_layer, {attribution, maxZoom}).addTo(map);
  map.options.scrollWheelZoom = true;
  map.options.doubleClickZoom = true;

  if(navigator.geolocation)
    myLocation();
  else
    map.setView([0, 0], 2);
})



function convertDMS( lat, lng ) { 
  var convertLat = Math.abs(lat);
  var LatDeg = Math.floor(convertLat);
  var LatSeg = (convertLat - LatDeg) * 3600
  var LatMin = Math.floor(LatSeg / 60);
  LatSeg = Math.round(100*(LatSeg - (LatMin * 60)))/100;
  var LatCardinal = ((lat > 0) ? "N" : "S");
   
  var convertLng = Math.abs(lng);
  var LngDeg = Math.floor(convertLng);
  var LngSeg = (convertLng - LngDeg) * 3600
  var LngMin = Math.floor(LngSeg / 60);
  LngSeg = Math.round(100*(LngSeg - (LngMin * 60)))/100;
  var LngCardinal = ((lng > 0) ? "E" : "W");
   
  return LatDeg + 'º ' + LatMin + '′ ' + LatSeg + '″' + LatCardinal   + "  -  " + LngDeg + 'º ' + LngMin + '′ ' + LngSeg + '″' + LngCardinal;
}




















//onsole.log("Location JS loaded");

///let G, options

///document.addEventListener('DOMContentLoaded', init)

///$( document ).on('turbolinks:load', function(init) {
/// Set User's current Location
//indow.init = function(){
// let G, options
// if(navigator.geolocation) {
//   options ={
//     enableHighAccuracy: false, // Do not use GPS as it will drain the battery
//     timeout: 5000, // Will respond with an error after 5 seconds of no successful geolocation
//     maximumAge: 0 // will not use cached results
//   }
//   console.log("Geolocation Available")

//   navigator.geolocation.getCurrentPosition(myLocation, postFail, options) 
//   
// } else {
//   postFail(err)
//   //map.setView([0, 0], 2);
// } 
//

//unction myLocation (position) {
// console.log(position) // can be delted

//     // Get Latitude and Longitude
//     const nav_lat = position.coords.latitude,
//         nav_lng = position.coords.longitude;

//     document.getElementById('latitude').textContent =  nav_lat
//     document.getElementById('longitude').textContent =  nav_lng

//     console.log(nav_lat)
//     console.log(nav_lng)

//     console.log("(Lat - Lng): " + convertDMS(nav_lat, nav_lng));
//     document.getElementById('latlng').textContent = convertDMS(nav_lat, nav_lng);

//     map.setView([nav_lat, nav_lng], map.getZoom() ? map.getZoom() : 17);
//     //var marker = L.marker([nav_lat,  nav_lng]).addTo(map)
//     marker.setLatLng([nav_lat, nav_lng]);
//

//(function postFail(err) {
//   // err is a number
// let errors = {
//   1: 'User denied permission',
//   2: 'Unable to get Geolocation',
//   3: 'Took to long - It timed out'
// }
// document.querySelector('h1').textContent = errors[err]
//)
