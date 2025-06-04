'use client'

import { CardData } from "@/components/section-cards"
import { useState, useEffect } from "react"

interface StatsProps {
  totalRevenue: number;
  totalUnitsSold: number;
  numberOfOrders: number;
  salesByCategory: Record<string, number>;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export function SectionCards({ startDate, endDate }: { startDate?: string; endDate?: string }) {
  const [stats, setStats] = useState<StatsProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (startDate) params.append("startDate", startDate)
        if (endDate) params.append("endDate", endDate)

        const res = await fetch(`/api/admin/statistics/sales?${params}`, {
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
  }, [startDate, endDate])

  if (loading) return <p className="px-4">Loading...</p>
  if (error) return <p className="px-4 text-red-500">{error}</p>
  if (!stats) return null

  const totalCategorySales = Object.values(stats.salesByCategory).reduce((sum, v) => sum + v, 0)

  const cardProp = [
    {
      title: "Total Revenue",
      value: `₱${stats.totalRevenue.toFixed(2)}`,
      percentage: "12.5%",
      trend: "up",
      footerLine1: "Trending up this month",
      footerLine2: "Visitors for the last 6 months",
    },
    {
      title: "Total Units Sold",
      value: stats.totalUnitsSold.toLocaleString(),
      percentage: "20%",
      trend: "down",
      footerLine1: "Down 20% this period",
      footerLine2: "Acquisition needs attention",
    },
    {
      title: "Number Of Orders",
      value: stats.numberOfOrders.toLocaleString(),
      percentage: "12.5%",
      trend: "up",
      footerLine1: "Strong user retention",
      footerLine2: "Engagement exceeds targets",
    },
    {
      title: "Sales By Product Category",
      value: `₱${totalCategorySales.toFixed(2)}`,
      percentage: "4.5%",
      trend: "up",
      footerLine1: "Steady performance",
      footerLine2: "Meets growth projections",
    },
  ]
  console.log(stats)

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {cardProp.map((card, index) => (
        <CardData key={index} {...card} />
      ))}
    </div>
  )
}
