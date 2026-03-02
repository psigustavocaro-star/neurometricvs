'use client'

import { useRouter } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import { ReactNode, MouseEvent, startTransition } from 'react'

/**
 * Hook para transiciones instantáneas entre páginas
 * Optimizado para Interaction to Next Paint (INP)
 */
export function useInstantTransition() {
    const router = useRouter()

    const navigate = (href: string) => {
        startTransition(() => {
            if ('startViewTransition' in document) {
                // @ts-ignore
                document.startViewTransition(() => {
                    router.push(href)
                })
            } else {
                router.push(href)
            }
        })
    }

    const replace = (href: string) => {
        startTransition(() => {
            if ('startViewTransition' in document) {
                // @ts-ignore
                document.startViewTransition(() => {
                    router.replace(href)
                })
            } else {
                router.replace(href)
            }
        })
    }

    const back = () => {
        startTransition(() => {
            if ('startViewTransition' in document) {
                // @ts-ignore
                document.startViewTransition(() => {
                    router.back()
                })
            } else {
                router.back()
            }
        })
    }

    return { navigate, replace, back }
}

/**
 * Componente Link con transiciones instantáneas
 */
interface InstantLinkProps extends Omit<LinkProps, 'onClick'> {
    children: ReactNode
    className?: string
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export function InstantLink({ children, href, className, onClick, ...props }: InstantLinkProps) {
    const { navigate } = useInstantTransition()

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        // Llamar al onClick personalizado si existe
        onClick?.(e)

        // Solo prevenir default si es navegación interna
        if (typeof href === 'string' && href.startsWith('/')) {
            e.preventDefault()
            navigate(href)
        }
    }

    return (
        <Link href={href} className={className} onClick={handleClick} {...props}>
            {children}
        </Link>
    )
}

/**
 * HOC para envolver cualquier componente con transiciones instantáneas
 */
export function withInstantTransition<P extends object>(
    Component: React.ComponentType<P>
) {
    return function InstantTransitionComponent(props: P) {
        return <Component {...props} />
    }
}
