"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  Sales: {
    label: "Sales",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function SalesByProduct() {
  const [chartData, setChartData] = useState<
    { product: string; Sales: number }[]
  >([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch("/api/admin/salesByProduct")
        const json = await res.json()
        setChartData(json.chartData)
      } catch (error) {
        console.error("Failed to fetch chart data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChartData()
  }, [])

  return (
    <Card className="sm:w-[50%]">
      <CardHeader>
        <CardTitle>Sales By Product</CardTitle>
        <CardDescription>Last 30 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="product"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="Sales" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="Sales"
              layout="vertical"
              fill="var(--color-Sales)"
              radius={4}
            >
              <LabelList
                dataKey="product"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="Sales"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {loading ? (
          <div className="text-muted-foreground">Loading data...</div>
        ) : (
          <>
            <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this product <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total sales for the last 30 days
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
