import { NavLink } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

const Home = () => {
    return (
        <>
            <AppLayout>
                <div
                    className="min-h-[700px] hero"
                    style={{
                        backgroundImage:
                            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
                    }}
                >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="text-center hero-content text-neutral-content">
                        <div className="max-w-md">
                    
                            <h1 className="mb-5 text-2xl">
                                We welcome students to our SRC website to help
                                you for easy reach for all the material you want
                            </h1>
                            <NavLink to={"/categories"} className="btn btn-primary">
                                Get Started
                            </NavLink>
                        </div>
                    </div>
                </div>

                <section className="container">
                    <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-bold sm:text-4xl">
                                What makes us special
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
                            <div className="flex items-start gap-4 p-3 duration-500 shadow-xl hover:-translate-y-2 hover:shadow-md">
                                <span className="p-4 rounded-lg bg-secondary shrink-0">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="mt-1 font-bold text-md">
                                        a website to be easy to use for all
                                        students
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3 duration-500 shadow-xl hover:-translate-y-2 hover:shadow-md">
                                <span className="p-4 rounded-lg bg-secondary shrink-0">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="mt-1 font-bold text-md">
                                        easy reach for material
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3 duration-500 shadow-xl hover:-translate-y-2 hover:shadow-md">
                                <span className="p-4 rounded-lg bg-secondary shrink-0">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="mt-1 font-bold text-md">
                                        help students for what is needed{" "}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-3 duration-500 shadow-xl hover:-translate-y-2 hover:shadow-md">
                                <span className="p-4 rounded-lg bg-secondary shrink-0">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    <p className="mt-1 font-bold text-md">
                                        works for all majors{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AppLayout>
        </>
    );
    return (
        <>
            <div className="flex flex-col items-center justify-between gap-5 pt-4 pb-10 md:flex-row">
                <p className="text-xl font-bold text-center">
                    Select the category you want
                </p>
                <input
                    type="text"
                    placeholder="Search on categories..."
                    className="w-full max-w-xs input input-bordered"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {isFetching && <progress className="w-full progress"></progress>}
            <div className="grid gap-2 gap-y-5 lg:gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
                {searchIsSuccess && searchData
                    ? searchData.map((category) => (
                          <NavLink
                              to={`/category/${category.catId}/subjects`}
                              key={category.catId}
                              className="item-card"
                          >
                              <div className="card-body">
                                  <h2 className="justify-center card-title ">
                                      {category.catName}
                                  </h2>
                              </div>
                          </NavLink>
                      ))
                    : data.map((category) => (
                          <NavLink
                              to={`/category/${category.catId}/subjects`}
                              key={category.catId}
                              className="item-card"
                          >
                              <div className="card-body">
                                  <h2 className="justify-center card-title ">
                                      {category.catName}
                                  </h2>
                              </div>
                          </NavLink>
                      ))}
            </div>
            {isSuccess && data.length === 0 && (
                <div className="flex items-center justify-center ">
                    <p>No materials found</p>
                </div>
            )}
        </>
    );
};

export default Home;
