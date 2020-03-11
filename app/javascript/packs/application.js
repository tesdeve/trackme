// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import 'leaflet'
import 'bootstrap'
import '../stylesheets/application'

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


if (navigator.geolocation) {
  console.log('geolocation is available');
  navigator.geolocation.getCurrentPosition(function(position) {   
    // initialize the map on the "map" div with a given center and zoom
    const map = L.map('trackmap').setView([0, 0], 1);   

    // Required by leaflet to use it
    const attribution = '&copy; <a href=""https://www.openstreetmap.org/"">OpenStreetMap</a> contributors | &copy; Trackmi ';
    const tileURL = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const maxZoom = 19
    const tiles = L.tileLayer( tileURL , {attribution, maxZoom});
    tiles.addTo(map);  
    // Listen for click on Log button
    const log = document.getElementById('log');
    log.addEventListener('click', function (event) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      document.getElementById('latitude').textContent = lat
      document.getElementById('longitude').textContent = lon

      // add marker to map with the coordinates
      var marker = L.marker([lat, lon]).addTo(map)

      // set the view to the lat, lon coordinates and zoom it.
      map.setView([lat, lon], 17)

    });
  });
} else {
  console.log('geolocation IS NOT available');
}