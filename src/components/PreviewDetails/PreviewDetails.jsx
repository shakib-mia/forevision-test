import React, { useState, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import AlbumPreview from "../AlbumPreview/AlbumPreview";
import Button from "../Button/Button";
import { ScreenContext } from "../../contexts/ScreenContext";

const PreviewDetails = ({ albumData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { setScreen } = useContext(ScreenContext);
  const location = useLocation();
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return location.pathname !== "/album-upload" ? (
    <div className="bg-surface-white-surface-1 min-h-screen p-4 mx-auto w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-1/2 lg:w-1/4 aspect-square">
            <img
              className="object-cover w-full h-full"
              src={albumData.artWork}
              alt={albumData.albumTitle}
            />
          </div>
          <aside className="w-full lg:w-3/4">
            <div className="p-4">
              <div className="uppercase tracking-wide text-subtitle-2-bold text-primary">
                {albumData.albumType}
              </div>
              <h1 className="mt-2 text-heading-4-bold text-black">
                {albumData.songName}
              </h1>
              <p className="mt-2 text-paragraph-1 text-black-tertiary">
                {albumData.description}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Genre:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {albumData.genre}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Sub-Genre:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {albumData.subGenre}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Language:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {albumData.language}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Mood:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {albumData.mood}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-surface-white-surface-2">
              <h2 className="text-heading-6-bold text-black">Artists</h2>
              <ul className="mt-2 space-y-1">
                {albumData.artists?.map((artist, index) => (
                  <li
                    key={index}
                    className="flex items-center text-paragraph-2 text-black-secondary"
                  >
                    <span className="font-medium">{artist.name}</span>
                    <span className="mx-1">-</span>
                    <span>{artist.role}</span>
                    {artist.spotifyUrl && (
                      <a
                        href={artist.spotifyUrl}
                        className="ml-2 text-primary hover:text-primary-light"
                      >
                        Spotify
                      </a>
                    )}
                    {artist.appleArtist && (
                      <a
                        href={artist.appleArtist}
                        className="ml-2 text-primary hover:text-primary-light"
                      >
                        Apple Music
                      </a>
                    )}
                    {artist.facebookUrl && (
                      <a
                        href={artist.facebookUrl}
                        className="ml-2 text-primary hover:text-primary-light"
                      >
                        Facebook
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {albumData?.songs?.map((item) => (
          <>
            <div className="px-4 py-3">
              <h2 className="text-heading-6-bold text-black">Audio Player</h2>
              <div className="mt-3 flex items-center">
                <button
                  onClick={togglePlay}
                  className="bg-interactive-light text-white px-3 py-2 rounded-md hover:bg-interactive-light-hover focus:outline-none focus:ring-2 focus:ring-interactive-light-focus focus:ring-opacity-50"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <audio ref={audioRef} src={item.songUrl} className="ml-3" />
                <span className="ml-3 text-subtitle-2 text-black-secondary">
                  Start Time: {item.startMinutes}:
                  {item.startSeconds.toString().padStart(2, "0")} -{" "}
                  {item.startMinutes2}:
                  {item.startSeconds2.toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="px-4 py-3 bg-surface-white-surface-2">
              <h2 className="text-heading-6-bold text-black">
                Additional Information
              </h2>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    ISRC:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {item.isrc}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    UPC:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {item.UPC}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Publisher:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {item.publisher}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Record Label:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {item.recordLabel}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Content Type:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {item.contentType}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Payment Status:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {item.status}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    Upload Time:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {item.time}
                  </span>
                </div>
                <div>
                  <span className="text-subtitle-2 text-black-secondary">
                    User Email:
                  </span>{" "}
                  <span className="text-subtitle-2-bold text-primary">
                    {item.userEmail}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 py-3">
              <h2 className="text-heading-6-bold text-black">
                Selected Platforms
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.selectedPlatforms.map((platform, index) => (
                  <span
                    key={index}
                    className="inline-block bg-interactive-light transition hover:bg-interactive-light-hover text-white text-subtitle-2 px-2 py-1 rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <Button onClick={() => setScreen("distribution")}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  ) : (
    <AlbumPreview albumData={albumData} />
    // <div className="bg-surface-white-surface-1 min-h-screen p-4 mx-auto w-full">
    //   <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    //     <div className="flex">
    //       {/* <div className="md:flex-shrink-0">
    //      <img
    //        className="w-full object-cover"
    //        src={albumData.artWork}
    //        alt={albumData.albumTitle}
    //      />
    //    </div> */}
    //       <div className="w-1/4 aspect-square">
    //         <img
    //           className="object-cover w-full h-full"
    //           src={albumData.artWork}
    //           alt={albumData.albumTitle}
    //         />
    //       </div>
    //       <aside className="w-3/4">
    //         <div className="p-4">
    //           <div className="uppercase tracking-wide text-subtitle-2-bold text-primary">
    //             {albumData.albumType}
    //           </div>
    //           <h1 className="mt-2 text-heading-4-bold text-black">
    //             {albumData.songName}
    //           </h1>
    //           <p className="mt-2 text-paragraph-1 text-black-tertiary">
    //             {albumData.description}
    //           </p>
    //           <div className="mt-3 grid grid-cols-2 gap-2">
    //             <div>
    //               <span className="text-subtitle-2 text-black-secondary">
    //                 Genre:
    //               </span>{" "}
    //               <span className="text-subtitle-2-bold text-primary">
    //                 {albumData.genre}
    //               </span>
    //             </div>
    //             <div>
    //               <span className="text-subtitle-2 text-black-secondary">
    //                 Sub-Genre:
    //               </span>{" "}
    //               <span className="text-subtitle-2-bold text-primary">
    //                 {albumData.subGenre}
    //               </span>
    //             </div>
    //             <div>
    //               <span className="text-subtitle-2 text-black-secondary">
    //                 Language:
    //               </span>{" "}
    //               <span className="text-subtitle-2-bold text-primary">
    //                 {albumData.language}
    //               </span>
    //             </div>
    //             <div>
    //               <span className="text-subtitle-2 text-black-secondary">
    //                 Mood:
    //               </span>{" "}
    //               <span className="text-subtitle-2-bold text-primary">
    //                 {albumData.mood}
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="px-4 py-3 bg-surface-white-surface-2">
    //           <h2 className="text-heading-6-bold text-black">Artists</h2>
    //           <ul className="mt-2 space-y-1">
    //             {albumData.songs?.artists?.map((artist, index) => (
    //               <li
    //                 key={index}
    //                 className="flex items-center text-paragraph-2 text-black-secondary"
    //               >
    //                 <span className="font-medium">{artist.name}</span>
    //                 <span className="mx-1">-</span>
    //                 <span>{artist.role}</span>
    //                 {artist.spotifyUrl && (
    //                   <a
    //                     href={artist.spotifyUrl}
    //                     className="ml-2 text-primary hover:text-primary-light"
    //                   >
    //                     Spotify
    //                   </a>
    //                 )}
    //                 {artist.appleArtist && (
    //                   <a
    //                     href={artist.appleArtist}
    //                     className="ml-2 text-primary hover:text-primary-light"
    //                   >
    //                     Apple Music
    //                   </a>
    //                 )}
    //                 {artist.facebookUrl && (
    //                   <a
    //                     href={artist.facebookUrl}
    //                     className="ml-2 text-primary hover:text-primary-light"
    //                   >
    //                     Facebook
    //                   </a>
    //                 )}
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       </aside>
    //     </div>

    //     <div className="px-4 py-3">
    //       <h2 className="text-heading-6-bold text-black">Audio Player</h2>
    //       <div className="mt-3 flex items-center">
    //         <button
    //           onClick={togglePlay}
    //           className="bg-interactive-light text-white px-3 py-2 rounded-md hover:bg-interactive-light-hover focus:outline-none focus:ring-2 focus:ring-interactive-light-focus focus:ring-opacity-50"
    //         >
    //           {isPlaying ? "Pause" : "Play"}
    //         </button>
    //         <audio ref={audioRef} src={albumData.songUrl} className="ml-3" />
    //         <span className="ml-3 text-subtitle-2 text-black-secondary">
    //           Start Time: {albumData.startMinutes}:
    //           {albumData.startSeconds.toString().padStart(2, "0")} -{" "}
    //           {albumData.startMinutes2}:
    //           {albumData.startSeconds2.toString().padStart(2, "0")}
    //         </span>
    //       </div>
    //     </div>

    //     <div className="px-4 py-3 bg-surface-white-surface-2">
    //       <h2 className="text-heading-6-bold text-black">
    //         Additional Information
    //       </h2>
    //       <div className="mt-2 grid grid-cols-2 gap-3">
    //         <div>
    //           <span className="text-subtitle-2 text-black-secondary">
    //             ISRC:
    //           </span>{" "}
    //           <span className="text-subtitle-2-bold text-primary">
    //             {albumData.isrc}
    //           </span>
    //         </div>
    //         <div>
    //           <span className="text-subtitle-2 text-black-secondary">UPC:</span>{" "}
    //           <span className="text-subtitle-2-bold text-primary">
    //             {albumData.UPC}
    //           </span>
    //         </div>
    //         <div>
    //           <span className="text-subtitle-2 text-black-secondary">
    //             Publisher:
    //           </span>{" "}
    //           <span className="text-subtitle-2-bold text-primary">
    //             {albumData.publisher}
    //           </span>
    //         </div>
    //         <div>
    //           <span className="text-subtitle-2 text-black-secondary">
    //             Record Label:
    //           </span>{" "}
    //           <span className="text-subtitle-2-bold text-primary">
    //             {albumData.recordLabel}
    //           </span>
    //         </div>
    //         <div>
    //           <span className="text-subtitle-2 text-black-secondary">
    //             Content Type:
    //           </span>{" "}
    //           <span className="text-subtitle-2-bold text-primary">
    //             {albumData.contentType}
    //           </span>
    //         </div>
    //         <div>
    //           <span className="text-subtitle-2 text-black-secondary">
    //             Payment Status:
    //           </span>{" "}
    //           <span className="text-subtitle-2-bold text-primary">
    //             {albumData.status}
    //           </span>
    //         </div>
    //         <div>
    //           <span className="text-subtitle-2 text-black-secondary">
    //             Upload Time:
    //           </span>{" "}
    //           <span className="text-subtitle-2-bold text-primary">
    //             {albumData.time}
    //           </span>
    //         </div>
    //         <div>
    //           <span className="text-subtitle-2 text-black-secondary">
    //             User Email:
    //           </span>{" "}
    //           <span className="text-subtitle-2-bold text-primary">
    //             {albumData.userEmail}
    //           </span>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="px-4 py-3">
    //       <h2 className="text-heading-6-bold text-black">Selected Platforms</h2>
    //       <div className="mt-2 flex flex-wrap gap-2">
    //         {albumData.selectedPlatforms.map((platform, index) => (
    //           <span
    //             key={index}
    //             className="inline-block bg-interactive-light transition hover:bg-interactive-light-hover text-white text-subtitle-2 px-2 py-1 rounded-full"
    //           >
    //             {platform}
    //           </span>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PreviewDetails;
