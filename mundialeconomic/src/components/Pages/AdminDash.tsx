import PageHeader from "../PageHeader";
import ShopsTable from "../ShopsTable";
export default function AdminDash() {
  return (
    <>
      <PageHeader
        title="Lojas"
        breadcrumb={["Home", "Marketplace"]}
        showAddShop={true}
      />
      <ShopsTable />
    </>
  );
}
