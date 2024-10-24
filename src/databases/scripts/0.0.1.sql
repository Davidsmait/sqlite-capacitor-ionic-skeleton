
CREATE TABLE IF NOT EXISTS author (
                                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                                  name TEXT NOT NULL,
                                  birthday TEXT,
                                  email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS post (
                                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                                  title TEXT NOT NULL,
                                  text TEXT NOT NULL,
                                  author_id INTEGER,
                                  FOREIGN KEY (author_id) REFERENCES author(id)
  );

CREATE TABLE IF NOT EXISTS category (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      name TEXT UNIQUE NOT NULL)
