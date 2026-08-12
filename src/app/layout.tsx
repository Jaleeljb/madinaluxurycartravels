import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </div>
    </div>
  );
}
