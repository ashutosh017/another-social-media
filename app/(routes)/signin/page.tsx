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
import { Eye, LucideEyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signin } from "@/app/actions/auth.actions";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password cannot be empty.",
  }),
});

export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await signin(values);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-4xl mx-auto h-screen px-2 flex justify-center flex-col"
        >
          <h2 className="text-xl font-semibold text-center">Signin</h2>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your Username" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex items-center ">
                    <Input
                      type={showPassword ? `text` : `password`}
                      placeholder="Your Password"
                      className="border-r-0 rounded-r-none"
                      {...field}
                    />
                    <div
                      className="cursor-pointer  border rounded-md border-l-0 h-full flex items-center justify-center px-2 bg-input/30 rounded-l-none"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? <Eye /> : <LucideEyeOff />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="select-none" type="submit">
            Submit
          </Button>
          <Link
            className="text-sky-800  underline text-center "
            href={"/signup"}
          >
            Don't have an account?
          </Link>
        </form>
      </Form>
    </div>
  );
}
