import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";

interface FormProps {
  name?: string;
  status?: string;
}

const schema = yup
  .object({
    name: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

export const FormAddCategory = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/category");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data: FormProps) => {
    try {
      await axios.post("https://mock-api.arikmpt.com/api/category/create", { name: data.name, is_active: data.status === "Active" ? true : false }, { headers: { Authorization: `Bearer ${token}` } });
      navigate("/category");
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Add Category</h2>
      </div>
      <div className="mx-auto max-w-lg rounded-lg border">
        <div className="flex flex-col gap-4 p-4 md:p-8">
          <FormControl fullWidth>
            <Controller name="name" control={control} render={({ field }) => <TextField value={field.value} onChange={field.onChange} variant="outlined" label="Name" helperText={errors?.name?.message} error={!!errors?.name} />} />
          </FormControl>
        </div>
        <div className="flex flex-col gap-4 px-4 md:px-8">
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Controller
              name="status"
              control={control}
              defaultValue="Active"
              render={({ field }) => (
                <Select labelId="status" value={field.value} onChange={field.onChange} id="status" label="Status">
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Deactive">Deactive</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </div>

        <div className="flex items-center mt-4 p-8 gap-x-3">
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
    </div>
  );
};
