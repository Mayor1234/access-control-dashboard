import { useFormContext, type FieldValues } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../forms/FormInput';

import { useLoginMutation } from '../../../redux/features/auth/authApi';
import Spinners from '../../spinnners/Spinners';
import { Button } from '../button/Button';

type LoginStep = 'credentials' | 'otp-verification' | 'success';

type Props = {
  setActiveScreen: React.Dispatch<React.SetStateAction<LoginStep>>;
};

const LoginComponent: React.FC<Props> = ({ setActiveScreen }) => {
  const [loginUser, { isLoading }] = useLoginMutation();

  const { handleSubmit } = useFormContext();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response.status === 'success') {
        setActiveScreen('otp-verification');
        toast.success(
          response.message || 'Login successful! Please verify OTP to continue.'
        );
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-4 sm:space-y-5 lg:space-y-6 w-full">
        <div className="mb-6 sm:mb-7 lg:mb-8">
          <h2 className="mb-2 sm:mb-3 lg:mb-4 text-xl md:text-2xl font-semibold text-[#202224]">
            Login
          </h2>
          <p className="text-pry-light leading-relaxed">
            Securely login to manage and monitor access in real time
          </p>
        </div>

        {/* Email Field */}
        <FormInput
          name="email"
          type="email"
          label="Email address"
          placeholder="Enter email"
        />

        {/* Password Field with Toggle */}
        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter password"
          showPasswordToggle={true}
        />

        <div className="flex justify-between text-sm text-pry">
          <p>Remember Password</p>
          <Link
            to={'/forgot-password'}
            className="transition-all duration-300 ease-linear hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          variant="primary"
          size="md"
          type="submit"
          className="rounded-lg py-3 w-full disabled:bg-pry-light disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinners variant="dots" size="sm" color="white" label="Wait..." />
          ) : (
            'Log In'
          )}
        </Button>
      </div>
    </form>
  );
};

export default LoginComponent;
