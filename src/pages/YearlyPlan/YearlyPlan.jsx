import React from "react";
import Form from "../../components/Form/Form";

const YearlyPlan = () => {
  const fields = [
    { placeholder: "Enter Yor Email ID", name: "emailId" },
    { placeholder: "Phone Number", name: "phoneNo." },
    { placeholder: "Total Released Song", name: "totalReleasedSong" },
    { placeholder: "Total Revenue Earned", name: "totalRevenueEarned" },
    { placeholder: "Spotify Profile Link", name: "spotifyProfileLink" },
    { placeholder: "JioSaavn Profile Link", name: "jioSaavnProfileLink" },
    { placeholder: "Wynk Profile Link", name: "wynkProfileLink" },
    {
      placeholder: "Monthly Listeners",
      name: "monthlyListeners",
      type: "number",
    },
    {
      placeholder: "Instagram account link",
      name: "instagramAccountLink",
      type: "number",
    },
    {
      placeholder: "Number of songs uploaded till date through Forevision",
    },
  ];
  return (
    <div className="flex flex-col-reverse xl:flex-row gap-3 xl:gap-6 w-11/12 mx-auto">
      <Form
        heading="Lorem ipsum dolor"
        containerClassName="xl:mt-5 !mx-0 xl:!ml-4 !w-full xl:!w-5/12 !px-4"
        fields={fields}
        headingSize="text-heading-3-bold"
      ></Form>
      <aside className="w-full xl:w-7/12 xl:pt-7 pr-4">
        <h1 className="text-heading-4-bold xl:text-heading-1-bold">
          Lorem, ipsum dolor.
        </h1>
        <p className="text-paragraph-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          nulla, ipsam eum dignissimos praesentium sunt suscipit minima culpa
          nisi odit aliquid, qui doloremque accusantium eligendi rerum omnis? Id
          incidunt iure eum aperiam tempore deleniti animi distinctio facilis,
          nemo a repellendus ex inventore placeat minima, harum adipisci. Illum
          similique quo dicta perspiciatis eos at repudiandae, tempora cum
          cumque provident ducimus itaque mollitia, eum maiores quasi excepturi
          libero eligendi id molestiae reiciendis nam modi! Quisquam ut est
          deleniti maxime suscipit vero quos itaque doloribus delectus
          molestiae! Animi nesciunt nihil consequatur, ipsa corrupti possimus
          cumque voluptates eligendi, nobis enim quae sunt? Dolorem perferendis
          fugit nemo quis ipsa necessitatibus ducimus ipsam eos, iure dolorum ad
          soluta provident assumenda illo voluptatibus molestias mollitia? Sunt
          id est, soluta obcaecati eligendi excepturi quod eveniet tempore
          maxime doloribus voluptate officia fugiat consequatur fugit in quia
          porro aspernatur tenetur a ut. Quaerat eos accusamus necessitatibus,
          laboriosam officia provident praesentium?
        </p>
      </aside>
    </div>
  );
};

export default YearlyPlan;
