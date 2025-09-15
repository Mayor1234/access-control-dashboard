import { Link } from 'react-router-dom';
import notFound from '../assets/notfound.svg';

const NotFound = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-white px-6">
      <div className="max-w-xl text-center">
        <img
          src={notFound}
          alt="404 Illustration"
          width={100}
          height={100}
          className="w-64 object-cover mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-base mb-6">
          Sorry, we couldn’t find the page you were looking for. It might have
          been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-pry text-white rounded-lg text-sm font-medium transition duration-200 hover:bg-pry-dark"
        >
          Go to Homepage
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
