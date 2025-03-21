"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  // If the first path is 'categories', it should be handled separately
  const isCategoriesPage = pathArray[0] === "categories";

  return (
    <nav className="text-sm py-2 -left-22 fixed">
      <ul className="flex space-x-1 pl-[10.5rem] text-gray-600">
        {/* Home Link */}
        <li>
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        </li>

        {pathArray.length > 0 && (
          <>
            {/* Only show the "Categories" link once */}
            {!isCategoriesPage && (
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <Link href="/Categories" className="text-blue-600 hover:underline">
                  Categories
                </Link>
              </div>
            )}

            {/* Display the rest of the breadcrumbs */}
            {pathArray.map((path, index) => {
              // Skip adding the "Categories" breadcrumb again if it's already in the list
              if (index === 0 && isCategoriesPage) return null;
              
              const url = `/${pathArray.slice(0, index + 1).join("/")}`;
              return (
                <li key={url} className="flex items-center">
                  <span className="mx-2">/</span>
                  <Link href={url} className="text-blue-600 capitalize hover:underline">
                    {decodeURIComponent(path).replace(/-/g, " ")}
                  </Link>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
