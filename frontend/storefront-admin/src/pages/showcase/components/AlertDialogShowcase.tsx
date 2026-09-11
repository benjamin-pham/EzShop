import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Info } from "lucide-react";

export default function AlertDialogShowcase() {
  return (
    <div className="space-y-10">
      <section>
        <div className="flex flex-col items-center justify-center p-12 border rounded-xl bg-background/50 backdrop-blur-sm min-h-[350px]">
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
              Show Dialog
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Variants</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start gap-4 p-6 border rounded-xl">
            <div className="space-y-1">
              <h3 className="font-medium">Small Size</h3>
              <p className="text-sm text-muted-foreground">A more compact alert dialog.</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Small Dialog
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex flex-col items-start gap-4 p-6 border rounded-xl">
            <div className="space-y-1">
              <h3 className="font-medium">Destructive Action</h3>
              <p className="text-sm text-muted-foreground">Dialog with warning media and destructive action.</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" />}>
                Delete Project
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                    <Trash2 />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the project and all of its data.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex flex-col items-start gap-4 p-6 border rounded-xl">
            <div className="space-y-1">
              <h3 className="font-medium">Informational</h3>
              <p className="text-sm text-muted-foreground">Dialog with info media for system updates.</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="secondary" />}>
                Info Notification
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-primary/10 text-primary">
                    <Info />
                  </AlertDialogMedia>
                  <AlertDialogTitle>System Update Available</AlertDialogTitle>
                  <AlertDialogDescription>
                    A new version of the application is available. It will be installed automatically the next time you restart.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction>Update Now</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </section>
    </div>
  );
}
