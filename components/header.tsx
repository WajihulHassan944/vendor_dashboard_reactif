type HeaderProps = {
    title: string
    description?: string
    className?: string
}

export default function Header({ title, description, className }: HeaderProps) {
    return (
        <div className={`space-y-[6px] ${className}`}>
            <h1 className="text-[36px] font-semibold text-dark">
                {title}
            </h1>

            <p className="text-[20px] text-gray">
                {description}
            </p>

        </div>
    )
}
