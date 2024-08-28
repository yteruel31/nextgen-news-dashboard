import { Anchor } from "@/components/_ui/Anchor";
import { Button } from "@/components/_ui/Button";
import { TextInput } from "@/components/_ui/TextInput";

export default function SignInPage() {
  return (
    <div className="py-24 mx-auto max-w-[400px] space-y-6">
      <h1>Sign In</h1>

      <TextInput label="Email" type="email" />
      <TextInput label="Password" type="password" />

      <Button className="w-full" type="submit">
        Sign In
      </Button>
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
