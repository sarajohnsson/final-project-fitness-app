import { NavLink } from 'react-router-dom';
import Tilt from 'react-vanilla-tilt';

export default function Card({
    title,
    description,
    useBackgroundImage = false,
    image,
    imageClass = 'w-full h-40 object-cover',
    contentClass = 'p-4',
    cardClass = 'bg-white shadow-lg rounded-lg overflow-hidden',
    overlayClass = 'absolute inset-0 bg-black bg-opacity-50',
    cardTitleClass = 'text-xl font-semibold',
    cardTextClass = 'text-gray-600 mt-2',
    cardBtnClass,
    buttonText,
    onButtonClick,
    children,
    to,
    useTilt = true,
    loading = 'lazy',
}) {
    const cardStyle = useBackgroundImage
        ? {
              backgroundImage: image ? `url(${image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
          }
        : {};

    const CardContent = (
        <>
            {useBackgroundImage && <div className={overlayClass}></div>}
            {!useBackgroundImage && image && (
                <img
                    className={imageClass}
                    src={image}
                    alt={title}
                    loading={loading}
                />
            )}

            <div className={contentClass}>
                <h2 className={cardTitleClass}>{title}</h2>
                <p className={cardTextClass}>{description}</p>
                {children}
                {buttonText && (
                    <button className={cardBtnClass} onClick={onButtonClick}>
                        {buttonText}
                    </button>
                )}
            </div>
        </>
    );

    const Component = useTilt ? Tilt : 'div';

    return to ? (
        <NavLink to={to} className={`card-link ${cardClass}`}>
            <Component className={cardClass} style={cardStyle}>
                {CardContent}
            </Component>
        </NavLink>
    ) : (
        <Component className={cardClass} style={cardStyle}>
            {CardContent}
        </Component>
    );
}
