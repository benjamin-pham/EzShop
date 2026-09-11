import * as React from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
  Bell,
  Calculator,
  Calendar,
  ClipboardPaste,
  Code,
  Copy,
  CreditCard,
  FileText,
  Folder,
  FolderPlus,
  HelpCircle,
  Home,
  Image as ImageIcon,
  Inbox,
  LayoutGrid,
  List,
  Plus,
  Scissors,
  Settings,
  Smile,
  Trash,
  User,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

export default function CommandShowcase() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A basic command menu.
        </p>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Smile className="mr-2 h-4 w-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem disabled>
                  <Calculator className="mr-2 h-4 w-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </section>

      {/* Dialog */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Dialog</h2>
        <p className="text-sm text-muted-foreground mb-6">
          The command menu can be rendered in a dialog. Try pressing <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd> or click the button below.
        </p>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col items-center justify-center gap-4">
          <Button variant="outline" onClick={() => setOpen(true)}>
            Open Command Menu
          </Button>

          <CommandDialog open={open} onOpenChange={setOpen}>
            <Command>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <Smile className="mr-2 h-4 w-4" />
                    <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem>
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Calculator</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                    <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </CommandDialog>
        </div>
      </section>
      {/* Scrollable */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Scrollable</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A command menu with many items to demonstrate scrolling.
        </p>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <CommandManyItems />
        </div>
      </section>
    </div>
  )
}

function CommandManyItems() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setOpen(true)} variant="outline" className="w-fit">
        Open Menu
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem>
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Inbox className="mr-2 h-4 w-4" />
                <span>Inbox</span>
                <CommandShortcut>⌘I</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>Documents</span>
                <CommandShortcut>⌘D</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Folder className="mr-2 h-4 w-4" />
                <span>Folders</span>
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New File</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <FolderPlus className="mr-2 h-4 w-4" />
                <span>New Folder</span>
                <CommandShortcut>⇧⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy</span>
                <CommandShortcut>⌘C</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Scissors className="mr-2 h-4 w-4" />
                <span>Cut</span>
                <CommandShortcut>⌘X</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <ClipboardPaste className="mr-2 h-4 w-4" />
                <span>Paste</span>
                <CommandShortcut>⌘V</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
                <CommandShortcut>⌫</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="View">
              <CommandItem>
                <LayoutGrid className="mr-2 h-4 w-4" />
                <span>Grid View</span>
              </CommandItem>
              <CommandItem>
                <List className="mr-2 h-4 w-4" />
                <span>List View</span>
              </CommandItem>
              <CommandItem>
                <ZoomIn className="mr-2 h-4 w-4" />
                <span>Zoom In</span>
                <CommandShortcut>⌘+</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <ZoomOut className="mr-2 h-4 w-4" />
                <span>Zoom Out</span>
                <CommandShortcut>⌘-</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Account">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </CommandItem>
              <CommandItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Tools">
              <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </CommandItem>
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <ImageIcon className="mr-2 h-4 w-4" />
                <span>Image Editor</span>
              </CommandItem>
              <CommandItem>
                <Code className="mr-2 h-4 w-4" />
                <span>Code Editor</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}

