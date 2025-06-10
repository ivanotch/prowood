"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

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
  ChartStyle,
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

export function SalesByCategory() {
  const id = "pie-interactive"

  const colorPalette = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
]

  const [salesData, setSalesData] = React.useState<
    { category: string; Sales: number; fill: string }[]
  >([])

  const [activeCategory, setActiveCategory] = React.useState<string | undefined>(undefined)

 React.useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("/api/admin/salesByCategory")
    const json = await res.json()

    const chartData = json.chartData.map((item: any, index: number) => ({
      ...item,
      fill: colorPalette[index % colorPalette.length],
    }))

    setSalesData(chartData)

    if (chartData.length > 0) {
      setActiveCategory(chartData[0].category)
    }
  }

  fetchData()
}, [])
  const activeIndex = React.useMemo(
    () => salesData.findIndex((item) => item.category === activeCategory),
    [salesData, activeCategory]
  )

  const chartConfig: ChartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    salesData.forEach((item) => {
      config[item.category] = {
        label: item.category,
        color: item.fill,
      }
    })
    return config
  }, [salesData])

  return (
    <Card data-chart={id} className="flex flex-col sm:w-[50%] mt-[1rem] sm:mt-[0rem]">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Sales By Category</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="ml-auto h-7 w-[180px] rounded-lg pl-2.5"
            aria-label="Select category"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {salesData.map((item) => (
              <SelectItem
                key={item.category}
                value={item.category}
                className="rounded-lg [&_span]:flex"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-xs"
                    style={{ backgroundColor: item.fill }}
                  />
                  {item.category}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={salesData}
              dataKey="Sales"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox && activeIndex >= 0) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {salesData[activeIndex].Sales.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Sales
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
