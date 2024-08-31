const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div
        className="w-8 h-8 border-4 border-t-transparent border-solid border-blue-500 rounded-full animate-spin"
        role="status"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
