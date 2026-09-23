const db = require('../db');

// get all albums
exports.getAllAlbums = (req, res) => {
    db.all('SELECT * FROM Album', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// get album by id
exports.getAlbumById = (req, res) => {
    db.get('SELECT * FROM Album WHERE album_id=?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: 'Not found' });
        res.json(row);
    });
};

// create album
exports.createAlbum = (req, res) => {
    const { album_name, release_year, number_of_listens, artist_id } = req.body;

    db.run(
        'INSERT INTO Album (album_name, release_year, number_of_listens, artist_id) VALUES (?, ?, ?, ?)',
        [album_name, release_year, number_of_listens, artist_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
};

// update album
exports.updateAlbum = (req, res) => {
    const { album_name, release_year, number_of_listens, artist_id } = req.body;

    db.run(
        'UPDATE Album SET album_name=?, release_year=?, number_of_listens=?, artist_id=? WHERE album_id=?',
        [album_name, release_year, number_of_listens, artist_id, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};

// delete album
exports.deleteAlbum = (req, res) => {
    db.run(
        'DELETE FROM Album WHERE album_id=?',
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ deleted: this.changes });
        }
    );
};