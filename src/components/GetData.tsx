// import { useState, useEffect } from "react";

// const WishesList = () => {
//   const [characters, setCharacters] = useState([]);

//   useEffect(() => {
//     const fetchWishes = async () => {
//       try {
//         const response = await fetch(
//           'https://api.genshin.dev/weapons'
//         );
//         const data = await response.json();
//         console.log('test1', data);
        
//         // const response2 = await fetch(
//         //   'https://api.genshin.dev/weapons' + data[0]
//         // );
//         // const data2 = await response.json();
//         // console.log('response', data2)
//         setCharacters(data)
        
//       } catch (error) {
//         console.error('Error fetching wishes:', error);
//       }
//     };
    
//     fetchWishes();
//     console.log('test2', characters);

//   }, []);

//   return (
//     <div>
//       <h2>Current Banner Characters</h2>
//     </div>
//   );
// };

// function MyButton() {
//   return (
//     <button>I'm a button</button>
//   );
// }

let allWeapons:[] = [];
let allWeaponsList:any = [];

const fetchWishes = async () => {
  try {
    const response = await fetch(
      'https://api.genshin.dev/characters'
    );
    const data = await response.json();
    // console.log('test1', data);

    allWeapons = data;
  } catch (error) {
    console.error('Error fetching wishes:', error);
  }
  
  allWeapons.forEach(async element => {
    try{
      const response = await fetch(
        'https://api.genshin.dev/characters/' + element
      );
      const data = await response.json();
      if(data.rarity === 5){
        allWeaponsList.push({
          "name" : data.name,
          "rarity": data.rarity,
          "gachaType": "character"
        });
      }
      
    } catch (error){
      console.error('Error fetching wishes:', error);
    }
  });
  console.log('allWeaponsList', allWeaponsList)
};

fetchWishes(); 
// console.log('allWeapons', allWeapons)

export default function MyApp() {
  return (
    <div>
      <div>{JSON.stringify(allWeaponsList)}</div>
      <h1>Welcome to my app</h1>
    </div>
  );
}
