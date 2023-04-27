import React from "react";

export default function Card(props) {
  return (
    <>
      <div className=" my-1 px-1 w-full sm:w-1/2 md:w-1/3 lg:my-4 lg:px-4 lg:w-1/4 2xl:w-1/5">
        <article className="overflow-hidden rounded-lg shadow-lg h-full">
          <a className="" href="/">
            <img
              alt="Placeholder"
              className="block max-h-60 object-cover w-full mx-auto object-center"
              src={props.src}
            />
          </a>

          <div className="bg-gradient-to-r from-[#ff510c] to-[#ff8800] h-full mt-1">
            <header className="text-white flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                <a className="no-underline hover:underline" href="/">
                  {props.name}
                </a>
              </h1>
              <p className="text-grey-darker text-sm">{props.from}</p>
            </header>

            <footer className="text-white flex items-center justify-between leading-none p-2 md:p-4">
              <a
                className="flex items-center no-underline hover:underline"
                href="/"
              >
                <img
                  alt="Placeholder"
                  className="block rounded-full"
                  src="https://picsum.photos/32/32/?random"
                />
                <p className="ml-2 text-sm">{props.male}</p>
              </a>
              <a
                className="no-underline text-grey-darker hover:text-red-dark"
                href="/"
              >
                <span className="hidden">Like</span>
                <i className="fa fa-heart"></i>
              </a>
            </footer>
          </div>
        </article>
      </div>
    </>
  );
}
