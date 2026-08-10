export type AdminNavigationItem = {
  label: string;
  href: string;
};

export const adminNavigation: AdminNavigationItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
  },
  {
    label: "Machines",
    href: "/admin/machines",
  },
  {
    label: "Installations",
    href: "/admin/installations",
  },
  {
    label: "Media",
    href: "/admin/media",
  },
  {
    label: "Service Centres",
    href: "/admin/service-centres",
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
  },
  {
    label: "SEO",
    href: "/admin/seo",
  },
  {
    label: "Settings",
    href: "/admin/settings",
  },
];