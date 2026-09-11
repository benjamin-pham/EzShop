import React from "react"
import { Button } from "@/components/ui/button"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Clock2Icon } from "lucide-react"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

export default function CalendarShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  


  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })

  const [weekNumberDate, setWeekNumberDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 0, 12)
  )

  const [customRange, setCustomRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  })

  const [bookedDate, setBookedDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 0, 6)
  )
  const bookedDates = React.useMemo(() => Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 0, 12 + i)
  ), [])

  const [timeDate, setTimeDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )

  const [presetDate, setPresetDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 12)
  )
  const [presetMonth, setPresetMonth] = React.useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )

  const [captionDate, setCaptionDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="space-y-10">
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Basic Calendar</h2>
          <p className="text-muted-foreground mt-1">A basic calendar component for single date selection.</p>
        </div>
        <Card>
          <CardContent className="pt-6 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </section>



      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Range Selection</h2>
          <p className="text-muted-foreground mt-1">A calendar that allows a range of dates to be selected.</p>
        </div>
        <Card>
          <CardContent className="pt-6 flex justify-center overflow-x-auto">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              className="rounded-md border"
              numberOfMonths={2}
            />
          </CardContent>
        </Card>
      </section>
      
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Disabled Dates</h2>
          <p className="text-muted-foreground mt-1">A calendar with disabled dates (e.g. weekends).</p>
        </div>
        <Card>
          <CardContent className="pt-6 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
            />
          </CardContent>
        </Card>
      </section>
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Week Numbers</h2>
          <p className="text-muted-foreground mt-1">A calendar that displays week numbers.</p>
        </div>
        <Card>
          <CardContent className="pt-6 flex justify-center">
            <Calendar
              mode="single"
              defaultMonth={weekNumberDate}
              selected={weekNumberDate}
              onSelect={setWeekNumberDate}
              className="rounded-md border"
              showWeekNumber
            />
          </CardContent>
        </Card>
      </section>
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Custom Cell Size</h2>
          <p className="text-muted-foreground mt-1">A calendar with custom cell size and custom day button content.</p>
        </div>
        <Card>
          <CardContent className="pt-6 flex justify-center">
            <Calendar
              mode="range"
              defaultMonth={customRange?.from}
              selected={customRange}
              onSelect={setCustomRange}
              numberOfMonths={1}
              captionLayout="dropdown"
              className="rounded-md border [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
              formatters={{
                formatMonthDropdown: (date) => {
                  return date.toLocaleString("default", { month: "long" })
                },
              }}
              components={{
                DayButton: ({ children, modifiers, day, ...props }) => {
                  const isWeekend =
                    day.date.getDay() === 0 || day.date.getDay() === 6

                  return (
                    <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                      {children}
                      {!modifiers.outside && (
                        <span>{isWeekend ? "$120" : "$100"}</span>
                      )}
                    </CalendarDayButton>
                  )
                },
              }}
            />
          </CardContent>
        </Card>
      </section>
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Booked Dates</h2>
          <p className="text-muted-foreground mt-1">A calendar showing booked dates with custom modifiers.</p>
        </div>
        <Card>
          <CardContent className="pt-6 flex justify-center">
            <Calendar
              mode="single"
              defaultMonth={bookedDate}
              selected={bookedDate}
              onSelect={setBookedDate}
              disabled={bookedDates}
              modifiers={{
                booked: bookedDates,
              }}
              modifiersClassNames={{
                booked: "[&>button]:line-through opacity-100",
              }}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </section>
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Date and Time Picker</h2>
          <p className="text-muted-foreground mt-1">A calendar with time selection inputs.</p>
        </div>
        <Card className="mx-auto w-fit">
          <CardContent className="pt-6 flex justify-center">
            <Calendar
              mode="single"
              selected={timeDate}
              onSelect={setTimeDate}
              className="p-0"
            />
          </CardContent>
          <CardFooter className="border-t bg-card pt-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="time-from"
                    type="time"
                    step="1"
                    defaultValue="10:30:00"
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                  <InputGroupAddon>
                    <Clock2Icon className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="time-to">End Time</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="time-to"
                    type="time"
                    step="1"
                    defaultValue="12:30:00"
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  />
                  <InputGroupAddon>
                    <Clock2Icon className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
          </CardFooter>
        </Card>
      </section>
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Presets</h2>
          <p className="text-muted-foreground mt-1">A calendar with quick selection presets.</p>
        </div>
        <Card className="mx-auto w-fit max-w-[300px]">
          <CardContent className="pt-6 flex justify-center">
            <Calendar
              mode="single"
              selected={presetDate}
              onSelect={setPresetDate}
              month={presetMonth}
              onMonthChange={setPresetMonth}
              fixedWeeks
              className="p-0 [--cell-size:--spacing(9.5)]"
            />
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 border-t pt-6">
            {[
              { label: "Today", value: 0 },
              { label: "Tomorrow", value: 1 },
              { label: "In 3 days", value: 3 },
              { label: "In a week", value: 7 },
              { label: "In 2 weeks", value: 14 },
            ].map((preset) => (
              <Button
                key={preset.value}
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  const newDate = addDays(new Date(), preset.value)
                  setPresetDate(newDate)
                  setPresetMonth(
                    new Date(newDate.getFullYear(), newDate.getMonth(), 1)
                  )
                }}
              >
                {preset.label}
              </Button>
            ))}
          </CardFooter>
        </Card>
      </section>
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Month and Year Selector</h2>
          <p className="text-muted-foreground mt-1">A calendar with dropdowns to select the month and year.</p>
        </div>
        <Card>
          <CardContent className="pt-6 flex justify-center">
            <Calendar
              mode="single"
              selected={captionDate}
              onSelect={setCaptionDate}
              captionLayout="dropdown"
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
