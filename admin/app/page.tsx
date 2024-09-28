import Sidebar from "@/components/Layout/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      {/* sidebar */}
      <div className="w-[250px] hidden lg:block">
        <Sidebar />
      </div>
    </div>
  );
};

export default page;
