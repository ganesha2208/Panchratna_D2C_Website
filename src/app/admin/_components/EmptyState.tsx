import { type LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-4 text-sm font-medium text-gray-900">{title}</div>
      {description && (
        <div className="mt-1 max-w-sm text-sm text-gray-500">{description}</div>
      )}
    </div>
  );
}
