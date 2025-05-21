
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center pb-10">
        <div className="w-full max-w-md p-6 md:p-8 bg-card/95 backdrop-blur-md border border-ink-accent/10 rounded-xl shadow-xl animate-fade-in">
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-0">
              <LoginForm />
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 text-ink-accent"
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
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    className="p-0 text-ink-accent"
                    onClick={() => setActiveTab("login")}
                  >
                    Login
                  </Button>
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 pt-6 text-center border-t border-border">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to Inkspire's <Link to="#" className="text-ink-accent hover:underline">Terms of Service</Link> and <Link to="#" className="text-ink-accent hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
