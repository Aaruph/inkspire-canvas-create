
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";

// Form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // Demo login - in a real app, this would be an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, determine role based on email domain or keywords
      const isAdmin = values.email.includes("admin") || values.email.includes("@admin");
      const isArtist = values.email.includes("artist") || values.email.includes("@art");
      let role: "customer" | "artist" | "admin" | "super_admin";
      
      if (isAdmin) {
        role = values.email.includes("super") ? "super_admin" : "admin";
      } else if (isArtist) {
        role = "artist";
      } else {
        role = "customer";
      }
      
      const mockUser = {
        id: "user-1",
        email: values.email,
        name: values.email.split('@')[0],
        role: role,
      };
      
      login(mockUser);
      
      toast.success("Welcome back!", {
        description: "You have successfully logged in.",
      });
      
      // Route based on user role
      if (role === "admin" || role === "super_admin") {
        navigate("/admin");
      } else if (role === "artist") {
        navigate("/artist");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickAdminLogin = () => {
    const adminUser = {
      id: "admin-1",
      email: "admin@inkspire.com",
      name: "Admin User",
      role: "super_admin" as const,
    };
    
    login(adminUser);
    toast.success("Logged in as Admin");
    navigate("/admin");
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-display text-white">WELCOME BACK</h1>
        <p className="text-white/70">Enter your credentials to access your account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">EMAIL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your.email@example.com" 
                    type="email" 
                    {...field} 
                    className="bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 rounded-lg"
                  />
                </FormControl>
                <FormMessage className="text-red-300" />
              </FormItem>
            )}
          />
            
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">PASSWORD</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="••••••••" 
                    type="password" 
                    {...field} 
                    className="bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 rounded-lg"
                  />
                </FormControl>
                <FormMessage className="text-red-300" />
              </FormItem>
            )}
          />

          <div className="text-sm text-right">
            <Link 
              to="/forgot-password" 
              className="text-white/80 hover:text-white hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
            
          <Button 
            type="submit" 
            className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 rounded-lg font-medium"
            disabled={isLoading}
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </Button>
        </form>
      </Form>
      
      <div className="pt-4 border-t border-white/20">
        <p className="text-white/60 text-sm text-center mb-3">Quick Demo Access:</p>
        <Button 
          onClick={quickAdminLogin}
          variant="outline"
          className="w-full bg-red-500/20 text-white border-red-400/50 hover:bg-red-500/30"
        >
          🛡️ Login as Admin (Demo)
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
