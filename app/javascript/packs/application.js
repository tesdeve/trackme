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

console.log("Location JS loaded");

 // Should be used to get user's current location  
//  window.alerty = function(){
//    alert("COMENZAMOS")  
//  }

// Set User's current Location
window.myLocation = function(){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const nav_lat = position.coords.latitude,
          nav_lng = position.coords.longitude;

      document.getElementById('latitude').textContent =  nav_lat
      document.getElementById('longitude').textContent =  nav_lng

      console.log(nav_lat)
      console.log(nav_lng)

      console.log("(Lat - Lng): " + convertDMS(nav_lat, nav_lng));
      document.getElementById('latlng').textContent = convertDMS(nav_lat, nav_lng);

      map.setView([nav_lat, nav_lng], map.getZoom() ? map.getZoom() : 15);
      var marker = L.marker([nav_lat,  nav_lng]).addTo(map)
      marker.setLatLng([nav_lat, nav_lng]);
    });
  }
}


  $('anotherButton').click(function() {
    location.reload();
  });

// // Functions that listen for click on startStopButton and orquestrate the app
  $(function() {    
    let intervalID 
    let count = 0  // can be REMOVED

    var startButton = document.getElementById('startButton');
    //Adds event listener to the click on startStopButton
    startButton.addEventListener('click', function (event) { 
      console.log("START WAS PRESSED")    // can be REMOVED       
      intervalID = setInterval(function () {
        myLocation() ;
        count += 1; // can be REMOVED
        console.log(count) // can be REMOVED
        }, 3000);
      })

    var stopButton = document.getElementById('stopButton');
    stopButton.addEventListener('click', function (event) {
      console.log("STOP WAS PRESSED") // can be REMOVED
      clearInterval(intervalID);
    })

    var anotherButton = document.getElementById('anotherButton');
    anotherButton.addEventListener('click', function (event) {      
      location.reload();
    })
  })

console.log("Location JS loaded");

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
