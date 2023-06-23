import UserList from "@/components/UserList";
import UserForm from "@/components/UserForm";

export default async function Home() {
  return (
    <main >
      <UserForm />
      <UserList />
    </main>
  )
}
