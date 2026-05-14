export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
  badge?: string;
  /** Card metadata — only set for Base Component items shown on the All Components page */
  componentCard?: {
    componentCount: number;
    variantCount: number;
    image?: string;
  };
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
      {
        title: "Avatar", href: "/docs/components/avatar",
        componentCard: { componentCount: 1, variantCount: 6, image: "/Images/Thumbnails/base_components/Avatar.png" },
      },
      {
        title: "Badge", href: "/docs/components/badge",
        componentCard: { componentCount: 1, variantCount: 6 },
      },
      {
        title: "Breadcrumbs", href: "/docs/components/breadcrumb",
        componentCard: { componentCount: 1, variantCount: 2, image: "/Images/Thumbnails/base_components/Breadcrumbs.png" },
      },
      {
        title: "Button", href: "/docs/components/button",
        componentCard: { componentCount: 1, variantCount: 6, image: "/Images/Thumbnails/base_components/Button.png" },
      },
      {
        title: "Card", href: "/docs/components/card",
        componentCard: { componentCount: 1, variantCount: 2 },
      },
      {
        title: "Date & Time Picker", href: "/docs/components/date-time-picker",
        componentCard: { componentCount: 1, variantCount: 4, image: "/Images/Thumbnails/base_components/Date Picker.png" },
      },
      {
        title: "Dropdown", href: "/docs/components/dropdown",
        componentCard: { componentCount: 1, variantCount: 3, image: "/Images/Thumbnails/base_components/Dropdown.png" },
      },
      {
        title: "File Uploader", href: "/docs/components/file-uploader",
        componentCard: { componentCount: 1, variantCount: 4, image: "/Images/Thumbnails/base_components/File Uploader.png" },
      },
      {
        title: "Input", href: "/docs/components/input",
        componentCard: { componentCount: 1, variantCount: 5, image: "/Images/Thumbnails/base_components/Input.png" },
      },
      {
        title: "Number Inputs", href: "/docs/components/number-inputs",
        componentCard: { componentCount: 1, variantCount: 3, image: "/Images/Thumbnails/base_components/Number Inputs.png" },
      },
      {
        title: "Pagination", href: "/docs/components/pagination",
        componentCard: { componentCount: 1, variantCount: 2, image: "/Images/Thumbnails/base_components/Pagination.png" },
      },
      {
        title: "Progress & Loaders", href: "/docs/components/progress",
        componentCard: { componentCount: 2, variantCount: 4, image: "/Images/Thumbnails/base_components/Progress & Loaders.png" },
      },
      {
        title: "Selectors", href: "/docs/components/selectors",
        componentCard: { componentCount: 2, variantCount: 6, image: "/Images/Thumbnails/base_components/Selectors.png" },
      },
      {
        title: "Sliders", href: "/docs/components/slider",
        componentCard: { componentCount: 1, variantCount: 4, image: "/Images/Thumbnails/base_components/Sliders.png" },
      },
      {
        title: "Steppers", href: "/docs/components/stepper",
        componentCard: { componentCount: 1, variantCount: 1, image: "/Images/Thumbnails/base_components/Steppers.png" },
      },
      {
        title: "Table", href: "/docs/components/table",
        componentCard: { componentCount: 1, variantCount: 5, image: "/Images/Thumbnails/base_components/Table.png" },
      },
      {
        title: "Tabs", href: "/docs/components/tabs",
        componentCard: { componentCount: 1, variantCount: 6, image: "/Images/Thumbnails/base_components/Tab.png" },
      },
      {
        title: "Tags", href: "/docs/components/tags",
        componentCard: { componentCount: 1, variantCount: 2, image: "/Images/Thumbnails/base_components/Tags.png" },
      },
      {
        title: "Text Area", href: "/docs/components/textarea",
        componentCard: { componentCount: 1, variantCount: 2, image: "/Images/Thumbnails/base_components/Text Area.png" },
      },
      {
        title: "Toast", href: "/docs/components/toast",
        componentCard: { componentCount: 1, variantCount: 5, image: "/Images/Thumbnails/base_components/Toasters.png" },
      },
      {
        title: "Toggles", href: "/docs/components/toggle",
        componentCard: { componentCount: 1, variantCount: 2, image: "/Images/Thumbnails/base_components/Toggles.png" },
      },
      {
        title: "Tooltip", href: "/docs/components/tooltip",
        componentCard: { componentCount: 1, variantCount: 4, image: "/Images/Thumbnails/base_components/Tooltip.png" },
      },
    ],
  },
  {
    label: "Main Components",
    items: [
      { title: "Input Area", href: "/docs/main-components/input-area" },
      { title: "Input Chat", href: "/docs/main-components/input-chat" },
    ],
  },
];
