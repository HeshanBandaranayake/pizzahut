import { cn } from '@/lib/utils';

export default function Heading({
    title,
    description,
    variant = 'default',
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    return (
        <header className={variant === 'small' ? '' : 'mb-8 space-y-0.5'}>
            <h2
                className={cn(
                    "text-[#EE1922] font-black italic tracking-tight",
                    variant === 'small' ? 'text-base' : 'text-2xl'
                )}
            >
                {title}
            </h2>
            {description && (
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight">{description}</p>
            )}
        </header>
    );
}
