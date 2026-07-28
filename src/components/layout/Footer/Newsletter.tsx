import backgroundImage from "../../../assets/Frame 1261153404.svg";

function BackgroundImage() {
  return <img src={backgroundImage} />;
}

function Newsletter() {
  return (
    <section className="w-full">
      {/* Background Image */}
      <div>
        <BackgroundImage />
      </div>
      {/* Content */}
    </section>
  );
}

export default Newsletter;
