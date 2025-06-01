// components/SectionCards.tsx
import { CardData } from "@/components/section-cards"

const cardProp = [
  {
    title: "Number Of Orders",
    value: "$1,250.00",
    percentage: "12.5%",
    trend: "up",
    footerLine1: "Trending up this month",
    footerLine2: "Visitors for the last 6 months",
  },
  {
    title: "Unprocessed Orders",
    value: "1,234",
    percentage: "20%",
    trend: "down",
    footerLine1: "Down 20% this period",
    footerLine2: "Acquisition needs attention",
  },
  {
    title: "Processing Orders",
    value: "45,678",
    percentage: "12.5%",
    trend: "up",
    footerLine1: "Strong user retention",
    footerLine2: "Engagement exceed targets",
  },
  {
    title: "Total Sales",
    value: "4.5%",
    percentage: "4.5%",
    trend: "up",
    footerLine1: "Steady performance",
    footerLine2: "Meets growth projections",
  },
]

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {cardProp.map((card, index) => (
        <CardData key={index} {...card} />
      ))}
    </div>
  )
}
