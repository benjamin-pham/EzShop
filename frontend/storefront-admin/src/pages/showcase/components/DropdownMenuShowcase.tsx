import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  FolderSearchIcon,
  HelpCircleIcon,
  KeyboardIcon,
  LanguagesIcon,
  LayoutIcon,
  LogOutIcon,
  MailIcon,
  MonitorIcon,
  MoonIcon,
  MoreHorizontalIcon,
  PaletteIcon,
  SaveIcon,
  SettingsIcon,
  ShieldIcon,
  SunIcon,
  UserIcon,
} from "lucide-react"

export default function DropdownMenuShowcase() {
  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DropdownMenuBasic />
        </div>
      </section>

      {/* Checkboxes */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Checkboxes</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DropdownMenuCheckboxes />
        </div>
      </section>

      {/* Radio Group */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Radio Group</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DropdownMenuRadioGroupDemo />
        </div>
      </section>

      {/* Avatar Profile */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Avatar Profile</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DropdownMenuAvatar />
        </div>
      </section>

      {/* Complex Menu */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Complex Menu</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DropdownMenuComplex />
        </div>
      </section>
    </div>
  )
}

function DropdownMenuBasic() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Open</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Appearance</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>Panel Position</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DropdownMenuAvatar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DropdownMenuComplex() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  })
  const [theme, setTheme] = React.useState("light")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Complex Menu</Button>} />
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>File</DropdownMenuLabel>
          <DropdownMenuItem>
            <FileIcon />
            New File
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FolderIcon />
            New Folder
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderOpenIcon />
              Open Recent
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <FileCodeIcon />
                    Project Alpha
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileCodeIcon />
                    Project Beta
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <MoreHorizontalIcon />
                      More Projects
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <FileCodeIcon />
                          Project Gamma
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileCodeIcon />
                          Project Delta
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <FolderSearchIcon />
                    Browse...
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SaveIcon />
            Save
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DownloadIcon />
            Export
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications.email}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, email: checked === true })
            }
          >
            <EyeIcon />
            Show Sidebar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.sms}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, sms: checked === true })
            }
          >
            <LayoutIcon />
            Show Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <PaletteIcon />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={setTheme}
                  >
                    <DropdownMenuRadioItem value="light">
                      <SunIcon />
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <MoonIcon />
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <MonitorIcon />
                      System
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SettingsIcon />
              Settings
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <KeyboardIcon />
                    Keyboard Shortcuts
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LanguagesIcon />
                    Language
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <BellIcon />
                      Notifications
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>
                            Notification Types
                          </DropdownMenuLabel>
                          <DropdownMenuCheckboxItem
                            checked={notifications.push}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                push: checked === true,
                              })
                            }
                          >
                            <BellIcon />
                            Push Notifications
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={notifications.email}
                            onCheckedChange={(checked) =>
                              setNotifications({
                                ...notifications,
                                email: checked === true,
                              })
                            }
                          >
                            <MailIcon />
                            Email Notifications
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <ShieldIcon />
                    Privacy & Security
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HelpCircleIcon />
            Help & Support
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileTextIcon />
            Documentation
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <LogOutIcon />
            Sign Out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

