"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  BarChart,
  Calculator,
  ChevronRight,
  Clock,
  DollarSign,
  Layers,
  Menu,
  Moon,
  Shield,
  Star,
  Sun,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react"

import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LandingPage() {
  /* --------------------------------------------------------------------- */
  /*  ─── HEADER STATE ──────────────────────────────────────────────────── */
  /* --------------------------------------------------------------------- */
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  /* --------------------------------------------------------------------- */
  /*  ─── MODALS STATE ──────────────────────────────────────────────────── */
  /* --------------------------------------------------------------------- */
  const [showROICalc, setShowROICalc] = useState(false)
  const [showStory, setShowStory] = useState(false)

  /* --------------------------------------------------------------------- */
  /*  ─── COUNTDOWN STATE (7-day offer) ─────────────────────────────────── */
  /* --------------------------------------------------------------------- */
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  /* --------------------------------------------------------------------- */
  /*  ─── ROI CALCULATOR STATE ──────────────────────────────────────────── */
  /* --------------------------------------------------------------------- */
  const [monthlyInquiries, setMonthlyInquiries] = useState(50)
  const [avgEventValue, setAvgEventValue] = useState(5000)
  const [currentResponseHrs, setCurrentResponseHrs] = useState(24)
  const [conversionRate, setConversionRate] = useState(15)
  const pricePerYearPro = 699 * 12 // reference plan price

  /* --------------------------------------------------------------------- */
  /*  ─── EFFECTS ───────────────────────────────────────────────────────── */
  /* --------------------------------------------------------------------- */
  useEffect(() => {
    setMounted(true)

    /* scroll shadow on header */
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)

    /* countdown – 7 days from mount */
    const dealEndsAt = Date.now() + 7 * 24 * 60 * 60 * 1000
    const timer = setInterval(() => {
      const diff = dealEndsAt - Date.now()
      setTimeLeft({
        days: Math.max(0, Math.floor(diff / 86_400_000)),
        hours: Math.max(0, Math.floor((diff % 86_400_000) / 3_600_000)),
        minutes: Math.max(0, Math.floor((diff % 3_600_000) / 60_000)),
        seconds: Math.max(0, Math.floor((diff % 60_000) / 1000)),
      })
    }, 1000)

    return () => {
      window.removeEventListener("scroll", onScroll)
      clearInterval(timer)
    }
  }, [])

  /* --------------------------------------------------------------------- */
  /*  ─── ROI CALCULATIONS ──────────────────────────────────────────────── */
  /* --------------------------------------------------------------------- */
  const roiStats = (() => {
    const missed = monthlyInquiries * 0.3 // 30 % never responded
    const lostRevMonthly = missed * avgEventValue * (conversionRate / 100)
    const lostRevYear = lostRevMonthly * 12
    const recovered = lostRevYear * 0.8 // assume Curatix recovers 80 %
    const roiPct = ((recovered - pricePerYearPro) / pricePerYearPro) * 100
    return { lostRevMonthly, lostRevYear, recovered, roiPct }
  })()

  /* --------------------------------------------------------------------- */
  /*  ─── HELPER DATA ───────────────────────────────────────────────────── */
  /* --------------------------------------------------------------------- */
  const features = [
    {
      title: "Instant AI-Powered Lead Response",
      icon: Zap,
      desc: "Qualify every lead 24/7 with instant, personalised replies.",
    },
    {
      title: "Smart Event Inquiry Forms",
      icon: BarChart,
      desc: "Capture high-quality leads with branded, embedded forms.",
    },
    {
      title: "Automated Booking Workflows",
      icon: Users,
      desc: "Never miss a follow-up—tasks, reminders, & nudges are automated.",
    },
    {
      title: "Centralised CRM Dashboard",
      icon: Shield,
      desc: "Full pipeline visibility, from enquiry to confirmed event.",
    },
    {
      title: "Calendar Integration & Scheduling",
      icon: Layers,
      desc: "Tours and calls booked straight into your team’s calendar.",
    },
    {
      title: "AI Voice Bot for Discovery Calls",
      icon: Star,
      desc: "Phone qualification that delivers ready-to-close leads.",
    },
  ]

  /* --------------------------------------------------------------------- */
  /*  ─── RENDER ────────────────────────────────────────────────────────── */
  /* --------------------------------------------------------------------- */
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* ===== Countdown Banner ===== */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm py-2 px-4 flex items-center justify-center gap-3">
        <Clock className="size-4" />
        <span>Free implementation offer ends in:</span>
        <span className="font-mono">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>

      {/* ===== Header ===== */}
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <Image src="/images/curatix-logo-icon.png" width={32} height={32} alt="Curatix" />
            Curatix.ai
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            {["about", "features", "testimonials", "pricing", "faq"].map((sec) => (
              <Link key={sec} href={`#${sec}`} className="hover:text-gray-900">
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {mounted && theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>
            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
              Log in
            </Link>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open("https://go.curatix.ai/home", "_blank")}
            >
              Get Started
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>

          {/* Mobile burger */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen((p) => !p)}>
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 border-t border-gray-100">
            {["about", "features", "testimonials", "pricing", "faq"].map((sec) => (
              <Link
                key={sec}
                href={`#${sec}`}
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </Link>
            ))}
            <div className="px-4 py-3 border-t border-gray-100 flex flex-col gap-2">
              <Link href="#" className="text-sm text-gray-600">
                Log in
              </Link>
              <Button
                className="bg-blue-600 hover:bg-blue-700 w-full"
                onClick={() => window.open("https://go.curatix.ai/home", "_blank")}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 md:py-32 text-center">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Let AI handle inquiries. You focus on closing.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Curatix automates lead response, scheduling, and booking workflows for event-driven venues.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open("https://go.curatix.ai/home", "_blank")}
            >
              Schedule Demo
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              onClick={() => setShowROICalc(true)}
            >
              <Calculator className="mr-2 size-4" />
              Calculate Your ROI
            </Button>
          </div>

          <Image
            src="https://cdn.dribbble.com/userupload/12302729/file/original-fa372845e394ee85bebe0389b9d86871.png?resize=1600x1200"
            alt="Dashboard mock"
            width={1200}
            height={750}
            className="rounded-xl shadow-xl border"
          />
        </div>
      </section>

      {/* ===== COST OF INACTION ===== */}
      <section className="bg-red-50 py-20 border-y border-red-100" id="cost">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">The hidden cost of slow response times</h2>
          <p className="text-lg text-red-700 mb-12 max-w-2xl mx-auto">
            Every hour you wait to respond, your conversion rate drops by 10 %. See what you're leaving on the table.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { stat: "30 %", label: "Inquiries never replied to" },
              { stat: "24 h", label: "Average response time" },
              { stat: "$150 k+", label: "Annual revenue lost" },
            ].map(({ stat, label }) => (
              <Card key={label} className="bg-white border-red-200">
                <CardContent className="p-6">
                  <div className="text-3xl font-extrabold text-red-600">{stat}</div>
                  <p className="font-medium text-red-800">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button size="lg" className="mt-12 bg-red-600 hover:bg-red-700" onClick={() => setShowROICalc(true)}>
            <Calculator className="mr-2 size-4" />
            Calculate Your Losses
          </Button>
        </div>
      </section>

      {/* ===== FEATURES (lightly abbreviated for brevity) ===== */}
      <section id="features" className="bg-gray-50 py-20 md:py-32">
        <div className="container text-center mb-12">
          <Badge className="bg-blue-100 text-blue-800 mb-4">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Built to automate your event sales — end-to-end
          </h2>
        </div>
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, desc, icon: Icon }) => (
            <Card key={title} className="bg-white border-gray-200 shadow-sm hover:shadow-md">
              <CardContent className="p-6 space-y-3">
                <div className="size-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== (Other sections remain unchanged for brevity) ===== */}
      {/* You would keep Testimonials, Pricing, FAQ, CTA, Footer, etc., exactly
          as in the last working version – they compile fine.                */}

      {/* ----------------------------------------------------------------- */}
      {/*  ─── ROI CALC MODAL ────────────────────────────────────────────── */}
      {/* ----------------------------------------------------------------- */}
      {showROICalc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowROICalc(false)}
            >
              <X className="size-6" />
            </Button>

            <div className="p-8 space-y-8">
              <div className="flex items-center gap-3">
                <Calculator className="size-8 text-blue-600" />
                <h3 className="text-2xl font-bold">ROI Calculator</h3>
              </div>

              {/* --- Inputs & Outputs --- */}
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Inputs */}
                <div className="space-y-5">
                  <h4 className="font-semibold text-gray-900">Your numbers</h4>
                  {[
                    {
                      id: "inq",
                      label: "Monthly event inquiries",
                      value: monthlyInquiries,
                      setter: setMonthlyInquiries,
                    },
                    {
                      id: "value",
                      label: "Average event value ($)",
                      value: avgEventValue,
                      setter: setAvgEventValue,
                    },
                    {
                      id: "resp",
                      label: "Current response time (hours)",
                      value: currentResponseHrs,
                      setter: setCurrentResponseHrs,
                    },
                    {
                      id: "conv",
                      label: "Current conversion rate (%)",
                      value: conversionRate,
                      setter: setConversionRate,
                    },
                  ].map(({ id, label, value, setter }) => (
                    <div key={id}>
                      <Label htmlFor={id}>{label}</Label>
                      <Input
                        id={id}
                        type="number"
                        value={value}
                        min={0}
                        step={1}
                        onChange={(e) => setter(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>

                {/* Outputs */}
                <div className="space-y-5">
                  <h4 className="font-semibold text-gray-900">Potential impact</h4>

                  <Card className="bg-red-50 border-red-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-800">
                        <TrendingUp className="size-5" />
                        Current losses
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1 text-sm">
                      <div className="flex justify-between text-red-700">
                        <span>Monthly lost revenue</span>
                        <span className="font-bold">${roiStats.lostRevMonthly.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-red-700">
                        <span>Annual lost revenue</span>
                        <span className="font-bold">${roiStats.lostRevYear.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <DollarSign className="size-5" />
                        With Curatix
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1 text-sm">
                      <div className="flex justify-between text-green-700">
                        <span>Annual revenue recovered</span>
                        <span className="font-bold">${roiStats.recovered.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-700">
                        <span>ROI</span>
                        <span className="font-bold">{roiStats.roiPct.toFixed(0)}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setShowROICalc(false)
                      window.open("https://go.curatix.ai/home", "_blank")
                    }}
                  >
                    Schedule Demo to Capture This Revenue
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Story modal omitted here for brevity – keep from last version ==== */}
    </div>
  )
}
