import Link from "next/link";

const Breadcrumb = () => {
  return (
    <nav className="mb-2">
      <ol className="flex text-sm text-gray-400 divide-x divide-gray-400">
        <li className="px-2 py-1 mr-0.5 transition duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-500 rounded-md">
          <Link href="/">Home</Link>
        </li>
        <li className="px-2 py-1 text-gray-700">Products</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
