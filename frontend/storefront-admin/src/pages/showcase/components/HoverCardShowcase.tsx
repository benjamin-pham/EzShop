import * as React from "react"
import { CalendarIcon } from "lucide-react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HoverCardShowcase() {
  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <div className="max-w-[600px] p-12 border rounded-lg flex flex-col items-center justify-center bg-muted/20 gap-8">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">
                    The React Framework - created and maintained by @vercel.
                  </p>
                  <div className="flex items-center pt-2 text-xs text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </section>

      {/* With Text */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Text</h2>
        <div className="max-w-[600px] p-12 border rounded-lg flex flex-col items-center justify-center bg-muted/20 gap-8">
          <HoverCard>
            <HoverCardTrigger asChild>
              <span className="cursor-pointer underline decoration-dotted underline-offset-4 font-medium">Hover me</span>
            </HoverCardTrigger>
            <HoverCardContent>
              A hover card provides contextual information about an element when the user hovers over it.
            </HoverCardContent>
          </HoverCard>
        </div>
      </section>

      {/* Sides */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Sides</h2>
        <div className="max-w-[600px] p-12 border rounded-lg flex flex-col items-center justify-center bg-muted/20 gap-8">
          <HoverCardSides />
        </div>
      </section>
    </div>
  )
}

const HOVER_CARD_SIDES = ["left", "top", "bottom", "right"] as const

export function HoverCardSides() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {HOVER_CARD_SIDES.map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger delay={100} closeDelay={100} render={<Button variant="outline" className="capitalize">{side}</Button>} />
          <HoverCardContent side={side}>
            <div className="flex flex-col gap-1">
              <h4 className="font-medium">Hover Card</h4>
              <p>This hover card appears on the {side} side of the trigger.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}
