import IconExport from "../assets/IconExport";
import IconGlobeAmericas from "../assets/IconGlobe";
import TopSectorsList from "./TopSectorsList";
import IconGithub from "../assets/IconGithub";
import IconPaper from "../assets/IconPaper";
import Select, { StylesConfig } from "react-select";
import { useAtom } from "jotai";
import {
  yearAtom,
  sectorOptionsAtom,
  quantilesAtom,
  employmentAtom,
  topSectorsMapAtom,
  selectedSectorAtom,
} from "../App";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://industryatlas.org");
pb.collection("users").authWithPassword("guest", "industryatlas");
pb.autoCancellation(false);

const startYear = 1975;
const endYear = 2016;
const options = Array.from({ length: endYear - startYear + 1 }, (_, index) => ({
  value: startYear + index,
  label: (startYear + index).toString(),
}));
const customStyles: StylesConfig = {
  container: (provided) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided) => ({
    ...provided,
    width: "90%",
  }),
  menu: (provided) => ({
    ...provided,
    width: "90%",
  }),
};

const exportMap = new Map<string, string>();

async function getAllExportUrls() {
  const records = await pb.collection("export").getFullList();
  for (const record of records) {
    const { file, year } = record;
    let valueUrl = pb.getFileUrl(record, file);
    exportMap.set(year, valueUrl);
  }
}

getAllExportUrls();



const Navbar = () => {
  const [year, setYear] = useAtom(yearAtom);
  const [sectorOptions, setSectorOptions] = useAtom(sectorOptionsAtom);
  const [, setQuantiles] = useAtom(quantilesAtom);
  const [, setEmployment] = useAtom(employmentAtom);
  const [, setTopSectorsMap] = useAtom(topSectorsMapAtom);
  const [selectedSector, setSelectedSector] = useAtom(selectedSectorAtom);

  function resetData(){
    setQuantiles([0, 10, 20, 50, 100, 200, 500, 1000]);
    setEmployment({});
    setTopSectorsMap({});
  }

  async function updateSectors(sectorToUpdate: any) {
    resetData();
    setSelectedSector(sectorToUpdate);
    const querySector = sectorToUpdate.value.toString();
    const record = await pb
      .collection(`counties_${year}`)
      .getFirstListItem(`sector~"${querySector}"`);
    setQuantiles(record["quantiles"]);
    const employmentMap: any = {};
    record["employment"].forEach((entry: { [x: string]: number }) => {
      const county = entry["County"];
      const state = entry["State"];
      employmentMap[`${county}, ${state}`] = [entry["Percent"], entry["Value"]];
    });

    setEmployment(employmentMap);

    const records = await pb
      .collection(`sectors_${year}`)
      .getFullList({ perPage: 5000 });
    const countyToTopSectorsMap: { [key: string]: string[] } = {};
    records.forEach((record) => {
      const topSectors = record.topSectors;
      countyToTopSectorsMap[record.county] = topSectors;
    });

    setTopSectorsMap(countyToTopSectorsMap);
  }

  return (
    <div className="rounded-r flex justify-start items-start h-screen w-96 bg-orange-100 flex-col border border-gray-300">
      <div className="flex justify-start p-6 items-center space-x-3">
        <IconGlobeAmericas />
        <p className="self-center text-3xl font-semibold tracking-tighter font-mono">
          Industry Atlas
        </p>
      </div>

      <div className="mt-5 flex flex-col justify-start items-center pl-4 w-full border-gray-600">
        <div className="mb-2 flex justify-start items-center space-x-2 w-full focus:outline-none rounded">
          <p className="text-lg leading-4 text-black font-semibold">Year:</p>
        </div>
        <Select
          options={options}
          styles={customStyles}
          placeholder="Select a year"
          onChange={async (selectedYear) => {
            if (typeof selectedYear === "object" && selectedYear !== null) {
              const selectedOption = selectedYear as {
                value: number;
                label: string;
              };
              setYear(selectedOption.value.toString());
              let value = selectedOption.value;
              var queryYear = "1975";
              if (value >= 2012 && value <= 2016) {
                queryYear = "2012-2016";
              } else if (value >= 2008 && value <= 2011) {
                queryYear = "2008-2011";
              } else if (value >= 2003 && value <= 2007) {
                queryYear = "2003-2007";
              } else if (value >= 1998 && value <= 2002) {
                queryYear = "1998-2002";
              } else if (value >= 1988 && value <= 1997) {
                queryYear = "1988-1997";
              } else if (value >= 1975 && value <= 1986) {
                queryYear = "1975-1986";
              } else if (value == 1987) {
                queryYear = "1987";
              }

              if (selectedSector !== "") {
                updateSectors(selectedSector);
              }

              if (queryYear >= year || year <= queryYear) {
                return;
              }
              const record = await pb
                .collection("years")
                .getFirstListItem(`year~"${queryYear}"`);
              setSectorOptions(record["sectors"]);
            }
          }}
        />
        <div className="mb-2 mt-5 flex justify-start items-center space-x-2 w-full focus:outline-none rounded">
          <p className="text-lg leading-4 text-black font-semibold">Sector:</p>
        </div>
        <Select
          options={sectorOptions}
          styles={customStyles}
          placeholder="Select a sector"
          onChange={async (sector: any) => {
            updateSectors(sector);
          }}
        />
      </div>
      <TopSectorsList />
      <div className="mt-auto space-y-32">
        <div className="btn-group w-96 flex border-gray-300">
          <a
            href="https://github.com/kenny101/industryatlas"
            className="flex-1 btn border-gray-300 bg-orange-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github <IconGithub />
          </a>
          <a
            href="http://fpeckert.me/cbp/efsy.pdf"
            className="flex-1 btn border-gray-300 bg-orange-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            Research <IconPaper />
          </a>
          <a
            href={exportMap.get(year)}
            className="flex-1 btn border-gray-300 bg-orange-50"
          >
            Export <IconExport />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
