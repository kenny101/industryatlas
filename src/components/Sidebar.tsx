import IconExport from "../assets/IconExport";
import IconGlobeAmericas from "../assets/IconGlobe";
import TopSectorsList from "./TopSectorsList";
import YearSearch from "./YearSearch";
import SectorSearch from "./SectorSearch";
import IconGithub from "../assets/IconGithub";
import IconPaper from "../assets/IconPaper";
const Navbar = () => {
    return (
        <div className="rounded-r flex justify-start items-start h-screen w-96 bg-orange-100 flex-col border border-gray-300">
            <div className="flex justify-start p-6 items-center space-x-3">
                <IconGlobeAmericas />
                <p className="self-center text-3xl font-semibold tracking-tighter font-mono">Industry Atlas</p>
            </div>
            <div className="mt-5 flex flex-col justify-start items-center pl-4 w-full border-gray-600">
                <div className="flex justify-start items-center space-x-2 w-full focus:outline-none rounded">
                    <p className="text-lg leading-4 text-black font-semibold">Year:</p>
                </div>
                <YearSearch />
                <div className="mt-5 flex justify-start items-center space-x-2 w-full focus:outline-none rounded">
                    <p className="text-lg leading-4 text-black font-semibold">Sector:</p>
                </div>
                <SectorSearch />
            </div>
            <TopSectorsList />
            <div className="mt-auto space-y-32">
                <div className="btn-group w-96 flex border-gray-300">
                    <button className="flex-1 btn border-gray-300 bg-orange-50">Github <IconGithub /></button>
                    <button className="flex-1 btn border-gray-300 bg-orange-50">Research <IconPaper /></button>
                    <button className="flex-1 btn border-gray-300 bg-orange-50">Export <IconExport /></button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
