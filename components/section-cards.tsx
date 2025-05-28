import { icons, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  title: string;
  value: string | number;
  percentage: string;
  trend: string;
  footerLine1: string;
  footerLine2: string;
}

export function CardData({title, value, percentage, trend, footerLine1, footerLine2}: Props) {
  const Icon = trend === "up" ? TrendingUpIcon : TrendingDownIcon
  
  return (
    
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {value}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              {percentage}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {footerLine1} <Icon />
          </div>
          <div className="text-muted-foreground">
            {footerLine2}
          </div>
        </CardFooter>
      </Card>
  )
}
