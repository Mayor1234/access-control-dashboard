import React, { useEffect, useState } from 'react';

interface Props {
  duration?: number; // in seconds
  onResend?: () => void;
}

const OtpTimer: React.FC<Props> = ({ duration = 30 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [resendAllowed, setResendAllowed] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setResendAllowed(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const progressPercent = ((duration - timeLeft) / duration) * 100;

  const handleResend = () => {
    if (resendAllowed) {
      //  onResend();
      setTimeLeft(duration);
      setResendAllowed(false);
    }
  };

  return (
    <div className="w-full mt-4 space-y-2">
      {progressPercent !== 100 && (
        <div className="w-full bg-zinc-100 shadow-inner shadow-purple-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-pry h-full transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
      <div className="flex items-center text-sm text-gray-600">
        <span>
          {resendAllowed ? "Didn't receive code?" : `Wait ${timeLeft}s`}
        </span>
        <button
          onClick={handleResend}
          disabled={!resendAllowed}
          className={`ml-4 text-sm transition py-1 rounded cursor-pointer ${
            resendAllowed ? 'text-active' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OtpTimer;
