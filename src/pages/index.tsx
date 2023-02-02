// import { Inter } from "@next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";
import { useSession, getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import User from "@/components/user";
import Guest from "@/components/guest";

// type HomeProps = {
//   session: Session;
//   message: string;
// };
// { currentSession, message }: HomeProps

export default function Home() {
  // console.log("🚀 ~ file: index.tsx:17 ~ Home ~ message", message);
  // console.log("🚀 ~ file: index.tsx:32 ~ Home ~ session", currentSession);
  // const [session, setSession] = useState(true);
  const { data: session, status } = useSession();
  // {
  //   required: true,
  //   onUnauthenticated() {
  //     return {
  //       redirect: {
  //         destination: "/login",
  //         permanent: false,
  //       },
  //     };
  //   },
  // }
 

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? <User session={session} /> : <Guest />}
    </>
  );
}

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
    props: { session, message: "Hello World" },
  };
};
