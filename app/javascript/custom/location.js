console.log("Location JS loaded");

let options
var watchID, intervalID
//var trip_id = gon.trip.id
var geoOptions = {
  enableHighAccuracy: true
}

var lastLocation

// Initialize the map and some properties

//otra = function() {
//  
//  var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//    attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
//    maxZoom = 19;
//
//  L.tileLayer(tile_layer, {attribution, maxZoom}).addTo(map);
//  map.options.scrollWheelZoom = true;
//  map.options.doubleClickZoom = true;
//
//  if(navigator.geolocation){
//    navigator.geolocation.getCurrentPosition(myLocation);
//    initialLocation()
//  } else {
//    map.setView([0, 0], 2);
//  }
//}
//


// Initialize Layers(Tiles)
window.initLayers = function() {  
  var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
    maxZoom = 19;

  L.tileLayer(tile_layer, {attribution, maxZoom}).addTo(map);
  map.options.scrollWheelZoom = true;
  map.options.doubleClickZoom = true;
}

// Get user's initial Location
window.initialLocation = function(){
  navigator.geolocation.getCurrentPosition(function(position){ 
    console.log(position) // can be delted

    // Get Latitude and Longitude
    const nav_lat = position.coords.latitude,
          nav_lng = position.coords.longitude;
    console.log("latitude:" + nav_lat)  // can be REMOVED
    console.log("longitude:" + nav_lng)  // can be REMOVED
    map.setView([nav_lat, nav_lng], map.getZoom() ? map.getZoom() : 17);
    marker.setLatLng([nav_lat, nav_lng]);
  })
}


// Send location to Server
window.sendLocation = function(){
  var trip_id = gon.trip.id
  navigator.geolocation.getCurrentPosition(function(position){
    latlng.send_location(trip_id, position.coords.latitude, position.coords.longitude, Date());
    console.log('Send location to DataBase # ');
  }, error, geoOptions);
}

////////////////////////////////  Tracking  Part  ////////////////////////////////////////

// Layers For trackingMap(Tiles)
window.trackingMapLayers = function() {  
  var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
    maxZoom = 19;

  L.tileLayer(tile_layer,  {attribution, maxZoom}).addTo(tripMap);
  tripMap.options.scrollWheelZoom = true;
  tripMap.options.doubleClickZoom = true;
}

// Update the Map and Marker to current lcation constantly
window.myLocation = function(){
  navigator.geolocation.getCurrentPosition(function(position){ 
    console.log(position) // can be delted

    // Get Latitude and Longitude
    const nav_lat = position.coords.latitude,
          nav_lng = position.coords.longitude;

    tripMap.setView([nav_lat, nav_lng], tripMap.getZoom() ? tripMap.getZoom() : 17);
    marker.setLatLng([nav_lat, nav_lng]);

    //lastLocation = {nav_lat, nav_lng}
    lastLocation = position.coords;
    var polyline = L.polyline([[lastLocation.latitude,lastLocation.longitude], [nav_lat,nav_lng]], 
          {weight: 5, color: 'RoyalBlue'}).addTo(tripMap);
          
          tripMap.fitBounds(polyline.getBounds())


    //var polyline = L.polyline(data, {color: 'red'}).addTo(map1)
    //map1.fitBounds(polyline.getBounds())

    //const formLatitude = 'location_latitude' 
    //const formLongitude = 'location_longitude'     
//
    //console.log("latitude:" + nav_lat)  // can be REMOVED
    //console.log("longitude:" + nav_lng)  // can be REMOVED


  }, error, geoOptions)
}


//////////////////////////////// Start / Stops Tracking ////////////////////////////////////////

$( document ).on('turbolinks:load', function() {
  var stopTracking =  document.getElementById("stopTracking")

  if (stopTracking){ 
    intervalID = setInterval(function () {
      //myLocation();
      sendLocation();
      }, 2000); 
    stopTracking.addEventListener('click', function(event) { 
      console.log("STOP WAS PRESSED")

      clearInterval(intervalID);
    }) 
  } 
})


////////////////////////////////////////////////  TRACKED PART ////////////////////////////////////////////////

// Layers For trackedMap(Tiles)
window.trackedMapLayers = function() {  
  var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
    maxZoom = 19;

  L.tileLayer(tile_layer,  {attribution, maxZoom}).addTo(map1);
  map1.options.scrollWheelZoom = true;
  map1.options.doubleClickZoom = true;
}



