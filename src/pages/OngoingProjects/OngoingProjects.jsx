// // import axios from "axios";
// import React, { useEffect, useMemo } from "react";
// // import {
// //   config,
// //   getVideoDistributions,
// //   getYoutubeOac,
// //   user,
// // } from "../../constants";

// const OngoingProjects = () => {
//   const tableData = useMemo(() => {
//     return [];
//   }, []);
//   //   const allData

//   // useEffect(() => {
//   //   const formData = new FormData();
//   //   formData.append("userId", user?.ID);
//   //   axios
//   //     .post(getYoutubeOac, formData, {
//   // headers: {
//   //   Authorization: `Bearer ${profileData.user_token}`,
//   //       },
// })
//   //     .then(({ data }) => tableData.push({ youtubeOac: data.data }));
//   // }, [tableData]);

//   // useEffect(() => {
//   //   const formData = new FormData();
//   //   formData.append("userId", user?.ID);
//   //   axios
//   //     .post(getVideoDistributions, formData, {
//   // headers: {
//   //   Authorization: `Bearer ${profileData.user_token}`,
//   // },
//   //     })
// //     .then(({ data }) => tableData.push({ videoDistributions: data.data }));
// // }, [tableData]);

// // useEffect(() => {
// //   console.log(tableData);
// // }, [tableData]);

// return (
//   <div className="pl-7 py-5">
//     {/* <h1 className="text-heading-1">{}</h1> */}

//     <div className="grid grid-cols-3 gap-3 pt-2">
//       <section>
//         <h3 className="text-heading-3">
//           {tableData.length}
//           {/* {data.length > 0 &&
//               Object.keys(data[0])[0].split("_").slice(0, 2).join(" ")} */}
//         </h3>
//         <ul className="shadow-lg p-3">
//           {/* {data.map((item, key) => (
//               <li
//                 key={key}
//                 className="py-1 hover:bg-grey-light px-2 cursor-pointer rounded-md"
//               >
//                 {item.youtube_oac_name}
//               </li>
//             ))} */}
//         </ul>
//       </section>
//     </div>
//   </div>
// );
// };

// export default OngoingProjects;
