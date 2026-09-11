import * as React from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Loader2,
  Mail,
  ChevronRight,
  Send,
  Plus,
  Trash2,
  ArchiveIcon,
  ArrowLeftIcon,
  CalendarPlusIcon,
  ClockIcon,
  ListFilterIcon,
  MailCheckIcon,
  MoreHorizontalIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react";

export default function ButtonShowcase() {
  return (
    <div className="space-y-10">
      {/* Variants */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Variants</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Sizes</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Icon Sizes */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Icon Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="icon-xs" variant="outline">
            <Plus />
          </Button>
          <Button size="icon-sm" variant="outline">
            <Plus />
          </Button>
          <Button size="icon" variant="outline">
            <Plus />
          </Button>
          <Button size="icon-lg" variant="outline">
            <Plus />
          </Button>
        </div>
      </section>

      {/* With Icon */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Icon</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button data-icon="inline-start">
            <Mail />
            Login with Email
          </Button>
          <Button variant="secondary" data-icon="inline-end">
            Next
            <ChevronRight />
          </Button>
          <Button variant="outline" data-icon="inline-start">
            <Send />
            Send Message
          </Button>
          <Button variant="destructive" data-icon="inline-start">
            <Trash2 />
            Delete
          </Button>
        </div>
      </section>

      {/* Loading State */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Loading State</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button disabled data-icon="inline-start">
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
          <Button variant="secondary" disabled data-icon="inline-start">
            <Loader2 className="animate-spin" />
            Processing...
          </Button>
        </div>
      </section>

      {/* Render As Link */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Rendered as Link</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button render={<a href="#" />} variant="link">
            Link Button
          </Button>
          <Button render={<a href="#" />} variant="default">
            Primary Link
          </Button>
          <Button render={<a href="#" />} variant="outline">
            Outline Link
          </Button>
        </div>
      </section>

      {/* States */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">States</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button>Active</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Button Group */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Button Group</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGroupDemo />
        </div>
      </section>
    </div>
  );
}

function ButtonGroupDemo() {
  const [label, setLabel] = React.useState("personal");

  return (
    <ButtonGroup>
      <ButtonGroup className="hidden sm:flex">
        <Button variant="outline" size="icon" aria-label="Go Back">
          <ArrowLeftIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Snooze</Button>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="More Options"><MoreHorizontalIcon /></Button>} />
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <MailCheckIcon />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArchiveIcon />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ClockIcon />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CalendarPlusIcon />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ListFilterIcon />
                Add to List
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <TagIcon />
                  Label As...
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={label}
                    onValueChange={setLabel}
                  >
                    <DropdownMenuRadioItem value="personal">
                      Personal
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="work">
                      Work
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="other">
                      Other
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  );
}
