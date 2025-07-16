"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Layers,
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showFunnel, setShowFunnel] = useState(false)
  const [showStoryPopup, setShowStoryPopup] = useState(false)
  const [showROICalculator, setShowROICalculator] = useState(false)

  // ROI Calculator state
  const [monthlyInquiries, setMonthlyInquiries] = useState(50)
  const [averageEventValue, setAverageEventValue] = useState(5000)
  const [currentResponseTime, setCurrentResponseTime] = useState(24)
  const [conversionRate, setConversionRate] = useState(15)

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Set countdown to 7 days from now
    const countdownDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = countdownDate - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(timer)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // ROI Calculations
  const calculateROI = () => {
    const missedOpportunities = Math.floor(monthlyInquiries * 0.3) // 30% missed due to slow response
    const lostRevenue = missedOpportunities * averageEventValue * (conversionRate / 100)
    const annualLoss = lostRevenue * 12
    const curatixSavings = annualLoss * 0.8 // 80% recovery rate

    return {
      monthlyLoss: lostRevenue,
      annualLoss: annualLoss,
      curatixSavings: curatixSavings,
      roi: ((curatixSavings - 8388) / 8388) * 100, // Assuming $699/month plan
    }
  }

  const roiResults = calculateROI()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "Instant AI-Powered Lead Response",
      description:
        "Qualify every lead, 24/7. Curatix responds instantly to event inquiries with personalized messages, ensuring no lead goes cold.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Smart Event Inquiry Form",
      description:
        "Capture more qualified leads with custom-branded forms. Embed them anywhere and watch the leads roll in.",
      icon: <BarChart className="size-5" />,
    },
    {
      title: "Automated Booking Workflows",
      description:
        "Automate your sales pipeline. Curatix automates follow-ups, reminders, and task creation, so deals never slip through the cracks.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Centralized CRM Dashboard",
      description:
        "Track every lead and booking in one place. Get a bird's-eye view of your sales pipeline and identify opportunities for growth.",
      icon: <Shield className="size-5" />,
    },
    {
      title: "Calendar Integration & Scheduling",
      description:
        "Let leads book tours and calls directly on your calendar. Curatix prevents double bookings and ensures your team's time is used efficiently.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "AI Voice Bot for Discovery Calls",
      description:
        "Qualify leads over the phone with our AI voice bot. Curatix asks the right questions and delivers qualified leads directly to your team.",
      icon: <Star className="size-5" />,
    },
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-50">
      {/* Countdown Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-4">
          <Clock className="size-4" />
          <span className="font-medium">Limited Time: Free Implementation & Setup</span>
          <div className="flex gap-2 font-mono">
            <span>{timeLeft.days}d</span>
            <span>{timeLeft.hours}h</span>
            <span>{timeLeft.minutes}m</span>
            <span>{timeLeft.seconds}s</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 bg-white/95 shadow-sm border-b border-gray-100">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <Image src="/images/curatix-logo-icon.png" alt="Curatix.AI" width={32} height={32} className="size-8" />
            <span>Curatix.AI</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#about" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              About
            </Link>
            <Link href="#features" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              FAQ
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full text-gray-600 hover:text-gray-900"
            >
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link href="#" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              Log in
            </Link>
            <Button
              className="rounded-full bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open("https://go.curatix.ai/home", "_blank")}
            >
              Get Started
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full text-gray-600">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 inset-x-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 z-40"
        >
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="#about"
              className="py-2 text-sm font-medium text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#features"
              className="py-2 text-sm font-medium text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="py-2 text-sm font-medium text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="py-2 text-sm font-medium text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="py-2 text-sm font-medium text-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
              <Link
                href="#"
                className="py-2 text-sm font-medium text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Button
                className="rounded-full bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open("https://go.curatix.ai/home", "_blank")}
              >
                Get Started
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
                Let AI Handle Inquiries. You Focus on Closing.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Curatix automates lead response, scheduling, and booking workflows for event-driven venues — so your
                team can stop chasing leads and start closing more business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open("https://go.curatix.ai/home", "_blank")}
                >
                  Schedule Demo
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                  onClick={() => setShowROICalculator(true)}
                >
                  <Calculator className="mr-2 size-4" />
                  Calculate Your ROI
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>Built for private clubs, event venues, and hospitality teams.</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-5xl"
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                <Image
                  src="https://cdn.dribbble.com/userupload/12302729/file/original-fa372845e394ee85bebe0389b9d86871.png?resize=1504x1128&vertical=center"
                  width={1280}
                  height={720}
                  alt="Curatix dashboard"
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cost of Inaction Section */}
        <section className="w-full py-20 bg-red-50 border-y border-red-100">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
                The Hidden Cost of Slow Response Times
              </h2>
              <p className="text-lg text-red-700 max-w-2xl mx-auto">
                Every hour you wait to respond to an inquiry, your conversion rate drops by 10%. See what you're losing.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">30%</div>
                  <p className="text-red-800 font-medium">Inquiries Never Get Responded To</p>
                  <p className="text-sm text-red-600 mt-2">Due to manual processes and busy schedules</p>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">24hrs</div>
                  <p className="text-red-800 font-medium">Average Response Time</p>
                  <p className="text-sm text-red-600 mt-2">While competitors respond in minutes</p>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">$150K+</div>
                  <p className="text-red-800 font-medium">Annual Revenue Lost</p>
                  <p className="text-sm text-red-600 mt-2">For a typical private club</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                className="rounded-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setShowROICalculator(true)}
              >
                <Calculator className="mr-2 size-4" />
                Calculate Your Losses
              </Button>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="w-full py-12 bg-white border-b border-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-sm font-medium text-gray-500">Trusted by leading venues and private clubs</p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                {["Wabeek Club", "The Nest", "Shady Ridge", "Fairway Oaks", "LuxeHaus Events"].map((name, i) => (
                  <div
                    key={i}
                    className="h-8 w-auto opacity-60 text-gray-600 font-medium transition-all hover:opacity-100"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/images/about-curatix.png"
                  alt="About Curatix.AI"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">
                  About Us
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                  We Don't Just Automate. We Curate.
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    At Curatix.ai, we believe that event teams shouldn't have to choose between running great events and
                    chasing down leads.
                  </p>
                  <p>
                    Founded by a team of sales and operations professionals in the club and hospitality space, Curatix
                    was built to solve a common, expensive problem: too many event inquiries falling through the cracks.
                  </p>
                  <p>
                    Our platform uses conversational AI, automated workflows, and real-time lead routing to curate every
                    inquiry—qualifying, organizing, and assigning it instantly so venues can focus on closing deals, not
                    chaos.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="rounded-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowStoryPopup(true)}
                >
                  Learn More About Our Story
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Built to Automate Your Event Sales — End to End
              </h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                We can integrate with your existing CRM, or you can use our purpose-built platform designed specifically
                for events.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Simple Setup. Serious Results.
              </h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                Get started in minutes and see the difference our platform can make for your business.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Connect or Replace Your Inquiry Form",
                  description:
                    "Integrate Curatix with your existing form, or use our custom-built form to capture qualified leads.",
                },
                {
                  step: "02",
                  title: "Automate Your Follow-Up",
                  description: "Set up automated email and SMS sequences to nurture leads and drive bookings.",
                },
                {
                  step: "03",
                  title: "Close With Confidence",
                  description:
                    "Leverage our AI-powered tools to qualify leads, schedule tours, and close more business.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center text-center space-y-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Loved by Teams Worldwide</h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                Don't just take our word for it. See what our customers have to say about their experience.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "Curatix has been a game-changer for our event sales. The AI-powered lead response is incredibly efficient, and our team can now focus on closing deals.",
                  author: "Sarah L.",
                  role: "Director of Events, Wabeek Club",
                  rating: 5,
                },
                {
                  quote:
                    "The centralized CRM dashboard has given us a clear view of our sales pipeline. We can easily track leads, manage bookings, and identify opportunities for growth.",
                  author: "David R.",
                  role: "GM, LuxeHaus Events",
                  rating: 5,
                },
                {
                  quote:
                    "The automated booking workflows have saved us countless hours of manual work. Curatix has streamlined our processes and improved our overall efficiency.",
                  author: "Emily T.",
                  role: "Sales Manager, Fairway Oaks",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className="h-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex mb-4">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star key={j} className="size-4 text-yellow-500 fill-yellow-500" />
                          ))}
                      </div>
                      <p className="text-lg mb-6 flex-grow text-gray-700">{testimonial.quote}</p>
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                        <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{testimonial.author}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">Pricing</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Straightforward Pricing. No Guesswork.
              </h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                Choose the plan that's right for your business. All plans include a 14-day free trial.
              </p>
            </motion.div>

            <div className="mx-auto max-w-5xl">
              <Tabs defaultValue="monthly" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="rounded-full p-1 bg-gray-100">
                    <TabsTrigger value="monthly" className="rounded-full px-6">
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger value="annually" className="rounded-full px-6">
                      Annually (Save 20%)
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="monthly">
                  <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                    {[
                      {
                        name: "Basic",
                        price: "$299",
                        upfront: "$1,500",
                        description: "Perfect for venues just getting started with automation.",
                        features: [
                          "AI Lead Response",
                          "Smart Event Inquiry Form",
                          "Basic CRM Dashboard",
                          "Email Support",
                        ],
                        cta: "Request Demo",
                      },
                      {
                        name: "Professional",
                        price: "$699",
                        upfront: "$2,000",
                        description: "Ideal for growing venues looking to scale their event sales.",
                        features: [
                          "Everything in Basic",
                          "Automated Booking Workflows",
                          "Calendar Integration & Scheduling",
                          "Priority Email Support",
                        ],
                        cta: "Request Demo",
                        popular: true,
                      },
                      {
                        name: "Enterprise",
                        price: "$899",
                        upfront: "$2,000",
                        description: "For large venues and private clubs with complex needs.",
                        features: [
                          "Everything in Professional",
                          "AI Voice Bot for Discovery Calls",
                          "Custom Integrations",
                          "24/7 Phone & Email Support",
                        ],
                        cta: "Contact Sales",
                      },
                    ].map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <Card
                          className={`relative overflow-hidden h-full ${plan.popular ? "border-blue-500 shadow-lg ring-2 ring-blue-500/20" : "border-gray-200 shadow-sm"} bg-white`}
                        >
                          {plan.popular && (
                            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                              Most Popular
                            </div>
                          )}
                          <CardContent className="p-6 flex flex-col h-full">
                            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                            <div className="flex items-baseline mt-4">
                              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                              <span className="text-gray-500 ml-1">/month</span>
                            </div>
                            <p className="text-gray-600 mt-2">{plan.description}</p>
                            <p className="text-gray-600 mt-2">{plan.upfront} upfront</p>
                            <ul className="space-y-3 my-6 flex-grow">
                              {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center">
                                  <Check className="mr-2 size-4 text-blue-600" />
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              className={`w-full mt-auto rounded-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}`}
                              variant={plan.popular ? "default" : "outline"}
                              onClick={() => window.open("https://go.curatix.ai/home", "_blank")}
                            >
                              {plan.cta}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="annually">
                  <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                    {[
                      {
                        name: "Basic",
                        price: "$239",
                        upfront: "$1,200",
                        description: "Perfect for venues just getting started with automation.",
                        features: [
                          "AI Lead Response",
                          "Smart Event Inquiry Form",
                          "Basic CRM Dashboard",
                          "Email Support",
                        ],
                        cta: "Request Demo",
                      },
                      {
                        name: "Professional",
                        price: "$559",
                        upfront: "$1,600",
                        description: "Ideal for growing venues looking to scale their event sales.",
                        features: [
                          "Everything in Basic",
                          "Automated Booking Workflows",
                          "Calendar Integration & Scheduling",
                          "Priority Email Support",
                        ],
                        cta: "Request Demo",
                        popular: true,
                      },
                      {
                        name: "Enterprise",
                        price: "$719",
                        upfront: "$1,600",
                        description: "For large venues and private clubs with complex needs.",
                        features: [
                          "Everything in Professional",
                          "AI Voice Bot for Discovery Calls",
                          "Custom Integrations",
                          "24/7 Phone & Email Support",
                        ],
                        cta: "Contact Sales",
                      },
                    ].map((plan, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <Card
                          className={`relative overflow-hidden h-full ${plan.popular ? "border-blue-500 shadow-lg ring-2 ring-blue-500/20" : "border-gray-200 shadow-sm"} bg-white`}
                        >
                          {plan.popular && (
                            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                              Most Popular
                            </div>
                          )}
                          <CardContent className="p-6 flex flex-col h-full">
                            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                            <div className="flex items-baseline mt-4">
                              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                              <span className="text-gray-500 ml-1">/month</span>
                            </div>
                            <p className="text-gray-600 mt-2">{plan.description}</p>
                            <p className="text-gray-600 mt-2">{plan.upfront} upfront</p>
                            <ul className="space-y-3 my-6 flex-grow">
                              {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center">
                                  <Check className="mr-2 size-4 text-blue-600" />
                                  <span className="text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            <Button
                              className={`w-full mt-auto rounded-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}`}
                              variant={plan.popular ? "default" : "outline"}
                              onClick={() => window.open("https://go.curatix.ai/home", "_blank")}
                            >
                              {plan.cta}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                Find answers to common questions about our platform.
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How does Curatix automate lead response?",
                    answer:
                      "Curatix uses AI to instantly respond to event inquiries with personalized messages, ensuring no lead goes cold. Our system qualifies leads 24/7, allowing your team to focus on closing deals.",
                  },
                  {
                    question: "Can Curatix integrate with my existing CRM?",
                    answer:
                      "Yes, Curatix can integrate with your existing CRM. We also offer a purpose-built platform designed specifically for events, which you can use as a standalone solution or integrate with other tools.",
                  },
                  {
                    question: "What kind of support do you offer?",
                    answer:
                      "We offer email support for all plans. The Professional plan includes priority email support, and the Enterprise plan includes 24/7 phone and email support. We also have an extensive knowledge base and community forum available to all users.",
                  },
                  {
                    question: "How does the AI Voice Bot work?",
                    answer:
                      "Our AI Voice Bot qualifies leads over the phone by asking the right questions and delivering qualified leads directly to your team. This ensures that your team's time is used efficiently and that you're only focusing on the most promising leads.",
                  },
                  {
                    question: "Is there a limit to how many users I can add?",
                    answer:
                      "There is no limit to the number of users you can add to your Curatix account. You can add as many team members as you need to manage your event sales.",
                  },
                  {
                    question: "What types of venues is Curatix built for?",
                    answer:
                      "Curatix is built for private clubs, event venues, and hospitality teams. Our platform is designed to automate lead response, scheduling, and booking workflows for event-driven businesses.",
                  },
                ].map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-gray-200 py-2 bg-white rounded-lg mb-2 px-4"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline text-gray-900">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Ready to Stop Chasing Leads?
              </h2>
              <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                Join thousands of satisfied customers who have streamlined their processes and boosted productivity with
                our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full h-12 px-8 text-base bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => window.open("https://go.curatix.ai/home", "_blank")}
                >
                  Request Demo
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                  onClick={() => window.open("https://go.curatix.ai/home", "_blank")}
                >
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-sm text-blue-100 mt-4">No credit card required. 14-day free trial. Cancel anytime.</p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ROI Calculator Modal */}
      {showROICalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              onClick={() => setShowROICalculator(false)}
            >
              <X className="size-6" />
              <span className="sr-only">Close</span>
            </Button>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="size-8 text-blue-600" />
                <h3 className="text-3xl font-bold text-gray-900">ROI Calculator</h3>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-900">Your Current Situation</h4>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="inquiries" className="text-sm font-medium text-gray-700">
                        Monthly Event Inquiries
                      </Label>
                      <Input
                        id="inquiries"
                        type="number"
                        value={monthlyInquiries}
                        onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="eventValue" className="text-sm font-medium text-gray-700">
                        Average Event Value ($)
                      </Label>
                      <Input
                        id="eventValue"
                        type="number"
                        value={averageEventValue}
                        onChange={(e) => setAverageEventValue(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="responseTime" className="text-sm font-medium text-gray-700">
                        Current Response Time (hours)
                      </Label>
                      <Input
                        id="responseTime"
                        type="number"
                        value={currentResponseTime}
                        onChange={(e) => setCurrentResponseTime(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="conversionRate" className="text-sm font-medium text-gray-700">
                        Current Conversion Rate (%)
                      </Label>
                      <Input
                        id="conversionRate"
                        type="number"
                        value={conversionRate}
                        onChange={(e) => setConversionRate(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-900">Your Potential with Curatix</h4>

                  <div className="space-y-4">
                    <Card className="border-red-200 bg-red-50">
                      <CardHeader>
                        <CardTitle className="text-red-800 flex items-center gap-2">
                          <TrendingUp className="size-5" />
                          Current Losses
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-red-700">Monthly Lost Revenue:</span>
                            <span className="font-bold text-red-800">${roiResults.monthlyLoss.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-red-700">Annual Lost Revenue:</span>
                            <span className="font-bold text-red-800">${roiResults.annualLoss.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-green-800 flex items-center gap-2">
                          <DollarSign className="size-5" />
                          With Curatix
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-green-700">Annual Revenue Recovery:</span>
                            <span className="font-bold text-green-800">
                              ${roiResults.curatixSavings.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">ROI:</span>
                            <span className="font-bold text-green-800">{roiResults.roi.toFixed(0)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">Payback Period:</span>
                            <span className="font-bold text-green-800">2.1 months</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="pt-4">
                    <Button
                      size="lg"
                      className="w-full rounded-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setShowROICalculator(false)
                        window.open("https://go.curatix.ai/home", "_blank")
                      }}
                    >
                      Schedule Demo to Recover This Revenue
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Story Popup Modal */}
      {showStoryPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowStoryPopup(false)}
            >
              <X className="size-6" />
              <span className="sr-only">Close</span>
            </Button>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/images/curatix-logo-icon.png"
                  alt="Curatix.AI"
                  width={40}
                  height={40}
                  className="size-10"
                />
                <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Curatix was founded with one goal: to make event inquiry management effortless for private clubs.</p>
                <p>
                  After years of working in membership sales, our founder recognized a growing gap on the events
                  side—clubs were missing opportunities simply because they lacked the systems to respond quickly,
                  qualify leads, and follow up effectively.
                </p>
                <p>
                  That's where Curatix comes in. We built an AI-powered platform designed specifically for private
                  clubs, combining smart forms, instant lead response, and automated booking workflows—all integrated
                  with your existing CRM or ours.
                </p>
                <p>
                  Whether you're managing weddings, banquets, or golf outings, Curatix turns event inquiries into
                  confirmed bookings—without the manual work.
                </p>
                <p className="font-medium text-gray-900">
                  We're here to help clubs run smarter, grow faster, and deliver a better experience for every guest who
                  walks through the door.
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  className="rounded-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setShowStoryPopup(false)
                    window.open("https://go.curatix.ai/home", "_blank")
                  }}
                >
                  Schedule a Demo
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full border-t bg-white border-gray-100">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* column 1 */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
                <Image src="/images/curatix-logo-icon.png" alt="Curatix.AI" width={32} height={32} />
                Curatix.ai
              </Link>
              <p className="text-sm text-gray-600">
                Automate your event sales with our AI-powered platform. Stop chasing leads and start closing more
                business.
              </p>
              <div className="flex gap-4 text-gray-400">
                {[
                  { icon: "facebook", href: "#" },
                  { icon: "twitter", href: "#" },
                  { icon: "linkedin", href: "#" },
                ].map(({ icon, href }) => (
                  <Link key={icon} href={href} className="hover:text-gray-600 transition-colors">
                    <span className="sr-only">{icon}</span>
                    {/* simple icon placeholder; replace with lucide or svg if desired */}
                    <span className="inline-block w-4 h-4 bg-current rounded-full" />
                  </Link>
                ))}
              </div>
            </div>

            {/* column 2 */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="link">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="link">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            {/* column 3 */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="link">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* column 4 */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#about" className="link">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-8">
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Curatix.ai. All rights reserved.</p>
            <div className="flex gap-4 text-xs">
              {["Privacy Policy", "Terms", "Cookies"].map((txt) => (
                <Link key={txt} href="#" className="link">
                  {txt}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* utility class for footer links */}
        <style jsx>{`
    .link {
      @apply text-gray-600 hover:text-gray-900 transition-colors;
    }
  `}</style>
      </footer>
    </div>
  )
}
