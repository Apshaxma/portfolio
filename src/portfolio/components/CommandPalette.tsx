import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Copy,
  ExternalLink,
  FileText,
  FolderGit2,
  Mail,
  Navigation,
} from "lucide-react";
import { NAV_LINKS, PROFILE, PROJECTS } from "../data";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const scrollTo = (id: string) => {
    onOpenChange(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email).catch(() => {});
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {NAV_LINKS.map((link) => (
            <CommandItem key={link.id} onSelect={() => scrollTo(link.id)}>
              <Navigation className="size-4" />
              {link.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {PROJECTS.map((project) => (
            <CommandItem key={project.id} onSelect={() => scrollTo("projects")}>
              <FolderGit2 className="size-4" />
              {project.title}
              <span className="text-xs text-muted-foreground">
                {project.categoryLabel}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => window.open(PROFILE.github, "_blank", "noopener")}
          >
            <ExternalLink className="size-4" />
            Open GitHub
          </CommandItem>
          <CommandItem
            onSelect={() => window.open(PROFILE.linkedin, "_blank", "noopener")}
          >
            <ExternalLink className="size-4" />
            Open LinkedIn
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              window.location.href = PROFILE.resumePath;
            }}
          >
            <FileText className="size-4" />
            View Resume
          </CommandItem>
          <CommandItem onSelect={copyEmail}>
            <Copy className="size-4" />
            Copy email address
            <span className="ml-auto font-mono text-xs text-muted-foreground">
              {PROFILE.email}
            </span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              onOpenChange(false);
              scrollTo("contact");
            }}
          >
            <Mail className="size-4" />
            Go to contact form
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
