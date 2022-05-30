import axiosInstance from "../../services/AxiosInstance";

export const getNotification = async (url, setNotifications) => {
    await axiosInstance
      .get(url)
      .then((res) => {
        console.log("get notification function", res?.data)
        if (res?.data?.length === 0) {
          setNotifications(null)
        }
        else
        setNotifications(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  export const updateNotificationStatus = async (url, setNotifications) => {
    await axiosInstance
      .put(url)
      .then((res) => {
        console.log("update notification function", res?.data)
        if (res?.data?.length === 0) {
          setNotifications(null)
        }
        else
        setNotifications(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  