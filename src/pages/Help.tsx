import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  HelpCircle,
  Palette,
  Users,
  Calendar,
  CreditCard,
  Settings,
  Lightbulb
} from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Lightbulb,
      color: "bg-blue-500/10 text-blue-700",
      faqs: [
        {
          question: "What is Inkspire?",
          answer: "Inkspire is a comprehensive tattoo design platform that connects you with talented artists and helps you create custom tattoo designs. You can browse our gallery, customize existing designs, or work directly with artists to bring your vision to life."
        },
        {
          question: "How do I create my first tattoo design?",
          answer: "Simply click on 'Design Your Tattoo' in the navigation menu. You can start with a template from our gallery, upload your own image, or create something from scratch using our design tools."
        },
        {
          question: "Is Inkspire free to use?",
          answer: "Browsing designs and using basic customization tools is free. Premium features like working directly with artists or accessing exclusive designs may require a subscription."
        }
      ]
    },
    {
      title: "Design Tools",
      icon: Palette,
      color: "bg-purple-500/10 text-purple-700",
      faqs: [
        {
          question: "How do I customize a tattoo design?",
          answer: "Go to 'Design Your Tattoo' page, select a template or start fresh. Use our tools to adjust colors, add text, resize elements, and position the design on different body parts using our body preview feature."
        },
        {
          question: "Can I upload my own images?",
          answer: "Yes! You can upload your own images and use them as a base for your tattoo design. Our tools will help you convert them into tattoo-friendly designs."
        },
        {
          question: "How do I save my designs?",
          answer: "Create an account and all your designs will be automatically saved. You can access them anytime from your profile page."
        }
      ]
    },
    {
      title: "Finding Artists",
      icon: Users,
      color: "bg-green-500/10 text-green-700",
      faqs: [
        {
          question: "How do I find the right artist for my tattoo?",
          answer: "Visit our 'Find Artists' page to browse artist profiles, view their portfolios, read reviews, and check their specialties. You can filter by location, style, and availability."
        },
        {
          question: "How do I contact an artist?",
          answer: "Each artist profile has a 'Contact' or 'Book Consultation' button. You can send them a message with your design ideas and preferred dates."
        },
        {
          question: "Can I see an artist's previous work?",
          answer: "Absolutely! Every artist has a detailed portfolio showcasing their previous tattoo work, style specialties, and customer reviews."
        }
      ]
    },
    {
      title: "Booking & Appointments",
      icon: Calendar,
      color: "bg-orange-500/10 text-orange-700",
      faqs: [
        {
          question: "How do I book an appointment?",
          answer: "Once you've chosen an artist, click 'Book Appointment' on their profile. Select your preferred date and time, provide details about your tattoo, and confirm your booking."
        },
        {
          question: "Can I reschedule my appointment?",
          answer: "Yes, you can reschedule up to 48 hours before your appointment through your booking management page or by contacting the artist directly."
        },
        {
          question: "What should I bring to my appointment?",
          answer: "Bring your design files, a valid ID, wear comfortable clothing that allows access to the tattoo area, and follow any specific preparation instructions from your artist."
        }
      ]
    },
    {
      title: "Payment & Pricing",
      icon: CreditCard,
      color: "bg-red-500/10 text-red-700",
      faqs: [
        {
          question: "How much does a tattoo cost?",
          answer: "Tattoo prices vary by size, complexity, artist, and location. Each artist sets their own rates, which you can see on their profile. You'll get a quote before booking."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and some artists may accept cash payments directly. Payment terms are set by individual artists."
        },
        {
          question: "Do I need to pay a deposit?",
          answer: "Most artists require a deposit to secure your appointment, typically 20-50% of the total cost. This will be clearly stated when booking."
        }
      ]
    },
    {
      title: "Account & Settings",
      icon: Settings,
      color: "bg-gray-500/10 text-gray-700",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click 'Login / Sign Up' in the top navigation, then select 'Create Account'. You can sign up with email or use social login options."
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer: "On the login page, click 'Forgot password?' and enter your email. You'll receive reset instructions within a few minutes."
        },
        {
          question: "How do I update my profile information?",
          answer: "Go to your profile page by clicking your name in the navigation menu, then click 'Edit Profile' to update your information."
        }
      ]
    }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="ink-container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-display mb-4 text-foreground">
                Help & <span className="text-primary">Frequently Asked Questions</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Find answers to common questions about using Inkspire, designing tattoos, and working with our artists.
              </p>
              
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Help Cards */}
        <section className="py-12">
          <div className="ink-container">
            <h2 className="text-2xl font-semibold mb-8 text-center">Quick Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Palette className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle>Design Your First Tattoo</CardTitle>
                  <CardDescription>
                    Start creating your custom tattoo design in minutes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <a href="/customize">Start Designing</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle>Find an Artist</CardTitle>
                  <CardDescription>
                    Browse talented artists in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/artists">Browse Artists</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <MessageCircle className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Get direct help from our team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <a href="#contact">Contact Us</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-12 bg-muted/20">
          <div className="ink-container">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-4xl mx-auto space-y-8">
              {filteredFaqs.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Badge className={category.color}>
                        <category.icon className="h-4 w-4" />
                      </Badge>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>

            {searchQuery && filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try different keywords or browse the categories above
                </p>
                <Button onClick={() => setSearchQuery('')} variant="outline">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <div className="ink-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Can't find what you're looking for? Our support team is here to help!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="text-center">
                    <Mail className="h-8 w-8 mx-auto text-primary mb-2" />
                    <CardTitle>Email Support</CardTitle>
                    <CardDescription>Get detailed help via email</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button asChild variant="outline" className="w-full">
                      <a href="mailto:support@inkspire.com">support@inkspire.com</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <Phone className="h-8 w-8 mx-auto text-primary mb-2" />
                    <CardTitle>Phone Support</CardTitle>
                    <CardDescription>Speak directly with our team</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button asChild variant="outline" className="w-full">
                      <a href="tel:+15551234567">(555) 123-4567</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <MessageCircle className="h-8 w-8 mx-auto text-primary mb-2" />
                    <CardTitle>Live Chat</CardTitle>
                    <CardDescription>Quick answers to urgent questions</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className="w-full">
                      Start Live Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Visit Our Studio</span>
                </div>
                <p className="text-muted-foreground">
                  123 Ink Street, Tattoo City, TC 12345<br />
                  Monday - Saturday: 10 AM - 8 PM<br />
                  Sunday: 12 PM - 6 PM
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Help;