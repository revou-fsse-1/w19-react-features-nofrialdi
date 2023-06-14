export const FormLogin = () => {
  return (
    <div>
      <form className="mx-auto max-w-lg rounded-lg border">
        <div className="flex flex-col gap-4 p-4 md:p-8">
          <div>
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
            <input name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
          </div>

          <div>
            <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
            <input name="password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
          </div>

          <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">
            Log in
          </button>
        </div>

        <div className="flex items-center justify-center bg-gray-100 p-4">
          <p className="text-center text-sm text-gray-500">
            Don't have an account?
            <a href="/Register" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
