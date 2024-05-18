import React from "react";

const CountryCodeItem = ({ setSelectedCode, countryCodes }) => {
  //   console.log(countryCodes);
  return (
    <div
      className="w-full py-1 flex gap-1"
      onClick={() => setSelectedCode(countryCodes)}
    >
      +{countryCodes}
    </div>
  );
};

export default CountryCodeItem;
