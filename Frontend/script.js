// Artist
const API = "http://localhost:5000/artists";

// get all artists
function loadArtists() {
    const table = document.getElementById("artistTable");
    if (!table) return;
    
    fetch(API)
        .then(res => res.json())
        .then(data => {
            table.innerHTML = "";

            data.forEach(artist => {
                const row = document.createElement("tr");

                row.innerHTML = `
                <td>${artist.artist_id}</td>
                <td>${artist.artist_name}</td>
                <td>${artist.genre}</td>
                <td>${artist.monthly_listeners}</td>
                <td>
                <button onclick="updateArtist(${artist.artist_id}, '${artist.artist_name}', '${artist.genre}', ${artist.monthly_listeners})">Update</button>
                <button onclick="deleteArtist(${artist.artist_id})">Delete</button>
                </td>
                `;

                table.appendChild(row);
            });
        })
        .catch(err => console.error("Error loading artists:", err));
}

// create artist
const artistForm = document.getElementById("artistForm");

if (artistForm) {
    artistForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newArtist = {
            artist_name: document.getElementById("name").value,
            genre: document.getElementById("genre").value,
            monthly_listeners: document.getElementById("listeners").value
        };

        fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newArtist)
        })
            .then(() => {
                loadArtists();
                this.reset();
            })
            .catch(err => console.error("Error adding artist:", err));
    });
}

if (document.getElementById("artistTable")) {
    loadArtists();
}

// delete artist
function deleteArtist(id) {
    fetch(`http://localhost:5000/artists/${id}`, {
        method: "DELETE"
    })
        .then(() => loadArtists())
        .catch(err => console.error("Error deleting artist:", err));
}

// update artist
function updateArtist(id, name, genre, listeners) {
    const newName = prompt("Enter new name:", name);
    const newGenre = prompt("Enter new genre:", genre);
    const newListeners = prompt("Enter new listeners:", listeners);

    if (!newName) return;

    fetch(`http://localhost:5000/artists/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            artist_name: newName,
            genre: newGenre,
            monthly_listeners: newListeners
        })
    })
        .then(() => loadArtists())
        .catch(err => console.error("Error updating artist:", err));
}


// Albums

const ALBUM_API = "http://localhost:5000/albums";

// get all albums
function loadAlbums() {
    const table = document.getElementById("albumTable");
    if (!table) return;

    fetch(ALBUM_API)
        .then(res => res.json())
        .then(data => {
            table.innerHTML = "";

            data.forEach(album => {
                const row = document.createElement("tr");

                row.innerHTML = `
                <td>${album.album_id}</td>
                <td>${album.album_name}</td>
                <td>${album.release_year}</td>
                <td>${album.number_of_listens}</td>
                <td>${album.artist_id}</td>
                <td>
                <button onclick="updateAlbum(${album.album_id}, '${album.album_name}', ${album.release_year}, ${album.number_of_listens}, ${album.artist_id})">Update</button>
                <button onclick="deleteAlbum(${album.album_id})">Delete</button>
                </td>
                `;

                table.appendChild(row);
            });
        })
        .catch(err => console.error("Error loading albums:", err));
}

// create album
const albumForm = document.getElementById("albumForm");

if (albumForm) {
    albumForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newAlbum = {
            album_name: document.getElementById("album_name").value,
            release_year: document.getElementById("release_year").value,
            number_of_listens: document.getElementById("listens").value,
            artist_id: document.getElementById("artist_id").value
        };

        fetch(ALBUM_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAlbum)
        })
            .then(() => {
                loadAlbums();
                this.reset();
            })
            .catch(err => console.error("Error adding album:", err));
    });
}

if (document.getElementById("albumTable")) {
    loadAlbums();
}

// delete album
function deleteAlbum(id) {
    fetch(`http://localhost:5000/albums/${id}`, {
        method: "DELETE"
    })
        .then(() => loadAlbums())
        .catch(err => console.error("Error deleting album:", err));
}

// update album
function updateAlbum(id, name, year, listens, artistId) {
    const newName = prompt("Enter new album name:", name);
    const newYear = prompt("Enter new release year:", year);
    const newListens = prompt("Enter number of listens:", listens);
    const newArtist = prompt("Enter artist ID:", artistId);

    if (!newName) return;

    fetch(`http://localhost:5000/albums/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            album_name: newName,
            release_year: newYear,
            number_of_listens: newListens,
            artist_id: newArtist
        })
    })
        .then(() => loadAlbums())
        .catch(err => console.error("Error updating album:", err));
}


// Songs

const SONG_API = "http://localhost:5000/songs";

// get all songs
function loadSongs() {
    const table = document.getElementById("songTable");
    if (!table) return;

    fetch(SONG_API)
        .then(res => res.json())
        .then(data => {
            table.innerHTML = "";

            data.forEach(song => {
                const row = document.createElement("tr");

                row.innerHTML = `
                <td>${song.song_id}</td>
                <td>${song.song_name}</td>
                <td>${song.release_year}</td>
                <td>${song.album_id}</td>
                <td>
                <button onclick="updateSong(${song.song_id}, '${song.song_name}', ${song.release_year}, ${song.album_id})">Update</button>
                <button onclick="deleteSong(${song.song_id})">Delete</button>
                </td>
                `;

                table.appendChild(row);
            });
        })
        .catch(err => console.error("Error loading songs:", err));
}

// create song
const songForm = document.getElementById("songForm");

if (songForm) {
    songForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newSong = {
            song_name: document.getElementById("song_name").value,
            release_year: document.getElementById("song_year").value,
            album_id: document.getElementById("album_id").value
        };

        fetch(SONG_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSong)
        })
            .then(() => {
                loadSongs();
                this.reset();
            })
            .catch(err => console.error("Error adding song:", err));
    });
}

if (document.getElementById("songTable")) {
    loadSongs();
}

// delete song
function deleteSong(id) {
    fetch(`http://localhost:5000/songs/${id}`, {
        method: "DELETE"
    })
        .then(() => loadSongs())
        .catch(err => console.error("Error deleting song:", err));
}

// update song
function updateSong(id, name, year, albumId) {
    const newName = prompt("Enter new song name:", name);
    const newYear = prompt("Enter new release year:", year);
    const newAlbum = prompt("Enter album ID:", albumId);

    if (!newName) return;

    fetch(`http://localhost:5000/songs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            song_name: newName,
            release_year: newYear,
            album_id: newAlbum
        })
    })
        .then(() => loadSongs())
        .catch(err => console.error("Error updating song:", err));
}