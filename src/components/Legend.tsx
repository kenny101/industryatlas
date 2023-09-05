import './Legend.css';
import {
  useState
} from 'react';

/**
 * Determine the color code based on a value and predefined grade ranges.
 * @param {number} value - The value to be used for determining the color.
 * @param {number[]} grades - An array of grade ranges for color mapping.
 * @returns {string} The color code associated with the given value.
 */
function getColor(value: number, grades: number[]): string {
  const colorIndex = grades.findIndex(grade => value <= grade);
  switch (colorIndex) {
    case 0:
      return "#ffffcc"; // Replace with your desired color
    case 1:
      return "#ffeda0"; // Replace with your desired color
    case 2:
      return "#fed976"; // Replace with your desired color
    case 3:
      return "#feb24c"; // Replace with your desired color
    case 4:
      return "#fd8d3c"; // Replace with your desired color
    case 5:
      return "#fc4e2a"; // Replace with your desired color
    case 6:
      return "#e31a1c"; // Replace with your desired color
    default:
      return "#b10026"; // Replace with your desired color
  }
}


interface LegendProps {
  // Define any props if needed
}

const Legend: React.FC<LegendProps> = () => {
  const [grades, _] = useState<number[]>([0, 10, 20, 50, 100, 200, 500, 1000]);

  return (
    <div className="legend bg-orange-50">
      {grades.map((grade, index) => (
        <div key={index} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: getColor(grade, grades) }}
          ></span>
          <span className="legend-label font-semibold text-sm">
            {index === 0 ? `< ${grade}` : `${grades[index - 1]} - ${grade}`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
