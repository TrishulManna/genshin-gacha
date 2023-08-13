import ThreeStars from "../data/3stars.json";
import FourStars from "../data/4stars.json";
import FiveStars from "../data/5stars.json";
import Banners from "../data/banners.json"

const threeStars = ThreeStars;
const fourStars = FourStars;
const fiveStars = FiveStars;
const banners: Array<{name:string; rateUp:string[]; fiveStar: string }> = Banners;

let defaultValues:any = {
  banner: "Drifting Luminescence",
  amount: 1
}

let fourStarCount:number = 0;
let fiveStarCount:number = 0;

let lastFourStar:any = {name : ""};
let lastFiveStar:any = "";

const allPulls:object[] = [];

function ActionButton({ name, customClass, onClick} : {name:string, customClass:string, onClick:any}) {
  return (
    <button className={customClass} onClick={onClick}>
      {name}
    </button>
  )
}

function DropdownList({ name, id, value, defaultValue} : {name:string, id:string, value: string[] | number[], defaultValue: string | number}) {
  const updateValue = (event:any) => {
    defaultValues[defaultValue] = event.target.value;    
    allPulls.length = 0;
    fourStarCount = 0;
    fiveStarCount = 0;
  };

  return (
    <select name={name} id={id} onChange={updateValue} className="bg-[var(--secondary-color)] rounded p-1">
      {value.map((value, index) => (
        <option key={index} value={value}>{value}</option>
      ))}
    </select>
  )
}

const handleResetGacha = () => {
  allPulls.length = 0;
  fourStarCount = 0;
  fiveStarCount = 0;
};

const handleRunGacha = (amount:any) => {
  let chanceFiveStar = 0.6
  let chanceFourStar = 5.1
  let chanceThreeStart = 94.3
  
  // const randomValue =  0.1; // Generate a random float between 0 and 100  
  for (let index = 0; index < parseInt(amount); index++) {
    const randomValue = Math.random() * 100; // Generate a random float between 0 and 100  
    if (randomValue <= chanceFiveStar || fiveStarCount === 89) {
      // List all 5 star standard characters.
      // Check current banner 
      // Get name of the 5 star character on the current banner
      // Check if last 5 star was the banner character
      // If so, push a random standard character/weapon
      // Else push the 5 star banner character
  
      let standardFiveStars = fiveStars.filter(item => item.standard === true);
      let currentBanner = banners.find(banner => banner.name === defaultValues.banner);
      let bannerCharacter = currentBanner?.fiveStar;
  
      if(bannerCharacter != null && lastFiveStar.name === bannerCharacter){
        let randomStandardFiveStar = standardFiveStars[Math.floor(Math.random() * standardFiveStars.length)];
  
        allPulls.push(randomStandardFiveStar);
        lastFiveStar = randomStandardFiveStar;
  
      }else{
        let bannerFiveStar:any = fiveStars.find(character => character.name === bannerCharacter);
        allPulls.push(bannerFiveStar);
        lastFiveStar = bannerFiveStar;
      }
  
      fiveStarCount = 0;
  
      // console.log("Five Star", allPulls)
    } else if (randomValue <= chanceFiveStar + chanceFourStar || fourStarCount === 9) {
      // Check current banner
      // Get array of character names of current banner
      // Check if current fourStar character is in this banner
      // If so, push a random 4 star character/weapon
      // Else filter fourStarCharacter array with only the characters from the banner and push to array
  
      let randomFourStar = fourStars[Math.floor(Math.random() * fourStars.length)];
      let currentBanner = banners.find(banner => banner.name === defaultValues.banner);
      let bannerCharacters = currentBanner?.rateUp;
      
      if(bannerCharacters != null && bannerCharacters.some((x) => x === lastFourStar.name)){
        allPulls.push(randomFourStar);
        lastFourStar = randomFourStar;
  
      }else if(bannerCharacters != null){
        let filterFourStarList = fourStars.filter(item => bannerCharacters?.includes(item.name));
        let filteredRandomFourStar = filterFourStarList[Math.floor(Math.random() * filterFourStarList.length)];
  
        allPulls.push(filteredRandomFourStar);
        lastFourStar = filteredRandomFourStar;
      }
  
      fourStarCount = 0;
      fiveStarCount++;
  
      // console.log("Four Star", allPulls, lastFourStar);
    } else {
      allPulls.push(threeStars[Math.floor(Math.random() * threeStars.length)]);
      fourStarCount++
      fiveStarCount++
      
      // console.log("Three Star", allPulls)
    }
  }  
};

export default function Form({ sendDataToParent }: any) {
  const wishAmountList:number[] = [1, 10]
  const bannerNames:string[] = banners.map(item => item.name);

  const actionButtonDefault:string = "px-2.5 py-1.5 flex items-center justify-center min-w-[40%] rounded-lg"
  const actionButtonCustoms = [
    actionButtonDefault + ' bg-[var(--secondary-color)] text-[var(--primary-color)]',
    actionButtonDefault + ' bg-[var(--primary-color)] text-[var(--secondary-font)]',
  ]

  function sendData(){
    sendDataToParent(allPulls);
  }
  return (
    <section className="flex-1 flex flex-col gap-2.5">
      <header>Aeronz Gacha simulator / github</header>
      <h1 className="text-2xl py-1">Configurate your wish</h1>
      <section className="flex-1 border p-2.5 rounded-xl text-xl flex flex-col gap-2.5">
        <section className="flex justify-between ">
          <p>Banner:</p>
          <DropdownList name="banner list" id="banner-list" value={bannerNames} defaultValue="banner"></DropdownList>
        </section>
        <section className="flex justify-between">
          <p>Wish amount:</p>
          <DropdownList name="wish amount" id="wish-amount" value={wishAmountList} defaultValue="amount"></DropdownList>
        </section>
      </section>
      <footer className="flex justify-between">
        <ActionButton name="Reset" customClass={actionButtonCustoms[0]} onClick={() => {handleResetGacha(); sendData();}}></ActionButton>
        <ActionButton name="Wish!" customClass={actionButtonCustoms[1]} onClick={() => {handleRunGacha(defaultValues.amount); sendData();}}></ActionButton>
      </footer>
    </section>
  );
}
