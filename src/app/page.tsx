import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="mb-5">
        {/* header :3 */}
        <div className="flex flex-row items-center justify-center px-4 md:px-24 gap-4 md:gap-0">
          <div className="w-1/3">
            <Image
              alt=""
              src="/images/amelia.png"
              className="rounded-full mx-auto"
              width={128 + 64}
              height={128 + 64}
            />
          </div>
          <div className="w-2/3">
            <h1 className="text-pink font-bold text-2xl md:text-5xl">
              amelia rose :3
            </h1>
            <p className="text-md text-subtext0 font-medium md:text-2xl">
              nyamelia
            </p>
            <p className="mt-5 md:mt-7 text-md md:text-2xl font-medium">
              hi :)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
