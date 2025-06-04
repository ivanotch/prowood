"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"



const chartData = [
  { date: "2024-04-01", WPC: 222, SPC: 150 },
  { date: "2024-04-02", WPC: 97, SPC: 180 },
  { date: "2024-04-03", WPC: 167, SPC: 120 },
  { date: "2024-04-04", WPC: 242, SPC: 260 },
  { date: "2024-04-05", WPC: 373, SPC: 290 },
  { date: "2024-04-06", WPC: 301, SPC: 340 },
  { date: "2024-04-07", WPC: 245, SPC: 180 },
  { date: "2024-04-08", WPC: 409, SPC: 320 },
  { date: "2024-04-09", WPC: 59, SPC: 110 },
  { date: "2024-04-10", WPC: 261, SPC: 190 },
  { date: "2024-04-11", WPC: 327, SPC: 350 },
  { date: "2024-04-12", WPC: 292, SPC: 210 },
  { date: "2024-04-13", WPC: 342, SPC: 380 },
  { date: "2024-04-14", WPC: 137, SPC: 220 },
  { date: "2024-04-15", WPC: 120, SPC: 170 },
  { date: "2024-04-16", WPC: 138, SPC: 190 },
  { date: "2024-04-17", WPC: 446, SPC: 360 },
  { date: "2024-04-18", WPC: 364, SPC: 410 },
  { date: "2024-04-19", WPC: 243, SPC: 180 },
  { date: "2024-04-20", WPC: 89, SPC: 150 },
  { date: "2024-04-21", WPC: 137, SPC: 200 },
  { date: "2024-04-22", WPC: 224, SPC: 170 },
  { date: "2024-04-23", WPC: 138, SPC: 230 },
  { date: "2024-04-24", WPC: 387, SPC: 290 },
  { date: "2024-04-25", WPC: 215, SPC: 250 },
  { date: "2024-04-26", WPC: 75, SPC: 130 },
  { date: "2024-04-27", WPC: 383, SPC: 420 },
  { date: "2024-04-28", WPC: 122, SPC: 180 },
  { date: "2024-04-29", WPC: 315, SPC: 240 },
  { date: "2024-04-30", WPC: 454, SPC: 380 },
  { date: "2024-05-01", WPC: 165, SPC: 220 },
  { date: "2024-05-02", WPC: 293, SPC: 310 },
  { date: "2024-05-03", WPC: 247, SPC: 190 },
  { date: "2024-05-04", WPC: 385, SPC: 420 },
  { date: "2024-05-05", WPC: 481, SPC: 390 },
  { date: "2024-05-06", WPC: 498, SPC: 520 },
  { date: "2024-05-07", WPC: 388, SPC: 300 },
  { date: "2024-05-08", WPC: 149, SPC: 210 },
  { date: "2024-05-09", WPC: 227, SPC: 180 },
  { date: "2024-05-10", WPC: 293, SPC: 330 },
  { date: "2024-05-11", WPC: 335, SPC: 270 },
  { date: "2024-05-12", WPC: 197, SPC: 240 },
  { date: "2024-05-13", WPC: 197, SPC: 160 },
  { date: "2024-05-14", WPC: 448, SPC: 490 },
  { date: "2024-05-15", WPC: 473, SPC: 380 },
  { date: "2024-05-16", WPC: 338, SPC: 400 },
  { date: "2024-05-17", WPC: 499, SPC: 420 },
  { date: "2024-05-18", WPC: 315, SPC: 350 },
  { date: "2024-05-19", WPC: 235, SPC: 180 },
  { date: "2024-05-20", WPC: 177, SPC: 230 },
  { date: "2024-05-21", WPC: 82, SPC: 140 },
  { date: "2024-05-22", WPC: 81, SPC: 120 },
  { date: "2024-05-23", WPC: 252, SPC: 290 },
  { date: "2024-05-24", WPC: 294, SPC: 220 },
  { date: "2024-05-25", WPC: 201, SPC: 250 },
  { date: "2024-05-26", WPC: 213, SPC: 170 },
  { date: "2024-05-27", WPC: 420, SPC: 460 },
  { date: "2024-05-28", WPC: 233, SPC: 190 },
  { date: "2024-05-29", WPC: 78, SPC: 130 },
  { date: "2024-05-30", WPC: 340, SPC: 280 },
  { date: "2024-05-31", WPC: 178, SPC: 230 },
  { date: "2024-06-01", WPC: 178, SPC: 200 },
  { date: "2024-06-02", WPC: 470, SPC: 410 },
  { date: "2024-06-03", WPC: 103, SPC: 160 },
  { date: "2024-06-04", WPC: 439, SPC: 380 },
  { date: "2024-06-05", WPC: 88, SPC: 140 },
  { date: "2024-06-06", WPC: 294, SPC: 250 },
  { date: "2024-06-07", WPC: 323, SPC: 370 },
  { date: "2024-06-08", WPC: 385, SPC: 320 },
  { date: "2024-06-09", WPC: 438, SPC: 480 },
  { date: "2024-06-10", WPC: 155, SPC: 200 },
  { date: "2024-06-11", WPC: 92, SPC: 150 },
  { date: "2024-06-12", WPC: 492, SPC: 420 },
  { date: "2024-06-13", WPC: 81, SPC: 130 },
  { date: "2024-06-14", WPC: 426, SPC: 380 },
  { date: "2024-06-15", WPC: 307, SPC: 350 },
  { date: "2024-06-16", WPC: 371, SPC: 310 },
  { date: "2024-06-17", WPC: 475, SPC: 520 },
  { date: "2024-06-18", WPC: 107, SPC: 170 },
  { date: "2024-06-19", WPC: 341, SPC: 290 },
  { date: "2024-06-20", WPC: 408, SPC: 450 },
  { date: "2024-06-21", WPC: 169, SPC: 210 },
  { date: "2024-06-22", WPC: 317, SPC: 270 },
  { date: "2024-06-23", WPC: 480, SPC: 530 },
  { date: "2024-06-24", WPC: 132, SPC: 180 },
  { date: "2024-06-25", WPC: 141, SPC: 190 },
  { date: "2024-06-26", WPC: 434, SPC: 380 },
  { date: "2024-06-27", WPC: 448, SPC: 490 },
  { date: "2024-06-28", WPC: 149, SPC: 200 },
  { date: "2024-06-29", WPC: 103, SPC: 160 },
  { date: "2024-06-30", WPC: 446, SPC: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  WPC: {
    label: "WPC",
    color: "hsl(var(--chart-1))",
  },
  SPC: {
    label: "SPC",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function SPCandWPCComparison({ startDate, endDate }: { startDate?: string; endDate?: string }) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>SPC vs WPC Sales</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>

        <div className="absolute right-4 top-4">

          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillWPC" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-WPC)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-WPC)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSPC" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="SPC"
              type="natural"
              fill="url(#fillSPC)"
              stroke="var(--color-SPC)"
              stackId="a"
            />
            <Area
              dataKey="WPC"
              type="natural"
              fill="url(#fillWPC)"
              stroke="var(--color-WPC)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
