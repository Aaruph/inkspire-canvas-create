
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
import { toast } from "@/components/ui/sonner";

// Form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // Demo password reset - simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Password reset email sent!", {
        description: `We've sent a password reset link to ${values.email}`,
      });
      
      // Redirect back to auth page after success
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } catch (error) {
      toast.error("Failed to send reset email", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-display text-white">FORGOT PASSWORD</h1>
        <p className="text-white/70">Enter your email address and we'll send you a link to reset your password</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">EMAIL ADDRESS</FormLabel>
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
            
          <Button 
            type="submit" 
            className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 rounded-lg font-medium"
            disabled={isLoading}
          >
            {isLoading ? "SENDING..." : "SEND RESET LINK"}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <Button 
          variant="link" 
          className="p-0 text-white/80 hover:text-white font-medium"
          onClick={() => navigate("/auth")}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
