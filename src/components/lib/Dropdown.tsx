interface DropdownProps {
  title: string;
  direction?: 'left' | 'top' | 'right' | 'bottom';
  options: string[];
}

const directionMap = {
  left: 'dropstart',
  top: 'dropup',
  right: 'dropend',
  bottom: 'dropdown',
};

const Dropdown = ({ direction, title, options }: DropdownProps) => {
  return (
    <div className={`${directionMap[direction as keyof typeof directionMap]} relative w-full`}>
      <div
        className="w-full flex flex-row items-center justify-between dropdown-toggle p-5 bg-zinc-200 dark:bg-zinc-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
        id="dropdownMenuButton1u"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        {title}
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-up"
          className="w-2 ml-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512">
          <path
            fill="currentColor"
            d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z" />
        </svg>
      </div>
      <ul
        className="w-full dropdown-menu min-w-max absolute hidden bg-white dark:bg-zinc-900 text-base dark:text-white z-50 float-left py-2 list-none text-left rounded-b-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-[0.5px] border-zinc-700"
        aria-labelledby="dropdownMenuButton1u">
        {
          options.map(option => (
            <li key={option}>
              <a
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
                href="#">
                {option}
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Dropdown;
