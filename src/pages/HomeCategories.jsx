import { Link, NavLink } from "react-router-dom";
import {
    useGetAllCategoriesQuery,
    useSearchCategoryByNameQuery,
} from "../services/aspiAPI";
import { useState } from "react";

const HomeCategories = () => {
    const [search, setSearch] = useState("");

    const {
        isError: searchIsError,
        isFetching: searchIsFetching,
        isLoading: searchIsLoading,
        isSuccess: searchIsSuccess,
        error: searchError,
        data: searchData,
    } = useSearchCategoryByNameQuery(search);
    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetAllCategoriesQuery();

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );

    if (isError) {
        return <div>Error...</div>;
    }

    return (
        <>
            <div className="text-sm breadcrumbs">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>Categories</li>
                </ul>
            </div>
            <div className="flex flex-col items-center justify-between gap-5 pt-4 pb-10 md:flex-row">
                <p className="text-2xl font-bold text-center">Categories</p>
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

export default HomeCategories;
