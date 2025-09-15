import { Link } from 'react-router-dom';
import successIcon from '../../../assets/success-icon.png';

const SuccessComponent = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full space-y-5">
        <img src={successIcon} alt="login successful" className="w-40 h-40" />
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-[#202224] text-center">
            Congratulations!
          </h2>
          <p className="text-[#202224] leading-relaxed">
            Email verification was succesfull
          </p>
        </div>
        <Link to={'/dashboard'} className="w-full">
          <button
            type="submit"
            className="bg-pry text-[#fff] py-3 w-full text-center  rounded-lg not-odd:font-medium transition-all duration-300 ease-linear ocus:outline-none focus:ring-1 focus:ring-active text-sm cursor-pointer hover:bg-[#24356D]"
            // onClick={() => setActiveScreen('otp-verification')}
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessComponent;
