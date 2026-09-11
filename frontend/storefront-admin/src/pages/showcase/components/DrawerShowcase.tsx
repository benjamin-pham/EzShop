import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function DrawerShowcase() {
  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DrawerBasic />
        </div>
      </section>

      {/* Swipe Handle */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Swipe Handle</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DrawerWithSwipeHandle />
        </div>
      </section>

      {/* Interactive */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Interactive</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DrawerInteractive />
        </div>
      </section>

      {/* Directions */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Directions</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-wrap gap-4 items-center justify-center bg-muted/20">
          <DrawerDirection swipeDirection="up" label="Top" />
          <DrawerDirection swipeDirection="right" label="Right" />
          <DrawerDirection swipeDirection="left" label="Left" />
        </div>
      </section>
    </div>
  )
}

function DrawerBasic() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="grid items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function DrawerWithSwipeHandle() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Open Drawer (with swipe handle)</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Drawer with Swipe Handle</DrawerTitle>
            <DrawerDescription>
              Notice the visual handle indicator at the top for swiping.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 h-40 flex items-center justify-center border-t border-b border-dashed my-4">
            <span className="text-muted-foreground">Drawer Content</span>
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function DrawerInteractive() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Open Interactive Drawer</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function DrawerDirection({ swipeDirection, label }: { swipeDirection: "up" | "down" | "left" | "right", label: string }) {
  return (
    <Drawer swipeDirection={swipeDirection} showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>{label}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{label} Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer opens and closes from the {label.toLowerCase()}.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex-1">
          <div className="h-full w-full border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground">
            Content
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

