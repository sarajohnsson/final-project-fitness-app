export default function Card({
    title,
    description,
    image,
    imageClass = 'w-full h-40 object-cover',
    contentClass = 'p-4',
    cardClass = 'bg-white shadow-lg rounded-lg overflow-hidden',
    cardTitle = 'text-xl font-semibold',
    cardText = 'text-gray-600 mt-2',
}) {
    return (
        <div className={cardClass}>
            {image && (
                <img
                    className={imageClass}
                    src={image}
                    alt={title}
                    loading="lazy"
                />
            )}
            <div className={contentClass}>
                <h2 className={cardTitle}>{title}</h2>
                <p className={cardText}>{description}</p>
            </div>
        </div>
    );
}
