export default function Location() {
  return (
    <div id="location" className="w-full bg-background bg-contain">
      <div className="py-20 px-6 sm:px-10 md:px-14 lg:px-36 backdrop-blur-md bg-white/90">
        <h2 className="mb-6 text-center text-4xl sm:text-[50px] md-text-[65px] font-bold font-popins sm:leading-[1.4]">
          Locate Us Here
        </h2>
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3912.9572294605623!2d75.815268575049!3d11.264554388915451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDE1JzUyLjQiTiA3NcKwNDknMDQuMiJF!5e0!3m2!1sen!2sin!4v1693665877676!5m2!1sen!2sin"
          width="100%"
          height="450"
          className="mt-6 border border-sky-100 rounded-lg shadow-md"
          loading="eager"
        ></iframe>
      </div>
    </div>
  );
}
