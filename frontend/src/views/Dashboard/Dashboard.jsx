import { useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";

function Dashboard() {
  return (
    <>
      <BreadCrumb />
      <div id="content" className="padding-20">
        content here...
      </div>
    </>
  );
}

export default Dashboard;
