interface Prop {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <div className="my-6 overflow-hidden rounded-[8px] border border-[var(--stroke-primary)]">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-[var(--stroke-primary)] bg-[var(--surface-tertiary)]">
            <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Prop</th>
            <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Type</th>
            <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Default</th>
            <th className="h-[40px] px-[16px] py-[12px] text-[12px] font-semibold leading-[16px] text-[var(--header-primary)]">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-[var(--stroke-primary)] last:border-0 transition-colors hover:bg-[var(--surface-primary)]"
            >
              <td className="px-[16px] py-[16px] leading-[20px]">
                <code className="!text-[12px] !leading-[16px]">{prop.name}</code>
                {prop.required && (
                  <span className="ml-[6px] text-[12px] leading-[16px] font-medium text-[var(--color-error-600)]">
                    required
                  </span>
                )}
              </td>
              <td className="px-[16px] py-[16px] leading-[20px]">
                <code className="!text-[12px] !leading-[16px] !text-[var(--color-purple-600)] dark:!text-[var(--color-purple-400)]">
                  {prop.type}
                </code>
              </td>
              <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">
                {prop.default ? <code className="!text-[12px] !leading-[16px]">{prop.default}</code> : "—"}
              </td>
              <td className="px-[16px] py-[16px] leading-[20px] text-[var(--header-secondary)]">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
