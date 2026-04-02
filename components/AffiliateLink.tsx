import { ExternalLink } from "lucide-react";

interface AffiliateLinkProps {
  href: string;
  label: string;
  description?: string;
}

export default function AffiliateLink({
  href,
  label,
  description,
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group flex items-center justify-between rounded-xl bg-peach/20 p-4 transition-all hover:bg-peach/40 hover:shadow-sm"
    >
      <div>
        <span className="font-semibold text-espresso group-hover:text-bronzed-gold transition-colors">
          {label}
        </span>
        {description && (
          <p className="mt-0.5 text-sm text-espresso/60">{description}</p>
        )}
      </div>
      <ExternalLink className="h-4 w-4 flex-shrink-0 text-bronzed-gold opacity-60 group-hover:opacity-100" />
    </a>
  );
}
