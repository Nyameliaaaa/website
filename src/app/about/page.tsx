// import Image from "next/image";
import Link from "next/link";

const basicInfo = [
  "im a 16 y/o trans girl",
  "i use she/her pronouns",
  "i am a certified girlkisser",
];
const trivialInfo = ["i am a titan main in d2 (bc im cool and based) but i like warlock too"];

export default function Home() {
  return (
    <div>
      <div className="mb-5">
        {/* little about me */}
        <section className="mb-3">
          <h2 className="text-xl md:text-3xl font-semibold mb-2">
            <span className="text-pink">{"//"}</span>
            <span className="ml-2">basic info</span>
          </h2>

          <ul className="list-disc list-inside">
            {basicInfo.map((x) => (
              <li className="text-md md:text-2xl" key={x}>
                {x}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-3">
          <h2 className="text-xl md:text-3xl font-semibold mb-2">
            <span className="text-pink">{"//"}</span>
            <span className="ml-2">fun facts</span>
          </h2>

          <ul className="list-disc list-inside">
            {trivialInfo.map((x) => (
              <li className="text-md md:text-2xl" key={x}>
                {x}
              </li>
            ))}
          </ul>
        </section>

        <Link href="/" className="text-md md:text-xl hover:text-pink">
          ok nice now go back
        </Link>
      </div>
    </div>
  );
}
