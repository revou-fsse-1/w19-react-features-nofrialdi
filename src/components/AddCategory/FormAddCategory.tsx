import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormControl, TextField } from "@mui/material";
import axios from "axios";

interface FormProps {
  name?: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export const FormAddCategory = () => {
  const token = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjNzFlNjY5LTM4ZGYtNGRkNy04NDYwLTc4ODc2ZmM0NTNjOSIsImlhdCI6MTY4NjgzMzkyNCwiZXhwIjoxNjg2ODU1NTI0fQ.kg49R7kIbMu9nE2x2OMGVt6514C4HQfu72LR42e6LGg";
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/listCategory");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data: FormProps) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.post("https://mock-api.arikmpt.com/api/category/create", { name: data.name }, { headers });
    navigate("/listCategory");
    console.log(data);
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Add Category</h2>
      </div>
      <div className="mx-auto max-w-lg rounded-lg border">
        <FormControl fullWidth>
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <Controller name="name" control={control} render={({ field }) => <TextField value={field.value} onChange={field.onChange} variant="outlined" label="Name" helperText={errors?.name?.message} error={!!errors?.name} />} />

            <div className="flex items-center mt-4 gap-x-3">
              <button
                onClick={handleRedirect}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-700 md:text-base"
              >
                <svg style={{ fill: "#ffffff" }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
                <span>Back</span>
              </button>

              <button
                onClick={handleSubmit(onsubmit)}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base"
              >
                <svg style={{ fill: "#ffffff" }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
                <span>Add Category</span>
              </button>
            </div>
          </div>
        </FormControl>
      </div>
    </div>
    // <div>
    //   <form onClick={handleSubmit(useForm)} className="mx-auto max-w-lg rounded-lg border">
    //     <div className="flex flex-col gap-4 p-4 md:p-8">
    //       <div>
    //         <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Name</label>

    //         <input  name="name" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
    //       </div>

    //       <div className="flex items-center mt-4 gap-x-3">
    //         <button
    //           onClick={handleRedirect}
    //           className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-red-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-700 md:text-base"
    //         >
    //           <svg style={{ fill: "#ffffff" }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
    //             <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
    //           </svg>
    //           <span>Back</span>
    //         </button>

    //         <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base">
    //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
    //             <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    //           </svg>
    //           <span>Add Category</span>
    //         </button>
    //       </div>
    //     </div>

    //     <div className="flex items-center justify-center bg-gray-100 p-4">
    //       <p className="text-center text-sm text-gray-500">
    //         Do you have an account?
    //         <a href="/" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">
    //           Login
    //         </a>
    //       </p>
    //     </div>
    //   </form>
    // </div>
  );
};
