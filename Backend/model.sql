PRAGMA foreign_keys = ON;

/* drop tables */
DROP TABLE IF EXISTS Song;
DROP TABLE IF EXISTS Album;
DROP TABLE IF EXISTS Artist;

/* create artist table */
CREATE TABLE Artist (
    artist_id INTEGER PRIMARY KEY,
    artist_name TEXT NOT NULL,
    genre TEXT,
    monthly_listeners INTEGER
);

/* create album table */
CREATE TABLE Album (
    album_id INTEGER PRIMARY KEY,
    album_name TEXT NOT NULL,
    release_year INTEGER,
    number_of_listens INTEGER,
    artist_id INTEGER,
    FOREIGN KEY (artist_id)
        REFERENCES Artist(artist_id)
        ON DELETE CASCADE
);

/* create song table */
CREATE TABLE Song (
    song_id INTEGER PRIMARY KEY,
    song_name TEXT NOT NULL,
    release_year INTEGER,
    album_id INTEGER,
    FOREIGN KEY (album_id)
        REFERENCES Album(album_id)
        ON DELETE CASCADE
);

/* insert artists */
INSERT INTO Artist VALUES (1, 'Drake', 'Hip-Hop', 75000000);
INSERT INTO Artist VALUES (2, 'Justin Bieber', 'Pop', 13000000);

/* insert albums */
INSERT INTO Album VALUES (1, 'Scorpion', 2018, 500000000, 1);
INSERT INTO Album VALUES (2, 'Certified Lover Boy', 2021, 400000000, 1);
INSERT INTO Album VALUES (3, 'My World 2.0', 2010, 300000000, 2);
INSERT INTO Album VALUES (4, 'Purpose', 2015, 450000000, 2);
INSERT INTO Album VALUES (5, 'Believe', 2012, 350000000, 2);

/* insert songs */
INSERT INTO Song VALUES (1, 'Gods Plan', 2018, 1);
INSERT INTO Song VALUES (2, 'In My Feelings', 2018, 1);
INSERT INTO Song VALUES (3, 'Way 2 Sexy', 2021, 2);
INSERT INTO Song VALUES (4, 'Fair Trade', 2021, 2);
INSERT INTO Song VALUES (5, 'Baby', 2010, 3);
INSERT INTO Song VALUES (6, 'One Time', 2010, 3);
INSERT INTO Song VALUES (7, 'Sorry', 2015, 4);
INSERT INTO Song VALUES (8, 'Love Yourself', 2015, 4);
INSERT INTO Song VALUES (9, 'Boyfriend', 2012, 5);
INSERT INTO Song VALUES (10, 'As Long As You Love Me', 2012, 5);