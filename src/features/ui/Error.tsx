import errorImage from "/notFound.svg";
export default function Error() {
  return (
    <div>
      <img
        src={errorImage}
        alt="Not found image."
        className="mx-auto mt-24 max-w-2xl"
      />
      <h2 className="pt-24 text-center text-3xl text-slate-100">Not Found.</h2>
    </div>
  );
}
