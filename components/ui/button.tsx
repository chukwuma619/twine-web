import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "pressable group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding font-sans text-xs font-bold tracking-[0.08em] uppercase whitespace-nowrap transition-[color,background-color,border-color,transform,opacity] duration-150 ease-out-strong outline-none select-none focus-visible:border-cord focus-visible:ring-2 focus-visible:ring-cord/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-white bg-transparent text-white hover:bg-white hover:text-black",
        outline:
          "border-rule bg-transparent text-ink-mid hover:border-white hover:text-white",
        secondary: "bg-white text-black hover:bg-ink-mid",
        ghost: "text-white hover:bg-cloth-2 aria-expanded:bg-cloth-2",
        destructive:
          "border-cut/40 bg-transparent text-cut hover:bg-cut/10 focus-visible:border-cut",
        link: "text-cord normal-case tracking-normal underline-offset-4 hover:underline",
        cloth: "bg-white text-black hover:bg-ink-mid",
      },
      size: {
        default:
          "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1 px-3 text-[0.8125rem] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-14 gap-2 px-6 text-xs has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-10 normal-case tracking-normal",
        "icon-xs": "size-6 normal-case tracking-normal [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 normal-case tracking-normal",
        "icon-lg": "size-11 normal-case tracking-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
