import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import OtpTimer from '../../../shared/utils/OtpTimer';
import { useValidateOtpMutation } from '../../../redux/features/auth/authApi';
import Spinners from '../../spinnners/Spinners';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/app/hook';
import { setUser } from '../../../redux/features/auth/authSlice';
import UserStorage from '../../../shared/utils/userStorage';
import { Button } from '../button/Button';

type LoginStep = 'credentials' | 'otp-verification' | 'success';

interface UserCredential {
  email: string;
  password: string;
}

type Props = {
  setActiveScreen: React.Dispatch<React.SetStateAction<LoginStep>>;
  userCredential: UserCredential;
};

const EmailVerification: React.FC<Props> = ({ userCredential }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const [validateOtp, { isLoading }] = useValidateOtpMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only allow numeric values
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData('text').trim();

    // Extract only digits from pasted content
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);

    if (digits.length === 0) {
      toast.error('Please paste a valid OTP');
      return;
    }

    // Fill the OTP inputs with pasted digits
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = digits[i] || '';
    }
    setOtp(newOtp);

    // Focus the last filled input or the first empty one
    const lastFilledIndex = Math.min(digits.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleContinue = async () => {
    const otpValue = otp.join('');

    if (!userCredential.email || !userCredential.password || !otpValue) {
      toast.error('Invalid credentials');
      return;
    }

    if (otpValue.length !== 6) {
      toast.error('Incomplete OTP');
      return;
    }

    try {
      const response = await validateOtp({
        email: userCredential.email,
        password: userCredential.password,
        otp: otpValue,
      }).unwrap();

      if (response.status === 'success') {
        toast.success(
          response.message || 'Login successful! Please verify OTP to continue.'
        );
        dispatch(
          setUser({
            data: response.data,
            token: response.token,
          })
        );
        UserStorage.setCommunityAdminId(response.data.id);
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your network and try again.');
    }
  };

  return (
    <div className="max-w-sm">
      {/* Header */}
      <div className="mb-6 sm:mb-7 lg:mb-8">
        <h2 className="mb-2 sm:mb-3 lg:mb-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-[#202224]">
          OTP
        </h2>
        <p className="text-pry-light leading-relaxed">
          Enter the code we've sent to your Email and proceed
        </p>
      </div>

      {/* OTP Input Section */}
      <div className="mb-8 w-full">
        <label className="block text-gray-700 font-medium mb-4">
          Enter OTP sent
        </label>
        <div className="flex justify-center gap-3 w-full mb-10">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-10 h-10 md:w-11 md:h-11 text-center text-lg font-medium border border-[#848484] rounded-xl focus:border-active focus:outline-none focus:ring-1 focus:ring-active transition-colors"
            />
          ))}
        </div>
        <OtpTimer />
      </div>

      <Button
        variant="primary"
        size="md"
        type="submit"
        className="rounded-lg py-3 w-full disabled:bg-pry-light disabled:cursor-not-allowed"
        disabled={isLoading}
        onClick={handleContinue}
      >
        {isLoading ? (
          <Spinners variant="dots" size="sm" color="white" label="Wait..." />
        ) : (
          'Continue'
        )}
      </Button>
    </div>
  );
};

export default EmailVerification;
