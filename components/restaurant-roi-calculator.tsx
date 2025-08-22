"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, ArrowRight, TrendingUp, DollarSign, Star } from "lucide-react"

export function RestaurantROICalculator() {
  const [monthlyGuests, setMonthlyGuests] = useState(1000)
  const [averageTicket, setAverageTicket] = useState(45)
  const [currentRating, setCurrentRating] = useState(3.8)
  const [responseTime, setResponseTime] = useState(48)

  // ROI Calculations for restaurants
  const calculateRestaurantROI = () => {
    // Base calculations
    const monthlyRevenue = monthlyGuests * averageTicket

    // Impact of poor reviews and slow response
    const ratingImpact = currentRating < 4.0 ? 0.25 : 0.15 // 25% loss if under 4 stars, 15% if above
    const responseImpact = responseTime > 24 ? 0.2 : 0.1 // 20% loss if slow response, 10% if fast

    const totalImpact = Math.min(ratingImpact + responseImpact, 0.4) // Cap at 40% loss
    const monthlyLoss = monthlyRevenue * totalImpact
    const annualLoss = monthlyLoss * 12

    // With CURATIX improvements
    const curatixRecovery = annualLoss * 0.75 // 75% recovery rate
    const curatixCost = 349 * 12 // Basic plan cost
    const netGain = curatixRecovery - curatixCost
    const roi = (netGain / curatixCost) * 100
    const paybackMonths = curatixCost / (curatixRecovery / 12)

    return {
      monthlyLoss: Math.round(monthlyLoss),
      annualLoss: Math.round(annualLoss),
      curatixRecovery: Math.round(curatixRecovery),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths * 10) / 10,
    }
  }

  const results = calculateRestaurantROI()

  const proofPoints = [
    { stat: "65%", description: "of diners say online reviews influence their dining decisions" },
    { stat: "33%", description: "won't eat at restaurants rated under 4 stars" },
    { stat: "53%", description: "expect a response to negative reviews within a week" },
    { stat: "21×", description: "higher conversion when responding within 5 minutes" },
  ]

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-orange-100 text-orange-800 mb-4">
            ROI Calculator
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            Turn Every Guest Into a Regular.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            CURATIX automates review invites, loyalty campaigns, specials, and bookings—so you can stop chasing
            customers and start filling tables.
          </p>
        </div>

        {/* Calculator */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl text-gray-900">
                <Calculator className="size-8 text-orange-600" />
                Restaurant ROI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Current Situation</h3>

                  {/* Monthly Guests */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">
                      Monthly Guests Served: {monthlyGuests.toLocaleString()}
                    </Label>
                    <Slider
                      value={[monthlyGuests]}
                      onValueChange={(value) => setMonthlyGuests(value[0])}
                      max={5000}
                      min={100}
                      step={50}
                      className="w-full"
                    />
                    <Input
                      type="number"
                      value={monthlyGuests}
                      onChange={(e) => setMonthlyGuests(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Average Ticket */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">Average Ticket Value: ${averageTicket}</Label>
                    <Slider
                      value={[averageTicket]}
                      onValueChange={(value) => setAverageTicket(value[0])}
                      max={150}
                      min={15}
                      step={5}
                      className="w-full"
                    />
                    <Input
                      type="number"
                      value={averageTicket}
                      onChange={(e) => setAverageTicket(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Current Rating */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">
                      Current Online Rating: {currentRating} stars
                    </Label>
                    <Slider
                      value={[currentRating]}
                      onValueChange={(value) => setCurrentRating(Math.round(value[0] * 10) / 10)}
                      max={5}
                      min={1}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`size-5 ${
                            i < Math.floor(currentRating)
                              ? "text-yellow-500 fill-yellow-500"
                              : i < currentRating
                                ? "text-yellow-500 fill-yellow-500/50"
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                      <Input
                        type="number"
                        value={currentRating}
                        onChange={(e) => setCurrentRating(Number(e.target.value))}
                        min={1}
                        max={5}
                        step={0.1}
                        className="w-20 ml-4"
                      />
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">
                      Current Review Response Time: {responseTime} hours
                    </Label>
                    <Slider
                      value={[responseTime]}
                      onValueChange={(value) => setResponseTime(value[0])}
                      max={168}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <Input
                      type="number"
                      value={responseTime}
                      onChange={(e) => setResponseTime(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Potential with CURATIX</h3>

                  {/* Current Losses */}
                  <Card className="border-red-200 bg-red-50">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-red-800 flex items-center gap-2 text-lg">
                        <TrendingUp className="size-5" />
                        Current Losses
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-red-700">Monthly Lost Revenue:</span>
                        <span className="font-bold text-red-800 text-lg">${results.monthlyLoss.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-700">Annual Lost Revenue:</span>
                        <span className="font-bold text-red-800 text-xl">${results.annualLoss.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CURATIX Benefits */}
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-green-800 flex items-center gap-2 text-lg">
                        <DollarSign className="size-5" />
                        With CURATIX
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-green-700">Annual Revenue Recovery:</span>
                        <span className="font-bold text-green-800 text-xl">
                          ${results.curatixRecovery.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-700">ROI:</span>
                        <span className="font-bold text-green-800 text-xl">{results.roi}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-700">Payback Period:</span>
                        <span className="font-bold text-green-800 text-lg">{results.paybackMonths} months</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      size="lg"
                      className="flex-1 rounded-full bg-orange-600 hover:bg-orange-700 h-12"
                      onClick={() =>
                        window.open(
                          "https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true",
                          "_blank",
                        )
                      }
                    >
                      <Calculator className="mr-2 size-4" />
                      Calculate My ROI
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 rounded-full border-orange-200 text-orange-700 hover:bg-orange-50 h-12 bg-transparent"
                      onClick={() =>
                        window.open(
                          "https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true",
                          "_blank",
                        )
                      }
                    >
                      Schedule Demo
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proof Points */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">The Numbers Don't Lie</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {proofPoints.map((point, i) => (
              <Card key={i} className="text-center bg-white border-orange-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">{point.stat}</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
