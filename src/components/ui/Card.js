export default function Card({
    title,
    description,
    useBackgroundImage = false,
    image,
    imageClass = 'w-full h-40 object-cover',
    contentClass = 'p-4',
    cardClass = 'bg-white shadow-lg rounded-lg overflow-hidden',
    overlayClass = 'absolute inset-0 bg-black bg-opacity-50',
    cardTitle = 'text-xl font-semibold',
    cardText = 'text-gray-600 mt-2',
    cardBtnClass,
    buttonText,
    onButtonClick,
    children,
}) {
    const cardStyle = useBackgroundImage
        ? {
              backgroundImage: image ? `url(${image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
          }
        : {};

    return (
        <div className={cardClass} style={cardStyle}>
            {useBackgroundImage && <div className={overlayClass}></div>}
            {!useBackgroundImage && image && (
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
                {children}
                {buttonText && (
                    <button className={cardBtnClass} onClick={onButtonClick}>
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}
