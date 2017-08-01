// Write a function to retrieve a blog of json
// make a ajax request! Use the fetch function.
// http://rallycoding.herokuapp.com/api/music_albums

// ES6
/* function fetchAlbums() {
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error: ' + error));
} */

// ES7
const fetchAlbums = async () => {
  try {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

fetchAlbums();
