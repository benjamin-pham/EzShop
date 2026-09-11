import * as React from "react";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxTrigger,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxValue,
  ComboboxCollection,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const statuses = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "Todo" },
  { value: "in progress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "canceled", label: "Canceled" },
];

export default function ComboboxShowcase() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | null>(null);

  const [statusOpen, setStatusOpen] = React.useState(false);
  const [statusValue, setStatusValue] = React.useState<string | null>(null);

  return (
    <div className="space-y-12">
      {/* Basic Combobox */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic Combobox</h2>
        <p className="text-sm text-muted-foreground mb-6">
          The basic Combobox based on Shadcn UI and Base UI.
        </p>
        <div className="flex items-center gap-4 max-w-sm">
          <Combobox
            open={open}
            onOpenChange={setOpen}
            value={value}
            onValueChange={(val) => setValue(val as string)}
          >
            <ComboboxInput placeholder="Select framework..." />
            <ComboboxContent>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
              <ComboboxList>
                {frameworks.map((framework) => (
                  <ComboboxItem key={framework.value} value={framework.value}>
                    {framework.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </section>

      {/* Popover like Combobox */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Combobox as Popover</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Combobox used similarly to a popover trigger.
        </p>
        <div className="flex items-center gap-4 max-w-sm">
          <Combobox
            open={statusOpen}
            onOpenChange={setStatusOpen}
            value={statusValue}
            onValueChange={(val) => setStatusValue(val as string)}
          >
            <ComboboxTrigger
              className="flex h-9 w-[200px] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              {statusValue
                ? statuses.find((status) => status.value === statusValue)?.label
                : "Set status..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </ComboboxTrigger>
            <ComboboxContent>
              <ComboboxEmpty>No results found.</ComboboxEmpty>
              <ComboboxList>
                {statuses.map((status) => (
                  <ComboboxItem key={status.value} value={status.value}>
                    {status.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </section>

      {/* Invalid Combobox */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Invalid State</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A combobox in an invalid state using aria-invalid.
        </p>
        <div className="flex items-center gap-4 max-w-sm">
          <ComboboxInvalid />
        </div>
      </section>

      {/* Disabled Combobox */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Disabled State</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A combobox that is disabled and cannot be interacted with.
        </p>
        <div className="flex items-center gap-4 max-w-sm">
          <ComboboxDisabled />
        </div>
      </section>
      {/* Clear Button */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Combobox with Clear Button</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A combobox that can be cleared by the user.
        </p>
        <div className="flex items-center gap-4 max-w-sm">
          <ComboboxWithClear />
        </div>
      </section>

      {/* Multiple Combobox */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Multi-Select Combobox</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A combobox that allows selecting multiple values.
        </p>
        <ComboboxMultiple />
      </section>
      {/* Groups and Separator Combobox */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Combobox with Groups</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A combobox with grouped items and separators.
        </p>
        <div className="max-w-sm">
          <ComboboxWithGroupsAndSeparator />
        </div>
      </section>

      {/* Custom Items */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Combobox with Custom Items</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A combobox that renders complex items using the Item component.
        </p>
        <div className="flex items-center gap-4 max-w-sm">
          <ComboboxWithCustomItems />
        </div>
      </section>

      {/* Popup Combobox */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Combobox Popup</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A combobox that renders like a popup with a trigger button.
        </p>
        <div className="flex items-center gap-4 max-w-sm">
          <ComboboxPopup />
        </div>
      </section>
    </div>
  );
}

const frameworkStrings = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

export function ComboboxWithClear() {
  return (
    <Combobox items={frameworkStrings} defaultValue={frameworkStrings[0]}>
      <ComboboxInput placeholder="Select a framework" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxMultiple() {
  const anchor = useComboboxAnchor();

  return (
    <Combobox
      multiple
      autoHighlight
      items={frameworkStrings}
      defaultValue={[frameworkStrings[0]]}
    >
      <ComboboxChips ref={anchor} className="flex min-h-10 w-full max-w-xs flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-within:ring-1 focus-within:ring-ring">
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Add framework..." />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

const timezones = [
  {
    value: "Americas",
    items: [
      "(GMT-5) New York",
      "(GMT-8) Los Angeles",
      "(GMT-6) Chicago",
      "(GMT-5) Toronto",
      "(GMT-8) Vancouver",
      "(GMT-3) São Paulo",
    ],
  },
  {
    value: "Europe",
    items: [
      "(GMT+0) London",
      "(GMT+1) Paris",
      "(GMT+1) Berlin",
      "(GMT+1) Rome",
      "(GMT+1) Madrid",
      "(GMT+1) Amsterdam",
    ],
  },
  {
    value: "Asia/Pacific",
    items: [
      "(GMT+9) Tokyo",
      "(GMT+8) Shanghai",
      "(GMT+8) Singapore",
      "(GMT+4) Dubai",
      "(GMT+11) Sydney",
      "(GMT+9) Seoul",
    ],
  },
] as const;

export function ComboboxWithGroupsAndSeparator() {
  return (
    <Combobox items={timezones}>
      <ComboboxInput placeholder="Select a timezone" />
      <ComboboxContent>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(group, index) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < timezones.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

const countries = [
  { code: "", value: "", continent: "", label: "Select country" },
  {
    code: "ar",
    value: "argentina",
    label: "Argentina",
    continent: "South America",
  },
  { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
  { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
  { code: "ca", value: "canada", label: "Canada", continent: "North America" },
  { code: "cn", value: "china", label: "China", continent: "Asia" },
  {
    code: "co",
    value: "colombia",
    label: "Colombia",
    continent: "South America",
  },
  { code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
  { code: "fr", value: "france", label: "France", continent: "Europe" },
  { code: "de", value: "germany", label: "Germany", continent: "Europe" },
  { code: "it", value: "italy", label: "Italy", continent: "Europe" },
  { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
  { code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
  { code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
  {
    code: "nz",
    value: "new-zealand",
    label: "New Zealand",
    continent: "Oceania",
  },
  { code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
  {
    code: "za",
    value: "south-africa",
    label: "South Africa",
    continent: "Africa",
  },
  { code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
  {
    code: "gb",
    value: "united-kingdom",
    label: "United Kingdom",
    continent: "Europe",
  },
  {
    code: "us",
    value: "united-states",
    label: "United States",
    continent: "North America",
  },
];

export function ComboboxWithCustomItems() {
  return (
    <Combobox
      items={countries.filter((country) => country.code !== "")}
      itemToStringValue={(country: (typeof countries)[number]) => country.label}
    >
      <ComboboxInput placeholder="Search countries..." />
      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(country) => (
            <ComboboxItem key={country.code} value={country}>
              <Item size="xs" className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">
                    {country.label}
                  </ItemTitle>
                  <ItemDescription>
                    {country.continent} ({country.code})
                  </ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxInvalid() {
  return (
    <Combobox items={frameworkStrings}>
      <ComboboxInput placeholder="Select a framework" aria-invalid="true" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxDisabled() {
  return (
    <Combobox items={frameworkStrings}>
      <ComboboxInput placeholder="Select a framework" disabled />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxPopup() {
  return (
    <>
      <Combobox items={countries} defaultValue={countries[0]}>
        <ComboboxTrigger render={<Button variant="outline" className="w-64 justify-between font-normal"><ComboboxValue /></Button>} />
        <ComboboxContent>
          <ComboboxInput showTrigger={false} placeholder="Search" />
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.code} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
