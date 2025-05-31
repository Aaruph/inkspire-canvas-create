
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  
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
            <Tabs 
              defaultValue={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <TabsTrigger 
                  value="login"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white font-medium text-white/80 backdrop-blur-sm rounded-md transition-all duration-300"
                >
                  LOGIN
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white font-medium text-white/80 backdrop-blur-sm rounded-md transition-all duration-300"
                >
                  SIGN UP
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-0">
                <LoginForm />
                <div className="mt-6 text-center">
                  <p className="text-white/70">
                    Don't have an account?{" "}
                    <Button 
                      variant="link" 
                      className="p-0 text-white hover:text-white/80 font-medium"
                      onClick={() => setActiveTab("signup")}
                    >
                      Sign up
                    </Button>
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="signup" className="mt-0">
                <SignupForm />
                <div className="mt-6 text-center">
                  <p className="text-white/70">
                    Already have an account?{" "}
                    <Button 
                      variant="link" 
                      className="p-0 text-white hover:text-white/80 font-medium"
                      onClick={() => setActiveTab("login")}
                    >
                      Login
                    </Button>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 pt-6 text-center border-t border-white/20">
              <p className="text-sm text-white/60">
                By continuing, you agree to Inkspire's <Link to="#" className="text-white hover:text-white/80 hover:underline font-medium">Terms of Service</Link> and <Link to="#" className="text-white hover:text-white/80 hover:underline font-medium">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
