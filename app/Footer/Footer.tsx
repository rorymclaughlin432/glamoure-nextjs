import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-success p-10 text-neutral-content">
        <div className="footer m-auto max-w-7xl">
          <div>
            <span className="footer-title">Services</span>
            <a className="link-hover link">Branding</a>
            <a className="link-hover link">Design</a>
            <a className="link-hover link">Marketing</a>
            <a className="link-hover link">Advertisement</a>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <Link href={`/AboutUs/`} className="link-hover link">About Us</Link>
            <a className="link-hover link">Contact</a>
            <a className="link-hover link">Jobs</a>
            <a className="link-hover link">Press kit</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link-hover link">Terms of use</a>
            <a className="link-hover link">Privacy policy</a>
            <a className="link-hover link">Cookie policy</a>
          </div>
        </div>
      </footer>
    );
  }