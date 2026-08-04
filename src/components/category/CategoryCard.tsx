import Button from "../ui/Button";

interface CategoryCardProps {
  title: string;
  image: string;

  buttonIcon?: React.ReactNode;

  cardClassName?: string;
  overlayClassName?: string;
  buttonContainerClassName?: string;
  buttonClassName?: string;
}

export default function CategoryCard({
  title,
  image,
  buttonIcon,
  cardClassName = "",
  overlayClassName = "",
  buttonContainerClassName = "",
  buttonClassName = "",
}: CategoryCardProps) {
  return (
    <div className={`group relative ${cardClassName} overflow-hidden`}>
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <img src={image} alt={title} className="h-full w-full object-cover" />
      <div className={`${buttonContainerClassName}`}>
        <Button type="button" className={`${buttonClassName}`}>
          {title}
          {buttonIcon}
        </Button>
      </div>
    </div>
  );
}
