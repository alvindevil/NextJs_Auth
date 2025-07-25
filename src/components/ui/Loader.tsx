export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-b-2 border-blue-300 rounded-full animate-spin [animation-delay:0.3s]"></div>
        <div className="absolute inset-0 border-r-2 border-blue-900 rounded-full animate-spin [animation-delay:0.15s]"></div>

      </div>
    </div>
  );
}
