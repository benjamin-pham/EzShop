import * as React from "react";
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger, PopoverHeader, PopoverTitle, PopoverDescription } from "@/components/ui/popover";
import { ChevronDown, CheckIcon, InfoIcon } from "lucide-react";

const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`

const previewLength = 180

function BubbleCollapsible() {
  const [open, setOpen] = React.useState(false)
  const isLong = text.length > previewLength
  const preview = `${text.slice(0, previewLength)}...`

  return (
    <div className="flex w-full max-w-sm flex-col gap-8">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>

      <Bubble variant="muted" align="end">
        <BubbleContent className="whitespace-pre-line">
          <Collapsible open={open} onOpenChange={setOpen}>
            <div>{open || !isLong ? text : preview}</div>
            {isLong ? (
              <CollapsibleTrigger render={<Button variant="link" className="gap-1 p-0 text-muted-foreground">{open ? "Show less" : "Show more"}<ChevronDown
                  data-icon="inline-end"
                  className="group-data-panel-open/button:rotate-180 size-4"
                /></Button>} />
            ) : null}
          </Collapsible>
        </BubbleContent>
      </Bubble>
    </div>
  )
}

function BubbleReactionsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-12 pt-4">
      <Bubble variant="muted" align="end">
        <BubbleContent>
          I don&apos;t need tests, I know my code works.
        </BubbleContent>
        <BubbleReactions
          align="start"
          role="img"
          aria-label="Reactions: thumbs up, surprised"
        >
          <span>👍</span>
          <span>😮</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>
          Bold. Fine I&apos;ll add some tests. I&apos;ll let you know when
          they&apos;re done.
        </BubbleContent>
        <BubbleReactions
          role="img"
          aria-label="Reactions: eyes, rocket, and 2 more"
        >
          <span>👀</span>
          <span>🚀</span>
          <span>+2</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="default" align="end">
        <BubbleContent>
          Tests passed on the first try. All 142 of them. Looking good!
        </BubbleContent>
        <BubbleReactions
          side="top"
          align="start"
          role="img"
          aria-label="Reactions: party popper, clapping hands"
        >
          <span>🎉</span>
          <span>👏</span>
        </BubbleReactions>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Are you sure I can run this command?</BubbleContent>
        <BubbleReactions>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => alert("You clicked yes, running command...")}
          >
            Yes, run it
          </Button>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}

function BubbleTooltipDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 pt-4">
      <Bubble variant="secondary">
        <BubbleContent>Did you remove the stale route?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Yes, removed it from the registry.</BubbleContent>
        <BubbleReactions>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" size="icon-xs"><CheckIcon /></Button>} />
            <TooltipContent>Read on Jan 5, 2026 at 4:32 PM</TooltipContent>
          </Tooltip>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}

function BubblePopoverDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 py-12">
      <Bubble align="end">
        <BubbleContent>Run the build script.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Failed to run the command.</BubbleContent>
        <BubbleReactions>
          <Popover>
            <PopoverTrigger render={<Button variant="ghost" size="icon-xs" aria-label="Show error details" className="aria-expanded:text-destructive"><InfoIcon /></Button>} />
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle className="text-sm">
                  Command failed with exit code 1
                </PopoverTitle>
                <PopoverDescription className="text-sm">
                  ENOENT: no such file or directory, open pnpm-lock.yaml
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}

export default function BubbleShowcase() {
  return (
    <div className="space-y-10">
      {/* Variants */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Variants</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <Bubble variant="default">
            <BubbleContent>This is a default bubble.</BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>This is a secondary bubble.</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>This is a muted bubble.</BubbleContent>
          </Bubble>
          <Bubble variant="tinted">
            <BubbleContent>This is a tinted bubble.</BubbleContent>
          </Bubble>
          <Bubble variant="outline">
            <BubbleContent>This is an outline bubble.</BubbleContent>
          </Bubble>
          <Bubble variant="ghost">
            <BubbleContent>This is a ghost bubble.</BubbleContent>
          </Bubble>
          <Bubble variant="destructive">
            <BubbleContent>This is a destructive bubble.</BubbleContent>
          </Bubble>
        </div>
      </section>

      {/* Alignment */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Alignment</h2>
        <div className="flex flex-col gap-4 max-w-md bg-muted/20 p-4 rounded-lg border">
          <Bubble align="start" variant="secondary">
            <BubbleContent>Hello! How can I help you today?</BubbleContent>
          </Bubble>
          <Bubble align="end" variant="default">
            <BubbleContent>I need help with my account settings.</BubbleContent>
          </Bubble>
        </div>
      </section>

      {/* Bubble Group */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Bubble Group</h2>
        <div className="flex flex-col gap-6 max-w-md bg-muted/20 p-4 rounded-lg border">
          <div className="flex gap-2">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <BubbleGroup>
              <Bubble align="start" variant="secondary">
                <BubbleContent>Are you sure about the meeting time?</BubbleContent>
              </Bubble>
              <Bubble align="start" variant="secondary">
                <BubbleContent>We can do tomorrow if you prefer.</BubbleContent>
              </Bubble>
            </BubbleGroup>
          </div>
          <div className="flex gap-2 flex-row-reverse">
            <Avatar className="size-8">
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <BubbleGroup>
              <Bubble align="end">
                <BubbleContent>Tomorrow works better for me.</BubbleContent>
              </Bubble>
              <Bubble align="end">
                <BubbleContent>Let's say 10 AM?</BubbleContent>
              </Bubble>
            </BubbleGroup>
          </div>
        </div>
      </section>

      {/* With Reactions */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Reactions</h2>
        <BubbleReactionsDemo />
      </section>

      {/* Links and Buttons */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Links and Buttons</h2>
        <div className="flex flex-col gap-4 max-w-md bg-muted/20 p-4 rounded-lg border">
          <Bubble variant="default" align="start">
            <BubbleContent render={<button />}>
              This is a button bubble. Click me!
            </BubbleContent>
          </Bubble>
          <Bubble variant="secondary" align="end">
            <BubbleContent render={<a href="#" />}>
              This is a link bubble. Read more &rarr;
            </BubbleContent>
          </Bubble>
        </div>
      </section>

      {/* Show More / Collapsible */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Show More / Collapsible</h2>
        <div className="flex flex-col gap-4 max-w-md bg-muted/20 p-4 rounded-lg border">
          <BubbleCollapsible />
        </div>
      </section>

      {/* Tooltip & Popover */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Tooltip & Popover</h2>
        <div className="flex flex-col gap-8 bg-muted/20 p-4 rounded-lg border max-w-md">
          <div className="space-y-2 border-b pb-8">
            <h3 className="font-medium text-sm text-muted-foreground">Tooltip Integration</h3>
            <BubbleTooltipDemo />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">Popover Integration</h3>
            <BubblePopoverDemo />
          </div>
        </div>
      </section>
    </div>
  );
}