// THIS PART BELOW COMMENTED /////
//Fuction that gets all Locations and filter them getting only the Latitud and Longitude.
//Then puts it on the map.
 window.locations = function(){
  var locations = gon.locations
    //document.getElementById('locations2').innerHTML = data2
    var data = locations.map(c => [c.latitude, c.longitude])

    var polyline = L.polyline(data, {color: 'red'}).addTo(map1)
    map1.fitBounds(polyline.getBounds())
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//$( document ).on('turbolinks:load', function() {
//  //var trackmap = document.getElementById("trackmap")
//  var startTracking = document.getElementById("startTracking") 
//  var stopTracking =  document.getElementById("stopTracking") 
//  startTracking.addEventListener('click', function(event) { 
//    console.log("START WAS PRESSED")
//    //if (trackmap){ 
//      //alert("OE POSITION: ")
//      intervalID = setInterval(function () {
//       // myLocation();
//        sendLocation();
//        }, 2000); 
//
//      stopTracking.addEventListener('click', function(event) { 
//      console.log("STOP WAS PRESSED")
//      //remove.sendLocation()
//      clearInterval(intervalID);
//      }) 
//    //}
//  })
//})
//


//    if (startPauseButton.textContent === "Start") {
//      console.log("START WAS PRESSED") // can be REMOVED
//      startPauseButton.classList.remove("blueColor")
//      startPauseButton.textContent = "Pause"
//      startPauseButton.classList.add("yellowColor")
//      intervalID = setInterval(function () {
//        myLocation() ;
//        sendLocation();
//        }, 3000); 
//    } else if  (startPauseButton.textContent === "Pause") {
//      console.log("PAUSE WAS PRESSED") // can be REMOVED
//      startPauseButton.classList.remove("yellowColor")
//      startPauseButton.classList.add("blueColor")
//      startPauseButton.textContent = "Start"
//      clearInterval(intervalID);
//    } 
//  })
//
//  var anotherButton = document.getElementById('anotherButton');
//  anotherButton.addEventListener('click', function(event) {      
//    location.reload();
//  })
//})



//startTracking






//



// ORIGINAL //
//        // Update the Map and Marker to current lcation constantly
//        window.myLocation = function(){
//          navigator.geolocation.getCurrentPosition(function(position){ 
//            console.log(position) // can be delted
//
//            // Get Latitude and Longitude
//            const nav_lat = position.coords.latitude,
//                  nav_lng = position.coords.longitude;
//
//            const formLatitude = 'location_latitude' 
//            const formLongitude = 'location_longitude'     
//
//            console.log("latitude:" + nav_lat)  // can be REMOVED
//            console.log("longitude:" + nav_lng)  // can be REMOVED
//
//           document.getElementById(formLatitude).value =  nav_lat
//           document.getElementById(formLongitude).value =   nav_lng 
//
//            console.log("(Lat - Lng): " + convertDMS(nav_lat, nav_lng));
//            document.getElementById('latlng').textContent = convertDMS(nav_lat, nav_lng);  // can be REMOVED
//
//            map.setView([nav_lat, nav_lng], map.getZoom() ? map.getZoom() : 17);
//            marker.setLatLng([nav_lat, nav_lng]);
//          })
//        }


function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}


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

//
////////////////////////////////////////


// Initialize Map for Historic runs
// window.iniTripMap = function(map, latlng){
// 
//   iniMap(map);
// 
//   var polyline = L.polyline(latlngs, {weight: 5, color: 'RoyalBlue'}).addTo(map);
//   // zoom the map to the polyline
//   map.fitBounds(polyline.getBounds());
// 
//   L.circle(latlngs[0], {radius: 3, color: 'Green'}).addTo(map);
//   L.circle(latlngs.slice(-1)[0], {radius: 3, color: 'DarkRed'}).addTo(map);
// 
// }
// 
// // Initialize Map
// iniMap = function(map){
//   var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//     attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
//     maxZoom = 19;
// 
//   L.tileLayer(tile_layer, {attribution, maxZoom}).addTo(map);
//   map.options.scrollWheelZoom = true;
//   map.options.doubleClickZoom = true;
// }