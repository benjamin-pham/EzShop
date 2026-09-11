import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Folder, Inbox, Search, Cloud, PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyShowcase() {
  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A basic empty state.
        </p>
        <div className="max-w-[600px]">
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No items found</EmptyTitle>
              <EmptyDescription>
                You don't have any items yet. Add one to get started.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </section>

      {/* With Icon */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Icon</h2>
        <p className="text-sm text-muted-foreground mb-6">
          An empty state with an icon.
        </p>
        <div className="max-w-[600px]">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Search />
              </EmptyMedia>
              <EmptyTitle>No results found</EmptyTitle>
              <EmptyDescription>
                We couldn't find anything matching your search.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </section>

      {/* With Action */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">With Action</h2>
        <p className="text-sm text-muted-foreground mb-6">
          An empty state with a call to action.
        </p>
        <div className="max-w-[600px]">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Folder />
              </EmptyMedia>
              <EmptyTitle>No files uploaded</EmptyTitle>
              <EmptyDescription>
                Upload documents to see them listed here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>Upload File</Button>
            </EmptyContent>
          </Empty>
        </div>
      </section>

      {/* Outline */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Outline</h2>
        <p className="text-sm text-muted-foreground mb-6">
          An empty state with a dashed border outline.
        </p>
        <div className="max-w-[600px]">
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Cloud />
              </EmptyMedia>
              <EmptyTitle>Cloud Storage Empty</EmptyTitle>
              <EmptyDescription>
                Upload files to your cloud storage to access them anywhere.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm">
                Upload Files
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      </section>

      {/* Avatar */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Avatar</h2>
        <p className="text-sm text-muted-foreground mb-6">
          An empty state using an avatar as media.
        </p>
        <div className="max-w-[600px]">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="default">
                <Avatar className="size-12">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="grayscale"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </EmptyMedia>
              <EmptyTitle>User Offline</EmptyTitle>
              <EmptyDescription>
                This user is currently offline. You can leave a message to notify them
                or try again later.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">Leave Message</Button>
            </EmptyContent>
          </Empty>
        </div>
      </section>

      {/* Avatar Group */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Avatar Group</h2>
        <p className="text-sm text-muted-foreground mb-6">
          An empty state using an avatar group as media.
        </p>
        <div className="max-w-[600px]">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="default">
                <div className="flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/maxleiter.png"
                      alt="@maxleiter"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/evilrabbit.png"
                      alt="@evilrabbit"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </div>
              </EmptyMedia>
              <EmptyTitle>No Team Members</EmptyTitle>
              <EmptyDescription>
                Invite your team to collaborate on this project.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">
                <PlusIcon className="w-4 h-4 mr-2" />
                Invite Members
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      </section>

      {/* Input Group */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Input Group</h2>
        <p className="text-sm text-muted-foreground mb-6">
          An empty state with a search input group.
        </p>
        <div className="max-w-[600px]">
          <Empty>
            <EmptyHeader>
              <EmptyTitle>404 - Not Found</EmptyTitle>
              <EmptyDescription>
                The page you&apos;re looking for doesn&apos;t exist. Try searching for
                what you need below.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <InputGroup className="sm:w-3/4">
                <InputGroupInput placeholder="Try searching for pages..." />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Kbd>/</Kbd>
                </InputGroupAddon>
              </InputGroup>
              <EmptyDescription>
                Need help? <a href="#">Contact support</a>
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        </div>
      </section>
    </div>
  );
}

