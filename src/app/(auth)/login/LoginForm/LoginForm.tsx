"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { loginSchema, loginSchemaType } from "../Schema/Schema.login";
import { loginFn } from "../actions/Login.actions";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  // react hook form zod ==> collect data , validation
  // UI ==> UI

  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handelLogin(data: loginSchemaType) {
    setLoading(true);

    try {
      const inSuccess = await signIn('credentials', {redirect:false , ...data})
      console.log(inSuccess)

      // const inSuccess = await loginFn(data);
      if (inSuccess?.ok) {
        toast.success("Login successfuly", {
          position: "top-right",
        });
        router.push("/");
        reset();
      }else{
         toast.error("Incorrect email or password",{
        position: "top-right",
      });
      }
    } catch (error: any) {
      toast.error(error?.message, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-40">
      <form className="w-2/3 mx-auto my-5" onSubmit={handleSubmit(handelLogin)}>
        <FieldGroup>
          {/* email  */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Email..."
                  autoComplete="off"
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* password  */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Password..."
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button className="my-5 flex items-center justify-center min-w-30">
          {isLoading ? <ClipLoader size={14} color="#fff" /> : "Login"}
        </Button>


      </form>
    </div>
  );
}
