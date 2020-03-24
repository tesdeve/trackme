
import consumer from "./consumer"

window.latlng =  consumer.subscriptions.create("LocationsChannel", {
	//consumer.subscriptions.create("LocationsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  	console.log('Connected to Locations Channel');
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
   	console.log('Disconnected from Locations Channel');
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
        console.log('Notification Received: ' + data);
  },

 send_location(lat, lng){
    this.perform("send_location", { lat: lat, lng: lng })
  }
  
})