import Link from "next/link";

const Guest = () => {
  return (
    <main className="container mx-auto py-20 text-center">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link href={"/login"} className="mt-5 rounded-sm bg-indigo-500 px-10 py-1 text-gray-50">
          Sign In
        </Link>
      </div>
    </main>
  );
};
export default Guest;
