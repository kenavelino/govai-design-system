export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    label: "Documentation",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Design Tokens", href: "/docs/foundations/design-tokens" },
      { title: "Colors", href: "/docs/foundations/colors" },
      { title: "Typography", href: "/docs/foundations/typography" },
      { title: "Spacings", href: "/docs/foundations/spacing" },
      { title: "Corner Radius", href: "/docs/foundations/corner-radius" },
      { title: "Strokes", href: "/docs/foundations/strokes" },
      { title: "Elevation", href: "/docs/foundations/elevation" },
      { title: "Grids and Breakpoints", href: "/docs/foundations/grids-and-breakpoints" },
      { title: "Accessibility", href: "/docs/accessibility" },
      { title: "Developers", href: "/docs/developers" },
    ],
  },
  {
    label: "Resources",
    items: [
{ title: "Icons", href: "/docs/resources/icons" },
      { title: "Country Flags", href: "/docs/resources/flags" },
      { title: "Logos", href: "/docs/resources/logos" },
    ],
  },
  {
    label: "Base Components",
    items: [
      { title: "All Components", href: "/docs/components" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Breadcrumbs", href: "/docs/components/breadcrumb" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Date & Time Picker", href: "/docs/components/date-time-picker" },
      { title: "Dropdown", href: "/docs/components/dropdown" },
      { title: "File Uploader", href: "/docs/components/file-uploader" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Number Inputs", href: "/docs/components/number-inputs" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Progress & Loaders", href: "/docs/components/progress" },
      { title: "Selectors", href: "/docs/components/selectors" },
      { title: "Sliders", href: "/docs/components/slider" },
      { title: "Steppers", href: "/docs/components/stepper" },
      { title: "Table", href: "/docs/components/table" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Tags", href: "/docs/components/tags" },
      { title: "Text Area", href: "/docs/components/textarea" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Toggles", href: "/docs/components/toggle" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
];
