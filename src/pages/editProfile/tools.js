import axiosInstance from "../../services/AxiosInstance";

export const getTags = async (url, setTags) => {
  const data = await axiosInstance.get(url).catch((err) => {
    console.error(err);
  });
  const tags = data.data;
  const temp = tags.map((tag, index) => {
    return { titel: tag.tag_name, link: "#", tagId: tag.tag_id };
  });
  setTags(temp);
};

export const getUser = async (url, setUserDetails) => {
  await axiosInstance
    .get(url)
    .then((res) => {
      setUserDetails({
        userName: res.data?.user_name,
        firstName: res.data?.first_name,
        lastName: res.data?.last_name,
        email: res.data?.email,
        bio: res.data?.bio,
        age: res.data?.age,
        gender: res.data?.gender,
        preference: res.data?.preference,
        photoProfileId: res.data?.photo_profile_id,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updateUser = async (url, param, setUserDetails, history) => {
  console.info("param", param);

  const res = await axiosInstance.put(url, param).catch((err) => {
    console.error(err);
  });

  setUserDetails({
    userName: res.data?.user_name,
    firstName: res.data?.first_name,
    lastName: res.data?.last_name,
    email: res.data?.email,
    bio: res.data?.bio,
    age: res.data?.age,
    gender: res.data?.gender,
    preference: res.data?.preference,
    photoProfileId: res.data?.photo_profile_id,
  });
  history.push("/profile");
};

export const getUserImages = async (url, setImageDetails) => {
  await axiosInstance
    .get(url)
    .then((res) => {
      setImageDetails(res?.data);
    })
    .catch((err) => {
      console.error(err);
    });
};