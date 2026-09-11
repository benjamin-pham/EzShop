import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldContent,
  FieldSet,
  FieldLegend
} from "@/components/ui/field"

export default function CheckboxShowcase() {
  const [checked, setChecked] = React.useState<boolean>(false)

  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Pair the checkbox with <code>Field</code> and <code>FieldLabel</code> for proper layout and labeling.
        </p>
        <div className="max-w-[600px] p-6 border rounded-lg flex items-center justify-center">
          <Field orientation="horizontal">
            <Checkbox id="terms" />
            <FieldLabel htmlFor="terms">Accept terms and conditions</FieldLabel>
          </Field>
        </div>
      </section>

      {/* Description */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Description</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use <code>FieldContent</code> and <code>FieldDescription</code> for helper text.
        </p>
        <div className="max-w-[600px] p-6 border rounded-lg flex justify-center">
          <Field orientation="horizontal">
            <Checkbox id="terms2" />
            <FieldContent>
              <FieldLabel htmlFor="terms2">Accept terms and conditions</FieldLabel>
              <FieldDescription>
                You agree to our Terms of Service and Privacy Policy.
              </FieldDescription>
            </FieldContent>
          </Field>
        </div>
      </section>

      {/* Disabled */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Disabled</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use the <code>disabled</code> prop to prevent interaction.
        </p>
        <div className="max-w-[600px] p-6 border rounded-lg flex justify-center">
          <Field orientation="horizontal" data-disabled>
            <Checkbox id="terms3" disabled />
            <FieldLabel htmlFor="terms3">Accept terms and conditions</FieldLabel>
          </Field>
        </div>
      </section>

      {/* Checked State */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Checked State</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use <code>checked</code> and <code>onCheckedChange</code> to control the state.
        </p>
        <div className="max-w-[600px] p-6 border rounded-lg flex flex-col items-center gap-4">
          <Field orientation="horizontal">
            <Checkbox
              id="terms4"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <FieldLabel htmlFor="terms4">Controlled Checkbox</FieldLabel>
          </Field>
          <div className="text-sm text-muted-foreground">
            Current state: <strong>{checked.toString()}</strong>
          </div>
        </div>
      </section>

      {/* Invalid State */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Invalid State</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Set <code>aria-invalid</code> on the checkbox and <code>data-invalid</code> on the field wrapper.
        </p>
        <div className="max-w-[600px] p-6 border rounded-lg flex justify-center">
          <Field orientation="horizontal" data-invalid>
            <Checkbox id="terms5" aria-invalid="true" />
            <FieldContent>
              <FieldLabel htmlFor="terms5">Accept terms and conditions</FieldLabel>
              <FieldError>You must accept the terms and conditions.</FieldError>
            </FieldContent>
          </Field>
        </div>
      </section>

      {/* Group */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Group</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use multiple fields to create a checkbox list.
        </p>
        <div className="max-w-[600px] p-6 border rounded-lg flex justify-center">
          <FieldSet>
            <FieldLegend>Sidebar Items</FieldLegend>
            <FieldDescription>Select the items you want to show in the sidebar.</FieldDescription>
            <FieldGroup className="mt-4 space-y-3">
              <Field orientation="horizontal">
                <Checkbox id="recents" defaultChecked />
                <FieldLabel htmlFor="recents">Recents</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="home" defaultChecked />
                <FieldLabel htmlFor="home">Home</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="applications" />
                <FieldLabel htmlFor="applications">Applications</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="desktop" />
                <FieldLabel htmlFor="desktop">Desktop</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="downloads" />
                <FieldLabel htmlFor="downloads">Downloads</FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </div>
      </section>

    </div>
  )
}
