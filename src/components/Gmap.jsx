import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import Box from "@mui/material/Box";

const containerStyle = {
  width: "90%",
  height: "80vh",
};
const options = {
  fillOpacity: 0,
  strokeColor: "red",
  strokeWeight: 4,
};

function Map() {
  const [paths, setPaths] = React.useState([]);
  React.useEffect(() => {
    fetch(`https://locate-ov51.onrender.com`)
      .then((res) => res.json())
      .then((data) => setPaths(data))
      .catch((Err) => console.log(Err));
  }, []);

  const center = paths[0];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCRIlHB_c3cKshWsyqetyitAWueReoUP9A",
  });
  return isLoaded ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: "10px",
        borderRadius: "10px",
        zIndex:'modal'
      }}
    >
      <GoogleMap mapContainerStyle={containerStyle} 
      options={{
        // zoomControl:false,
        streetViewControl:false,
        mapTypeControl:false,
        fullscreenControl:false
      }}
      center={center} zoom={8}>
        {paths.map((item) => {
          return (
            <Marker
              position={{ lat: item.lat, lng: item.lng }}
              key={item.lat}
              style={{ with: 1 }}
            />
          );
        })}
        <Polygon paths={paths} options={options} />
      </GoogleMap>
    </Box>
  ) : (
    <></>
  );
}

export default React.memo(Map);
