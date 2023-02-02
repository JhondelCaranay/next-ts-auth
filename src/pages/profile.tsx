import Link from "next/link";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import Head from "next/head";
import { useState } from "react";

const Profile = () => {
  const [name, set_name] = useState("");
  return (
    <section className="container mx-auto text-center">
      <Head>
        <title>Profile</title>
      </Head>
      <h3 className="text-4xl font-bold">Profile Page</h3>

      <h4>{name}</h4>
      <input
        type="text"
        placeholder="Enter your name"
        className="mx-auto mt-5 mb-5 w-96
        rounded-lg border-2 border-gray-300 p-2
        focus:border-transparent  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        onChange={(e) => set_name(e.target.value)}
        value={name}
      />
      <Link href={"/"}>Home Page</Link>
    </section>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps<{ session: Session }> = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
