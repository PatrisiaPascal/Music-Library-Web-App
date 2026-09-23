const db = require('../db');

// get all songs
exports.getAllSongs = (req, res) => {
    db.all('SELECT * FROM Song', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// get song by id
exports.getSongById = (req, res) => {
    db.get('SELECT * FROM Song WHERE song_id=?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: 'Not found' });
        res.json(row);
    });
};

// create song
exports.createSong = (req, res) => {
    const { song_name, release_year, album_id } = req.body;

    db.run(
        'INSERT INTO Song (song_name, release_year, album_id) VALUES (?, ?, ?)',
        [song_name, release_year, album_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
};

// update song
exports.updateSong = (req, res) => {
    const { song_name, release_year, album_id } = req.body;

    db.run(
        'UPDATE Song SET song_name=?, release_year=?, album_id=? WHERE song_id=?',
        [song_name, release_year, album_id, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};

// delete song
exports.deleteSong = (req, res) => {
    db.run(
        'DELETE FROM Song WHERE song_id=?',
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ deleted: this.changes });
        }
    );
};