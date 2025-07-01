
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  role: z.enum(["customer", "artist"], { message: "Please select your role" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // Demo signup - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: "user-" + Date.now(),
        name: values.name,
        email: values.email,
        role: values.role,
      };
      
      login(mockUser);
      
      toast.success("Account created!", {
        description: "You have successfully registered.",
      });
      
      // Route based on user role
      if (values.role === "artist") {
        navigate("/artist");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Registration failed", {
        description: "There was an issue creating your account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-display text-white">CREATE ACCOUNT</h1>
        <p className="text-white/70">Sign up to join the Inkspire community</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">NAME</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your full name" 
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">I AM A</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-8"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="customer" id="customer" className="border-white/50 text-white" />
                      <Label htmlFor="customer" className="text-white font-medium">CUSTOMER</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="artist" id="artist" className="border-white/50 text-white" />
                      <Label htmlFor="artist" className="text-white font-medium">ARTIST</Label>
                    </div>
                  </RadioGroup>
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
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">CONFIRM PASSWORD</FormLabel>
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
            
          <Button 
            type="submit" 
            className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 rounded-lg font-medium"
            disabled={isLoading}
          >
            {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
