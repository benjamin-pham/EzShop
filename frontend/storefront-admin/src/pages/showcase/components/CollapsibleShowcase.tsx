import * as React from "react";
import { ChevronsUpDown, ChevronDown, MaximizeIcon, MinimizeIcon, ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] };

const fileTreeData: FileTreeItem[] = [
  {
    name: "components",
    items: [
      {
        name: "ui",
        items: [
          { name: "button.tsx" },
          { name: "card.tsx" },
          { name: "dialog.tsx" },
          { name: "input.tsx" },
          { name: "select.tsx" },
          { name: "table.tsx" },
        ],
      },
      { name: "login-form.tsx" },
      { name: "register-form.tsx" },
    ],
  },
  {
    name: "lib",
    items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }],
  },
  {
    name: "hooks",
    items: [
      { name: "use-media-query.ts" },
      { name: "use-debounce.ts" },
      { name: "use-local-storage.ts" },
    ],
  },
  {
    name: "types",
    items: [{ name: "index.d.ts" }, { name: "api.d.ts" }],
  },
  {
    name: "public",
    items: [
      { name: "favicon.ico" },
      { name: "logo.svg" },
      { name: "images" },
    ],
  },
  { name: "app.tsx" },
  { name: "layout.tsx" },
  { name: "globals.css" },
  { name: "package.json" },
  { name: "tsconfig.json" },
  { name: "README.md" },
  { name: ".gitignore" },
];

function FileTreeExample() {
  const renderItem = (fileItem: FileTreeItem) => {
    if ("items" in fileItem) {
      return (
        <Collapsible key={fileItem.name}>
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
              >
                <ChevronRightIcon className="transition-transform group-data-panel-open/button:rotate-90 group-data-[state=open]:rotate-90" />
                <FolderIcon />
                {fileItem.name}
              </Button>
            }
          />
          <CollapsibleContent className="mt-1 ml-5">
            <div className="flex flex-col gap-1">
              {fileItem.items.map((child) => renderItem(child))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    }
    return (
      <Button
        key={fileItem.name}
        variant="link"
        size="sm"
        className="w-full justify-start gap-2 text-foreground"
      >
        <FileIcon />
        <span>{fileItem.name}</span>
      </Button>
    );
  };

  return (
    <Card className="mx-auto w-full max-w-[16rem] gap-2">
      <CardHeader>
        <Tabs defaultValue="explorer">
          <TabsList className="w-full">
            <TabsTrigger value="explorer">Explorer</TabsTrigger>
            <TabsTrigger value="settings">Outline</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          {fileTreeData.map((item) => renderItem(item))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function CollapsibleShowcase() {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isDemoOpen, setIsDemoOpen] = React.useState(false);

  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A basic collapsible component showing some information.
        </p>
        <div className="max-w-[400px]">
          <Card className="mx-auto w-full max-w-sm">
            <CardContent className="pt-6">
              <Collapsible className="rounded-md data-open:bg-muted">
                <CollapsibleTrigger
                  render={
                    <Button variant="ghost" className="w-full">
                      Product details
                      <ChevronDown className="ml-auto transition-transform duration-200 group-data-panel-open/button:rotate-180" />
                    </Button>
                  }
                />
                <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                  <div>
                    This panel can be expanded or collapsed to reveal additional
                    content.
                  </div>
                  <Button size="sm">Learn More</Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Default Open */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Default Open</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A collapsible component that is open by default using <code>defaultOpen</code>.
        </p>
        <div className="max-w-[400px]">
          <Collapsible
            defaultOpen
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">
                Favorite Programming Languages
              </h4>
              <CollapsibleTrigger
                render={
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                }
              />
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              TypeScript
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                Go
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                C#
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                Rust
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
      {/* Settings Panel */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Settings Panel</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A collapsible panel used for settings.
        </p>
        <div className="max-w-[400px]">
          <Card className="mx-auto w-full max-w-xs">
            <CardHeader>
              <CardTitle>Radius</CardTitle>
              <CardDescription>Set the corner radius of the element.</CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible
                open={isSettingsOpen}
                onOpenChange={setIsSettingsOpen}
                className="flex items-start gap-2"
              >
                <FieldGroup className="grid w-full grid-cols-2 gap-2">
                  <Field>
                    <FieldLabel htmlFor="radius-x" className="sr-only">
                      Radius X
                    </FieldLabel>
                    <Input id="radius-x" placeholder="0" defaultValue={0} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="radius-y" className="sr-only">
                      Radius Y
                    </FieldLabel>
                    <Input id="radius-y" placeholder="0" defaultValue={0} />
                  </Field>
                  <CollapsibleContent className="col-span-full grid grid-cols-subgrid gap-2">
                    <Field>
                      <FieldLabel htmlFor="radius-top" className="sr-only">
                        Radius Top
                      </FieldLabel>
                      <Input id="radius-top" placeholder="0" defaultValue={0} />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="radius-bottom" className="sr-only">
                        Radius Bottom
                      </FieldLabel>
                      <Input id="radius-bottom" placeholder="0" defaultValue={0} />
                    </Field>
                  </CollapsibleContent>
                </FieldGroup>
                <CollapsibleTrigger
                  render={
                    <Button variant="outline" size="icon">
                      {isSettingsOpen ? <MinimizeIcon /> : <MaximizeIcon />}
                    </Button>
                  }
                />
              </Collapsible>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* File Tree */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">File Tree</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A recursive file tree using the collapsible component.
        </p>
        <FileTreeExample />
      </section>

      {/* Order Details Demo */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Order Details</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A collapsible component used to show order details.
        </p>
        <div className="max-w-[400px]">
          <Collapsible
            open={isDemoOpen}
            onOpenChange={setIsDemoOpen}
            className="flex w-[350px] flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-4 px-4">
              <h4 className="text-sm font-semibold">Order #4189</h4>
              <CollapsibleTrigger
                render={
                  <Button variant="ghost" size="icon" className="size-8">
                    <ChevronsUpDown />
                    <span className="sr-only">Toggle details</span>
                  </Button>
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium">Shipped</span>
            </div>
            <CollapsibleContent className="flex flex-col gap-2">
              <div className="rounded-md border px-4 py-2 text-sm">
                <p className="font-medium">Shipping address</p>
                <p className="text-muted-foreground">100 Market St, San Francisco</p>
              </div>
              <div className="rounded-md border px-4 py-2 text-sm">
                <p className="font-medium">Items</p>
                <p className="text-muted-foreground">2x Studio Headphones</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
    </div>
  );
}
