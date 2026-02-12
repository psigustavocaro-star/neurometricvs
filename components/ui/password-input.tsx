import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PasswordInputProps
    extends React.ComponentProps<"input"> { }

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, disabled, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)

        return (
            <div className="relative relative-input-group w-full">
                <Input
                    type={showPassword ? "text" : "password"}
                    className={cn("pr-12", className)}
                    ref={ref}
                    disabled={disabled}
                    {...props}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full w-12 px-3 hover:bg-transparent text-muted-foreground hover:text-foreground transition-all duration-200 group/eye"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    disabled={disabled}
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4 transition-transform group-hover/eye:scale-110" aria-hidden="true" />
                    ) : (
                        <Eye className="h-4 w-4 transition-transform group-hover/eye:scale-110" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                        {showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                    </span>
                </Button>
            </div>
        )
    }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
