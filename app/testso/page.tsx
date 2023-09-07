import React from "react";
import Iframe from "react-iframe";

const page = () => {
  return (
    <>
      <iframe
        width="1343"
        height="480"
        src="https://www.youtube.com/embed/nQprWww0m0U"
        title="Nella’s AWFUL Stormzy Impression Earns Her An F!! | Harry Pinero&#39;s Worst In Class | Channel 4.0"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default page;
