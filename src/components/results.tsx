import { useEffect } from "react";

export default function Results({ receivedData }: any) {
  useEffect(() => {
    let el:any = document.getElementById("gacha-results-container");
    
    el.scrollTop = el?.scrollHeight;

  }, [receivedData]);

  return (
    <section className="flex-1 bg-[var(--primary-color)] rounded-[28px] p-2.5 overflow-y-auto max-h-full min-w-[255px]" id="gacha-results-container">
      <p className="text-[var(--secondary-font)] text-center text-xl">Gacha Results</p>
      <div className="text-[var(--secondary-font)] grid gap-1">
        {receivedData ? (
          receivedData.map((value:any, index:number) => (
            <div className={value.rarity === 5 ? 'bg-[hsl(180_1%_81%_/_0.3)] outline p-1 rounded' : value.rarity === 4 ? 'bg-[hsl(180_1%_81%_/_0.3)] p-1 rounded' : ''} key={index}>{value.name}</div>
          ))
        ) : (
          <div>No data yet</div>
        )}
      </div>
    </section>
  )
}
