const TopSectorsList = () => {
    // Dummy data
    const dummyData = [
      { name: 'Bonnie Green', points: 70 },
      { name: 'Jese Leos', points: 63 },
      { name: 'Leslie Livingston', points: 57 },
      { name: 'John Doe', points: 55 },
      { name: 'Jane Smith', points: 52 },
      { name: 'Alice Johnson', points: 49 },
      { name: 'Bob Wilson', points: 45 },
      { name: 'Eva Davis', points: 42 },
      { name: 'Mike Brown', points: 39 },
      { name: 'Emily White', points: 36 }, // One more entry
    ];
  
    return (
      <div className="m-5">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          Top 10 Sectors in <span>COUNTY</span> in <span>YEAR:</span>
        </h2>
        <ol className="max-w-md space-y-1 text-gray-900 list-decimal list-inside">
          {dummyData.slice(0, 10).map((entry, index) => (
            <li key={index}>
              <span className="font-semibold text-gray-900">{entry.name}</span> with{' '}
              <span className="font-semibold text-gray-900">{entry.points}</span> points
            </li>
          ))}
        </ol>
      </div>
    );
  };
  
  export default TopSectorsList;
  