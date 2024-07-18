import { useState } from "react";
import { z } from "zod";

const formshema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const useForm = () => {
  const [err, seterr] = useState({
    email: "",
    password: "",
    success: false,
  });

  const FormSubmit = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const validators = formshema.parse({ email, password });

      seterr({
        email: "",
        password: "",
        success: true,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.log(error.flatten().fieldErrors.email);

        seterr({
          email: error.flatten().fieldErrors.email?.[0] || "",
          password: error.flatten().fieldErrors.password?.[0] || "",
          success: false,
        });
      }
    }
    // Return a result or redirect
    // return { success: true };
    // or
    // redirect('/dashboard');
  };
  // Ret

  return {
    FormSubmit,

    err,
  };
  // Ret
};
