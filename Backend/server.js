const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors());

// Import routes
const artistRoutes = require('./routes/artists');
const albumRoutes = require('./routes/albums');
const songRoutes = require('./routes/songs');

// Use routes
app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});