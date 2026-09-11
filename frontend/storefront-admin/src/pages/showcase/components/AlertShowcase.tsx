import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AlertShowcase() {
  return (
    <div className="space-y-12">
      {/* Basic */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Basic</h2>
        <p className="text-sm text-muted-foreground mb-6">
          A basic alert with an icon, title and description.
        </p>
        <div className="max-w-[600px]">
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Destructive */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Destructive</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use <code>variant="destructive"</code> to create a destructive alert.
        </p>
        <div className="max-w-[600px]">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Action */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Action</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Use <code>AlertAction</code> to add a button or other action element to the alert.
        </p>
        <div className="max-w-[600px]">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
            <AlertAction>
              <Button variant="outline" size="sm">Enable</Button>
            </AlertAction>
          </Alert>
        </div>
      </section>

      {/* Custom Colors */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Custom Colors</h2>
        <p className="text-sm text-muted-foreground mb-6">
          You can customize the alert colors by adding custom classes such as <code>bg-amber-50 dark:bg-amber-950</code> to the <code>Alert</code> component.
        </p>
        <div className="max-w-[600px]">
          <Alert className="bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800 *:data-[slot=alert-description]:text-amber-800/90 dark:*:data-[slot=alert-description]:text-amber-200/90">
            <AlertTriangle className="h-4 w-4 !text-amber-600 dark:!text-amber-500" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Your account is about to expire in 3 days.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  );
}
