import React from "react";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";

const PromotionalTool = () => {
  const fields = [
    {
      label: "Your Name",
      placeholder: "Your Name",
      name: "promotional_tool_name",
      type: "text",
      required: true,
    },
    {
      label: "Email Address",
      placeholder: "Email Address",
      name: "promotional_tool_email",
      type: "email",
      required: true,
    },
    {
      label: "Phone",
      placeholder: "Phone",
      name: "promotional_tool_phone",
      type: "tel",
      required: true,
    },
    {
      label: "Order Number",
      placeholder: "Order No.",
      name: "promotional_tool_order_no",
      type: "number",
      required: true,
    },
    {
      label: "Artist Name",
      placeholder: "Artist Name",
      name: "promotional_tool_artist_nm",
      type: "text",
      required: true,
    },
    {
      label: "Artist Name 2",
      placeholder: "Artist Name 2",
      name: "promotional_tool_artist_nm2",
      type: "text",
      required: false,
    },
    {
      label: "Artist Name 3",
      placeholder: "Artist Name 3",
      name: "promotional_tool_artist_nm3",
      type: "text",
      required: false,
    },
    {
      label: "Artist Name 4",
      placeholder: "Artist Name 4",
      name: "promotional_tool_artist_nm4",
      type: "text",
      required: false,
    },
    {
      label: "Others Artist",
      placeholder: "Others Artist",
      name: "promotional_tool_other_artist",
      type: "text",
      required: false,
    },
    {
      label: "Song Name",
      placeholder: "Song Name",
      name: "promotional_tool_song_nm",
      type: "text",
      required: true,
    },
    {
      label: "Song URL",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "promotional_tool_song_url",
      type: "text",
      required: true,
    },
    {
      label: "Producer",
      placeholder: "Producer Name",
      name: "promotional_tool_producer",
      type: "text",
      required: true,
    },

    {
      label: "Upload Artwork",
      placeholder: "E.g. https://m.resso.com/Zs8LFaaLa/",
      name: "promotional_tool_upload_artwork",
      type: "file",
      required: true,
    },

    {
      label: "Artist Facebook URL",
      placeholder: "Artist Facebook URL",
      name: "promotional_tool_artist_fb_url",
      type: "text",
      required: true,
    },

    {
      label: "Artist 2 Facebook URL",
      placeholder: "Artist Facebook URL",
      name: "promotional_tool_artist2_fb_url",
      type: "text",
      required: true,
    },

    {
      label: "Artist 3 Facebook URL",
      placeholder: "Artist Facebook URL",
      name: "promotional_tool_artist3_fb_url",
      type: "text",
      required: true,
    },

    {
      label: "Artist 4 Facebook URL",
      placeholder: "Artist Facebook URL",
      name: "promotional_tool_artist4_fb_url",
      type: "text",
      required: true,
    },

    {
      label: "Artist Instagram URL",
      placeholder: "Artist Instagram URL",
      name: "promotional_tool_artist_instra_url",
      type: "text",
      required: true,
    },

    {
      label: "Artist 2 Instagram URL",
      placeholder: "Artist Instagram URL",
      name: "promotional_tool_artist_instra2_url",
      type: "text",
      required: true,
    },

    {
      label: "Artist 3 Instagram URL",
      placeholder: "Artist Instagram URL",
      name: "promotional_tool_artist_instra3_url",
      type: "text",
      required: true,
    },

    {
      label: "Artist 4 Instagram URL",
      placeholder: "Artist Instagram URL",
      name: "promotional_tool_artist_instra4_url",
      type: "text",
      required: true,
    },

    {
      label: "Artist Twitter URL",
      placeholder: "Artist Twitter URL",
      name: "promotional_tool_artist_twiter_url",
      type: "text",
      required: true,
    },

    {
      label: "Others URL",
      placeholder: "Use comma (,) for multiple",
      name: "promotional_tool_artist_other_url",
      type: "text",
      required: true,
    },

    {
      label: "Description",
      placeholder: "Description",
      name: "promotional_tool_artist_desc",
      type: "text",
      required: true,
    },

    {
      label: "Promotion Type",
      placeholder: "Promotion Type",
      name: "promotional_tool_artist_type",
      type: "multi-select",
      selectItems: [
        {
          text: "Editors Daily",
          name: "promotional_tool_artist_type",
          selected: false,
        },
        {
          text: "New Release",
          name: "promotional_tool_artist_type",
          selected: false,
        },
        // {
        //   text: "Yes I agree with the privacy policy and terms and conditions",
        //   <>
        //     Yes, I agree with the{" "}
        //     <a
        //       className="text-primary underline hover:no-underline"
        //       href="https://forevisiondigital.com/privacy-policy/"
        //     >
        //       privacy policy
        //     </a>{" "}
        //     and{" "}
        //     <a
        //       className="text-primary underline hover:no-underline"
        //       href="https://forevisiondigital.com/digital-distribution-agreement/"
        //     >
        //       terms and conditions
        //     </a>
        //     .{" "}
        //   </>
        //   ),
        //   selected: false,
        // },
      ],
      // selectedItems: [],
      required: true,
    },

    // {
    //   label: "Editors Daily",
    //   placeholder: "Editors Daily",
    //   name: "",
    //   type: "checkbox",
    //   required: true,
    // },

    // {
    //   label: "New Releases",
    //   placeholder: "New Releases",
    //   name: "",
    //   type: "checkbox",
    //   required: true,
    // },

    // {
    //   label: (
    //     <>
    //       Yes, I agree with the{" "}
    //       <a href="https://forevisiondigital.com/privacy-policy/">
    //         privacy policy
    //       </a>{" "}
    //       and{" "}
    //       <a href="https://forevisiondigital.com/digital-distribution-agreement/">
    //         terms and conditions
    //       </a>
    //       .{" "}
    //  </>
    //   ),
    //   placeholder: "",
    //   name: "",
    //   type: "checkbox",
    //   required: true,
    // },
  ];

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(document.getElementsByClassName("input-field"));
  //   // e.target.children.map((i) => console.log(i));
  // };

  return (
    <div className="bg-no-repeat form-bg">
      <Header
        header="ForeVision Promotions"
        subheader={<>Submit your song for Forevision Promotions</>}
      />

      <Form
        fields={fields}
        // handleSubmit={handleSubmit}
        uIdKey={"promotional_tool_user_id"}
        backendUrl={"http://adztronaut.com/music/admin/api/addPromotionalToool"}
      />
    </div>
  );
};

export default PromotionalTool;
