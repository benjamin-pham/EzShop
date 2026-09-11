import * as React from "react"
import { SearchIcon, EyeOffIcon, CopyIcon, FileCodeIcon, CheckIcon, CreditCardIcon, InfoIcon, MailIcon, StarIcon, ChevronDownIcon, MoreHorizontal, LoaderIcon, CornerDownLeftIcon, RefreshCwIcon } from "lucide-react"
import TextareaAutosize from "react-textarea-autosize"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Kbd } from "@/components/ui/kbd"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"

export function InputGroupInlineStart() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-start-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput id="inline-start-input" placeholder="Search..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the start.</FieldDescription>
    </Field>
  )
}

export function InputGroupInlineEnd() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="inline-end-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="inline-end-input"
          type="password"
          placeholder="Enter password"
        />
        <InputGroupAddon align="inline-end">
          <EyeOffIcon />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the end.</FieldDescription>
    </Field>
  )
}

export function InputGroupBlockStart() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="block-start-input">Input</FieldLabel>
        <InputGroup className="h-auto">
          <InputGroupInput
            id="block-start-input"
            placeholder="Enter your name"
          />
          <InputGroupAddon align="block-start">
            <InputGroupText>Full Name</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Header positioned above the input.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="block-start-textarea">Textarea</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="block-start-textarea"
            placeholder="console.log('Hello, world!');"
            className="font-mono text-sm"
          />
          <InputGroupAddon align="block-start">
            <FileCodeIcon className="text-muted-foreground" />
            <InputGroupText className="font-mono">script.js</InputGroupText>
            <InputGroupButton size="icon-xs" className="ml-auto">
              <CopyIcon />
              <span className="sr-only">Copy</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          Header positioned above the textarea.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}

export function InputGroupBlockEnd() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="block-end-input">Input</FieldLabel>
        <InputGroup className="h-auto">
          <InputGroupInput id="block-end-input" placeholder="Enter amount" />
          <InputGroupAddon align="block-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Footer positioned below the input.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="block-end-textarea">Textarea</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="block-end-textarea"
            placeholder="Write a comment..."
          />
          <InputGroupAddon align="block-end">
            <InputGroupText>0/280</InputGroupText>
            <InputGroupButton variant="default" size="sm" className="ml-auto">
              Post
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          Footer positioned below the textarea.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}

export function InputGroupIcon() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput type="email" placeholder="Enter your email" />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon>
          <CreditCardIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <CheckIcon />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <StarIcon />
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupTextExample() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="pl-0.5!" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter your username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Enter your message" />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-xs text-muted-foreground">
            120 characters left
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupButtonExample() {
  const [isCopied, setIsCopied] = React.useState(false)
  const [isFavorite, setIsFavorite] = React.useState(false)

  const copyToClipboard = React.useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [])

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="https://x.com/shadcn" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            onClick={() => {
              copyToClipboard("https://x.com/shadcn")
            }}
          >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="[--radius:9999px]">
        <Popover>
          <PopoverTrigger render={<InputGroupAddon><InputGroupButton variant="secondary" size="icon-xs">
            <InfoIcon />
          </InputGroupButton></InputGroupAddon>} />
          <PopoverContent
            align="start"
            className="flex flex-col gap-1 rounded-xl text-sm"
          >
            <p className="font-medium">Your connection is not secure.</p>
            <p>You should not enter any sensitive information on this site.</p>
          </PopoverContent>
        </Popover>
        <InputGroupAddon className="pl-1.5 text-muted-foreground">
          https://
        </InputGroupAddon>
        <InputGroupInput id="input-secure-19" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={() => setIsFavorite(!isFavorite)}
            size="icon-xs"
          >
            <StarIcon
              data-favorite={isFavorite}
              className="data-[favorite=true]:fill-blue-600 data-[favorite=true]:stroke-blue-600"
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupKbd() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}

export function InputGroupDropdown() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Enter file name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger render={<InputGroupButton variant="ghost" aria-label="More" size="icon-xs"><MoreHorizontal /></InputGroupButton>} />
            <DropdownMenuContent align="end" sideOffset={8} alignOffset={-4}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Copy path</DropdownMenuItem>
                <DropdownMenuItem>Open location</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger render={<InputGroupButton variant="ghost" className="pr-1.5! text-xs">Search In... <ChevronDownIcon className="size-3" /></InputGroupButton>} />
            <DropdownMenuContent align="end" sideOffset={8} alignOffset={-4}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                <DropdownMenuItem>Changelog</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupSpinner() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Searching..." />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Processing..." />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Saving changes..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Refreshing data..." />
        <InputGroupAddon>
          <LoaderIcon className="animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-muted-foreground">
            Please wait...
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupTextareaExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
          className="min-h-[200px]"
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton size="sm" className="ml-auto" variant="default">
            Run <CornerDownLeftIcon />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-mono font-medium">
            <FileCodeIcon />
            script.js
          </InputGroupText>
          <InputGroupButton className="ml-auto" size="icon-xs">
            <RefreshCwIcon />
          </InputGroupButton>
          <InputGroupButton variant="ghost" size="icon-xs">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupCustom() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <TextareaAutosize
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Autoresize textarea..."
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton className="ml-auto" size="sm" variant="default">
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default function InputGroupShowcase() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Inline Start</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupInlineStart />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Inline End</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupInlineEnd />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Block Start</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupBlockStart />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Block End</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupBlockEnd />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Icon</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupIcon />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Text</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupTextExample />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Button</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupButtonExample />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Kbd</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupKbd />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Dropdown</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupDropdown />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Spinner</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupSpinner />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Textarea</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupTextareaExample />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Custom Input</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <InputGroupCustom />
        </div>
      </section>
    </div>
  )
}
