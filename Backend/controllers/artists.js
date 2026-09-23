const db = require('../db');

// get all artists
exports.getAllArtists = (req, res) => {
    db.all('SELECT * FROM Artist', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// get artist by id
exports.getArtistById = (req, res) => {
    db.get('SELECT * FROM Artist WHERE artist_id=?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: 'Artist not found' });
        res.json(row);
    });
};

// create artist
exports.createArtist = (req, res) => {
    const { artist_name, genre, monthly_listeners } = req.body;

    db.run(
        'INSERT INTO Artist (artist_name, genre, monthly_listeners) VALUES (?, ?, ?)',
        [artist_name, genre, monthly_listeners],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
};

// update artist
exports.updateArtist = (req, res) => {
    const { artist_name, genre, monthly_listeners } = req.body;

    db.run(
        'UPDATE Artist SET artist_name=?, genre=?, monthly_listeners=? WHERE artist_id=?',
        [artist_name, genre, monthly_listeners, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};

// delete artist
exports.deleteArtist = (req, res) => {
    db.run(
        'DELETE FROM Artist WHERE artist_id=?',
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ deleted: this.changes });
        }
    );
};