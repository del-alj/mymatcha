import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { AddNew } from "./addNew";
import {
  Div,
  Img,
  PicButton,
  Add,
  Text,
  Uploadpicture,
  DeleteButton,
  DeleteIcon,
} from "./style";

import del from "../../assets/icons/del.png";

// On file select (from the pop up)
const BASE_URL = process.env.REACT_APP_BASE_URL;

const user_id = localStorage.getItem("userId");

const url = `${BASE_URL}/user/edit/photoprofile/${user_id}`;
const urldelete = `${BASE_URL}/picture/${user_id}`;

const token = JSON.parse(localStorage.getItem("Token"));
const config = {
  headers: {
    "content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const Gallery = (props) => {
  let history = useHistory();
  const [profilePicture, setprofilePicture] = useState();
  const [disable, setDisable] = useState(true);

  const { pictures } = props;

  const updateImgProfile = async (url, param, config) => {
    await axios
      .put(url, param, config)
      .then((res) => {
        console.log("photo  profile updated !!");
        history.push("/profile");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateImgselect = (e) => {
    setprofilePicture({ photoProfileId: e.target.selected });
    setDisable(false);
  };

  return (
    <>
      <Div>
        {pictures.map((picture, index) => (
          <div
            style={{
              width: "33.33%",
            }}
          >
            <Img
              key={index}
              src={picture?.image_path}
              selected={picture?.image_id}
              onClick={updateImgselect}
              // classname={`photo_${index}`}
              // focus={profilePicture}
            />
          </div>
        ))}
      </Div>
      <PicButton
        disabled={disable}
        onClick={() => {
          updateImgProfile(url, profilePicture, config);
        }}
      >
        Submit
      </PicButton>
    </>
  );
};

export const EditGallery = (props) => {
  const { pictures } = props;
  const status = pictures.length !== 0 ? false : true;

  const [files, setFiles] = useState([]);
  const [disable, setDisable] = useState(true);

  const uploadFile = (e) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    [...files].map((file) => formData.append("Picture", file, file.name));

    // Request made to the backend api
    // Send formData object
    console.log(files);
    console.log(formData.getAll("Picture"));
  };

  const constdeleteImg = async (url, param, config) => {
    await axios
      .delete(`${url}/${param}`, config)
      .then((res) => {
        console.log("delete photo!!");
        //khesni ndire update n context image
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Div status={status}>
        {pictures.map((picture, index) => (
          <div
            style={{
              width: "33.33%",
              position: "relative",
            }}
          >
            <Img key={index} src={picture?.image_path} />
            <DeleteButton
              onClick={() => {
                constdeleteImg(urldelete, picture?.image_id, config);
                console.log("here delete picture");
              }}
            >
              <DeleteIcon src={del} alt="" />
            </DeleteButton>
          </div>
        ))}
        <AddNew
          files={files}
          setFiles={setFiles}
          setDisable={setDisable}
          style={{ width: "500px" }}
        ></AddNew>
      </Div>
      <PicButton disabled={disable} onClick={uploadFile}>
        Submit
      </PicButton>
    </>
  );
};
