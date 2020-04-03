var setIntervalID;
var lastLocation;

var geoOptions = {
  enableHighAccuracy: true
};

// Set location when the page loads
//$( document ).on('turbolinks:load', function() {
nada = function() { 
  var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  	attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
  	maxZoom = 19;

  L.tileLayer(tile_layer, {attribution, maxZoom}).addTo(map);
  map.options.scrollWheelZoom = true;
  map.options.doubleClickZoom = true;

  if(navigator.geolocation)
    var a = 0;
  	//navigator.geolocation.getCurrentPosition(myLocation);
  else
  	map.setView([0, 0], 2);
}

// Format the coordinates
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

// Haversine formula
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

// Initialize Map for Historic runs
window.iniRunMap = function(map, latlng){

  iniMap(map);

  var polyline = L.polyline(latlngs, {weight: 5, color: 'RoyalBlue'}).addTo(map);
  // zoom the map to the polyline
  map.fitBounds(polyline.getBounds());

  L.circle(latlngs[0], {radius: 3, color: 'Green'}).addTo(map);
  L.circle(latlngs.slice(-1)[0], {radius: 3, color: 'DarkRed'}).addTo(map);

}

window.liveTrack = function(map){

  iniMap(map);

  if(navigator.geolocation)    
    navigator.geolocation.watchPosition(myLocation);
  else
    map.setView([0, 0], 2);
}


// Start Run Tracking
window.runTrack = function(map){
  
  iniMap(map);
  navigator.geolocation.getCurrentPosition(function(position){
    lastLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude}
  }, error, geoOptions); 

  setIntervalID = setInterval(sendLocation, 1000);
  
}


// Send location to Server
sendLocation = function(){
  navigator.geolocation.getCurrentPosition(function(position){

    // Update the Map
    myLocation(position)

    if (distance(lastLocation, position.coords) > gps_sens){
      // Send location to Server 
      const nav_lat = position.coords.latitude,
        nav_lng = position.coords.longitude;
      
      latlng.send_location(Date(), nav_lat, nav_lng, run_id);

      L.polyline([[lastLocation.latitude,lastLocation.longitude],
                  [nav_lat,nav_lng]], 
        {weight: 5, color: 'RoyalBlue'}).addTo(map);
      lastLocation = position.coords;
      // Update counter in Page 
      console.log('Send location to DataBase for Run ' + run_id + ': ' + convertDMS(nav_lat, nav_lng));
      const num = Number(document.getElementById('db_log').textContent) + 1;
      document.getElementById('db_log').textContent = num;
    }
  }, error, geoOptions);
}


// Initialize Map
iniMap = function(map){
  var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
    maxZoom = 19;

  L.tileLayer(tile_layer, {attribution, maxZoom}).addTo(map);
  map.options.scrollWheelZoom = true;
  map.options.doubleClickZoom = true;
}


// Update the Map and marker
myLocation = function(position){
  const nav_lat = position.coords.latitude,
      nav_lng = position.coords.longitude;

  console.log("Map to (Lat - Lng): " + convertDMS(nav_lat, nav_lng));

  map.setView([nav_lat, nav_lng], map.getZoom() ? map.getZoom() : 17);
  marker.setLatLng([nav_lat, nav_lng]);    
}


// Log any error form live tracking
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}