import { FormLogin } from "./FormLogin";
import { Header } from "./Header";

export const Login = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <Header />
      <FormLogin />
    </div>
  );
};
