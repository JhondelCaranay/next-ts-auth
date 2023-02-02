import Layout from "@/components/layout/layout";
import Head from "next/head";
import Link from "next/link";
import { NextPageWithLayout } from "./_app";
import styles from "@/styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiEye, HiEyeOff } from "react-icons/hi";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup.string().min(4).max(15).required("Required"),
});

const Login: NextPageWithLayout = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const initialValues: IFormInputs = {
    email: "",
    password: "",
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting, touchedFields },
  } = useForm<IFormInputs>({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const submitForm = async (data: IFormInputs) => {
    // console.log("🚀 ~ file: form.tsx:49 ~ submitForm ~ data", data);
    // make 2 seconds promise
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // alert(JSON.stringify(data, null, 2));

    const status = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
    console.log("🚀 ~ file: login.tsx:63 ~ submitForm ~ status", status);

    if (status?.ok && status?.url) router.push(status.url);

    reset();
  };

  const canSubmit = !isDirty || !isValid || isSubmitting;

  // Google Handler function
  async function handleGoogleSignin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    await signIn("google", { callbackUrl: "/" });
  }

  // Github Login
  async function handleGithubSignin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    await signIn("github", { callbackUrl: "/" });
  }

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <section className="mx-auto flex w-4/5 flex-col gap-5">
        {/*top title */}
        <div>
          <h1 className="py-4 text-4xl font-bold text-gray-800">Explore</h1>
          <p className="mx-auto w-4/5 text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?
          </p>
        </div>

        {/*middle form */}
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-3">
          {/* inputs */}
          <div
            className={`${styles.input_group} ${
              errors.email && touchedFields.email ? "border-red-600" : ""
            }`}
          >
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className={styles.input_text}
            />
            {/* icon */}
            <span className="flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <p className="text-xs text-red-600 dark:text-red-500">{errors.email?.message}</p>

          <div
            className={`${styles.input_group} ${
              errors.password && touchedFields.password ? "border-red-600" : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              {...register("password")}
              placeholder="password"
              className={styles.input_text}
            />
            {/* icon */}
            <span className="flex items-center px-4" onClick={() => setShow(!show)}>
              {!show ? <HiEye size={25} /> : <HiEyeOff size={25} />}
            </span>
          </div>
          <p className="text-xs text-red-600 dark:text-red-500">{errors.password?.message}</p>

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button type="submit" onClick={handleGoogleSignin} className={styles.button_custom}>
              Sign In with Google{" "}
              <Image src={"/assets/google.svg"} width="20" height={20} alt="google" />
            </button>
          </div>
          <div className="input-button">
            <button type="submit" onClick={handleGithubSignin} className={styles.button_custom}>
              Sign In with Github{" "}
              <Image src={"/assets/github.svg"} width={25} height={25} alt="github" />
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          don&apos;t have an account yet?&nbsp;
          <Link className="text-blue-700" href="/register">
            Sign Up
          </Link>
        </p>
      </section>
      <DevT control={control} placement="top-right" /> {/* set up the dev tool */}
    </div>
  );
};
export default Login;

Login.getLayout = (page: React.ReactElement) => <Layout layout="public">{page}</Layout>;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
