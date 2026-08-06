import Button from "./Button";

interface BannerCardProps {
  title?: string;
  description?: string;

  image: string;
  imageClassName?: string;

  buttonText?: string;
  buttonIcon?: React.ReactNode;

  cardClassName?: string;
  overlayClassName?: string;

  contentContainerClassName?: string;
  textContainerClassName?: string;

  titleClassName?: string;
  descriptionClassName?: string;

  buttonInsideContent?: boolean;

  buttonContainerClassName?: string;
  buttonClassName?: string;
}

export default function BannerCard({
  title,
  image,
  imageClassName = "",
  description,
  buttonText = "",
  buttonIcon,
  cardClassName = "",
  overlayClassName = "",
  contentContainerClassName = "",
  textContainerClassName,
  titleClassName = "",
  descriptionClassName = "",
  buttonInsideContent,
  buttonContainerClassName = "",
  buttonClassName = "",
}: BannerCardProps) {
  return (
    <div className={`group relative ${cardClassName} overflow-hidden`}>
      <img
        src={image}
        alt={title ?? buttonText}
        className={`h-full w-full object-cover ${imageClassName}`}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className={contentContainerClassName}>
        <div className={textContainerClassName}>
          {title && <h5 className={titleClassName}>{title}</h5>}
          {description && (
            <span className={descriptionClassName}>{description}</span>
          )}
        </div>
        {buttonInsideContent && buttonText && (
          <div className={buttonContainerClassName}>
            <Button type="button" className={buttonClassName}>
              {buttonText}
              {buttonIcon}
            </Button>
          </div>
        )}
      </div>
      {!buttonInsideContent && buttonText && (
        <div className={buttonContainerClassName}>
          <Button type="button" className={buttonClassName}>
            {buttonText}
            {buttonIcon}
          </Button>
        </div>
      )}
    </div>
  );
}
