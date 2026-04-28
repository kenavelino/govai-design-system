import figma from "@figma/code-connect";
import { Button } from "./button";

figma.connect(Button, "https://www.figma.com/design/EkHlX5CqU8QaVV1hiPlxcP/AI-Factory-Design-Language-System?node-id=354-24303", {
  props: {
    variant: figma.enum("Hierarchy", {
      Primary: "primary",
      Secondary: "secondary",
      Teritiary: "tertiary",
    }),
    size: figma.enum("Size", {
      Large: "lg",
      Medium: "md",
      Small: "sm",
      xSmall: "sm",
    }),
  },
  example: ({ variant, size }) => (
    <Button variant={variant} size={size}>
      Label
    </Button>
  ),
});
