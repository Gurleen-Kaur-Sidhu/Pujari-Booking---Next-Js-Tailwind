// app/pujaridashboard/layout.js
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-[var(--background)] min-h-screen px-4 lg:px-20 py-10">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-3">
        <DashboardSidebar />
        <div className="w-full md:w-2/3 lg:w-3/4">{children}</div>
      </div>
    </div>
  );
}
