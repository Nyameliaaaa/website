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

        {/* links */}
        <section>
          <h2 className="text-xl md:text-3xl font-semibold mb-2">
            <span className="text-pink">{"//"}</span>
            <span className="ml-2">and where do i go next?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link className="bg-surface0 p-2 rounded-xl" href="/about">
              <p className="md:text-2xl text-center">about</p>
            </Link>
            <Link className="bg-surface0 p-2 rounded-xl" href="/projects">
              <p className="md:text-2xl text-center">projects</p>
            </Link>
            <a
              className="bg-surface0 p-2 rounded-xl"
              href="https://github.com/nyameliaaaa"
            >
              <p className="md:text-2xl text-center">github</p>
            </a>
            <a
              className="bg-surface0 p-2 rounded-xl"
              href="https://bsky.app/profile/nyamelia.is-immensely.gay"
            >
              <p className="md:text-2xl text-center">bsky</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
