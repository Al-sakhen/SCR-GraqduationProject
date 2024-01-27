import { NavLink, useParams } from "react-router-dom";
import { useGetSubjectsByCategoryIdQuery } from "../services/aspiAPI";

const HomeSubjects = () => {
    const { id } = useParams();

    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetSubjectsByCategoryIdQuery(id);

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );

    if (isError) {
        return (
            <div className="flex items-center justify-center py-6">
                <p>No subjects found</p>
            </div>
        );
    }

    if (isSuccess && data.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>No subjects found</p>
            </div>
        );
    }

    return (
        <>
            <div className="relative pt-4 pb-10">
                <NavLink
                    to="/"
                    className="absolute top-0 left-0 text-3xl font-bold text-center hover:text-cyan-900"
                >
                    🔙
                </NavLink>

                <p className="text-xl font-bold text-center ">
                    Select the subject you want
                </p>
            </div>

            {isFetching && <progress className="w-full progress"></progress>}
            <div className="grid gap-2 gap-y-5 lg:gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
                {isSuccess &&
                    data.map((subject) => (
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
                    <p>No subjects found</p>
                </div>
            )}
        </>
    );
};

export default HomeSubjects;
