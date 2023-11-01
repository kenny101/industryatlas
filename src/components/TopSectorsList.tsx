import { useAtomValue } from 'jotai'
import { yearAtom, hoveredCountyAtom, hoveredStateCodeAtom, topSectorsMapAtom, selectedSectorAtom } from "../App";

type TopSectorsMap = {
  [county: string]: string[];
};

const TopSectorsList = () => {
  const year = useAtomValue(yearAtom);
  const hoveredCounty = useAtomValue(hoveredCountyAtom);
  const topSectorsMap: TopSectorsMap = useAtomValue(topSectorsMapAtom);
  const hoveredStateCode = useAtomValue(hoveredStateCodeAtom);
  const selectedSector = useAtomValue(selectedSectorAtom);
  const topSectorsKey = `${hoveredCounty}, ${hoveredStateCode}`
  const topSectors = topSectorsMap[topSectorsKey];

  if (year === "YEAR") {
    return (
      <div className="m-5 w-80">
        <div className="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Select a year and sector to display top sectors for each hovered county</span>
        </div>
      </div>
    );
  }

  if (selectedSector === "") {
    return (
      <div className="m-5 w-80">
        <div className="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Select a sector</span>
        </div>
      </div>
    );
  }

  if (!topSectors || topSectors.length === 0) {
    return (
      <div className="m-5 w-80">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          Top 10 Sectors in <span>{hoveredCounty}</span> in <span>{year}</span>:
        </h2>
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>No Top Sectors Data Avaliable for {hoveredCounty}, {hoveredStateCode}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="m-5">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        Top 10 Sectors in <span>{hoveredCounty}</span> in <span>{year}</span>:
      </h2>
      <ol className="max-w-md space-y-1 text-gray-900 list-decimal list-inside tracking-normal font-medium">
        {topSectors.slice(0, 10).map((sectorValue, _) => (
          <li key={sectorValue}>
            <span className="font-semibold text-gray-900">{sectorValue.split(": ")[0]}</span>:&nbsp;
            <span className="font-semibold text-gray-900">{sectorValue.split(": ")[1]}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopSectorsList;
