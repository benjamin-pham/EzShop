import { Link } from "react-router-dom";

export default function ShowcaseHome() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Component Showcase</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Welcome to the UI component showcase. Select a component from the sidebar to view its variants and examples.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards for some featured components */}
        <Link to="/components/button" className="block border rounded-lg p-6 bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <h3 className="font-semibold text-lg">Buttons</h3>
          <p className="text-sm text-muted-foreground mt-1">Interactive elements for user actions.</p>
        </Link>
        <Link to="/components/card" className="block border rounded-lg p-6 bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <h3 className="font-semibold text-lg">Cards</h3>
          <p className="text-sm text-muted-foreground mt-1">Flexible containers for content.</p>
        </Link>
        <Link to="/components/input" className="block border rounded-lg p-6 bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <h3 className="font-semibold text-lg">Forms</h3>
          <p className="text-sm text-muted-foreground mt-1">Inputs, checkboxes, and select menus.</p>
        </Link>
        <Link to="/components/carousel" className="block border rounded-lg p-6 bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <h3 className="font-semibold text-lg">Carousel</h3>
          <p className="text-sm text-muted-foreground mt-1">A carousel with motion and swipe built using Embla.</p>
        </Link>
        <Link to="/components/chart" className="block border rounded-lg p-6 bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <h3 className="font-semibold text-lg">Chart</h3>
          <p className="text-sm text-muted-foreground mt-1">Beautiful charts built using Recharts.</p>
        </Link>
        <Link to="/components/empty" className="block border rounded-lg p-6 bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <h3 className="font-semibold text-lg">Empty State</h3>
          <p className="text-sm text-muted-foreground mt-1">A component used to indicate an empty state.</p>
        </Link>
        <Link to="/components/hover-card" className="block border rounded-lg p-6 bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <h3 className="font-semibold text-lg">Hover Card</h3>
          <p className="text-sm text-muted-foreground mt-1">For sighted users to preview content available behind a link.</p>
        </Link>
      </div>
    </div>
  );
}
