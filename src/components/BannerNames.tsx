import React, { useEffect, useState } from 'react';

const WishesList = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch(
          '/api.php?action=parse&page=Wish/List&format=json'
        );
        const data = await response.json();
        const html = data.parse.text['*'];

        // Parse the HTML to extract character names
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const characterElements = doc.querySelectorAll('.wikitable tbody tr td b a');

        const characterNames = Array.from(characterElements).map((element) =>
          element.textContent.trim()
        );

        console.log(characterNames);
        

        setCharacters(characterNames);
      } catch (error) {
        console.error('Error fetching wishes:', error);
      }
    };

    fetchWishes();
  }, []);

  return (
    <div>
      <h2>Current Banner Characters</h2>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>{character}</li>
        ))}
      </ul>
    </div>
  );
};

export default WishesList;
