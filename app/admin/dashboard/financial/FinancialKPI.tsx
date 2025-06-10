// components/SectionCards.tsx
'use client'
import { CardData } from "@/components/section-cards"
import { useEffect, useState } from "react"

type StatsProps = {
  totalRevenue: number;
  totalStockExpense: number;
  netProfit: number;
  growthRate: number;
}

export default function FinancialKPI() {
  const [stats, setStats] = useState<StatsProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/statistics/financial`, {
          method: 'GET',
          credentials: "include"
        })

        if (!res.ok) {
          throw new Error("Failed to fetch statistics")
        }

        const data: StatsProps = await res.json()
        setStats(data)
        setError(null)

      } catch (error) {
        setError("Could not load statistics.")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  console.log(stats)
  const cardProp = [
    {
      title: "Total Revenue",
      value: `${stats?.totalRevenue.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}`,
      percentage: "12.5%",
      trend: "up",
      footerLine1: "Trending up this month",
      footerLine2: "Visitors for the last 6 months",
    },
    {
      title: "Total Stock Expenses",
      value: `${stats?.totalStockExpense.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}`,
      percentage: "20%",
      trend: "down",
      footerLine1: "Down 20% this period",
      footerLine2: "No movement in the last 30/60/90 days.",
    },
    {
      title: "Net Profit",
      value: `${stats?.netProfit.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}`,
      percentage: "12.5%",
      trend: "up",
      footerLine1: "Strong user retention",
      footerLine2: "Engagement exceed targets",
    },
    {
      title: "Monthly Growth Rate",
      value: `${stats?.growthRate.toFixed(2)}%`,
      percentage: "4.5%",
      trend: "up",
      footerLine1: "Steady performance",
      footerLine2: "Meets growth projections",
    },
  ]

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {cardProp.map((card, index) => (
        <CardData key={index} {...card} />
      ))}
    </div>
  )
}
