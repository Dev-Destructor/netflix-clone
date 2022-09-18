import { signOut } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

function login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Handles signIn/signUp
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black/75 md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <meta name="description" content="netflix clone" />
        <link rel="icon" href="/netflix_icon.ico" />
      </Head>
      <Image
        className="-z-10 !hidden opacity-60 sm:!inline"
        src="https://rb.gy/p2hphi"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute left-4 top-4 md:left-10 md:top-6">
        <Image
          src="https://rb.gy/ulxxee"
          className="cursor-pointer object-contain"
          width={150}
          height={50}
        />
      </div>

      <form
        action="/"
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              className="input"
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-secondary">
                Please enter a valid email
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-secondary">
                Please enter a valid password
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-secondary py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign Up Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default login;
