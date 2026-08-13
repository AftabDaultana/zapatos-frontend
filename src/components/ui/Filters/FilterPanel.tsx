import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAvailableTypes,
  selectAvailableSizes,
  selectAvailableColors,
  selectAvailableRatings,
  selectSelectedTypes,
  selectSelectedSizes,
  selectSelectedColors,
  selectSelectedMinRating,
  selectPriceRange,
  selectMinPrice,
  selectMaxPrice,
} from "../../../app/selectors/catalogSelectors";
import {
  toggleType,
  toggleSize,
  toggleColor,
  setMinRating,
  setPriceRange,
  clearAllFilters,
} from "../../../app/slices/catalogFiltersSlice";
import Button from "../Button";

export default function FilterPanel() {
  const dispatch = useAppDispatch();

  const availableTypes = useAppSelector(selectAvailableTypes);
  const selectedTypes = useAppSelector(selectSelectedTypes);
  const availableSizes = useAppSelector(selectAvailableSizes);
  const selectedSizes = useAppSelector(selectSelectedSizes);
  const availableColors = useAppSelector(selectAvailableColors);
  const selectedColors = useAppSelector(selectSelectedColors);
  const availableRatings = useAppSelector(selectAvailableRatings);
  const minRating = useAppSelector(selectSelectedMinRating);
  const priceRange = useAppSelector(selectPriceRange);
  const minPrice = useAppSelector(selectMinPrice);
  const maxPrice = useAppSelector(selectMaxPrice);

  return (
    <aside className="flex flex-col gap-4">
      <Button
        type="button"
        onClick={() => dispatch(clearAllFilters())}
        className="self-start text-sm font-medium text-neutral-950 underline underline-offset-4"
      >
        CLEAR ALL
      </Button>
      <section className="flex flex-col gap-3">
        <h3 className="font-medium text-neutral-950">PRODUCT TYPES</h3>
        <div className="flex flex-col gap-2">
          {availableTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => dispatch(toggleType(type))}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="font-medium text-neutral-950">PRODUCT SIZES</h3>
        <div className="flex flex-col gap-2">
          {availableSizes
            .slice()
            .sort((a, b) => Number(a) - Number(b))
            .map((size) => (
              <label key={size} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(size)}
                  onChange={() => dispatch(toggleSize(size))}
                />
                <span
                  className={`flex h-10 min-w-10 cursor-pointer items-center justify-center border px-3 text-sm ${
                    selectedSizes.includes(size)
                      ? "border-neutral-950 bg-neutral-950 text-neutral-50"
                      : "border-neutral-300 bg-white text-neutral-950"
                  }`}
                >
                  {size}
                </span>
              </label>
            ))}
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="font-medium text-neutral-950">PRODUCT COLORS</h3>
        <div className="flex flex-col gap-2">
          {availableColors.map((color) => (
            <label key={color} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedTypes.includes(color)}
                onChange={() => dispatch(toggleColor(color))}
              />
              <span
                className={`flex h-10 min-w-10 cursor-pointer items-center justify-center border px-3 text-sm ${
                  selectedColors.includes(color)
                    ? "border-neutral-950 bg-neutral-950 text-neutral-50"
                    : "border-neutral-300 bg-white text-neutral-950"
                }`}
              >
                {color}
              </span>
            </label>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="font-medium text-neutral-950">RATINGS</h3>
        <div className="flex flex-col gap-2">
          {availableRatings.map((rating) => (
            <label key={rating} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={minRating === rating}
                onChange={() =>
                  dispatch(setMinRating(minRating === rating ? null : rating))
                }
              />
              <span>{rating}★ &amp; above</span>
            </label>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="font-medium text-neutral-950">PRICE</h3>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min={priceRange.min ?? undefined}
            max={priceRange.max ?? undefined}
            placeholder={`Min ${priceRange.min?.toLocaleString() ?? ""}`}
            value={minPrice ?? ""}
            onChange={(event) =>
              dispatch(
                setPriceRange({
                  minPrice:
                    event.target.value === ""
                      ? null
                      : Number(event.target.value),
                  maxPrice,
                }),
              )
            }
            className="w-full border border-neutral-300 px-3 py-2 text-sm outline-none"
          />

          <span>-</span>

          <input
            type="number"
            min={priceRange.min ?? undefined}
            max={priceRange.max ?? undefined}
            placeholder={`Max ${priceRange.max?.toLocaleString() ?? ""}`}
            value={maxPrice ?? ""}
            onChange={(event) =>
              dispatch(
                setPriceRange({
                  minPrice,
                  maxPrice:
                    event.target.value === ""
                      ? null
                      : Number(event.target.value),
                }),
              )
            }
            className="w-full border border-neutral-300 px-3 py-2 text-sm outline-none"
          />
        </div>
      </section>
    </aside>
  );
}
