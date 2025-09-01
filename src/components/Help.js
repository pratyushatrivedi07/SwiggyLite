const Help = () => {
  return (
    <div className="bg-cyan-700/70 h-dvh dark:bg-gray-800">
      <div className="w-5xl m-auto">
        <h1 className="pt-16 pl-6 text-4xl font-bold text-left text-white">
          Help & Support
        </h1>
        <div className="my-6 border bg-white dark:bg-gray-700 rounded-lg">
          <div className="m-2 p-4">
            <p className="text-center text-3xl/relaxed font-bold dark:text-gray-300">
              How can we help you?
            </p>
            <p className="py-1 text-center text-sm/relaxed w-1/2 m-auto text-gray-500 dark:text-gray-400">
              Here are a few of the questions we get the most. If you don't see
              what's on your mind, reach out to us through{" "}
              <span className="text-red-500 dark:text-cyan-400 font-medium">
                customer support
              </span>
              .
            </p>
          </div>
          <div className="m-2 p-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm dark:text-gray-300">
                What are the mandatory documents needed to list my restaurant?
              </h3>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm dark:text-gray-300">
                What is this one time Onboarding fees? Do I have to pay for it
                while registering?
              </h3>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm dark:text-gray-300">
                Who should I contact if I need help & support in getting
                onboarded?
              </h3>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm dark:text-gray-300">
                What is customer care number?
              </h3>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm dark:text-gray-300">
                Can I edit my order?
              </h3>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm dark:text-gray-300">
                I want to cancel my order
              </h3>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
