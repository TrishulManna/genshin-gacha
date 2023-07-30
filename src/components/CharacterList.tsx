import { useState, useEffect } from "react";

function ListGroup() {
    const excludedNames = ["Aether", "Lumine", "Traveler (Anemo)", "Traveler (Dendro)", "Traveler (Electro)", "Traveler (Geo)", "Traveler (Unaligned)","Traveler (Hydro)", "Category:Crossover Characters", "Category:Event-Exclusive Characters", "Category:Non-Wish Characters", "Category:Playable Characters by Region", "Category:Standard Wish Characters"];
    const [specificCharacter, setSpecificCharacter] = useState<
        { id: string; name: string; quality: number | null}[]
    >([]);

    useEffect(() => {
        fetch("/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:Playable_Characters&cmlimit=500")
            .then((response) => response.json())
            .then((data: { query: { categorymembers: Array<{ title: string }> } }) => {
                const characterList = [];
                // Get list of character pages
                const characterPages = data.query.categorymembers;
                // Extract character names from page objects
                const characterNames = characterPages.map((page) => page.title);
                const characterDataRequests = characterNames.filter(name => !excludedNames.includes(name)).map((name) =>
                    fetch(`/api.php?action=parse&page=${encodeURIComponent(name)}&prop=wikitext&format=json`)
                        .then((response) => response.json())
                        .then((data) => {
                            
                            //the data.parse.wikitext key is '*' for some reason
                            const wikitext = data.parse.wikitext['*'];
                            const regex = /quality\s*=\s*(\d+)/;
                            const match = wikitext.match(regex);
                            const quality = match ? parseInt(match[1]) : null;
                            
                            return {id: Math.random().toString(16).slice(2), name: name, quality: quality}            
                        })
                );
                
                Promise.all(characterDataRequests)
                    .then((characters) => {    
                        setSpecificCharacter(characters);
                    });
                
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

  return (
    <>
      <h1>Characters</h1>
      <ul>
        {specificCharacter.map((item) => (
          <li className="gacha-character" key={item.id}>
            {item.name} {item.quality}*
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
