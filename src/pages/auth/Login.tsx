import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import EmailVerification from '../../components/ui/auth/EmailVerification';
import LoginComponent from '../../components/ui/auth/LoginComponent';
import logo from '../../assets/logo/access-logo.png';
import vector from '../../assets/Vector-icon.png';
import appos from '../../assets/appos.png';
import vectorL from '../../assets/Vector-l.png';
import gridIcon from '../../assets/grid-icon.png';

type LoginStep = 'credentials' | 'otp-verification';

const LoginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const Login = () => {
  const [activeScreen, setActiveScreen] = useState<LoginStep>('credentials');

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const userCredential = methods.getValues();

  return (
    <section className="flex items-center justify-center w-screen min-h-screen relative overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full min-h-screen">
        {/* Left Side - Hero Section */}
        <div className="relative bg-[url('assets/access-bg.jpg')] bg-cover bg-center bg-no-repeat w-full lg:w-1/2 min-h-[40vh] lg:min-h-screen p-6 sm:p-8 lg:p-10 before:absolute before:inset-0 before:bg-[#24356DE5]/90">
          <div className="relative z-10 h-full flex flex-col">
            {/* Logo */}
            <div className="mb-6 sm:mb-8 lg:mb-20">
              <img
                src={logo}
                alt="Mantra logo"
                loading="lazy"
                className="w-32 sm:w-36 lg:w-38 h-8 sm:h-9 lg:h-10"
              />
            </div>

            {/* Content - Hidden on mobile, visible on tablet+ */}
            <div className="hidden md:flex flex-col max-w-112.5 lg:max-w-125">
              {/* Grid Icon */}
              <div className="self-end mb-6 lg:mb-10">
                <img
                  src={gridIcon}
                  alt="grid icon"
                  className="w-12 h-12 lg:w-16 lg:h-16"
                />
              </div>

              {/* Apostrophe */}
              <div className="mb-4 lg:mb-5">
                <img
                  src={appos}
                  alt="apostrophe"
                  className="w-3 h-3 lg:w-4 lg:h-4"
                />
              </div>

              {/* Description */}
              <p className="leading-relaxed text-white text-base lg:text-xl tracking-wide mb-4 lg:mb-5">
                Experience a new era of security and convenience with our Access
                Control Application — a smarter way to manage and monitor entry
                points. From secure QR code check-ins to real-time oversight, we
                empower you to control who comes and goes with ease, ensuring
                safety, efficiency, and peace of mind for your community or
                workplace.
              </p>

              {/* Vector L */}
              <div className="self-end">
                <img
                  src={vectorL}
                  alt="vector"
                  className="w-4 h-4 lg:w-5 lg:h-5"
                />
              </div>
            </div>

            {/* Mobile: Simple tagline */}
            <div className="md:hidden flex flex-col justify-center flex-1">
              <h1 className="text-white text-2xl sm:text-3xl font-bold mb-3">
                Secure Access Control
              </h1>
              <p className="text-white/90 text-sm sm:text-base capitalize">
                Seamlessly manage activities within your residents community.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <FormProvider {...methods}>
          <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-10 flex items-center justify-center bg-white lg:bg-gray-50">
            {/* Form Container */}
            <div className="w-full max-w-md lg:max-w-md bg-white rounded-2xl lg:rounded-3xl shadow-md shadow-active/20 p-6 sm:p-8 lg:p-10 -mt-20 md:mt-0 z-40">
              {/* Form Content */}
              <div className="w-full">
                {activeScreen === 'credentials' && (
                  <LoginComponent setActiveScreen={setActiveScreen} />
                )}
                {activeScreen === 'otp-verification' && (
                  <EmailVerification
                    setActiveScreen={setActiveScreen}
                    userCredential={userCredential}
                  />
                )}
              </div>
            </div>
          </div>
        </FormProvider>
      </div>

      {/* Decorative Vector - Desktop Only */}
      <div className="hidden lg:block absolute bottom-0 left-0">
        <img
          src={vector}
          alt="decorative vector"
          className="w-20 h-20 xl:w-24 xl:h-24"
        />
      </div>
    </section>
  );
};

export default Login;
