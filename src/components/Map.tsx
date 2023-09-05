import { useMemo } from "react";
import { MapContainer, ScaleControl, GeoJSON } from "react-leaflet";
import mapData from "../assets/counties.json";
import worldData from "../assets/worldOutline.json";
import './Map.css';
const countyLayers: any = [];

var val: any;
var percentage: Number | null = null;

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

const renderedMap = () => {
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

          <GeoJSON style={worldStyle} data={worldData.features}></GeoJSON>
          <GeoJSON
            style={countyStyle}
            data={mapData.features}
            onEachFeature={onEachCounty}
          ></GeoJSON>
        </MapContainer>
      </div>
    );
  }, []);
  return map;
};

const onEachCounty = (county: any, layer: any) => {
  const [countyName, stateName] = county.properties.COUNTY_STATE_NAME.split(',').map(part => part.trim());
  countyLayers.push([layer, county]);
  layer.bindPopup(
    "<p><b>State<b/>: " +
    stateName +
    " <br>County: " +
    countyName +
    " <br>Total Employed: " +
    val +
    " <br>Employed %: " +
    percentage +
    "</p>",
    { closeButton: false }
  );

  layer.on("mouseover", function (e) {
    layer.openPopup(e.latlng, layer.setStyle(onHoverStyle));
  });

  layer.on("mouseout", function (e) {
    layer.closePopup(layer.setStyle(defaultLayerStyle));
  });
};




export default renderedMap;
