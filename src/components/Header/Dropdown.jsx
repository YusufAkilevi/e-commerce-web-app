import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
export default function Dropdown({ category }) {
  let subCategories = [];
  for (const subCategory of category.subCategories) {
    let endPoint = subCategory;
    let modifiedSubCategory = subCategory
      .split("-")
      .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join(" ");
    subCategories.push([modifiedSubCategory, endPoint]);
  }
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-xl bg-gradient-to-br from-[#ffffff]  px-5 py-2 text-md font-medium text-black hover:bg-[#92a4f7]">
            {category.name}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-7 w-5 text-md text-indigo-500 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="px-1 py-1 ">
              {subCategories.map((subCategory) => {
                return (
                  <Menu.Item key={subCategory[0]}>
                    {({ active }) => (
                      <Link
                        to={subCategory[1]}
                        className={`${
                          active ? "bg-[#eff6ff] text-black" : "text-gray-900"
                        } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                      >
                        {subCategory[0]}
                      </Link>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
