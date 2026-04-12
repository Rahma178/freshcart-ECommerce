"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "./schema/SchemaRegister";
import { registerFn } from "./actions/Register.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function RegisterForm() {
  // react hook form zod ==> collect data , validation
  // UI ==> UI

  const router = useRouter()

  const[isLoading,setLoading] = useState(false)

  const { handleSubmit, control, reset } = useForm<registerSchemaType>(
    {
      resolver:zodResolver(registerSchema),
      defaultValues:{
        name:'',
        email:'',
        password:'',
        rePassword:'',
        phone:''
      }
    }
  );

  async function handleRegister(data:registerSchemaType){

    setLoading(true)

    try {
      const inSuccess =await registerFn(data)
      if(inSuccess){
        toast.success('user created successfuly',{
          position:'top-right'
        })
        router.push('/login')
        reset()

      }

    } catch (error:any) {
      toast.error(error?.message,{
          position:'top-right'
        })
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="mt-40">
      <form className="w-2/3 mx-auto my-5" onSubmit={handleSubmit(handleRegister)}>
        <FieldGroup>
            {/* name  */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* email  */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                    Email
                  </FieldLabel>
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
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
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

             {/* repassword  */}
            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="repassword">
                    Repassword
                  </FieldLabel>
                  <Input
                    {...field}
                    id="repassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Repassword..."
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* phone  */}
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">
                    Phone
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder=" Enter Your Phone..."
                    autoComplete="off"
                    type="tel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

        </FieldGroup>

         <Button className="my-5 flex items-center justify-center min-w-30">
          {isLoading ? <ClipLoader size={14} color="#fff" /> : "Register"}
        </Button>

      </form>
    </div>
  );
}