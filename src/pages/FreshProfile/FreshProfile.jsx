import React, { useContext, useEffect, useState, useMemo } from "react";
import Header from "../../components/Header/Header"; // Assuming Header is your custom component
import Form from "../../components/Form/Form"; // Assuming Form is your custom component
import { ProfileContext } from "../../contexts/ProfileContext"; // Context for user data
import { useLocation } from "react-router-dom"; // React Router hook for location

const FreshProfile = () => {
  const { userData } = useContext(ProfileContext); // Access user data from context
  const location = useLocation(); // Access current location from React Router

  // Initialize profileType to "fresh-profile" by default
  const [profileType, setProfileType] = useState("fresh-profile");

  const getFieldName = (suffix) =>
    location.pathname
      .split("-fresh-profile")[0]
      .split("/")[1]
      .split("-")
      .join("_") + suffix;

  const isrcArray = userData.isrc?.split(",") || [];
  const selectItems = isrcArray.map((item) => ({
    text: item.trim(),
    selected: false,
    name: `isrc-${item.trim()}`,
  }));

  const initialFields = useMemo(() => {
    const baseFields = [
      {
        label: "User Name",
        placeholder: "Name",
        name: getFieldName("_fresh_profile_name"),
        type: "text",
        required: true,
        value: userData["user-id"] || "",
        disabled: !!userData["user-id"]?.length,
      },
      {
        label: "Email Address",
        placeholder: "Email Address",
        name: getFieldName("_fresh_profile_email"),
        type: "email",
        required: true,
        value: userData.emailId || "",
        disabled: !!userData.emailId?.length,
      },
      {
        label: "UPC",
        placeholder: "Enter Your UPC Here. Use Comma (,) to Separate UPCs",
        name: getFieldName("_fresh_profile_upc"),
        type: "text",
        required: true,
      },
      {
        label: "ISRC",
        name: getFieldName("_fresh_profile_isrc"),
        type: "multi-select",
        selectItems,
        required: true,
      },
      {
        label: "Content Name",
        placeholder:
          "Enter Content Names Here. Use Comma (,) to Separate Contents",
        name: getFieldName("_fresh_profile_content_name"),
        type: "text",
        required: true,
      },
    ];

    if (profileType === "fresh-profile") {
      baseFields.push({
        label: "For Fresh Profile",
        placeholder:
          "Album Url's (Can be multiple) & Artist Name, Use Comma (,) to Separate Profiles",
        name: getFieldName("_for_fresh_profile"),
        type: "text",
        required: true,
      });
    } else if (profileType === "profile-relocate") {
      baseFields.push({
        label: "For Profile Relocate",
        placeholder:
          "Artist Profile Link and the content URL that needs to be tagged. Use Comma (,) to Separate Links",
        name: getFieldName("_fresh_profile_profile_relocate"),
        type: "text",
        required: true,
      });
    }

    return baseFields;
  }, [profileType, userData, location.pathname]);

  const [fields, setFields] = useState(initialFields);

  useEffect(() => {
    setFields(initialFields);
  }, [initialFields]);

  const headerTitle = useMemo(() => {
    const base = location.pathname
      .split("-fresh-profile")[0]
      .split("/")[1]
      .split("-")
      .join(" ");
    return base !== "jiosaavn" ? base : "JioSaavn";
  }, [location.pathname]);

  return (
    <div className="bg-no-repeat form-bg">
      <Header header={`${headerTitle} Profile Relocate/Fresh Profile`} />
      <Form
        fields={fields}
        uIdKey={`${location.pathname.split("/")[1]}_user_id`}
        id={location.pathname.split("/")[1]}
      >
        <div className="flex gap-2 items-center">
          <aside className="flex items-center gap-1">
            <input
              type="radio"
              id="fresh-profile"
              name="profile"
              checked={profileType === "fresh-profile"} // Match the state
              onChange={(e) =>
                e.target.checked && setProfileType("fresh-profile")
              }
            />
            <label htmlFor="fresh-profile">Fresh Profile</label>
          </aside>

          <aside className="flex items-center gap-1">
            <input
              type="radio"
              id="profile-relocate"
              name="profile"
              checked={profileType === "profile-relocate"} // Match the state
              onChange={(e) =>
                e.target.checked && setProfileType("profile-relocate")
              }
            />
            <label htmlFor="profile-relocate">Profile Relocate</label>
          </aside>
        </div>
      </Form>
    </div>
  );
};

export default FreshProfile;
