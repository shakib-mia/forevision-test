import React from "react";
import Form from "../../components/Form/Form";
import YearlyPlanText from "../../components/YearlyPlanText/YearlyPlanText";
import YearlyPlanForm from "../../components/YearlyPlanForm/YearlyPlanForm";

const YearlyPlan = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-3 xl:gap-2 w-5/6 lg:w-3/4 shadow-xl mx-auto mt-7 rounded-xl overflow-hidden h-3/4 absolute left-0 top-0 right-0 bg-warning">
      {/* <Form
        on
        heading="Yearly Plans"
        containerClassName="xl:mt-5 !mx-0 xl:!ml-4 !w-full xl:!w-5/12 !px-4"
        fields={fields}
        headingSize="text-heading-3-bold"
      ></Form> */}

      <aside className="w-full xl:w-1/2 lg:p-4 h-1/2 lg:h-full overflow-y-auto p-2">
        <YearlyPlanText />
      </aside>
      <YearlyPlanForm />
    </div>
  );
};

export default YearlyPlan;
