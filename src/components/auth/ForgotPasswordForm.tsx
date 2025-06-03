
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

// Multi-step form schemas
const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const otpSchema = z.object({
  otp: z.string().min(6, { message: "Please enter the 6-digit code" }),
});

const passwordSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OTPFormValues = z.infer<typeof otpSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

type ResetStep = "email" | "otp" | "password" | "success";

const ForgotPasswordForm = () => {
  const [step, setStep] = useState<ResetStep>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleEmailSubmit = async (values: EmailFormValues) => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setEmail(values.email);
      toast.success("Verification code sent!", {
        description: `We've sent a 6-digit code to ${values.email}`,
      });
      setStep("otp");
    } catch (error) {
      toast.error("Failed to send reset email", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (values: OTPFormValues) => {
    setIsLoading(true);
    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Demo: accept any 6-digit code
      if (values.otp.length === 6) {
        toast.success("Code verified successfully!");
        setStep("password");
      } else {
        throw new Error("Invalid code");
      }
    } catch (error) {
      toast.error("Invalid verification code", {
        description: "Please check the code and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (values: PasswordFormValues) => {
    setIsLoading(true);
    try {
      // Simulate password reset
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Password reset successful!", {
        description: "You can now log in with your new password.",
      });
      setStep("success");
      
      // Redirect to login after success
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (error) {
      toast.error("Failed to reset password", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Code resent!", {
        description: `We've sent a new code to ${email}`,
      });
    } catch (error) {
      toast.error("Failed to resend code");
    } finally {
      setIsLoading(false);
    }
  };

  const getStepContent = () => {
    switch (step) {
      case "email":
        return (
          <div className="space-y-6 w-full max-w-md">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-display text-white">FORGOT PASSWORD</h1>
              <p className="text-white/70">Enter your email address and we'll send you a verification code</p>
            </div>

            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
                <FormField
                  control={emailForm.control}
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
                  {isLoading ? "SENDING..." : "SEND VERIFICATION CODE"}
                </Button>
              </form>
            </Form>
          </div>
        );

      case "otp":
        return (
          <div className="space-y-6 w-full max-w-md">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-display text-white">VERIFY CODE</h1>
              <p className="text-white/70">Enter the 6-digit code sent to {email}</p>
            </div>

            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-6">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel className="text-white font-medium">VERIFICATION CODE</FormLabel>
                      <FormControl>
                        <InputOTP 
                          maxLength={6} 
                          {...field}
                          className="gap-2"
                        >
                          <InputOTPGroup className="gap-2">
                            <InputOTPSlot index={0} className="bg-white/10 backdrop-blur-sm border border-white/30 text-white w-12 h-12 text-lg" />
                            <InputOTPSlot index={1} className="bg-white/10 backdrop-blur-sm border border-white/30 text-white w-12 h-12 text-lg" />
                            <InputOTPSlot index={2} className="bg-white/10 backdrop-blur-sm border border-white/30 text-white w-12 h-12 text-lg" />
                            <InputOTPSlot index={3} className="bg-white/10 backdrop-blur-sm border border-white/30 text-white w-12 h-12 text-lg" />
                            <InputOTPSlot index={4} className="bg-white/10 backdrop-blur-sm border border-white/30 text-white w-12 h-12 text-lg" />
                            <InputOTPSlot index={5} className="bg-white/10 backdrop-blur-sm border border-white/30 text-white w-12 h-12 text-lg" />
                          </InputOTPGroup>
                        </InputOTP>
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
                  {isLoading ? "VERIFYING..." : "VERIFY CODE"}
                </Button>

                <div className="text-center">
                  <p className="text-white/60 text-sm mb-2">Didn't receive the code?</p>
                  <Button 
                    variant="link" 
                    className="p-0 text-white/80 hover:text-white font-medium"
                    onClick={handleResendCode}
                    disabled={isLoading}
                  >
                    Resend Code
                  </Button>
                </div>
              </form>
            </Form>

            <Button 
              variant="link" 
              className="p-0 text-white/80 hover:text-white font-medium flex items-center justify-center w-full"
              onClick={() => setStep("email")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Email
            </Button>
          </div>
        );

      case "password":
        return (
          <div className="space-y-6 w-full max-w-md">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-display text-white">NEW PASSWORD</h1>
              <p className="text-white/70">Enter your new password</p>
            </div>

            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">NEW PASSWORD</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Enter new password" 
                            type={showPassword ? "text" : "password"}
                            {...field} 
                            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 rounded-lg pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">CONFIRM PASSWORD</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Confirm new password" 
                            type={showConfirmPassword ? "text" : "password"}
                            {...field} 
                            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 rounded-lg pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
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
                  {isLoading ? "RESETTING..." : "RESET PASSWORD"}
                </Button>
              </form>
            </Form>
          </div>
        );

      case "success":
        return (
          <div className="space-y-6 w-full max-w-md text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
              </div>
              <h1 className="text-3xl font-display text-white">PASSWORD RESET SUCCESSFUL</h1>
              <p className="text-white/70">Your password has been successfully reset. You will be redirected to the login page shortly.</p>
            </div>

            <Button 
              className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 rounded-lg font-medium"
              onClick={() => navigate("/auth")}
            >
              GO TO LOGIN
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {getStepContent()}
      
      {step !== "success" && (
        <div className="text-center mt-6">
          <Button 
            variant="link" 
            className="p-0 text-white/80 hover:text-white font-medium"
            onClick={() => navigate("/auth")}
          >
            Back to Login
          </Button>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordForm;
