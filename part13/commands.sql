CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title) values(
  'Chekkonen',
  'http://www.www.fi',
  'Tookkinapaa foeffoeloeoe-MOEOE!'
);

INSERT INTO blogs (author, url, title) values(
  'Kyllikki Kyttääjä',
  'http://armoton.stalkka.us',
  'Kyllikin Kyttäyspäiväkirjat!'
);

INSERT INTO blogs (author, url, title) values(
  'DoomGuy93',
  'http://turm.io',
  'How To Shoot The CyberDemon Until It Dies'
);