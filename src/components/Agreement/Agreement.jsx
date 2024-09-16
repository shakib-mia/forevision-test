import React from "react";
import Modal from "../Modal/Modal";
import { dateSuffix } from "../../utils/dateSuffix";

const Agreement = ({ handleClose }) => {
  const date = new Date();
  return (
    <Modal handleClose={handleClose}>
      <>
        <h1 className="text-heading-2-bold text-center text-grey-dark mb-2">
          Agreement
        </h1>

        <p>
          THIS AGREEMENT IS MADE this the {dateSuffix(date.getDate())} day of{" "}
          {date.toLocaleString("default", { month: "long" })} 2022 at Cooch
          Behar.
        </p>

        <h5 className="text-heading-5-bold text-center text-grey-dark mb-2 mt-4">
          Between
        </h5>
        <p>
          <b>ForeVision Digital</b>, a Digital Distributor Firm having its main
          office at Saha Para, Near petrol pump, Khagrabari, Cooch Behar, West
          Bengal - 736179, India, herein after referred to as <b>First Part</b>.
        </p>

        <h6 className="text-heading-6-bold text-center text-grey-dark mb-2 mt-4">
          AND
        </h6>
      </>
    </Modal>
  );
};

export default Agreement;
