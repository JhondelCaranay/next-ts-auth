import { Session } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
// Authorize User
type UserProps = {
  session: Session;
};

const User = ({ session }: UserProps) => {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <main className="container mx-auto py-20 text-center">
      <h3 className="text-4xl font-bold">Authorize User Homepage</h3>

      <div className="details">
        <h5>{session.user?.name}</h5>
        <h5>{session.user?.email}</h5>
      </div>

      <div className="flex justify-center">
        <button onClick={handleSignOut} className="mt-5 rounded-sm bg-gray-50 px-10 py-1">
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link href={"/profile"} className="mt-5 rounded-sm bg-indigo-500 px-10 py-1 text-gray-50">
          Profile Page
        </Link>
      </div>
    </main>
  );
};
export default User;
