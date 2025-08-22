"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
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
  Phone,
  MessageCircle,
  Calendar,
  Utensils,
  Building2,
  HeadphonesIcon,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("clubs")
  const [showROICalculator, setShowROICalculator] = useState(false)
  const [showStoryPopup, setShowStoryPopup] = useState(false)
  const [showPhonePopup, setShowPhonePopup] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)

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

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText("(248) 289-9969")
    setPhoneCopied(true)
    setTimeout(() => setPhoneCopied(false), 2000)
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

  // Content for different tabs
  const getTabContent = () => {
    switch (activeTab) {
      case "clubs":
        return <ClubsContent />
      case "restaurants":
        return <RestaurantsContent />
      case "receptionist":
        return <ReceptionistContent />
      default:
        return <ClubsContent />
    }
  }

  // Clubs Content Component
  const ClubsContent = () => {
    const features = [
      {
        title: "Instant AI-Powered Lead Response",
        description:
          "Qualify every lead, 24/7. CURATIX responds instantly to event inquiries with personalized messages, ensuring no lead goes cold.",
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
          "Automate your sales pipeline. CURATIX automates follow-ups, reminders, and task creation, so deals never slip through the cracks.",
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
          "Let leads book tours and calls directly on your calendar. CURATIX prevents double bookings and ensures your team's time is used efficiently.",
        icon: <Layers className="size-5" />,
      },
      {
        title: "AI Voice Bot for Discovery Calls",
        description:
          "Qualify leads over the phone with our AI voice bot. CURATIX asks the right questions and delivers qualified leads directly to your team.",
        icon: <Star className="size-5" />,
      },
    ]

    return (
      <>
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container px-4 md:px-6 relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
                Let AI Handle Inquiries. You Focus on Closing.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                CURATIX automates lead response, scheduling, and booking workflows for event-driven venues — so your
                team can stop chasing leads and start closing more business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-blue-600 hover:bg-blue-700"
                  onClick={() =>
                    window.open("https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true", "_blank")
                  }
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
            </div>

            <div className="relative mx-auto max-w-5xl">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                <Image
                  src="https://cdn.dribbble.com/userupload/12302729/file/original-fa372845e394ee85bebe0389b9d86871.png?resize=1504x1128&vertical=center"
                  width={1280}
                  height={720}
                  alt="CURATIX dashboard"
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
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

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Built to Automate Your Event Sales — End to End
              </h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                We can integrate with your existing CRM, or you can use our purpose-built platform designed specifically
                for events.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <Card key={i} className="h-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Loved by Teams Worldwide</h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                Don't just take our word for it. See what our customers have to say about their experience.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "CURATIX has been a game-changer for our event sales. The AI-powered lead response is incredibly efficient, and our team can now focus on closing deals.",
                  author: "Martin S.",
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
                  quote: "CURATIX has streamlined our processes and improved our overall efficiency.",
                  author: "Emily T.",
                  role: "Sales Manager, Fairway Oaks",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <Card key={i} className="h-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-all">
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
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">Pricing</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Straightforward Pricing. No Guesswork.
              </h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                Choose the plan that's right for your business. All plans include a 14-day free trial.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  name: "Basic",
                  price: "$299",
                  upfront: "$1,500",
                  description: "Perfect for venues just getting started with automation.",
                  features: ["AI Lead Response", "Smart Event Inquiry Form", "Basic CRM Dashboard", "Email Support"],
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
                <Card
                  key={i}
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
                      onClick={() =>
                        window.open(
                          "https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true",
                          "_blank",
                        )
                      }
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  // Restaurants Content Component
  const RestaurantsContent = () => {
    const features = [
      {
        title: "Instant AI-Powered Guest Follow-Up",
        description:
          "Send personalized texts and emails after every visit to say thanks, request reviews and share next-visit offers.",
        icon: <Zap className="size-5" />,
      },
      {
        title: "Smart Order & Reservation Forms",
        description: "Capture more qualified diners with branded reservation or feedback forms.",
        icon: <Utensils className="size-5" />,
      },
      {
        title: "Automated Specials & Loyalty Campaigns",
        description: "Schedule weekly specials, come-back offers and '9 meals, 10th free' rewards.",
        icon: <Star className="size-5" />,
      },
      {
        title: "Centralized CRM Dashboard",
        description: "Track every guest, review and offer in one place.",
        icon: <BarChart className="size-5" />,
      },
      {
        title: "Calendar & POS Integration",
        description: "Sync with your reservation system and POS to avoid double-booking and send targeted offers.",
        icon: <Calendar className="size-5" />,
      },
      {
        title: "AI Phone & Chat Bot",
        description: "Let callers book tables or place take-out orders without tying up your staff.",
        icon: <Phone className="size-5" />,
      },
    ]

    return (
      <>
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container px-4 md:px-6 relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
                Let AI Turn Every Guest Into a Regular.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                CURATIX automates review invites, loyalty campaigns, specials, and bookings for restaurants—so you can
                stop chasing customers and start filling tables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-orange-600 hover:bg-orange-700"
                  onClick={() =>
                    window.open("https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true", "_blank")
                  }
                >
                  Schedule Demo
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                  onClick={() => setShowROICalculator(true)}
                >
                  <Calculator className="mr-2 size-4" />
                  Calculate Your ROI
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>Built for restaurants, cafés, bars and hospitality teams.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cost of Inaction Section */}
        <section className="w-full py-20 bg-red-50 border-y border-red-100">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
                Reviews Build Trust. Trust Fills Tables.
              </h2>
              <p className="text-lg text-red-700 max-w-2xl mx-auto">
                Every missed follow-up is a lost opportunity for loyalty and reviews.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">65%</div>
                  <p className="text-red-800 font-medium text-sm">
                    Of diners say online reviews influence their dining decisions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">33%</div>
                  <p className="text-red-800 font-medium text-sm">
                    Of customers won't eat at restaurants with ratings below 4 stars
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">53%</div>
                  <p className="text-red-800 font-medium text-sm">
                    Expect a response to negative reviews within a week
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">21×</div>
                  <p className="text-red-800 font-medium text-sm">Higher conversion when responding within 5 minutes</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="w-full py-12 bg-white border-b border-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-sm font-medium text-gray-500">Trusted by leading restaurants and hospitality brands</p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                {["The Green Fork Bistro", "Summit Tavern", "Coastal Grill", "Orchard Café", "Blue Sky Diner"].map(
                  (name, i) => (
                    <div
                      key={i}
                      className="h-8 w-auto opacity-60 text-gray-600 font-medium transition-all hover:opacity-100"
                    >
                      {name}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-orange-100 text-orange-800">
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Built to Automate Your Restaurant — End to End
              </h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                We can integrate with your existing POS and reservation system, or you can use our purpose-built
                platform.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <Card key={i} className="h-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-orange-100 text-orange-800">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Loved by Restaurants</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "CURATIX transformed our slow Mondays—our weekly specials now sell out, and five-star reviews pour in.",
                  author: "Sara L.",
                  role: "Owner, Green Fork Bistro",
                  rating: 5,
                },
                {
                  quote: "We no longer worry about forgotten follow-ups. The loyalty program keeps guests coming back.",
                  author: "Daniel M.",
                  role: "Manager, Summit Tavern",
                  rating: 5,
                },
                {
                  quote:
                    "The AI chat and phone bot freed our staff to focus on service. Bookings are up, and our ratings climbed past 4.5 stars.",
                  author: "Aisha R.",
                  role: "GM, Coastal Grill",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <Card key={i} className="h-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-all">
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
                      <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-medium">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-20 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-orange-100 text-orange-800">
                Pricing
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Straightforward Pricing. No Guesswork.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  name: "Starter",
                  price: "$299",
                  description: "Small venues starting with automation.",
                  features: ["AI Guest Follow-Up", "Weekly Specials", "Basic CRM Dashboard", "Email Support"],
                  cta: "Request Demo",
                },
                {
                  name: "Basic",
                  price: "$349",
                  description: "Growing restaurants that need more.",
                  features: [
                    "Everything in Starter",
                    "Loyalty Campaigns",
                    "Reservation & Calendar Integration",
                    "POS Triggers",
                    "Priority Support",
                  ],
                  cta: "Request Demo",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  description: "Multi-location groups or chains.",
                  features: ["Everything in Basic", "AI Phone & Chat Bot", "Custom Integrations", "24/7 Support"],
                  cta: "Contact Sales",
                },
              ].map((plan, i) => (
                <Card
                  key={i}
                  className={`relative overflow-hidden h-full ${plan.popular ? "border-orange-500 shadow-lg ring-2 ring-orange-500/20" : "border-gray-200 shadow-sm"} bg-white`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-orange-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="flex items-baseline mt-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-gray-500 ml-1">/month</span>}
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                    <ul className="space-y-3 my-6 flex-grow">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center">
                          <Check className="mr-2 size-4 text-orange-600" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-auto rounded-full ${plan.popular ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() =>
                        window.open(
                          "https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true",
                          "_blank",
                        )
                      }
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  // Receptionist Content Component
  const ReceptionistContent = () => {
    const features = [
      {
        title: "24/7 AI Phone & Chat Response",
        description: "Greets callers instantly, answers FAQs and qualifies leads.",
        icon: <Phone className="size-5" />,
      },
      {
        title: "Smart Intake & Qualification",
        description: "Captures caller details, asks screening questions and routes urgent issues.",
        icon: <Users className="size-5" />,
      },
      {
        title: "Automated Scheduling & Follow-Ups",
        description: "Books appointments on your calendar, sends confirmations and reminders.",
        icon: <Calendar className="size-5" />,
      },
      {
        title: "Centralized Inbox & CRM Sync",
        description: "Log every call, chat and note in one dashboard.",
        icon: <BarChart className="size-5" />,
      },
      {
        title: "Voice, SMS & Web Chat Integration",
        description: "Offer callers multiple ways to interact; deflect calls to text when convenient.",
        icon: <MessageCircle className="size-5" />,
      },
      {
        title: "Real-Time Call Summaries & Analytics",
        description: "Understand who called, what they needed and how long they engaged.",
        icon: <TrendingUp className="size-5" />,
      },
    ]

    return (
      <>
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-green-50 to-teal-50">
          <div className="container px-4 md:px-6 relative">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
                Stop Missing Calls. Start Booking Business.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                CURATIX's AI receptionist answers calls and chats 24/7, schedules appointments, and sends follow-ups—so
                you never miss another lead.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    window.open("https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true", "_blank")
                  }
                >
                  Schedule Demo
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  onClick={() => setShowPhonePopup(true)}
                >
                  <Phone className="mr-2 size-4" />
                  See How It Works
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>
                  Perfect for clinics, salons, repair shops, professional services and any appointment-based business.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Cost of Inaction Section */}
        <section className="w-full py-20 bg-red-50 border-y border-red-100">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">The Hidden Cost of Missed Calls</h2>
              <p className="text-lg text-red-700 max-w-2xl mx-auto">
                Every missed call is a missed opportunity for new business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">40%</div>
                  <p className="text-red-800 font-medium text-sm">Of incoming calls go unanswered</p>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">3%</div>
                  <p className="text-red-800 font-medium text-sm">Of callers leave a voicemail when sent to one</p>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">33%</div>
                  <p className="text-red-800 font-medium text-sm">Abandon a brand after one bad service experience</p>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">60%</div>
                  <p className="text-red-800 font-medium text-sm">Hang up if left on hold for more than a minute</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="w-full py-12 bg-white border-b border-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <p className="text-sm font-medium text-gray-500">Trusted by Leading Service Businesses</p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
                {["SalonPro", "HealthWorks Clinic", "TechWizard Repairs", "Bay Spa", "City Law Office"].map(
                  (name, i) => (
                    <div
                      key={i}
                      className="h-8 w-auto opacity-60 text-gray-600 font-medium transition-all hover:opacity-100"
                    >
                      {name}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800">
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Always-On Reception, Powered by AI
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <Card key={i} className="h-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Loved by Businesses That Can't Afford to Miss a Call
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "We were missing one in four calls—now our AI receptionist answers every one. Our calendar has never been fuller.",
                  author: "Lauren P.",
                  role: "Owner, SalonPro",
                  rating: 5,
                },
                {
                  quote: "CURATIX's call summaries and scheduling free my staff to care for patients.",
                  author: "Dr. Alex B.",
                  role: "HealthWorks Clinic",
                  rating: 5,
                },
                {
                  quote:
                    "Our repair shop is busy. The AI agent answers questions, qualifies leads and sends bookings straight to our CRM.",
                  author: "Miguel C.",
                  role: "Owner, TechWizard Repairs",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <Card key={i} className="h-full bg-white border-gray-200 shadow-sm hover:shadow-md transition-all">
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
                      <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-20 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800">
                Pricing
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Plans That Scale With You</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              {[
                {
                  name: "Basic",
                  price: "$499",
                  description: "Includes 300 minutes of call handling and chat time.",
                  features: [
                    "AI Call & Chat Receptionist",
                    "Smart Intake",
                    "Simple Appointment Scheduling",
                    "Basic CRM Syncing",
                    "Additional minutes at $0.30/min",
                  ],
                  cta: "Request Demo",
                },
                {
                  name: "Professional",
                  price: "$599",
                  description: "Includes 600 minutes of call handling and chat time.",
                  features: [
                    "Everything in Basic",
                    "SMS Responses",
                    "Advanced Scheduling (Multi-staff & Multi-location)",
                    "Priority Support",
                    "Additional minutes at $0.25/min",
                  ],
                  cta: "Request Demo",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  description: "Volume minutes & bespoke integrations.",
                  features: [
                    "Everything in Professional",
                    "Unlimited Routing Rules",
                    "White-label Voice",
                    "Custom Integrations",
                    "24/7 Phone & Email Support",
                  ],
                  cta: "Talk to Sales",
                },
              ].map((plan, i) => (
                <Card
                  key={i}
                  className={`relative overflow-hidden h-full ${plan.popular ? "border-green-500 shadow-lg ring-2 ring-green-500/20" : "border-gray-200 shadow-sm"} bg-white`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-green-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="flex items-baseline mt-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-gray-500 ml-1">/month</span>}
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                    <ul className="space-y-3 my-6 flex-grow">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center">
                          <Check className="mr-2 size-4 text-green-600" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-auto rounded-full ${plan.popular ? "bg-green-600 hover:bg-green-700" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() =>
                        window.open(
                          "https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true",
                          "_blank",
                        )
                      }
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

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
            <Image src="/images/curatix-logo-icon.png" alt="CURATIX.AI" width={32} height={32} className="size-8" />
            <span>CURATIX.AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => setActiveTab("clubs")}
              className={`text-sm font-medium transition-colors hover:text-gray-900 flex items-center gap-2 ${
                activeTab === "clubs" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <Building2 className="size-4" />
              Event Spaces
            </button>
            <button
              onClick={() => setActiveTab("restaurants")}
              className={`text-sm font-medium transition-colors hover:text-gray-900 flex items-center gap-2 ${
                activeTab === "restaurants" ? "text-orange-600" : "text-gray-600"
              }`}
            >
              <Utensils className="size-4" />
              Restaurants
            </button>
            <button
              onClick={() => setActiveTab("receptionist")}
              className={`text-sm font-medium transition-colors hover:text-gray-900 flex items-center gap-2 ${
                activeTab === "receptionist" ? "text-green-600" : "text-gray-600"
              }`}
            >
              <HeadphonesIcon className="size-4" />
              Receptionist
            </button>
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
            <Link
              href="https://app.curatix.ai"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Log in
            </Link>
            <Button
              className="rounded-full bg-blue-600 hover:bg-blue-700"
              onClick={() =>
                window.open("https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true", "_blank")
              }
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
        <div className="md:hidden absolute top-16 inset-x-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 z-40 transition-all duration-300">
          <div className="container py-4 flex flex-col gap-4">
            <button
              onClick={() => {
                setActiveTab("clubs")
                setMobileMenuOpen(false)
              }}
              className={`py-2 text-sm font-medium flex items-center gap-2 ${
                activeTab === "clubs" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <Building2 className="size-4" />
              Event Spaces
            </button>
            <button
              onClick={() => {
                setActiveTab("restaurants")
                setMobileMenuOpen(false)
              }}
              className={`py-2 text-sm font-medium flex items-center gap-2 ${
                activeTab === "restaurants" ? "text-orange-600" : "text-gray-600"
              }`}
            >
              <Utensils className="size-4" />
              Restaurants
            </button>
            <button
              onClick={() => {
                setActiveTab("receptionist")
                setMobileMenuOpen(false)
              }}
              className={`py-2 text-sm font-medium flex items-center gap-2 ${
                activeTab === "receptionist" ? "text-green-600" : "text-gray-600"
              }`}
            >
              <HeadphonesIcon className="size-4" />
              Receptionist
            </button>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
              <Link
                href="https://app.curatix.ai"
                className="py-2 text-sm font-medium text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Button
                className="rounded-full bg-blue-600 hover:bg-blue-700"
                onClick={() =>
                  window.open("https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true", "_blank")
                }
              >
                Get Started
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {getTabContent()}

        {/* About Us Section - Shared across all tabs */}
        <section id="about" className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <Image
                  src="/images/about-curatix.png"
                  alt="About CURATIX.AI"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">
                  About Us
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                  We Don't Just Automate. We Curate.
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    At CURATIX.AI, we believe that businesses shouldn't have to choose between delivering great service
                    and managing leads effectively.
                  </p>
                  <p>
                    Founded by a team of sales and operations professionals across hospitality, service, and club
                    industries, CURATIX was built to solve expensive problems: missed opportunities, slow response
                    times, and manual processes that drain resources.
                  </p>
                  <p>
                    Our platform uses conversational AI, automated workflows, and real-time lead routing to curate every
                    interaction—qualifying, organizing, and responding instantly so teams can focus on what they do
                    best.
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
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - Shared */}
        <section className="w-full py-20 md:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Simple Setup. Serious Results.
              </h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                Get started in minutes and see the difference our platform can make for your business.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-200 to-transparent -translate-y-1/2 z-0"></div>

              {(() => {
                const steps = {
                  clubs: [
                    {
                      step: "01",
                      title: "Connect or Replace Your Inquiry Form",
                      description:
                        "Integrate CURATIX with your existing form, or use our custom-built form to capture qualified leads.",
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
                  ],
                  restaurants: [
                    {
                      step: "01",
                      title: "Connect Your POS and Forms",
                      description: "Integrate CURATIX with your order/reservation system or use our forms.",
                    },
                    {
                      step: "02",
                      title: "Automate Your Follow-Up",
                      description: "Launch review invites, specials and loyalty campaigns via SMS and email.",
                    },
                    {
                      step: "03",
                      title: "Fill Tables with Confidence",
                      description:
                        "See live dashboards, turn diners into regulars and let AI handle bookings and calls.",
                    },
                  ],
                  receptionist: [
                    {
                      step: "01",
                      title: "Connect Your Phone & Chat Lines",
                      description: "Integrate CURATIX with your VOIP or website widget.",
                    },
                    {
                      step: "02",
                      title: "Automate Call Handling & Qualification",
                      description: "Launch AI voice and chat agents with your scripts and routing rules.",
                    },
                    {
                      step: "03",
                      title: "Book and Follow Up",
                      description:
                        "The AI agent schedules appointments, captures leads and updates your CRM—while you focus on service.",
                    },
                  ],
                }
                return steps[activeTab] || steps.clubs
              })().map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Shared */}
        <section id="faq" className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[800px] text-gray-600 md:text-lg">
                Find answers to common questions about our platform.
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {(() => {
                  const faqs = {
                    clubs: [
                      {
                        question: "How does CURATIX automate lead response?",
                        answer:
                          "CURATIX uses AI to instantly respond to event inquiries with personalized messages, ensuring no lead goes cold. Our system qualifies leads 24/7, allowing your team to focus on closing deals.",
                      },
                      {
                        question: "Can CURATIX integrate with my existing CRM?",
                        answer:
                          "Yes, CURATIX can integrate with your existing CRM. We also offer a purpose-built platform designed specifically for events, which you can use as a standalone solution or integrate with other tools.",
                      },
                      {
                        question: "What kind of support do you offer?",
                        answer:
                          "We offer email support for all plans. The Professional plan includes priority email support, and the Enterprise plan includes 24/7 phone and email support.",
                      },
                      {
                        question: "How does the AI Voice Bot work?",
                        answer:
                          "Our AI Voice Bot qualifies leads over the phone by asking the right questions and delivering qualified leads directly to your team.",
                      },
                      {
                        question: "Is there a limit to how many users I can add?",
                        answer:
                          "There is no limit to the number of users you can add to your CURATIX account. You can add as many team members as you need.",
                      },
                      {
                        question: "What types of venues is CURATIX built for?",
                        answer:
                          "CURATIX is built for private clubs, event venues, and hospitality teams. Our platform is designed to automate lead response, scheduling, and booking workflows for event-driven businesses.",
                      },
                    ],
                    restaurants: [
                      {
                        question: "Can CURATIX work with my POS?",
                        answer:
                          "Yes, CURATIX integrates with most major POS systems to automatically trigger follow-up campaigns based on guest visits and purchases.",
                      },
                      {
                        question: "How does the review automation work?",
                        answer:
                          "After each visit, CURATIX automatically sends personalized thank-you messages with review requests to happy customers, helping you build a strong online reputation.",
                      },
                      {
                        question: "What about data privacy?",
                        answer:
                          "We take data privacy seriously and comply with all major regulations including GDPR and CCPA. Your customer data is encrypted and secure.",
                      },
                      {
                        question: "Can I customize the loyalty campaigns?",
                        answer:
                          "You can create custom loyalty programs, special offers, and targeted campaigns based on customer behavior and preferences.",
                      },
                      {
                        question: "How quickly will I see results?",
                        answer:
                          "Most restaurants see increased review rates within the first week and improved customer retention within the first month of implementation.",
                      },
                      {
                        question: "Do you support multiple locations?",
                        answer:
                          "Yes, our Enterprise plan is designed for restaurant groups and chains with multiple locations, offering centralized management and location-specific customization.",
                      },
                    ],
                    receptionist: [
                      {
                        question: "How accurate is the AI receptionist?",
                        answer:
                          "Our AI receptionist has a 95%+ accuracy rate in understanding caller intent and can handle complex scheduling scenarios with natural conversation flow.",
                      },
                      {
                        question: "What languages does it support?",
                        answer:
                          "Currently, our AI receptionist supports English with additional languages coming soon. Contact us for specific language requirements.",
                      },
                      {
                        question: "Can I port my existing phone number?",
                        answer:
                          "Yes, we can help you port your existing business number to work with our AI receptionist system with minimal downtime.",
                      },
                      {
                        question: "What happens if I go over my minutes?",
                        answer:
                          "Additional minutes are billed at the rates specified in your plan. You'll receive notifications as you approach your limit and can upgrade anytime.",
                      },
                      {
                        question: "How secure is the call data?",
                        answer:
                          "All calls are encrypted and stored securely. We comply with HIPAA and other industry standards for businesses that require enhanced security.",
                      },
                      {
                        question: "Can it handle emergency calls?",
                        answer:
                          "Yes, our AI can be configured to recognize emergency situations and immediately route calls to the appropriate person or service.",
                      },
                    ],
                  }
                  return faqs[activeTab] || faqs.clubs
                })().map((faq, i) => (
                  <div key={i}>
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-gray-200 py-2 bg-white rounded-lg mb-2 px-4"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline text-gray-900">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section - Shared */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                {(() => {
                  const headlines = {
                    clubs: "Ready to Stop Chasing Leads?",
                    restaurants: "Ready to Turn Guests into Regulars?",
                    receptionist: "Never Miss a Lead Again.",
                  }
                  return headlines[activeTab] || headlines.clubs
                })()}
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
                  onClick={() =>
                    window.open("https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true", "_blank")
                  }
                >
                  Request Demo
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                  onClick={() =>
                    window.open("https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true", "_blank")
                  }
                >
                  {activeTab === "receptionist" ? "Talk to Sales" : "Schedule a Demo"}
                </Button>
              </div>
            </div>
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
                  <h4 className="text-xl font-semibold text-gray-900">Your Potential with CURATIX</h4>

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
                          With CURATIX
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
                        window.open(
                          "https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true",
                          "_blank",
                        )
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

      {/* Phone Number Popup Modal */}
      {showPhonePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPhonePopup(false)}
            >
              <X className="size-6" />
              <span className="sr-only">Close</span>
            </Button>
            <div className="p-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Phone className="size-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Call Our AI Receptionist</h3>
              <p className="text-gray-600 mb-6">
                Experience CURATIX in action! Call our demo line to see how our AI receptionist handles calls.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 font-mono">(248) 289-9969</span>
                  <Button variant="outline" size="sm" onClick={copyPhoneNumber} className="ml-2 bg-transparent">
                    {phoneCopied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
                  </Button>
                </div>
                {phoneCopied && <p className="text-sm text-green-600 mt-2">Phone number copied!</p>}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="flex-1 rounded-full bg-green-600 hover:bg-green-700"
                  onClick={() => window.open("tel:(248) 289-9969")}
                >
                  <Phone className="mr-2 size-4" />
                  Call Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 rounded-full border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  onClick={() => {
                    setShowPhonePopup(false)
                    window.open("https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true", "_blank")
                  }}
                >
                  Schedule Demo
                </Button>
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
                  alt="CURATIX.AI"
                  width={40}
                  height={40}
                  className="size-10"
                />
                <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  CURATIX was founded with one goal: to make customer interaction management effortless for businesses
                  across industries.
                </p>
                <p>
                  After years of working in sales and operations across hospitality, service, and club industries, our
                  founders recognized a common gap—businesses were missing opportunities simply because they lacked the
                  systems to respond quickly, qualify leads, and follow up effectively.
                </p>
                <p>
                  That's where CURATIX comes in. We built an AI-powered platform designed for modern businesses,
                  combining smart forms, instant response systems, and automated workflows—all integrated with your
                  existing tools or ours.
                </p>
                <p>
                  Whether you're managing events, serving guests, or answering calls, CURATIX turns every interaction
                  into an opportunity—without the manual work.
                </p>
                <p className="font-medium text-gray-900">
                  We're here to help businesses run smarter, grow faster, and deliver a better experience for every
                  customer who reaches out.
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  className="rounded-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setShowStoryPopup(false)
                    window.open("https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true", "_blank")
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
                <Image src="/images/curatix-logo-icon.png" alt="CURATIX.AI" width={32} height={32} />
                CURATIX.AI
              </Link>
              <p className="text-sm text-gray-600">
                Automate your business with our AI-powered platform. Stop chasing leads and start closing more business.
              </p>
              <div className="flex gap-4 text-gray-400">
                {[
                  { icon: "facebook", href: "#" },
                  { icon: "twitter", href: "#" },
                  { icon: "linkedin", href: "#" },
                ].map(({ icon, href }) => (
                  <Link key={icon} href={href} className="hover:text-gray-600 transition-colors">
                    <span className="sr-only">{icon}</span>
                    <span className="inline-block w-4 h-4 bg-current rounded-full" />
                  </Link>
                ))}
              </div>
            </div>

            {/* column 2 */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-900">Products</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => setActiveTab("clubs")}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Event Spaces
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("restaurants")}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Restaurants
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("receptionist")}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    AI Receptionist
                  </button>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
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
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
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
                  <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-8">
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} CURATIX.AI. All rights reserved.</p>
            <div className="flex gap-4 text-xs">
              {["Privacy Policy", "Terms", "Cookies"].map((txt) => (
                <Link key={txt} href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {txt}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
