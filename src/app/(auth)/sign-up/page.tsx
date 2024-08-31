"use client";

import { z } from "zod";
import { TextInput } from "@/components/_ui/Inputs/TextInput";
import { Button } from "@/components/_ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/components/_ui/Inputs/ErrorMessage";
import { useServerAction } from "zsa-react";
import { signUpAction } from "@/app/(auth)/sign-up/actions";
import { useToast } from "@/components/_ui/use-toast";
import { passwordValidation } from "@/util/password";

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Your password must contain 8 characters." })
      .regex(passwordValidation, {
        message:
          "Your password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    passwordConfirmation: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

export default function RegisterPage() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  const { execute: executeSignUp, isPending } = useServerAction(signUpAction, {
    onError({ err }) {
      toast({
        title: "Something went wrong",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    executeSignUp(data);
  };

  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInput {...register("email")} label="Email" type="email" />
        <ErrorMessage message={errors.email?.message} />
        <TextInput {...register("password")} label="Password" type="password" />
        <ErrorMessage message={errors.password?.message} />
        <TextInput
          {...register("passwordConfirmation")}
          label="Confirm Password"
          type="password"
        />
        <ErrorMessage message={errors.passwordConfirmation?.message} />
        <Button
          className="w-full"
          type="submit"
          disabled={!isValid}
          isLoading={isPending}
        >
          Register
        </Button>
      </form>
    </div>
  );
}
