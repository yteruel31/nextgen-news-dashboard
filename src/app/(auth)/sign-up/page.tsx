"use client";

import { z } from "zod";
import { TextInput } from "@/components/_ui/TextInput";
import { Button } from "@/components/_ui/Button";

const registrationSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export default function RegisterPage() {
  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      <h1>Sign Up</h1>
      <TextInput label={"Email"} type={"email"} />
      <TextInput label={"Password"} type={"password"} />
      <TextInput label={"Confirm Password"} type={"password"} />
      <Button className="w-full" type="submit">
        Register
      </Button>
    </div>
  );
}
