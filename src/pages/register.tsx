import Layout from "@/components/layout/layout";
import Head from "next/head";
import Link from "next/link";
import { NextPageWithLayout } from "./_app";
import styles from "@/styles/Form.module.css";
import { HiAtSymbol, HiEye, HiEyeOff, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const DevT: React.ElementType = dynamic(
  () => import("@hookform/devtools").then((module) => module.DevTool),
  { ssr: false }
);

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  cpassword: string;
}
const initialValues: IFormInputs = {
  username: "test123",
  email: "test@gmail.com",
  password: "test123",
  cpassword: "test123",
};

const schema = yup.object().shape({
  username: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  password: yup.string().min(4).max(30).required("Required"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Register: NextPageWithLayout = () => {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();

  const {
    watch,
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty, isSubmitting, touchedFields },
  } = useForm<IFormInputs>({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const submitForm = async (data: IFormInputs) => {
    // make 2 seconds promise
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // alert(JSON.stringify(data, null, 2));
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // };

    // await fetch("/api/auth/signup", options)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.status === 201) {
    //       router.push("/login");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    try {
      const res = await axios.post("/api/auth/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      console.log(res);
      if (res.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error);
      }
    }
  };

  const canSubmit = !isDirty || !isValid || isSubmitting;

  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <section className="mx-auto flex w-4/5 flex-col gap-5">
        {/*top title */}
        <div>
          <h1 className="py-4 text-4xl font-bold text-gray-800">Register</h1>
          <p className="mx-auto w-4/5 text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?
          </p>
        </div>

        {/*middle form */}
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-3">
          {/* <code className="w-full text-left">
            <pre className="mb-4 rounded-md bg-gray-800 p-4 font-mono text-xs text-white">
              {JSON.stringify(watch(), null, 2)}
            </pre>
          </code> */}
          {/* inputs */}
          <div
            className={`${styles.input_group} ${
              errors.username && touchedFields.username ? "border-red-600" : ""
            }`}
          >
            <input
              type="text"
              {...register("username")}
              placeholder="Username"
              className={styles.input_text}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          <p className="text-xs text-red-600 dark:text-red-500">{errors.username?.message}</p>

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
              type={`${show.password ? "text" : "password"}`}
              {...register("password")}
              placeholder="Password"
              className={styles.input_text}
            />
            {/* icon */}
            <span
              className="flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              {!show.password ? <HiEye size={25} /> : <HiEyeOff size={25} />}
            </span>
          </div>
          <p className="text-xs text-red-600 dark:text-red-500">{errors.password?.message}</p>

          <div
            className={`${styles.input_group} ${
              errors.cpassword && touchedFields.cpassword ? "border-red-600" : ""
            }`}
          >
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              {...register("cpassword")}
              placeholder="Confirm Password"
              className={styles.input_text}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              {!show.cpassword ? <HiEye size={25} /> : <HiEyeOff size={25} />}
            </span>
          </div>
          <p className="text-xs text-red-600 dark:text-red-500">
            {/* {errors.cpassword && "Passwords Should Match!"} */}
            {errors.cpassword?.message}
          </p>

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Create Account
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          Have an account?&nbsp;
          <Link href={"/login"} className="text-blue-700">
            Sign In
          </Link>
        </p>
      </section>
      <DevT control={control} placement="top-right" /> {/* set up the dev tool */}
    </div>
  );
};
export default Register;

Register.getLayout = (page: React.ReactElement) => <Layout layout="public">{page}</Layout>;
