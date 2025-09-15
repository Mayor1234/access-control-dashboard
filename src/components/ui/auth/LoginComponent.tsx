import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../forms/FormInput';

type LoginStep = 'credentials' | 'otp-verification' | 'success';

type Props = {
  activeScreen: string;
  setActiveScreen: React.Dispatch<React.SetStateAction<LoginStep>>;
};

type LoginValues = {
  email: string;
  password: string;
};

const LoginComponent: React.FC<Props> = ({ setActiveScreen }) => {
  const methods = useForm<LoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('login credential:', data);
    const email = 'mantra@gmail.com';
    const password = 'admin2025';
    try {
      if (!data.email || !data.password) {
        toast.error("email and password can't be empty");
        return;
      }
      if (data.email !== email || data.password !== password) {
        toast.error('incorrect email or password');
        return;
      }
      setActiveScreen('otp-verification');
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.stopPropagation(); // prevent bubbling to parent form
            e.preventDefault(); // prevent native form submit
            handleSubmit(); // run RHF submission
          }}
        >
          <div className="space-y-6 max-w-sm">
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-[#202224]">
                Login
              </h2>
              <p className="text-[#202224] leading-relaxed">
                Securely login to manage and monitor access in real time
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email address
              </label>
              <FormInput name="email" placeholder="Enter email" />
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <FormInput name="password" placeholder="Enter password" />
            </div>
            <div className="flex justify-between text-xs text-pry">
              <p>Remember Password</p>
              <Link
                to={'/forgot-password'}
                className="transition-all duration-300 ease-linear hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-pry text-[#fff]  py-3 w-full text-center rounded-lg not-odd:font-medium transition-all duration-300 ease-linear ocus:outline-none focus:ring-1 focus:ring-active text-base cursor-pointer hover:bg-[#24356D]"
            >
              Sign In
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginComponent;
