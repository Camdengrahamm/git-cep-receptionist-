"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, DollarSign, Phone } from "lucide-react"

export function ReceptionistROICalculator() {
  const [monthlyCalls, setMonthlyCalls] = useState(500)
  const [customerValue, setCustomerValue] = useState(250)
  const [answerRate, setAnswerRate] = useState(60)
  const [conversionRate, setConversionRate] = useState(15)

  // ROI Calculations for appointment-based businesses
  const calculateReceptionistROI = () => {
    // Current situation
    const answeredCalls = monthlyCalls * (answerRate / 100)
    const missedCalls = monthlyCalls - answeredCalls
    const currentConversions = answeredCalls * (conversionRate / 100)
    const currentRevenue = currentConversions * customerValue

    // Lost opportunities from missed calls
    const potentialMissedConversions = missedCalls * 0.2 // 20% of missed calls would have converted
    const monthlyLoss = potentialMissedConversions * customerValue
    const annualLoss = monthlyLoss * 12

    // With CURATIX (95% answer rate, improved conversion)
    const curatixAnswered = monthlyCalls * 0.95
    const curatixConversions = curatixAnswered * ((conversionRate + 5) / 100) // 5% improvement
    const curatixRevenue = curatixConversions * customerValue
    const additionalRevenue = (curatixRevenue - currentRevenue) * 12

    const curatixCost = 599 * 12 // Professional plan cost
    const netGain = additionalRevenue - curatixCost
    const roi = (netGain / curatixCost) * 100
    const paybackMonths = curatixCost / (additionalRevenue / 12)

    return {
      monthlyLoss: Math.round(monthlyLoss),
      annualLoss: Math.round(annualLoss),
      curatixRecovery: Math.round(additionalRevenue),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths * 10) / 10,
    }
  }

  const results = calculateReceptionistROI()

  const proofPoints = [
    { stat: "40%", description: "of incoming calls go unanswered" },
    { stat: "3%", description: "of callers leave a voicemail when sent to one" },
    { stat: "33%", description: "abandon a brand after one bad service experience" },
    { stat: "60%", description: "hang up if left on hold for more than a minute" },
  ]

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-800 mb-4">
            ROI Calculator
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900">
            Stop Missing Calls. Start Booking Business.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            CURATIX's AI receptionist answers calls and chats 24/7, schedules appointments, and sends follow-ups—so you
            never miss another lead.
          </p>
        </div>

        {/* Calculator */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl text-gray-900">
                <Calculator className="size-8 text-green-600" />
                AI Receptionist ROI Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Current Situation</h3>

                  {/* Monthly Calls */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">
                      Monthly Inbound Calls: {monthlyCalls.toLocaleString()}
                    </Label>
                    <Slider
                      value={[monthlyCalls]}
                      onValueChange={(value) => setMonthlyCalls(value[0])}
                      max={2000}
                      min={50}
                      step={25}
                      className="w-full"
                    />
                    <Input
                      type="number"
                      value={monthlyCalls}
                      onChange={(e) => setMonthlyCalls(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Customer Value */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">
                      Average Customer Value: ${customerValue}
                    </Label>
                    <Slider
                      value={[customerValue]}
                      onValueChange={(value) => setCustomerValue(value[0])}
                      max={1000}
                      min={50}
                      step={25}
                      className="w-full"
                    />
                    <Input
                      type="number"
                      value={customerValue}
                      onChange={(e) => setCustomerValue(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Answer Rate */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">Current Answer Rate: {answerRate}%</Label>
                    <Slider
                      value={[answerRate]}
                      onValueChange={(value) => setAnswerRate(value[0])}
                      max={100}
                      min={20}
                      step={5}
                      className="w-full"
                    />
                    <Input
                      type="number"
                      value={answerRate}
                      onChange={(e) => setAnswerRate(Number(e.target.value))}
                      min={0}
                      max={100}
                      className="w-full"
                    />
                  </div>

                  {/* Conversion Rate */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">
                      Current Conversion Rate: {conversionRate}%
                    </Label>
                    <Slider
                      value={[conversionRate]}
                      onValueChange={(value) => setConversionRate(value[0])}
                      max={50}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                    <Input
                      type="number"
                      value={conversionRate}
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      min={0}
                      max={100}
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
                        With CURATIX AI Receptionist
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
                      className="flex-1 rounded-full bg-green-600 hover:bg-green-700 h-12"
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
                      className="flex-1 rounded-full border-green-200 text-green-700 hover:bg-green-50 h-12 bg-transparent"
                      onClick={() =>
                        window.open(
                          "https://app.gohighlevel.com/v2/preview/ZAw8lYgc8bnST5DPa535?notrack=true",
                          "_blank",
                        )
                      }
                    >
                      <Phone className="mr-2 size-4" />
                      See How It Works
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proof Points */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">The Cost of Missed Opportunities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {proofPoints.map((point, i) => (
              <Card key={i} className="text-center bg-white border-green-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">{point.stat}</div>
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
