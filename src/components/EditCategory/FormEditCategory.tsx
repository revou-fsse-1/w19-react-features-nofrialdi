import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

interface FormProps {
  id?: string;
  name?: string;
  status?: string;
}

const schema = yup
  .object({
    id: yup.string().required(),
    name: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

export const FormEditCategory = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/category");
  };

  const { id } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`https://mock-api.arikmpt.com/api/category/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      reset({
        id: response.data.data.id,
        name: response.data.data.name,
        status: response.data.data.is_active ? "Active" : "Deactive",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onsubmit = async (data: FormProps) => {
    try {
      await axios.put("https://mock-api.arikmpt.com/api/category/update", { id: data.id, name: data.name, is_active: data.status === "Active" ? true : false }, { headers: { Authorization: `Bearer ${token}` } });
      navigate("/category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Edit Category</h2>
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

        <div className="flex items-center p-8 mt-4 gap-x-3">
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
            className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-green-300 transition duration-100 hover:bg-green-600 focus-visible:ring active:bg-green-700 md:text-base"
          >
            <svg style={{ fill: "#ffffff" }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
            <span>Edit Category</span>
          </button>
        </div>
      </div>
    </div>
  );
};
