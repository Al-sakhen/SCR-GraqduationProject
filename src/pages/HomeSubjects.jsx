import { NavLink } from "react-router-dom";
import {
    useGetAllSubjectsQuery,
    useSearchSubjectByNameQuery,
} from "../services/aspiAPI";
import { useState } from "react";

const MainSubjects = () => {
    const [search, setSearch] = useState("");

    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetAllSubjectsQuery();

    const {
        isError: searchIsError,
        isFetching: searchIsFetching,
        isLoading: searchIsLoading,
        isSuccess: searchIsSuccess,
        error: searchError,
        data: searchData,
    } = useSearchSubjectByNameQuery(search);

    console.log(data);
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
            <div className="flex flex-col items-center justify-between gap-5 pt-4 pb-10 md:flex-row">
                <p className="text-xl font-bold text-center">
                    Select the subject you want
                </p>
                <input
                    type="text"
                    placeholder="Search on subjects..."
                    className="w-full max-w-xs input input-bordered"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {isFetching && <progress className="w-full progress"></progress>}
            <div className="grid gap-2 gap-y-5 lg:gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
                {searchIsSuccess && searchData
                    ? searchData.map((subject) => (
                          <NavLink
                              to={`/subject/${subject.subjectId}/materials`}
                              key={subject.subjectId}
                              className="item-card"
                          >
                              <div className="card-body">
                                  <h2 className="justify-center card-title ">
                                      {subject.subjectName}
                                  </h2>
                              </div>
                          </NavLink>
                      ))
                    : data.map((subject) => (
                          <NavLink
                              to={`/subject/${subject.subjectId}/materials`}
                              key={subject.subjectId}
                              className="item-card"
                          >
                              <div className="card-body">
                                  <h2 className="justify-center card-title ">
                                      {subject.subjectName}
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

export default MainSubjects;
