import { useMemo, useEffect, useState } from "react";
import { MapContainer, ScaleControl, GeoJSON } from "react-leaflet";
import mapData from "../assets/counties.json";
import worldData from "../assets/worldOutline.json";
import './Map.css';
import { useAtom, useAtomValue } from "jotai";
import { hoveredCountyAtom, hoveredStateAtom, hoveredStateCodeAtom, quantilesAtom, employmentAtom } from "../App";


const defaultLayerStyle = {
  fillOpacity: 1,
  weight: 0.5,
};

const onHoverStyle = {
  weight: 2,
  fillOpacity: 0.5,
};

const countyStyle = {
  fillColor: "#ffedd5", // Hexadecimal color code for bright orange
  fillOpacity: 1,
  color: "black",
  weight: 0.5,
};

const worldStyle = {
  fillColor: "black",
  fillOapcity: 1,
  color: "black",
  weight: 0,
};

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

const renderedMap = () => {
  const [, setHoveredCounty] = useAtom(hoveredCountyAtom);
  const [, setHoveredState] = useAtom(hoveredStateAtom);
  const [, sethoveredStateCodeAtom] = useAtom(hoveredStateCodeAtom);
  const grades = useAtomValue(quantilesAtom);
  const employmentMap: any = useAtomValue(employmentAtom);
  const [counties,]: any = useState([]);
  const [layers,]: any = useState([]);

  useEffect(() => {
    // Loop through the counties and layers arrays
    for (let i = 0; i < counties.length; i++) {
      const county = counties[i];
      const layer = layers[i];

      // Call onEachCounty with the current county and layer
      onEachCountyRerender(county, layer);
    }
  }, [employmentMap]);

  const onEachCountyRerender = (county: any, layer: any) => {
    const [countyName, stateName] = county.properties.COUNTY_STATE_NAME.split(',').map((part: string) => part.trim());
    const stateCode = county.properties.COUNTY_STATE_CODE.split(', ')[1]
    let employmentPercent = undefined;
    let employmentTotal = undefined;
    const employmentMapKey = `${countyName}, ${stateCode}`;

    if (employmentMap[employmentMapKey]) {
      employmentPercent = employmentMap[employmentMapKey][0];
      employmentTotal = employmentMap[employmentMapKey][1];
    }


    if (employmentTotal) {
      layer.setStyle({
        fillColor: getColor(parseInt(employmentTotal), grades),
      });

    }

    layer.bindPopup(
      "<p><b>State<b/>: " +
      stateName +
      " <br>County: " +
      countyName +
      " <br>Total Employed: " +
      employmentTotal +
      " <br>Employed %: " +
      employmentPercent +
      "</p>",
      { closeButton: false }
    );

    layer.on("mouseover", function (e: L.LeafletMouseEvent) {
      setHoveredCounty(countyName);
      setHoveredState(stateName);
      sethoveredStateCodeAtom(stateCode);
      layer.openPopup(e.latlng, layer.setStyle(onHoverStyle));
    });

    layer.on("mouseout", function () {
      layer.closePopup(layer.setStyle(defaultLayerStyle));
    });

  };


  const onEachCounty = (county: any, layer: any) => {
    counties.push(county);
    layers.push(layer);

    const [countyName, stateName] = county.properties.COUNTY_STATE_NAME.split(',').map((part: string) => part.trim());
    const stateCode = county.properties.COUNTY_STATE_CODE.split(', ')[1]
    let employmentPercent = undefined;
    let employmentTotal = undefined;
    const employmentMapKey = `${countyName}, ${stateCode}`;

    if (employmentMap[employmentMapKey]) {
      employmentPercent = employmentMap[employmentMapKey][0];
      employmentTotal = employmentMap[employmentMapKey][1];
    }

    layer.bindPopup(
      "<p><b>State<b/>: " +
      stateName +
      " <br>County: " +
      countyName +
      " <br>Total Employed: " +
      employmentTotal +
      " <br>Employed %: " +
      employmentPercent +
      "</p>",
      { closeButton: false }
    );

    layer.on("mouseover", function (e: L.LeafletMouseEvent) {
      setHoveredCounty(countyName);
      setHoveredState(stateName);
      sethoveredStateCodeAtom(stateCode);
      layer.openPopup(e.latlng, layer.setStyle(onHoverStyle));
    });

    layer.on("mouseout", function () {
      layer.closePopup(layer.setStyle(defaultLayerStyle));
    });

  };


  const map = useMemo(() => {
    return (
      <div className="map-container font-mono">
        <MapContainer
          doubleClickZoom={false}
          id="mapId"
          center={{ lat: 38, lng: -95 }}
          style={{ height: "100vh" }}
          zoom={5}
          attributionControl={false}
        >
          <ScaleControl />
          <GeoJSON style={worldStyle} data={worldData.features as any}></GeoJSON>
          <GeoJSON
            style={countyStyle}
            data={mapData as any}
            onEachFeature={onEachCounty}
          ></GeoJSON>
        </MapContainer>
      </div>
    );
  }, []);
  return map;
};

export default renderedMap;