
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background pattern for glassmorphism effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
      
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center pb-10 relative z-10">
        <div className="w-full max-w-md p-8 md:p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl animate-fade-in relative overflow-hidden">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <ForgotPasswordForm />
            
            <div className="mt-8 pt-6 text-center border-t border-white/20">
              <p className="text-sm text-white/60">
                Remember your password?{" "}
                <Link 
                  to="/auth" 
                  className="text-white hover:text-white/80 hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
