var locations;

// get bus data 
async function run() {
  locations = await getBusLocations();
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

run();

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FndXNldiIsImEiOiJja3V6bGZwZ2o3ZGVzMzJxNjNieHAxZzZ3In0.fV9NjzhZdrSaou9XVh63EA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-71.091542, 42.358862], // starting position [lng, lat] 
  zoom: 13 // starting zoom    
});

markers = [];

// Creates a marker for each bus
setTimeout(() => {
  for (let i = 0; i < locations.length; i++) {
    markers.push(new mapboxgl.Marker({
      color: 'red'
    }).setLngLat([-70.96785797896797, 42.3696364407848]) //initial marker placed out of viewport
      .addTo(map))
  }
}, 2000);

// bus locations - updates every 10 seconds
function move() {
  setTimeout(() => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude]);
    }
    move();
  }, 10000);
}
move();
