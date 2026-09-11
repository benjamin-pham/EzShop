import * as React from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyIcon } from "lucide-react"

export default function DialogShowcase() {
  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DialogBasic />
        </div>
      </section>

      {/* Custom Close Button */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Custom Close Button</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DialogCustomClose />
        </div>
      </section>

      {/* No Close Button */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">No Close Button</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DialogNoClose />
        </div>
      </section>

      {/* Sticky Footer */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Sticky Footer</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DialogStickyFooter />
        </div>
      </section>

      {/* Scrollable Content */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Scrollable Content</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <DialogScrollable />
        </div>
      </section>
    </div>
  )
}

function DialogBasic() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Edit Profile</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button type="submit" />}>Save changes</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DialogCustomClose() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Share link</DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="icon" className="px-3 shrink-0">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose render={<Button type="button" variant="secondary" />}>
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DialogNoClose() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>No Close Button</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Cannot escape!</DialogTitle>
          <DialogDescription>
            This dialog does not have a close button in the corner.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm text-muted-foreground">
          You must click the cancel button below to close this dialog.
        </div>
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DialogStickyFooter() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Sticky Footer</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            This dialog has a sticky footer that stays visible while the content
            scrolls.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DialogScrollable() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Scrollable Content</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>
            This is a dialog with scrollable content.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

