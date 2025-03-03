export default function Button({ title, className, onClick }) {
    return (
        <button className={className} onClick={onClick}>
            {title}
        </button>
    );
}
