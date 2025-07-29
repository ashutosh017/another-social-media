"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { signup } from "@/app/actions/auth.actions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password cannot be empty.",
  }),
});

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMessage("");
    const res = await signup(values);
    if (res.msg === "USER_ALREADY_EXIST") {
      setErrorMessage("This username is already taken.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        {/* Instagram Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-400 bg-clip-text text-transparent">
            Instagram
          </h1>
        </div>

        {/* Signup Form */}
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-8 mb-4">
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
              Sign up to see photos and videos from your friends.
            </p>
          </div>

          {/* Facebook Signup */}
          {/* <Button
            variant="default"
            className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm mb-4"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Log in with Facebook
          </Button> */}

          {/* Divider */}
          {/* <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-gray-500 dark:text-gray-400 text-sm font-semibold">OR</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div> */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm py-3 px-3 rounded-sm focus:border-gray-400 dark:focus:border-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm py-3 px-3 rounded-sm focus:border-gray-400 dark:focus:border-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm py-3 px-3 pr-12 rounded-sm focus:border-gray-400 dark:focus:border-gray-500"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errorMessage && (
                <div className="text-sm text-red-500 text-center ">
                  {errorMessage}
                </div>
              )}

              {/* <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-4">
                People who use our service may have uploaded your contact
                information to Instagram.{" "}
                <Link
                  href="#"
                  className="text-blue-900 dark:text-blue-400 hover:underline"
                >
                  Learn More
                </Link>
              </div>

              <div className="text-center text-xs text-gray-500 dark:text-gray-400 pb-4">
                By signing up, you agree to our{" "}
                <Link
                  href="#"
                  className="text-blue-900 dark:text-blue-400 hover:underline"
                >
                  Terms
                </Link>
                ,{" "}
                <Link
                  href="#"
                  className="text-blue-900 dark:text-blue-400 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-blue-900 dark:text-blue-400 hover:underline"
                >
                  Cookies Policy
                </Link>
                .
              </div> */}

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
              >
                Sign up
              </Button>
            </form>
          </Form>
        </div>

        {/* Login Link */}
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-900 dark:text-gray-100">
            Have an account?{" "}
            <Link
              href="/signin"
              className="text-blue-500 dark:text-blue-400 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Get the App */}
      </div>
    </div>
  );
}
