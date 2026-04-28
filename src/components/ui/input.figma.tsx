import figma from "@figma/code-connect";
import { Input } from "./input";

/**
 * Replace the Figma URL below with the actual component URL from your Figma file.
 * To get it: right-click the component in Figma → "Copy link"
 */
figma.connect(Input, "https://www.figma.com/design/EkHlX5CqU8QaVV1hiPlxcP/AI-Factory-Design-Language-System?node-id=44-891", {
  props: {
    label: figma.string("Label"),
    placeholder: figma.string("Placeholder"),
    hint: figma.string("Hint"),
    error: figma.string("Error"),
    disabled: figma.boolean("Disabled"),
  },
  example: ({ label, placeholder, hint, error, disabled }) => (
    <Input
      label={label}
      placeholder={placeholder}
      hint={hint}
      error={error}
      disabled={disabled}
    />
  ),
});
