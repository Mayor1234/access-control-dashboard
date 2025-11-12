import { useFormContext } from 'react-hook-form';
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

interface LoginFormData {
  email: string;
  password: string;
}

const LoginComponent: React.FC<Props> = ({ setActiveScreen }) => {
  const [loginUser, { isLoading }] = useLoginMutation();
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const from = location.state?.from?.pathname || '/dashboard';
  // const [setUserId] = useLocalStorage('user_id', '');

  const {
    handleSubmit,
    // formState: { errors },
  } = useFormContext<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 max-w-sm">
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-[#202224]">Login</h2>
          <p className="text-pry-light leading-relaxed">
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
