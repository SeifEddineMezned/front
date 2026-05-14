import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const MediaClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    {src.endsWith(".mp4") ? (
      <video src={src} autoPlay loop muted playsInline className="size-full object-cover" />
    ) : (
      <img src={src} className="size-full object-cover" />
    )}
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <MediaClipBox
            src="videos/xowy.mp4"
            clipClass="contact-clip-path-1"
          />
          <MediaClipBox
            src="videos/xi.mp4"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <MediaClipBox
            src="videos/feature-4.mp4"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Ready to See Differently?
          </p>

          <AnimatedTitle
            title="XowME is the f<b>u</b>ture of <br /> h<b>u</b>man-AI c<b>o</b>llaborati<b>o</b>n."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button title="Try XowME Now" containerClass="mt-10 cursor-pointer" onClick={() => window.location.href = '/coming-soon'} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
