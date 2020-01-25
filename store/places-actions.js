import * as FileSystem from "expo-file-system";
import axios from "axios";
import FormData from "form-data";
import { Buffer } from "buffer";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
import { insertPlace, fetchPlaces } from "../helpers/db";

// let dataInBuffer = new Buffer.from( [0x00, 0x10, 0x20, 0x30, 0x40, 0x50, 0x60, 0x70, 0x80, 0x90, 0xA0, 0xB0, 0xC0, 0xD0, 0xE0, 0xF0, 0xFF] );

// let formData = new FormData();
// formData.append( 'id', 1 );
// formData.append( 'string', 'Text we want to add to the submit' );
// formData.append( 'file', dataInBuffer, {
//     filename:    'someFileName.bin',
//     contentType: 'application/octet-stream',
// } );

//image is temp path to the image
export const addPlace = (title, image) => {
  console.log("image", typeof image);
  return async dispatch => {
    //split by slashes and it converts this string into an arr of string segments
    //pop gives you the last segment
    let formdata = new FormData();
    const fileName = image.split("/").pop();

    // formdata.append("product[name]", "test");
    // formdata.append("product[price]", 10);
    // formdata.append("product[category_ids][]", 2);
    // formdata.append("product[description]", "12dsadadsa");
    formdata.append("image", {
      uri: image,
      fileName
    });
    try {
      fetch("https://b1b4146d.ngrok.io/image-upload", {
        method: "post",
        headers: {
          body: formdata
        }
      })
        .then(res => {
          console.log(Object.keys(res));
          console.log(res.status);
          console.log(res.ok);
          console.log(res.statusText);

          if (res.status === 422) {
            console.log("UPLOAD FAILED");
          }
        })
        .catch(err => {
          console.log(err);
        });
      //   axios
      //     .post("https://b1b4146d.ngrok.io/image-upload", formData._parts[2][0], {
      //       image
      //     })
      //     .then(res => console.log("SUCCESS RESPONSE:", res))
      //     .catch(err => console.log("ERROR RESPONSE:", err.message));

      const dbResult = await insertPlace(title, "dummy address", 15.6, 12.3);

      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title: title }
      });
    } catch (error) {
      console.log("ERROR", error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (error) {
      throw error;
    }
  };
};
