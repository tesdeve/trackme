// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// Adds custom directory
require("custom/location")

import 'leaflet'
import 'bootstrap'
import '../stylesheets/application'

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)




// console.log("Location JS loaded");
// 
// let options
// var watchID, setIntervalID;
// 
// // Initialize the map and some properties
// $( document ).on('turbolinks:load', function() {
//   
//   var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//     attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
//     maxZoom = 19;
// 
//   L.tileLayer(tile_layer, {attribution, maxZoom}).addTo(map);
//   map.options.scrollWheelZoom = true;
//   map.options.doubleClickZoom = true;
// 
//   if(navigator.geolocation)
//     navigator.geolocation.getCurrentPosition(myLocation);
//   else
//     map.setView([0, 0], 2);
// })
// 
// // Sets the watchPosition function
// window.setWatch = function() {    
//     options ={
//       enableHighAccuracy: false, // Do not use GPS as it will drain the battery. If GPS requiered set it to true
//       timeout: 15000, // Will respond with an error after 5 seconds of no successful geolocation
//       maximumAge: 0 // will not use cached results
//     };
//     watchID = navigator.geolocation.watchPosition(myLocation, error, options) // TO BE REMOVED 
//     //console.log(coords.latitude)
//     setIntervalID = setInterval(sendLocation, 3000);
//     //setIntervalID = setInterval(myLocation, 3000);
// }
// 
// // Send location to Server
// window.sendLocation = function(){
//   navigator.geolocation.getCurrentPosition(function(position){
//     latlng.send_location(position.coords.latitude, position.coords.longitude);
//     const num = Number(document.getElementById('db_log').textContent) + 1;
//     document.getElementById('db_log').textContent = num;
//     console.log('Send location to DataBase # ' + num);
//   });
// }
// 
// 
// // Functions that listen for click on start/stop Buttons and orquestrate the app
// $( document ).on('turbolinks:load', function() {
//   var startButton = document.getElementById('startButton'); 
//   startButton.addEventListener('click', function(event) { 
//     setWatch() 
//     console.log("START WAS PRESSED")    // can be REMOVED 
//   })
// 
//   var stopButton = document.getElementById('stopButton');
//   stopButton.addEventListener('click', function(event) {
//     console.log("STOP WAS PRESSED") // can be REMOVED
//     clearInterval(setIntervalID);
//     navigator.geolocation.clearWatch(watchID) 
//   })
// 
//   var anotherButton = document.getElementById('anotherButton');
//   anotherButton.addEventListener('click', function(event) {      
//     location.reload();
//   })
// })
// 
// // Update the Map and Marker to current lcation constantly
// window.myLocation = function(position){
//     console.log(position) // can be delted
// 
//     // Get Latitude and Longitude
//     const nav_lat = position.coords.latitude,
//           nav_lng = position.coords.longitude;
// 
//     console.log(nav_lat)  // can be REMOVED
//     console.log(nav_lng)  // can be REMOVED
// 
//     document.getElementById('latitude').textContent =  nav_lat
//     document.getElementById('longitude').textContent =  nav_lng  
// 
//     console.log("(Lat - Lng): " + convertDMS(nav_lat, nav_lng));
//     document.getElementById('latlng').textContent = convertDMS(nav_lat, nav_lng);  // can be REMOVED
// 
//     map.setView([nav_lat, nav_lng], map.getZoom() ? map.getZoom() : 17);
//     marker.setLatLng([nav_lat, nav_lng]);
//     
// 
//     //sendLocation()
//  
// }
// 
// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }
// 
// 
// 
// function convertDMS( lat, lng ) { 
//   var convertLat = Math.abs(lat);
//   var LatDeg = Math.floor(convertLat);
//   var LatSeg = (convertLat - LatDeg) * 3600
//   var LatMin = Math.floor(LatSeg / 60);
//   LatSeg = Math.round(100*(LatSeg - (LatMin * 60)))/100;
//   var LatCardinal = ((lat > 0) ? "N" : "S");
//    
//   var convertLng = Math.abs(lng);
//   var LngDeg = Math.floor(convertLng);
//   var LngSeg = (convertLng - LngDeg) * 3600
//   var LngMin = Math.floor(LngSeg / 60);
//   LngSeg = Math.round(100*(LngSeg - (LngMin * 60)))/100;
//   var LngCardinal = ((lng > 0) ? "E" : "W");
//    
//   return LatDeg + 'º ' + LatMin + '′ ' + LatSeg + '″' + LatCardinal   + "  -  " + LngDeg + 'º ' + LngMin + '′ ' + LngSeg + '″' + LngCardinal;
// }
// 
// 




//function error(err)  {
//  let errors = {
//    1: 'User denied permission',
//    2: 'Unable to get Geolocation',
//    3: 'Took to long - It timed out'
//  }
//  //document.querySelector('h1').textContent = errors[err]
//   console.log(errors[err])
// }
