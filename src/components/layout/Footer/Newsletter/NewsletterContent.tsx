export default function NewsletterContent() {
  return (
    <div className="relative z-10 flex flex-col max-w-264.5 items-center gap-6 sm:max-w-173">
      <div className="flex flex-col gap-2">
        {/* Heading */}
        <p className="text-center text-neutral-100 text-3xl leading-9 font-semibold italic sm:text-4xl sm:leading-10 lg:text-6xl lg:leading-14.5 lg:py">
          Subscribe to our newsletter for
          <br className="hidden sm:block" /> early access, special deals, and{" "}
          <br className="hidden sm:block" /> the latest trends.
        </p>
        {/* Sub-heading */}
        <p className="text-center text-neutral-100 text-lg leading-7 font-medium lg:text-2xl lg:leading-8">
          Subscribe to our newsletter for early access, special deals,
          <br className="hidden sm:block" /> and the latest trends.
        </p>
      </div>
    </div>
  );
}
