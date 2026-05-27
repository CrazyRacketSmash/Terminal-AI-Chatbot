import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Finance", path: "/finance" }
  ];

  return (
    <div className="w-64 border-r border-zinc-800 p-4">

      <h1 className="text-2xl font-bold mb-8">
        Leo Dashboard
      </h1>

      <div className="space-y-2">

        {navItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`
              block
              p-3
              rounded-lg
              transition
              ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }
            `}
          >
            {item.name}
          </Link>

        ))}

      </div>
    </div>
  );
}

export default Sidebar;