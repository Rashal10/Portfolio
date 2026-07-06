import { Github, Linkedin, Mail } from "lucide-react";
import { contact, links } from "@/data/portfolio";
import { XIcon } from "@/lib/icons";

const socials = [
  { label: "Email", href: links.email, icon: Mail },
  { label: "GitHub", href: links.github, icon: Github },
  { label: "LinkedIn", href: links.linkedin, icon: Linkedin },
  { label: "X / Twitter", href: links.twitter, icon: XIcon },
];

export default function ContactContent() {
  return (
    <div>
      <h2 className="text-base md:text-lg font-bold tracking-widest mb-5 uppercase">
        {contact.title}
      </h2>
      <div className="border-2 border-black p-4 md:p-5 mb-4">
        <p className="text-gray-800">{contact.message}</p>
      </div>
      <div className="border-2 border-black divide-y-2 divide-black">
        {socials.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={label === "Email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-black hover:text-white transition-colors text-xs"
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </div>
      <p className="mt-4 text-[10px] text-gray-500">{links.emailAddress}</p>
    </div>
  );
}
