import * as React from "react"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription, FieldGroup } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"
import { SearchIcon, DownloadIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function InputShowcase() {
  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <Input type="email" placeholder="Email" />
        </div>
      </section>

      {/* Field */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Field</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <Field>
            <FieldLabel>Username</FieldLabel>
            <Input placeholder="shadcn" />
            <FieldDescription>Choose a unique username for your account.</FieldDescription>
          </Field>
        </div>
      </section>

      {/* Field Group */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Field Group</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <FieldGroup>
            <Field>
              <FieldLabel>First Name</FieldLabel>
              <Input placeholder="John" />
            </Field>
            <Field>
              <FieldLabel>Last Name</FieldLabel>
              <Input placeholder="Doe" />
            </Field>
          </FieldGroup>
        </div>
      </section>

      {/* Disabled */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Disabled</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <Field data-disabled>
            <FieldLabel>Email</FieldLabel>
            <Input disabled type="email" placeholder="Email" />
            <FieldDescription>This field is currently disabled.</FieldDescription>
          </Field>
        </div>
      </section>

      {/* Invalid */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Invalid</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <Field data-invalid>
            <FieldLabel>Email</FieldLabel>
            <Input aria-invalid type="email" placeholder="Email" defaultValue="invalid-email" />
            <FieldDescription className="text-destructive">This field contains validation errors.</FieldDescription>
          </Field>
        </div>
      </section>

      {/* File */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">File</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <Field>
            <FieldLabel>Avatar</FieldLabel>
            <Input type="file" />
            <FieldDescription>Select a picture to upload.</FieldDescription>
          </Field>
        </div>
      </section>

      {/* Inline */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Inline</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <Field orientation="horizontal" className="w-full">
            <Input placeholder="Search..." className="w-full" />
            <Button type="submit">Search</Button>
          </Field>
        </div>
      </section>

      {/* Grid */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Grid</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <div className="grid grid-cols-2 gap-4 w-full">
            <Field>
              <FieldLabel>City</FieldLabel>
              <Input placeholder="San Francisco" />
            </Field>
            <Field>
              <FieldLabel>State</FieldLabel>
              <Input placeholder="CA" />
            </Field>
          </div>
        </div>
      </section>

      {/* Required */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Required</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <Field>
            <FieldLabel>
              Project Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input required placeholder="My Project" />
            <FieldDescription>This field must be filled out.</FieldDescription>
          </Field>
        </div>
      </section>

      {/* Badge */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Badge</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <Field>
            <div className="flex items-center gap-2">
              <FieldLabel>Personal Website</FieldLabel>
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">Recommended</Badge>
            </div>
            <Input placeholder="https://example.com" />
          </Field>
        </div>
      </section>

      {/* Input Group */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Input Group</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <Field>
            <FieldLabel>Search</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search everything..." />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="xs" variant="ghost">⌘K</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>
      </section>

      {/* Button Group */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Button Group</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col gap-4 bg-muted/20">
          <Field>
            <FieldLabel>Download Link</FieldLabel>
            <ButtonGroup className="w-full">
              <ButtonGroupText>https://</ButtonGroupText>
              <Input defaultValue="ezshop.com/download" />
              <Button variant="outline"><DownloadIcon /> Download</Button>
            </ButtonGroup>
          </Field>
        </div>
      </section>

      {/* Form Example */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Form Example</h2>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center bg-muted/20">
          <InputForm />
        </div>
      </section>
    </div>
  )
}

export function InputForm() {
  const countries = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
  ]
  return (
    <form className="w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Name</FieldLabel>
          <Input
            id="form-name"
            type="text"
            placeholder="Evil Rabbit"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input id="form-email" type="email" placeholder="john@example.com" />
          <FieldDescription>
            We&apos;ll never share your email with anyone.
          </FieldDescription>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
            <Input id="form-phone" type="tel" placeholder="+1 (555) 123-4567" />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-country">Country</FieldLabel>
            <Select defaultValue="us">
              <SelectTrigger id="form-country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="form-address">Address</FieldLabel>
          <Input id="form-address" type="text" placeholder="123 Main St" />
        </Field>
        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

