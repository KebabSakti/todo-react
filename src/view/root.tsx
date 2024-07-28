import { Outlet, useNavigation } from "react-router-dom";

export function Root() {
  const navigation = useNavigation();

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-row justify-center relative">
        <div
          className={`${
            navigation.state === "idle" ? "hidden" : "flex"
          } w-[100%] h-[100%] bg-black absolute opacity-60 justify-center items-center`}
        >
          <div className="text-white font-semibold text-2xl">Loading...</div>
        </div>
        <div className="w-full lg:w-[60%] p-10 flex flex-col gap-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}
