import { useNavigate } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[calc(100vh-70px)] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 font-sans text-white">
      <div className="max-w-md w-full text-center animate-fadeInUp">
        <div className="mb-8 flex justify-center">
          <div className="p-6 bg-white/20 backdrop-blur-lg rounded-full shadow-2xl animate-bounce">
            <AlertTriangle size={80} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-9xl font-black mb-4 tracking-tighter drop-shadow-2xl">
          404
        </h1>
        
        <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">
          Oops! Page Not Found
        </h2>
        
        <p className="text-lg text-white/90 mb-10 font-light leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <button
          onClick={() => navigate("/")}
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white transition-transform duration-300 group-hover:scale-110"></span>
          <Home size={20} className="relative z-10" />
          <span className="relative z-10">Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
