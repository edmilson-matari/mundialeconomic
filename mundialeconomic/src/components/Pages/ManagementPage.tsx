import PageHeader from "../PageHeader";
import UserManagement from "./UsersManagement";
export default function ManagementPage() {
  return (
    <>
      <PageHeader
        title="Usuários"
        breadcrumb={["Home", "Usuários"]}
        showAddShop={false}
      />
      <UserManagement />
    </>
  );
}
