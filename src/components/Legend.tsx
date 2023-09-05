import './Legend.css';
import { useAtomValue } from 'jotai';
import { quantilesAtom } from '../App';

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
      return "#ffffd9";
    case 1:
      return "#edf8b1";
    case 2:
      return "#c7e9b4";
    case 3:
      return "#7fcdbb";
    case 4:
      return "#41b6c4";
    case 5:
      return "#1d91c0";
    case 6:
      return "#225ea8";
    default:
      return "#0c2c84";
  }
}

const Legend: React.FC = () => {
  const grades = useAtomValue(quantilesAtom);
  return (
    <div className="legend bg-orange-50">
      {grades.map((grade, index) => (
        <div key={index} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: getColor(grade, grades) }}
          ></span>
          <span className="legend-label font-semibold text-sm">
            {index === 0 ? `${grade}` : `${grades[index - 1]+1} - ${grade}`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
