import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 px-5 border-t border-gray-300">
      <div className="text-center">
        <span className="block text-sm text-center text-foreground">
          © 2024 <Link href="/">NextGen News</Link>. All Rights Reserved. Built
          with ❤️ by{" "}
          <a
            className="text-focus hover:underline"
            href="https://yteruel.fr"
            target="_blank"
          >
            Yoann TERUEL
          </a>
        </span>
      </div>
    </footer>
  );
}
