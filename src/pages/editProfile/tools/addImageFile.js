import React, { useEffect, useState } from "react";

import {
  AddPhoto,
  Text,
  Uploadpicture,
} from "../../../Components/pictures/style";
import { PhotoProfile } from "../../userProfile/style";

export const AddImageFile = ({ files, setFiles, setDisable }) => {
  const [imagesURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (files?.length < 1) return;
    const newImagesUrls = [];

    if (files?.length > 0) {
      console.log();
      [...files].forEach((file) =>
        newImagesUrls.push(URL.createObjectURL(file))
      );
    }
    setImageURLs(newImagesUrls);
  }, [files]);

  // On file select (from the pop up)
  const onFileChange = (e) => {
    // Update the state
    console.log("this is file :", e.target);
    setFiles(e.target.files);
    setDisable(false);
  };

  return (
    <div>
      {imagesURLs[0] ? (
        <PhotoProfile src={`url(${imagesURLs[0]})`} alt="Photo Profile" />
      ) : (
        <AddPhoto>
          <Uploadpicture type="file" onChange={onFileChange} />
          <Text>+</Text>
        </AddPhoto>
      )}
    </div>
  );
};