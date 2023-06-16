import { FormControl, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

interface FormProps {
  name?: string;
  email?: string;
  password?: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })
  .required();

export const FormRegister = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data: FormProps) => {
    try {
      await axios.post("https://mock-api.arikmpt.com/api/user/register", { name: data.name, email: data.email, password: data.password });
      navigate("/login");
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="mx-auto max-w-lg rounded-lg border">
        <div className="flex flex-col gap-4 p-4 md:p-8">
          <div>
            <FormControl fullWidth>
              <Controller name="name" control={control} render={({ field }) => <TextField value={field.value} onChange={field.onChange} variant="outlined" label="Name" helperText={errors?.name?.message} error={!!errors?.name} />} />
              {/* <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Name</label>
            <input name="name" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" /> */}
            </FormControl>
          </div>

          <div>
            <FormControl fullWidth>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <TextField value={field.value} onChange={field.onChange} variant="outlined" label="Email" type="email" helperText={errors?.email?.message} error={!!errors?.email} />}
              />
              {/* <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Name</label>
            <input name="name" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" /> */}
            </FormControl>
          </div>

          <div>
            <FormControl fullWidth>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <TextField type="password" value={field.value} onChange={field.onChange} variant="outlined" label="Password" helperText={errors?.password?.message} error={!!errors?.password} />}
              />
              {/* <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Name</label>
            <input name="name" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" /> */}
            </FormControl>
          </div>

          <button
            onClick={handleSubmit(onsubmit)}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base"
          >
            Register
          </button>
        </div>

        <div className="flex items-center justify-center bg-gray-100 p-4">
          <p className="text-center text-sm text-gray-500">
            Do you have an account?
            <a href={"/login"} className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
