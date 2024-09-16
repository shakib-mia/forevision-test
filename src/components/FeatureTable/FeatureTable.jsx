import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaCheck, FaTimes } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";

const features = [
  "YouTube Content ID, YouTube Music & YouTube Shorts Covered",
  "Monetize Your Music in Facebook & Instagram",
  "Get Your Music in Triller, Snapchat & TikTok",
  "Schedule Your Own Release Date",
  "Free Custom Label",
  "100% Copyright Will Be Yours",
  "Get 80% Revenue from the Streamings",
  "ForeVision Pro Dashboard with Detailed analytics",
  "Get lifetime support with zero yearly cost",
  "Advanced revenue reports",
  "All Indian Apps Covered: Gaana, Hungama, Wynk & Jiosaavn",
  "Caller Tunes On JIO, Vi, BSNL & Airtel",
  "Worldwide Reach",
  "All International Apps Covered",
  "90% Revenue from Streaming platforms",
  "85% Revenue from YouTube Platforms",
  "Lyrics monetization",
  "Get Lyrics In Facebook, Instagram, Spotify, JioSaavn, Google & More",
  "Various marketing tools with Playlisting options",
];

const plans = [
  {
    name: "Forevision Social",
    features: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  },
  {
    name: "Forevision CRBT",
    features: [
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
  },
  {
    name: "Forevision CRBT+",
    features: [
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
  },
  {
    name: "Forevision Pro",
    features: [
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
    ],
  },
];

const FeatureTable = () => {
  return (
    <>
      <h2 className="text-heading-2-bold text-center text-grey-dark mt-3 mb-4">
        Compare Plans
      </h2>
      <div className="w-[94%] lg:w-5/6 mx-auto shadow-xl">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-interactive-light-disabled bg-gray-100 text-left text-xs font-bold text-grey-dark uppercase tracking-wider bg-interactive-light-disabled">
                  Feature
                </th>
                {plans.map((plan, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 border-b border-interactive-light-disabled bg-interactive-light-disabled bg-gray-100 text-center text-xs font-bold text-grey-dark uppercase tracking-wider"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-interactive-light-disabled text-sm text-gray-700 bg-interactive-light text-white selection:bg-white selection:text-interactive-light">
                    {feature}
                  </td>
                  {plans.map((plan, planIndex) => (
                    <td
                      key={planIndex}
                      className="px-6 py-4 border-b border-interactive-light-disabled text-sm text-gray-700 text-center"
                    >
                      {plan.features[index] ? (
                        <>
                          <FaCheck className="text-interactive-light-confirmation text-xl text-center mx-auto" />
                        </>
                      ) : (
                        <>
                          <FaTimes className="text-interactive-light-destructive text-xl text-center mx-auto" />
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block lg:hidden">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 border-y border-interactive-light-disabled my-2"
            >
              <div className="font-semibold text-interactive-light mb-2">
                {feature}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {plans.map((plan, planIndex) => (
                  <div key={planIndex} className="flex items-center">
                    {plan.features[index] ? (
                      <>
                        <FaCheck className="text-interactive-light-confirmation text-xl text-center mr-1" />
                      </>
                    ) : (
                      <>
                        <FaTimes className="text-interactive-light-destructive text-xl text-center mr-1" />
                      </>
                    )}
                    <span className="text-sm text-gray-700">{plan.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeatureTable;
