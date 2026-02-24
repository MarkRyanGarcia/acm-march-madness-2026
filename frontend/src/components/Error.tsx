import { Capybara } from "./Capybara";
import { StrokedText } from "./StrokedText";

export default function ErrorPage() {
  return (
    <div className="px-8 mt-16 max-w-3xl mx-auto grid gap-4">
      <div className="bg-background-500 p-6 rounded-xl relative text-xl md:text-2xl font-semibold">
        <StrokedText text="Oops! Something went wrong." />
        <p>
          Please try your request again later, or contact us via the ACM CSUF
          Discord so that we can resolve this issue!
        </p>
        <div className="absolute -bottom-6 right-32 w-8 h-8 rounded-lg bg-background-500 [clip-path:polygon(100%_0,100%_100%,0_0)]" />
      </div>
      <Capybara correct={false} />
    </div>
  );
}
