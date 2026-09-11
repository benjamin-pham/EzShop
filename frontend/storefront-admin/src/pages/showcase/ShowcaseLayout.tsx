import { Link, Outlet, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const components = [
  "accordion", "alert", "alert-dialog", "aspect-ratio", "attachment", "avatar", "badge", "breadcrumb", "bubble", "button", "button-group", "calendar", "card", "carousel", "chart", "checkbox", "collapsible", "combobox", "command", "context-menu", "dialog", "direction", "drawer", "dropdown-menu", "empty", "field", "hover-card", "input", "input-group", "input-otp", "item", "kbd", "label", "marker", "menubar", "message", "message-scroller", "native-select", "navigation-menu", "pagination", "popover", "progress", "questionnaire", "radio-group", "resizable", "scroll-area", "select", "separator", "sheet", "sidebar", "skeleton", "slider", "spinner", "switch", "table", "tabs", "textarea", "toast", "toggle", "toggle-group", "tooltip"
];

export default function ShowcaseLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Components Showcase</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={location.pathname === "/"} render={
                    <Link to="/">
                      Home
                    </Link>
                  } />
                </SidebarMenuItem>
                {components.map((component) => {
                  const path = `/components/${component}`;
                  return (
                    <SidebarMenuItem key={component}>
                      <SidebarMenuButton isActive={location.pathname === path} render={
                        <Link to={path}>
                          {component.charAt(0).toUpperCase() + component.slice(1).replace(/-/g, " ")}
                        </Link>
                      } />
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main className="flex flex-1 flex-col p-6 md:p-8 lg:p-12">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
