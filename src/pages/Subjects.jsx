import { NavLink, useParams, Link } from "react-router-dom";
import { useGetSubjectsByCategoryIdQuery } from "../services/aspiAPI";
import { useGetCategoryByIdQuery } from "../services/aspiAPI";

const HomeSubjects = () => {
    const { id } = useParams();

    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetSubjectsByCategoryIdQuery(id);

    const {
        isError: isCategoryError,
        isLoading: isCategoryLoading,
        isSuccess: isCategorySuccess,
        data: categoryData,
    } = useGetCategoryByIdQuery(id);

    console.log({ categoryData });
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
            {isCategorySuccess && (
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/categories">{categoryData.catName}</Link>
                        </li>
                        <li>Subjects</li>
                    </ul>
                </div>
            )}
            <div className="relative pt-4 pb-10">
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
