import Button from "./Button";

interface BannerCardProps {
  title?: string;
  description?: string;

  image: string;
  imageClassName?: string;

  buttonText?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;

  cardClassName?: string;
  overlayClassName?: string;

  contentContainerClassName?: string;
  textContainerClassName?: string;

  titleClassName?: string;
  descriptionClassName?: string;

  buttonInsideContent?: boolean;

  buttonContainerClassName?: string;
  buttonClassName?: string;
  buttonVariant?: "none" | "dark" | "light";
}

export default function BannerCard({
  title,
  image,
  imageClassName = "",
  description,
  buttonText = "",
  buttonIcon,
  onButtonClick,
  cardClassName = "",
  overlayClassName = "",
  contentContainerClassName = "",
  textContainerClassName,
  titleClassName = "",
  descriptionClassName = "",
  buttonInsideContent,
  buttonContainerClassName = "",
  buttonClassName = "",
  buttonVariant,
}: BannerCardProps) {
  const resolvedButtonVariant =
    buttonVariant ??
    (buttonClassName.includes("bg-neutral-950") ||
    buttonClassName.includes("bg-black")
      ? "dark"
      : buttonClassName.includes("bg-white") ||
          buttonClassName.includes("border")
        ? "light"
        : "none");

  return (
    <div className={`group relative overflow-hidden ${cardClassName}`}>
      <img
        src={image}
        alt={title ?? buttonText}
        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageClassName}`}
        loading="lazy"
      />

      <div
        className={`absolute inset-0 transition-opacity duration-300 group-hover:opacity-90 ${overlayClassName}`}
      />

      <div className={contentContainerClassName}>
        <div className={textContainerClassName}>
          {title && <h5 className={titleClassName}>{title}</h5>}

          {description && (
            <span className={descriptionClassName}>{description}</span>
          )}
        </div>

        {buttonInsideContent && buttonText && (
          <div className={buttonContainerClassName}>
            <Button
              type="button"
              variant={resolvedButtonVariant}
              className={buttonClassName}
              onClick={onButtonClick}
            >
              {buttonText}
              {buttonIcon}
            </Button>
          </div>
        )}
      </div>

      {!buttonInsideContent && buttonText && (
        <div className={buttonContainerClassName}>
          <Button
            type="button"
            variant={resolvedButtonVariant}
            className={buttonClassName}
            onClick={onButtonClick}
          >
            {buttonText}
            {buttonIcon}
          </Button>
        </div>
      )}
    </div>
  );
}
