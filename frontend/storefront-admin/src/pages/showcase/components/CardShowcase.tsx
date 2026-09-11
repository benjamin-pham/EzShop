import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const spacingOptions = [
  {
    className: "[--card-spacing:--spacing(4)]",
    label: "16px",
    value: "4",
  },
  {
    className: "[--card-spacing:--spacing(5)]",
    label: "20px",
    value: "5",
  },
  {
    className: "[--card-spacing:--spacing(6)]",
    label: "24px",
    value: "6",
  },
  {
    className: "[--card-spacing:--spacing(8)]",
    label: "32px",
    value: "8",
  },
];

export default function CardShowcase() {
  const featureName = "Scheduled reports";
  const [spacing, setSpacing] = React.useState("4");
  const selectedSpacing = spacingOptions.find(
    (option) => option.value === spacing
  );

  return (
    <div className="space-y-10">
      {/* Basic Card */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic Card</h2>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Small Size Card */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Small Size (size="sm")</h2>
        <Card size="sm" className="mx-auto w-full max-w-xs">
          <CardHeader>
            <CardTitle>{featureName}</CardTitle>
            <CardDescription>
              Weekly snapshots. No more manual exports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 py-2 text-sm">
              <li className="flex gap-2">
                <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>Choose a schedule (daily, or weekly).</span>
              </li>
              <li className="flex gap-2">
                <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>Send to channels or specific teammates.</span>
              </li>
              <li className="flex gap-2">
                <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>Include charts, tables, and key metrics.</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button size="sm" className="w-full">
              Set up scheduled reports
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              See what&apos;s new
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Card with Action */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Card with Action</h2>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Update your billing details.</CardDescription>
            <CardAction>
              <Button variant="outline" size="sm">Edit</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
               <div className="flex justify-between">
                 <span className="text-sm font-medium">Visa ending in 4242</span>
                 <span className="text-sm text-muted-foreground">Expires 12/2024</span>
               </div>
            </div>
          </CardContent>
        </Card>
      </section>
      {/* Card Spacing */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Card Spacing</h2>
        <div className="mx-auto grid w-full max-w-sm gap-4">
          <ToggleGroup
            value={[spacing]}
            onValueChange={(value) => {
              if (value[0]) {
                setSpacing(value[0]);
              }
            }}
            variant="outline"
            size="sm"
            className="justify-center"
          >
            {spacingOptions.map((option) => (
              <ToggleGroupItem key={option.value} value={option.value}>
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Card className={selectedSpacing?.className}>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button variant="link">Sign Up</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email-spacing">Email</Label>
                    <Input
                      id="email-spacing"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password-spacing">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password-spacing" type="password" required />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Card Edge to Edge */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Edge to Edge</h2>
        <Card className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
            <CardDescription>
              Review the terms before accepting the agreement.
            </CardDescription>
          </CardHeader>
          <CardContent className="-mb-(--card-spacing)">
            <div className="-mx-(--card-spacing) max-h-48 space-y-4 overflow-y-scroll border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed">
              <p>
                These terms govern your use of the workspace, including access to
                shared documents, project files, and collaboration tools.
              </p>
              <p>
                You are responsible for the content you upload and for ensuring that
                your team has the appropriate permissions to view or edit it.
              </p>
              <p>
                We may update features or limits as the service evolves. When those
                changes materially affect your workflow, we will notify your
                workspace administrators.
              </p>
              <p>
                By continuing, you agree to keep your account credentials secure and
                to follow your organization&apos;s acceptable use policies.
              </p>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline">Decline</Button>
            <Button>Accept</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Card Image */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Card Image</h2>
        <Card className="relative mx-auto w-full max-w-sm pt-0">
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
          <img
            src="https://avatar.vercel.sh/shadcn1"
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
          />
          <CardHeader>
            <CardAction>
              <Badge variant="secondary">Featured</Badge>
            </CardAction>
            <CardTitle>Design systems meetup</CardTitle>
            <CardDescription>
              A practical talk on component APIs, accessibility, and shipping
              faster.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">View Event</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
