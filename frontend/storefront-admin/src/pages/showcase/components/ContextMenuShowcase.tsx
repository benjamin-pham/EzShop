import * as React from "react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  ClipboardPasteIcon,
  CopyIcon,
  PencilIcon,
  ScissorsIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react"

export default function ContextMenuShowcase() {
  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <ContextMenuBasic />
        </div>
      </section>

      {/* Submenu */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Submenu</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <ContextMenuSubmenu />
        </div>
      </section>

      {/* Shortcuts */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Shortcuts</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <ContextMenuShortcuts />
        </div>
      </section>

      {/* Groups */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Groups</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <ContextMenuGroups />
        </div>
      </section>

      {/* Icons */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Icons</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <ContextMenuIcons />
        </div>
      </section>

      {/* Checkboxes */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Checkboxes</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <ContextMenuCheckboxes />
        </div>
      </section>

      {/* Radio */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Radio</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <ContextMenuRadio />
        </div>
      </section>

      {/* Destructive */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Destructive</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <ContextMenuDestructive />
        </div>
      </section>

      {/* Sides */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Sides</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <ContextMenuSides />
        </div>
      </section>
    </div>
  )
}

function ContextMenuBasic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem disabled>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuSubmenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuGroup>
              <ContextMenuItem>Save Page...</ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuShortcuts() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Save As...
            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuGroups() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>File</ContextMenuLabel>
          <ContextMenuItem>
            New File
            <ContextMenuShortcut>⌘N</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Open File
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Edit</ContextMenuLabel>
          <ContextMenuItem>
            Undo
            <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Redo
            <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            Delete
            <ContextMenuShortcut>⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuIcons() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <CopyIcon />
            Copy
          </ContextMenuItem>
          <ContextMenuItem>
            <ScissorsIcon />
            Cut
          </ContextMenuItem>
          <ContextMenuItem>
            <ClipboardPasteIcon />
            Paste
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <TrashIcon />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuCheckboxes() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuCheckboxItem defaultChecked>
            Show Bookmarks Bar
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem defaultChecked>
            Show Developer Tools
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuRadio() {
  const [user, setUser] = React.useState("pedro")
  const [theme, setTheme] = React.useState("light")

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuRadioGroup value={user} onValueChange={setUser}>
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
            <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
            <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
            <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuDestructive() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          Right click here
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Long press here
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <PencilIcon />
            Edit
          </ContextMenuItem>
          <ContextMenuItem>
            <ShareIcon />
            Share
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <TrashIcon />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function ContextMenuSides() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
          <span className="hidden pointer-fine:inline-block">
            Right click (top)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            Long press (top)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="top">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
          <span className="hidden pointer-fine:inline-block">
            Right click (right)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            Long press (right)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="right">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
          <span className="hidden pointer-fine:inline-block">
            Right click (bottom)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            Long press (bottom)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="bottom">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
          <span className="hidden pointer-fine:inline-block">
            Right click (left)
          </span>
          <span className="hidden pointer-coarse:inline-block">
            Long press (left)
          </span>
        </ContextMenuTrigger>
        <ContextMenuContent side="left">
          <ContextMenuGroup>
            <ContextMenuItem>Back</ContextMenuItem>
            <ContextMenuItem>Forward</ContextMenuItem>
            <ContextMenuItem>Reload</ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
