import { useParams } from "react-router-dom";
import React, { Suspense } from "react";

// Mapping of component names to their specific showcase components (lazy loaded)
// For now, we just map 'button'.
const showcases: Record<string, React.LazyExoticComponent<React.ComponentType<unknown>>> = {
  button: React.lazy(() => import("./components/ButtonShowcase")),
  badge: React.lazy(() => import("./components/BadgeShowcase")),
  accordion: React.lazy(() => import("./components/AccordionShowcase")),
  alert: React.lazy(() => import("./components/AlertShowcase")),
  "alert-dialog": React.lazy(() => import("./components/AlertDialogShowcase")),
  "aspect-ratio": React.lazy(() => import("./components/AspectRatioShowcase")),
  attachment: React.lazy(() => import("./components/AttachmentShowcase")),
  avatar: React.lazy(() => import("./components/AvatarShowcase")),
  breadcrumb: React.lazy(() => import("./components/BreadcrumbShowcase")),
  bubble: React.lazy(() => import("./components/BubbleShowcase")),
  "button-group": React.lazy(() => import("./components/ButtonGroupShowcase")),
  calendar: React.lazy(() => import("./components/CalendarShowcase")),
  card: React.lazy(() => import("./components/CardShowcase")),
  carousel: React.lazy(() => import("./components/CarouselShowcase")),
  chart: React.lazy(() => import("./components/ChartShowcase")),
  checkbox: React.lazy(() => import("./components/CheckboxShowcase")),
  collapsible: React.lazy(() => import("./components/CollapsibleShowcase")),
  combobox: React.lazy(() => import("./components/ComboboxShowcase")),
  command: React.lazy(() => import("./components/CommandShowcase")),
  "context-menu": React.lazy(() => import("./components/ContextMenuShowcase")),
  dialog: React.lazy(() => import("./components/DialogShowcase")),
  drawer: React.lazy(() => import("./components/DrawerShowcase")),
  "dropdown-menu": React.lazy(() => import("./components/DropdownMenuShowcase")),
  empty: React.lazy(() => import("./components/EmptyShowcase")),
  "hover-card": React.lazy(() => import("./components/HoverCardShowcase")),
  input: React.lazy(() => import("./components/InputShowcase")),
  "input-group": React.lazy(() => import("./components/InputGroupShowcase")),
};

export default function ComponentView() {
  const { componentId } = useParams<{ componentId: string }>();

  if (!componentId) return null;

  const ShowcaseComponent = showcases[componentId];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          {componentId.replace(/-/g, " ")}
        </h1>
        <p className="text-muted-foreground mt-2">
          Examples and variants for the {componentId} component.
        </p>
      </div>

      <div className="mt-8">
        {ShowcaseComponent ? (
          <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading examples...</div>}>
            <ShowcaseComponent />
          </Suspense>
        ) : (
          <div className="p-12 text-center border rounded-lg border-dashed bg-muted/30">
            <h3 className="text-lg font-medium">Showcase Not Available Yet</h3>
            <p className="text-sm text-muted-foreground mt-2">
              The showcase examples for the <strong>{componentId}</strong> component have not been implemented yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
