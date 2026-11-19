import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl sm:text-9xl font-extrabold tracking-tight text-gray-900">
        4<span className="text-indigo-600">0</span>4
      </p>

      <h1 className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-800">
        Page not found
      </h1>

      <p className="mt-2 max-w-md text-gray-500">
        We couldn&apos;t find the page you&apos;re looking for. It may have been
        moved or the URL may be incorrect.
      </p>

      <code className="mt-3 inline-block max-w-full truncate rounded-md bg-gray-100 px-3 py-1 text-xs sm:text-sm text-gray-600">
        {location.pathname}
      </code>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
