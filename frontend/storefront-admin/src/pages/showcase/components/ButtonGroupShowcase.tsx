import * as React from "react";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { ChevronDown, CloudDownload, Play, Save, Trash, PlusIcon, AudioLinesIcon, SearchIcon, AlertTriangleIcon, CheckIcon, ChevronDownIcon, CopyIcon, ShareIcon, TrashIcon, UserRoundXIcon, VolumeOffIcon, ArrowRightIcon, BotIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,

  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

export function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." />
          <Tooltip>
            <TooltipTrigger render={<InputGroupAddon align="inline-end"><AudioLinesIcon /></InputGroupAddon>} />
            <TooltipContent>Voice Mode</TooltipContent>
          </Tooltip>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}

export function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = React.useState(false);

  return (
    <ButtonGroup className="[--radius:9999rem]">
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput
            placeholder={
              voiceEnabled ? "Record and send audio..." : "Send a message..."
            }
            disabled={voiceEnabled}
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger render={<InputGroupButton onClick={() => setVoiceEnabled(!voiceEnabled)} size="icon-xs" data-active={voiceEnabled} className="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100" aria-pressed={voiceEnabled}><AudioLinesIcon /></InputGroupButton>} />
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  );
}

const CURRENCIES = [
  { label: "US Dollar", value: "$" },
  { label: "Euro", value: "€" },
  { label: "British Pound", value: "£" },
]

export function ButtonGroupSelect() {
  const [currency, setCurrency] = React.useState("$")

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select
          value={currency}
          onValueChange={(value) => setCurrency(value as string)}
        >
          <SelectTrigger className="font-mono">{currency}</SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {CURRENCIES.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.value}{" "}
                  <span className="text-muted-foreground">{item.label}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="10.00" pattern="[0-9]*" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}

export function ButtonGroupDropdown() {
  return (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" className="pl-2!"><ChevronDownIcon /></Button>} />
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <VolumeOffIcon />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CheckIcon />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertTriangleIcon />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserRoundXIcon />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShareIcon />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <TrashIcon />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

export function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <BotIcon /> Copilot
      </Button>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="icon" aria-label="Open Popover"><ChevronDownIcon /></Button>} />
        <PopoverContent align="end" className="rounded-xl text-sm">
          <PopoverHeader>
            <PopoverTitle>Start a new task with Copilot</PopoverTitle>
            <PopoverDescription>
              Describe your task in natural language.
            </PopoverDescription>
          </PopoverHeader>
          <Field>
            <FieldLabel htmlFor="task" className="sr-only">
              Task Description
            </FieldLabel>
            <Textarea
              id="task"
              placeholder="I need to..."
              className="resize-none"
            />
            <FieldDescription>
              Copilot will open a pull request for review.
            </FieldDescription>
          </Field>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}

export function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="secondary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  )
}

export function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  )
}

export default function ButtonGroupShowcase() {
  return (
    <div className="space-y-10">
      {/* Default Horizontal */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Horizontal (Default)</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroup>
            <Button variant="secondary">Month</Button>
            <Button variant="secondary">Week</Button>
            <Button variant="secondary">Day</Button>
          </ButtonGroup>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Sizes</h2>
        <div className="flex flex-col items-start gap-8">
          <ButtonGroup>
            <Button variant="outline" size="sm">
              Small
            </Button>
            <Button variant="outline" size="sm">
              Button
            </Button>
            <Button variant="outline" size="sm">
              Group
            </Button>
            <Button variant="outline" size="icon-sm">
              <PlusIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Default</Button>
            <Button variant="outline">Button</Button>
            <Button variant="outline">Group</Button>
            <Button variant="outline" size="icon">
              <PlusIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="lg">
              Large
            </Button>
            <Button variant="outline" size="lg">
              Button
            </Button>
            <Button variant="outline" size="lg">
              Group
            </Button>
            <Button variant="outline" size="icon-lg">
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </div>
      </section>

      {/* Vertical */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Vertical</h2>
        <div className="flex flex-wrap gap-4 items-start">
          <ButtonGroup orientation="vertical">
            <Button variant="outline" className="justify-start">Profile</Button>
            <Button variant="outline" className="justify-start">Settings</Button>
            <Button variant="outline" className="justify-start">Billing</Button>
          </ButtonGroup>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Icons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Play">
              <Play />
            </Button>
            <Button variant="outline" size="icon" aria-label="Save">
              <Save />
            </Button>
            <Button variant="outline" size="icon" aria-label="Delete">
              <Trash />
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button variant="secondary" data-icon="inline-start">
              <CloudDownload /> Download
            </Button>
            <Button variant="secondary" size="icon" aria-label="More options">
              <ChevronDown />
            </Button>
          </ButtonGroup>
        </div>
      </section>

      {/* Separator */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Separator</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroupSeparatorDemo />
        </div>
      </section>

      {/* Split */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Split</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroupSplit />
        </div>
      </section>


      {/* Split Button (Dropdown) */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Split Button (Dropdown)</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroupDropdown />
        </div>
      </section>
      {/* With Popover */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Popover</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroupPopover />
        </div>
      </section>

      {/* With Select */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Select</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroupSelect />
        </div>
      </section>

      {/* Nested */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Nested</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroupNested />
        </div>
      </section>

      {/* Input Group */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Input Group</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroupInputGroup />
        </div>
      </section>

      {/* With Input */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Input</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroup>
            <Input placeholder="Search..." />
            <Button variant="outline" aria-label="Search">
              <SearchIcon />
            </Button>
          </ButtonGroup>
        </div>
      </section>
    </div>
  );
}
