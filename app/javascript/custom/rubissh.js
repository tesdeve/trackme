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

      L.polyline([[lastLocation.latitude,lastLocation.longitude], [nav_lat,nav_lng]], 
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