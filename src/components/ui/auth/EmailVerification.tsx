import React, { useState, useRef, useEffect } from 'react';

import { toast } from 'react-toastify';
import OtpTimer from '../../../shared/utils/OtpTimer';

type LoginStep = 'credentials' | 'otp-verification' | 'success';

type Props = {
  activeScreen: string;
  setActiveScreen: React.Dispatch<React.SetStateAction<LoginStep>>;
};

const EmailVerification: React.FC<Props> = ({ setActiveScreen }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  // Focus first input on component mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // This Prevent multiple characters

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

  const handleContinue = () => {
    const otpValue = otp.join('');

    const otpNumber = '232323';
    if (!otpValue) {
      toast.error('Enter OTP to continue');
      return;
    }

    if (otpValue.length !== 6) {
      toast.error('Incomplete Otp');
      return;
    }

    if (otpValue !== otpNumber) {
      toast.error('Incorrect Otp!');
      return;
    }
    // Handle verification logic here
    toast.success('Email verification successful');

    setActiveScreen('success');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#202224] mb-4">OTP</h1>
        <p className="text-[#202224] leading-relaxed">
          Enter the code we've sent to your Email
          <br />
          and proceed
        </p>
      </div>

      {/* OTP Input Section */}
      <div className="mb-8 w-full">
        <label className="block text-gray-700 font-medium mb-4">
          Enter OTP sent
        </label>
        <div className="flex justify-center gap-5 w-full mb-10">
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
              className="w-11 h-11 text-center text-lg font-medium border border-[#848484] rounded-xl focus:border-active focus:outline-none focus:ring-1 focus:ring-active transition-colors"
            />
          ))}
        </div>
        <OtpTimer />
      </div>

      <button
        type="submit"
        className="bg-pry text-[#fff] py-3 w-full text-center rounded-lg not-odd:font-medium transition-all duration-300 ease-linear focus:outline-none focus:ring-1 focus:ring-active text-sm cursor-pointer hover:bg-[#24356D]"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default EmailVerification;
