export default function Button({
    title,
    className = 'button-container',
    onClick,
    children,
}) {
    return (
        <button className={className} onClick={onClick}>
            {title}
            {children}
        </button>
    );
}
