// "use client";

// import DashboardSidebar from "./DashboardSidebar";
// import { useState } from "react";
// import Dashboard from "./Dashboard";
// import DashboardTransaction from "./DashboardTransaction";
// import Editprofile from "./Editprofile";
// import DashboardPassword from "./DashboardPassword";
// import DashboardCalendar from "./DashboardCalendar";
// import DashboardSchedule from "./DashboardSchedule";
// import BankDetails from "./BankDetails";
// import ManageEarning from "./ManageEarning";
// import ManageAvailability from "./ManageAvailability";
// import ManageReview from "./ManageReview";
// export default function DashboardPage() {
//   const [selectedSection, setSelectedSection] = useState("dashboard");

//   const renderSection = () => {
//     switch (selectedSection) {
//       case "dashboard":
//         return <Dashboard />;
//       case "transactions":
//         return <DashboardTransaction />;
//       case "calendar":
//         return <DashboardCalendar />;
//       case "schedule":
//         return <DashboardSchedule />;
//       case "bankdetails":
//         return <BankDetails />;
//       case "manageearning":
//         return <ManageEarning />;
//       case "manageavailibity":
//         return <ManageAvailability />;
//       case "managereview":
//         return <ManageReview />;
//       case "profile":
//         return <Editprofile />;
//       case "password":
//         return <DashboardPassword />;
//       default:
//         return <Dashboard />;
//     }
//   };
//   return (
//     <div className="bg-[var(--background)] min-h-screen px-4 lg:px-20 py-10">
//       <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-3">
//         <DashboardSidebar
//           onSelect={setSelectedSection}
//           selected={selectedSection}
//         />
//         <div className="w-full md:w-2/3 lg:w-3/4">{renderSection()}</div>
//       </div>
//     </div>
//   );
// }






"use client";
import Dashboard from "./Dashboard";
export default function DashboardPage() {
  return <Dashboard />;
}
