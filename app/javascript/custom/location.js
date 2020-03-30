console.log("Location JS loaded");

let options
var watchID, intervalID

// Initialize the map and some properties
$( document ).on('turbolinks:load', function() {
  
  var tile_layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors | &copy; TrackMe!',
    maxZoom = 19;

  L.tileLayer(tile_layer, {attribution, maxZoom}).addTo(map);
  map.options.scrollWheelZoom = true;
  map.options.doubleClickZoom = true;

  if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(myLocation);
  else
    map.setView([0, 0], 2);
})

// Send location to Server
window.sendLocation = function(){
  navigator.geolocation.getCurrentPosition(function(position){
    latlng.send_location(trip_id, position.coords.latitude, position.coords.longitude, looged_at); //looged_at. Halar el trip_id
    const num = Number(document.getElementById('db_log').textContent) + 1;
    document.getElementById('db_log').textContent = num;
    console.log('Send location to DataBase # ' + num);
  });
}


// Listening for click on Start/Pause Button and orquestrate the app
$( document ).on('turbolinks:load', function() {
  locations();
  var startPauseButton = document.getElementById('startPauseButton') 
  startPauseButton.textContent = "Start"



  //Adds event listener to the click on Start Button
  startPauseButton.addEventListener('click', function (event) { 

    if (startPauseButton.textContent === "Start") {
      console.log("START WAS PRESSED") // can be REMOVED
      startPauseButton.classList.remove("blueColor")
      startPauseButton.textContent = "Pause"
      startPauseButton.classList.add("yellowColor")
      intervalID = setInterval(function () {
        myLocation() ;
        sendLocation();
        }, 3000); 
    } else if  (startPauseButton.textContent === "Pause") {
      console.log("PAUSE WAS PRESSED") // can be REMOVED
      startPauseButton.classList.remove("yellowColor")
      startPauseButton.classList.add("blueColor")
      startPauseButton.textContent = "Start"
      clearInterval(intervalID);
    } 
  })

  var anotherButton = document.getElementById('anotherButton');
  anotherButton.addEventListener('click', function(event) {      
    location.reload();
  })
})


// Update the Map and Marker to current lcation constantly
window.myLocation = function(){
  navigator.geolocation.getCurrentPosition(function(position){ 
    console.log(position) // can be delted

    // Get Latitude and Longitude
    const nav_lat = position.coords.latitude,
          nav_lng = position.coords.longitude;

    const formLatitude = 'location_latitude' 
    const formLongitude = 'location_longitude'     

    console.log("latitude:" + nav_lat)  // can be REMOVED
    console.log("longitude:" + nav_lng)  // can be REMOVED

   document.getElementById(formLatitude).value =  nav_lat
   document.getElementById(formLongitude).value =   nav_lng 

    console.log("(Lat - Lng): " + convertDMS(nav_lat, nav_lng));
    document.getElementById('latlng').textContent = convertDMS(nav_lat, nav_lng);  // can be REMOVED

    map.setView([nav_lat, nav_lng], map.getZoom() ? map.getZoom() : 17);
    marker.setLatLng([nav_lat, nav_lng]);
  })
}


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


// Fuction that get all Locations and filter them getting only the Latituda nd Longitude
window.locations = function(){
  var i
  var data = []
  var data2 = []

  var locations = gon.locations

  
    //document.getElementById('locations2').innerHTML = data2
    var data3 = locations.map(c => [c.latitude, c.longitude])

    var polyline = L.polyline(data3, {color: 'red'}).addTo(map)
    map.fitBounds(polyline.getBounds())

}




//var data2 = [[52.0623807,-1.3389535], [52.0632085,-1.3415552,]]


// data.push({lats, lngs});
   // data2.push([lats, lngs]);
   // //console.log(lat)
   // //console.log(lng)
   // console.log(data2)

   //var locationColected = JSON.stringify(data2, null, 4)
   //var latlngs = parseFloat(locationColected);
   //console.log(latlngs);
   //document.getElementById('locations2').innerHTML = latlngs

   //var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map)
   // //map.fitBounds(polyline.getBounds())


   // document.getElementById('locations').textContent  = data
    // document.getElementById('locations').textContent  = data2
    //document.getElementById('locations').innerHTML = JSON.stringify(data, null, 4);
   
    //     // zoom the map to the polyline
    







