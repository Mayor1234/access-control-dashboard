import logo from '../../assets/logo/access-logo.png';
import { useState } from 'react';
import EmailVerification from '../../components/ui/auth/EmailVerification';
import LoginComponent from '../../components/ui/auth/LoginComponent';
import SuccessComponent from '../../components/ui/auth/SuccessComponent';
import vector from '../../assets/Vector-icon.png';
import appos from '../../assets/appos.png';
import vectorL from '../../assets/Vector-l.png';
import gridIcon from '../../assets/grid-icon.png';

type LoginStep = 'credentials' | 'otp-verification' | 'success';

const Login = () => {
  const [activeScreen, setActiveScreen] = useState<LoginStep>('credentials');

  return (
    <section className="flex items-center justify-center w-screen h-screen relative">
      <div className="flex w-full h-full">
        <div className="bg-[url('assets/access-bg.jpg')] bg-cover bg-center bg-no-repeat h-screen w-1/2 relative p-10 before:absolute before:inset-0 before:bg-[#24356DE5]/90">
          <div className="absolute z-50">
            <img
              src={logo}
              alt="Mantra logo"
              width={100}
              height={100}
              className="w-38 h-10 mb-20"
            />
            <div className="max-w-[450px] flex flex-col">
              <div className="text-3xl text-mantra-orange mb-10 self-end">
                <img
                  src={gridIcon}
                  alt="appostrophy"
                  width={100}
                  height={100}
                  className="w-16 h-16"
                />
              </div>
              <div className="text-3xl text-mantra-orange mb-5">
                <img
                  src={appos}
                  alt="appostrophy"
                  width={100}
                  height={100}
                  className="w-4 h-4"
                />
              </div>
              <p className="leading-relaxed text-[#fff] text-xl tracking-wide mb-5">
                Experience a new era of security and convenience with our Access
                Control Application
                <br />— a smarter way to manage and monitor entry points. From
                secure QR code check-ins to real-time oversight, we empower you
                to control who comes and goes with ease, ensuring safety,
                efficiency, and peace of mind for your community or workplace.
              </p>
              <div className="text-3xl text-mantra-orange self-end">
                <img
                  src={vectorL}
                  alt="appostrophy"
                  width={100}
                  height={100}
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-10 h-full flex justify-center items-center">
          <div className="max-w-xl w-[450px] h-[543px] bg-[#fff] rounded-3xl p-10 box-border overflow-hidden md:inset-0 max-h-full inset-x-32 inset-y-32 flex items-center justify-center">
            {activeScreen === 'credentials' && (
              <LoginComponent
                activeScreen={activeScreen}
                setActiveScreen={setActiveScreen}
              />
            )}
            {activeScreen === 'otp-verification' && (
              <EmailVerification
                activeScreen={activeScreen}
                setActiveScreen={setActiveScreen}
              />
            )}
            {activeScreen === 'success' && <SuccessComponent />}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0">
        <img
          src={vector}
          alt="vector"
          width={100}
          height={100}
          className="w-24 h-24"
        />
      </div>
    </section>
  );
};

export default Login;
