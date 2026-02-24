export default function NotFound() {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden relative">
      <div className="flex flex-col items-center px-6 z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-center mt-20 text-gold-100">
          404 - Not Found
        </h1>
        <p className="text-center mt-4 text-gray-600 max-w-md">
          The page you're looking for doesn't exist.
        </p>
        <img
          src="/404bucket.svg"
          alt="Not found illustration"
          className="w-64 md:w-96 mt-10 self-center pointer-events-none"
        />
      </div>
      <img
        src="/hills_bg.svg"
        alt=""
        className="absolute w-full bottom-0 lg:-bottom-50 left-1/2 -translate-x-1/2 min-w-250 md:min-w-full pointer-events-none -z-10"
      />
    </div>
  );
}
