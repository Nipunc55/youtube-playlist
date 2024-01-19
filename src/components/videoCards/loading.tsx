interface LoadingProps {
  loaded: boolean;
}
const Loading: React.FC<LoadingProps> = ({ loaded }) => {
  return (
    <>
      {loaded && (
        <div className="absolute h-200  inset-0 opacity-0 bg-black bg-opacity-50 opacity-100 transition-opacity duration-300 rounded-md">
          <p className="text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            Loading....
          </p>
        </div>
      )}
    </>
  );
};
export default Loading;
