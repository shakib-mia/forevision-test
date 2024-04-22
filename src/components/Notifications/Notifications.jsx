import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, tokenDetails } = useContext(ProfileContext);
  const [modifiedCount, setModifiedCount] = useState(0);
  // console.log(tokenDetails.iat, notifications[0].date);

  useEffect(() => {
    // setLoading(true);
    setError(null); // Reset error state on component mount or token change
    const config = {
      headers: { token },
    };

    axios
      .get(`${backendUrl}notifications`, config)
      .then(({ data }) => {
        setNotifications(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch notifications.");
        setLoading(false);
      });

    // Ensure cleanup if component unmounts during a pending request
    return () => {
      setLoading(false);
    };
  }, [token, modifiedCount]); // Dependency array to prevent infinite loops

  const markAsRead = (_id, notification) => {
    delete notification._id;
    notification.read = true;
    // console.log(_id, notification);

    axios
      .put(backendUrl + "notifications/" + _id, notification)
      .then(({ data }) => setModifiedCount(modifiedCount + data.modifiedCount));
  };

  // console.log(notifications.reverse());

  return (
    <div className="w-full 2xl:w-1/2 bg-grey-light rounded-2xl p-4 h-[392px] overflow-auto relative">
      <div className="flex justify-between bg-grey-light sticky top-0">
        <h4 className="text-heading-4-bold">Notifications</h4>
        {/* <button>Mark all as read</button> */}
      </div>
      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p>{error}</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-1">
          {notifications.reverse().map((notification, index) => (
            <li
              title="click to mark as read"
              className={`text-paragraph-1 p-1 rounded cursor-pointer ${
                notification.read ? "text-grey" : "bg-grey text-white"
              }`}
              key={index}
              onClick={() => markAsRead(notification._id, notification)}
              dangerouslySetInnerHTML={{ __html: notification.message }}
            >
              {/* {notification.message} */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
