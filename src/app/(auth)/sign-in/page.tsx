"use client";

import { Anchor } from "@/components/_ui/Anchor";
import { Button } from "@/components/_ui/Button";
import { TextInput } from "@/components/_ui/Inputs/TextInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerAction } from "zsa-react";
import { useToast } from "@/components/_ui/use-toast";
import { signInAction } from "@/app/(auth)/sign-in/actions";
import { ErrorMessage } from "@/components/_ui/Inputs/ErrorMessage";
import { passwordValidation } from "@/util/password";

const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Your password must contain 8 characters." })
    .regex(passwordValidation, {
      message:
        "Your password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

export default function SignInPage() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<z.infer<typeof signInSchema>>({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const { execute: executeSignIn, isPending } = useServerAction(signInAction, {
    onError({ err }) {
      console.log(err);
      toast({
        title: "Something went wrong",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    executeSignIn(data);
  };

  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextInput {...register("email")} label="Email" type="email" />
        <ErrorMessage message={errors.email?.message} />
        <TextInput {...register("password")} label="Password" type="password" />
        <ErrorMessage message={errors.password?.message} />
        <Button
          className="w-full"
          type="submit"
          disabled={!isValid}
          isLoading={isPending}
        >
          Sign In
        </Button>
      </form>
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-100 px-2 text-gray-500">Or</span>
        </div>
      </div>

      <Anchor href="/sign-up" className="w-full" variant="secondary">
        Create an account
      </Anchor>
    </div>
  );
}
