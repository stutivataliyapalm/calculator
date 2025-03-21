import { useRouter } from "next/router";
import Link from "next/link";

const sidebarData = {
  "BasicCalculators": [
    "AverageCalculator",
    "DateCalculator",
    "ExponentCalculator",
    "LogCalculator",
  ],
  "CalculateHours": [],
  "CircleCalculator": [],
  "GpaCalculator": [],
  "IPSubnetCalculator": [],
  "PercentageCalculator": [],
  "RandomNumber": [],
  "RandomPassword": [],
  "RootCalculator": [],
};

const Sidebar = ({ category }) => {
  const router = useRouter();
  const items = sidebarData[category] || []; 

  return (
    <aside className="w-1/4 p-4 bg-gray-100 h-screen">
      <h2 className="text-xl font-bold mb-4">{category.replace("-", " ")}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <Link href={`/app/${category}/${item}`}>
              <span className="cursor-pointer text-blue-600 hover:underline">
                {item.replace(/([A-Z])/g, " $1").trim()} {/* Format text */}
              </span>
          
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;