import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader /> {/* Admin header */}
      <main>{children}</main>
    </>
  );
}
