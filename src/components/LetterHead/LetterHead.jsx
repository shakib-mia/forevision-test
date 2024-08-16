import React, { useState } from "react";
import jsPDF from "jspdf";
import { forwardRef } from "react";

const Letterhead = forwardRef(
  ({ subLabelName, mainLabelName, formData }, ref) => {
    //   const [date, setDate] = useState(new Date().toLocaleDateString());

    //   const generatePDF = () => {
    //     const doc = new jsPDF();
    //     const content = `
    //       TO WHOMSOEVER IT MAY CONCERN

    //       This is to inform that we "${subLabelName}" have licensed our content Exclusively to "${mainLabelName}" for monetization of content across any and all platforms and services including but not limited to CRBT, IVR Full Tracks (Operator Based) and OTT platforms (international, domestic), streaming services, video streaming/download etc across various services and all telecom operators for the territory of world, on terms as detailed
    //  below –
    //       License Type – Exclusive
    //       Content – All Past catalogue and Future new releases.
    //       Territory – Worldwide
    //       Term – This B2B is valid from ${date} and valid till one year and will be auto renewed for another year if not requested and agreed for termination on or before one month of expiry of this document in written by both the parties.

    //       Regards,
    //       For "${subLabelName}"

    //       (stamp and sign)
    //     `;

    //     doc.text(content, 10, 10);
    //     doc.save("letterhead.pdf");
    //   };

    return (
      <div className="bg-white py-2 rounded text-heading-4" ref={ref}>
        <p className="text-center italic">
          (to be printed on Sub-Label Letterhead)
        </p>
        <div className="text-end mr-2 my-1">
          Date:{" "}
          {new Date().getDate() <= 9
            ? "0" + new Date().getDate()
            : new Date().getDate()}
          /
          {new Date().getMonth() <= 9
            ? "0" + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1}
          /{new Date().getFullYear()}
        </div>

        <div className="text-center underline">
          TO WHOMSOEVER IT MAY CONCERN
        </div>

        <p className="p-3">
          This is to inform that we{" "}
          <b>{formData["Sub-Label Name"] || "undefined"}</b> have licensed our
          content Exclusively to <b>ForeVision Digital</b> for monetization of
          content across any and all platforms and services including but not
          limited to CRBT, IVR Full Tracks (Operator Based) and OTT platforms
          (international, domestic), streaming services, video
          streaming/download etc across various services and all telecom
          operators for the territory of world, on terms as detailed below –
        </p>

        <ul className="p-3 pt-0">
          <li>License Type – Exclusive</li>
          <li>Content – All Past catalogue and Future new releases.</li>
          <li>Territory – Worldwide</li>
          <li>
            Term – This B2B is valid from Date of Signing of this Document and
            valid till one year and will be auto renewed for another year if not
            requested and agreed for termination on or before one month of
            expiry of this document in written by both the parties.
          </li>
        </ul>

        <div className="pl-3">
          <p>Regards,</p>
          <p>
            For <b>{formData["Sub-Label Name"] || "undefined"}</b>
          </p>
          <br />
          <p>(stamp and sign)</p>
        </div>
      </div>
    );
  }
);

export default Letterhead;
