console.log("Location JS loaded");

let options
var watchID, intervalID
//var trip_id = gon.trip.id
var geoOptions = {
  enableHighAccuracy: true
}

var lastLocation 
//window.tiles = function() { 

// Initialize Layers(Tiles) for all maps
var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                  attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
                  maxZoom = 19;

//////////////////////////////// INITIALIZATION PART //////////////////////////////////////////////////////////////////////

// Initial Location Layers added
window.initLayers = function() {

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////  Tracking  Part  //////////////////////////////////////////////////////////////////////////////

// Layers For trackingMap(Tiles)
window.trackingMapLayers = function() {  

  L.tileLayer(tile_layer,  {attribution, maxZoom}).addTo(tripMap);
  tripMap.options.scrollWheelZoom = true;
  tripMap.options.doubleClickZoom = true;
}

// Update the Map and Marker to current lcation constantly
window.myLocation = function(){
  navigator.geolocation.getCurrentPosition(function(position){ 

    console.log(position) // can be deleted

    // Get Latitude and Longitude
    const nav_lat = position.coords.latitude,
          nav_lng = position.coords.longitude;

    const currentLocation = [nav_lat,nav_lng]

    tripMap.setView([nav_lat, nav_lng], tripMap.getZoom() ? tripMap.getZoom() : 17);
    marker.setLatLng([nav_lat, nav_lng]);

    var polyline = L.polyline([[lastLocation.latitude,lastLocation.longitude], currentLocation], 
                  {weight: 5, color: 'RoyalBlue'}).addTo(tripMap);
    lastLocation = position.coords;


    //console.log('Last Location Latitude:' + lastLocation.latitude)


    tripMap.fitBounds(polyline.getBounds())

  }, error, geoOptions)
}

// Send location to Server
window.sendLocation = function(){
  var trip_id = gon.trip.id
  navigator.geolocation.getCurrentPosition(function(position){
   // if ( lastLocation != position.coords) {
      //console.log('Last Location Latitude:' + lastLocation.latitude)
      //console.log('Position Coords Latitude:' + position.coords.latitude)
      latlng.send_location(trip_id, position.coords.latitude, position.coords.longitude, Date());
      console.log('Send location to DataBase # ');
    //}
  }, error, geoOptions);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// Start / Stops Tracking ////////////////////////////////////////////////////////////////////////

$( document ).on('turbolinks:load', function() {
  var stopTracking =  document.getElementById("stopTracking")

    if (stopTracking){ 
    navigator.geolocation.getCurrentPosition(function(position){
      lastLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude}
    }, error, geoOptions); 

    intervalID = setInterval(function () {
      myLocation();
      sendLocation();
      }, 900); 
    stopTracking.addEventListener('click', function(event) { 
      console.log("STOP WAS PRESSED")

      clearInterval(intervalID);
    }) 
  } 
})

////////////////////////////////////////////////  TRACKED PART ////////////////////////////////////////////////

// Layers For trackedMap(Tiles)
window.trackedMapLayers = function() {

  L.tileLayer(tile_layer,  {attribution, maxZoom}).addTo(map1);
  map1.options.scrollWheelZoom = true;
  map1.options.doubleClickZoom = true;
}

//Gets all Locations and filter them getting only the Latitud and Longitude. Then puts it on the map.
 window.locations = function(){
  var locations = gon.locations
    //document.getElementById('locations2').innerHTML = data2
    var data = locations.map(c => [c.latitude, c.longitude])

    var polyline = L.polyline(data, {color: 'red'}).addTo(map1)
    map1.fitBounds(polyline.getBounds())
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Haversine formula - CALCULATES DISTANCE
function distance(p1, p2) {
  if ((p1.latitude == p2.latitude) && (p1.longitude == p2.longitude)) {
    return 0;
  }
  else {

    function deg2rad(deg){return deg * (Math.PI/180)};

    // The radius of the planet earth in meters
    let R = 6378137;
    let dLat = deg2rad(p2.latitude - p1.latitude)
    let dLng = deg2rad(p2.longitude - p1.longitude)

    let a = Math.sin(dLat / 2) ** 2 +
            Math.cos(deg2rad(p1.latitude)) * 
            Math.cos(deg2rad(p2.latitude)) *
            Math.sin(dLng / 2) ** 2;

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance;
  }
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