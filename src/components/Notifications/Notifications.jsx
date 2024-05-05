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
    <div className="w-full 2xl:w-1/2 bg-grey-light rounded-2xl p-4 pt-0 h-[392px] overflow-auto relative">
      <div className="flex justify-between bg-grey-light sticky top-0 pt-4 pb-2">
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
              title="Click to mark as read"
              className={`text-paragraph-1 p-1 rounded cursor-pointer flex gap-1 ${
                notification.read ? "text-grey" : "bg-white text-black"
              } flex items-center`}
              key={index}
              onClick={() => markAsRead(notification._id, notification)}
            >
              {/* Dynamically set HTML content in a div */}
              <div
                className={`aspect-square rounded-full h-1 ${
                  notification.read
                    ? "bg-interactive-light-disabled"
                    : "bg-interactive-light"
                }`}
              ></div>
              <div className="flex justify-between w-full">
                <div
                  dangerouslySetInnerHTML={{ __html: notification.message }}
                  className="flex-grow"
                ></div>
                <div>
                  {new Date(notification.date * 1000).getDate() > 9 ? "" : 0}
                  {new Date(notification.date * 1000).getDate()}/
                  {new Date(notification.date * 1000).getMonth() > 9 ? "" : 0}
                  {new Date(notification.date * 1000).getMonth() + 1}
                </div>
              </div>

              {/* Additional static content in another div */}
              {/* <div>Additional content here</div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
