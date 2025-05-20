import { useRouteError } from "react-router";
import { Link } from "react-router";


const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 text-center">
      <img
        src="https://i.ibb.co/39KtNSZs/false-98375-1280.webp" 
        alt="Error Illustration"
        className="w-72 md:w-96 mb-6"
      />
      <h1 className="text-5xl font-bold text-green-700">404 - Page Not Found</h1>
      <p className="mt-4 text-green-800 text-lg max-w-md">
        The page you’re looking for doesn’t exist or might have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
