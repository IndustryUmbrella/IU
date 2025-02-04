import Step1Mockup from "@/public/mockups/step1Mockup";
import Step2Mockup from "@/public/mockups/Step2Mockup";
import Step3Mockup from "@/public/mockups/step3Mockup";
import React from "react";

const StepsCards = () => {
  return (
    <>
      <div className=" gap-32 flex flex-wrap  items-center justify-center mt-10">
        <div className="bg-white p-2 rounded-3xl max:w-[480px] h-[390px] px-6">
          <div className="flex justify-between">
            <Step1Mockup />
            <div className="bg-black text-white rounded-md p-1 w-auto h-8 px-2">
              Step 1
            </div>
          </div>
          <div>
            <p className="text-primary w-[340px] h-[280px] text-2xl mt-3 px-4">
              Register Your company Login To Your Account Add your Additional
              Information and Complete your profile
            </p>
          </div>
        </div>

        <div className="bg-white p-2 rounded-3xl max:w-[480px] h-[390px] px-6">
          <div className="flex justify-between">
            <Step2Mockup />
            <div className="bg-black text-white rounded-md p-1 w-auto h-8 px-2">
              Step 2
            </div>
          </div>
          <div>
            <p className="text-primary w-[340px] h-[280px] text-2xl mt-3 px-4">
              Add Your Product Details. Wait Until you product Approve by IU
              team. After approving you can see your product lists in Product
              Tab
            </p>
          </div>
        </div>

        <div className="bg-white p-2 rounded-3xl max:w-[480px] h-[390px] px-6">
          <div className="flex justify-between">
            <Step3Mockup />
            <div className="bg-black text-white rounded-md p-1 w-auto h-8 px-2">
              Step 3
            </div>
          </div>
          <div>
            <p className="text-primary w-[340px] h-[280px]  text-2xl mt-3 px-4">
              You can promote your products to top of products list, customers
              will find your product faster. your product will show for global
              customers in everywhere.
            </p>
          </div>
        </div>
        <div className="bg-white p-2 rounded-3xl max:w-[480px] h-[390px] px-6">
          <div className="flex justify-between">
            <Step1Mockup />
            <div className="bg-black text-white rounded-md p-1 w-auto h-8 px-2">
              Step 4
            </div>
          </div>
          <div>
            <p className="text-primary w-[340px] h-[280px] text-2xl mt-3 px-4">
              while customers order your product. you will receive the payment
              based the buyer payment method.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepsCards;
