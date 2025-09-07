import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Models & Hostesses",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-lg">Admin Dashboard</div>
          <nav className="text-sm text-gray-300">Home</nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
