// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="mb-5">
        {/* little about me */}
        <section className="mb-3">
          <h2 className="text-xl md:text-3xl font-semibold mb-2">
            <span className="text-pink">{"//"}</span>
            <span className="ml-2">so who are you?</span>
          </h2>

          <p className="text-md md:text-2xl">
            hi im a basic transfem bitch im 16 and i use she/her pronouns
          </p>
        </section>

        <Link href="/" className="text-md md:text-xl hover:text-pink">
          ok nice now go back
        </Link>
      </div>
    </div>
  );
}
