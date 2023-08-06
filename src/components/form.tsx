import ThreeStars from "../data/3stars.json";
import FourStars from "../data/4stars.json";
import FiveStars from "../data/5stars.json";

const threeStars = ThreeStars;
const fourstars = FourStars;
const fiveStars = FiveStars;

let fourStarCount = 0;
let fiveStarCount = 0;

function ActionButton({ name, customClass, onClick} : {name:string, customClass:string, onClick:any}) {
  return (
    <button className={customClass} onClick={onClick}>
      {name}
    </button>
  )
}

function DropdownList({ name, id, value} : {name:string, id:string, value: string[] | number[]}) {
  return (
    <select name={name} id={id} className="bg-[var(--secondary-color)] rounded p-1">
      {value.map((value, index) => (
        <option key={index} value={value}>{value}</option>
      ))}
    </select>
  )
}

const handleResetGacha = (test1:string) => {
  //Create a chance to loop through a pool

  //Return an element from that pool

  //Check banner characters
};

const handleRunGacha = (test2:string) => {
  let chanceFiveStar = 0.6
  let chanceFourStar = 5.1
  let chanceThreeStart = 94.3
  
  const randomValue = Math.random() * 100; // Generate a random float between 0 and 100
  console.log(' randomValue', randomValue)
  console.log('fourStarCount', fourStarCount);
  console.log('fiveStarCount', fiveStarCount);
  
  
  if (randomValue <= chanceFiveStar || fiveStarCount === 90) {
    fiveStarCount = 0
    console.log("Five Star")
    return "Five Star";
  } else if (randomValue <= chanceFiveStar + chanceFourStar || fourStarCount === 10) {
    fourStarCount = 0
    fiveStarCount++
    console.log("Four Star")
    return "Four Star";
  } else {
    console.log("Three Star")
    fourStarCount++
    fiveStarCount++
    return "Three Star";
  }
};

export default function MyApp() {
  const bannerList:string[] = ["Drifting Luminescence", "From Ashes Reborn"]
  const wishAmountList:number[] = [1, 10]

  const actionButtonDefault:string = "px-2.5 py-1.5 flex items-center justify-center min-w-[40%] rounded-lg"
  const actionButtonCustoms = [
    actionButtonDefault + ' bg-[var(--secondary-color)] text-[var(--primary-color)]',
    actionButtonDefault + ' bg-[var(--primary-color)] text-[var(--secondary-font)]',
  ]

  return (
    <section className="flex-1 flex flex-col gap-2.5">
      <header>Aeronz Gacha simulator / github</header>
      <h1 className="text-2xl py-1">Configurate your wish</h1>
      <section className="flex-1 border p-2.5 rounded-xl text-xl flex flex-col gap-2.5">
        <section className="flex justify-between ">
          <p>Banner:</p>
          <DropdownList name="banner list" id="banner-list" value={bannerList}></DropdownList>
        </section>
        <section className="flex justify-between">
          <p>Wish amount:</p>
          <DropdownList name="wish amount" id="wish-amount" value={wishAmountList}></DropdownList>
        </section>
      </section>
      <footer className="flex justify-between">
        <ActionButton name="Reset" customClass={actionButtonCustoms[0]} onClick={() => handleResetGacha("phandleResetGacha")}></ActionButton>
        <ActionButton name="Wish!" customClass={actionButtonCustoms[1]} onClick={() => handleRunGacha("handleRunGacha")}></ActionButton>
      </footer>
    </section>
  );
}
