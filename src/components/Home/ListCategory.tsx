import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

const ListCategory = () => {
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  const handleRedirect = (path: string) => () => {
    navigate(path);
  };

  const handleEdit = (id: string) => () => {
    navigate(`/category/edit/${id}`);
  };

  const fatchList = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get("https://mock-api.arikmpt.com/api/category", { headers });
    setCategories(response.data.data);
  };

  useEffect(() => {
    fatchList();
  });

  const deleteCategory = (id: string) => async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, { headers });
      fatchList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto mt-4 max-w-screen-2xl px-4 md:px-8">
      <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">List of Category</h2>

      <div className="mx-5 mt-6 md:flex md:items-center md:justify-between">
        <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
          <button
            onClick={handleRedirect("/category/add")}
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
          >
            <svg style={{ fill: "#ffffff" }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            </svg>

            <span>Add Category</span>
          </button>
        </div>

        <div className="relative flex items-center mt-4 md:mt-0">
          <span className="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Search"
            className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
      </div>

      <div className="mt-5 mx-4 overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
        <table className="  min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                No
              </th>

              <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-white">
                Name
              </th>

              <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  text-white">
                Status
              </th>

              <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                  <p className="font-medium text-gray-800 dark:text-white">{category.id}</p>
                </td>
                <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                  <p className="font-medium text-gray-800 dark:text-white">{category.name}</p>
                </td>
                <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                  <p className="font-medium text-gray-800 dark:text-white">{category.is_active ? "Active" : "Deactive"}</p>
                </td>
                <td className="flex items-center my-2 gap-x-3">
                  <button
                    onClick={handleEdit(category.id)}
                    className="  flex items-center justify-center w-1/2 px-1 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-green-600 dark:hover:bg-green-500 dark:bg-green-600"
                  >
                    <svg style={{ fill: "#ffffff" }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>

                    <span>Edit</span>
                  </button>

                  <button
                    onClick={deleteCategory(category.id)}
                    className="  flex items-center justify-center w-1/2 px-1 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-600"
                  >
                    <svg style={{ fill: "#ffffff" }} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>

                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ListCategory;
