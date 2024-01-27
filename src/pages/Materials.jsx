import { NavLink, useParams } from "react-router-dom";
import {
    useGetMaterialsBySubjectIdQuery,
    useGetSubjectsByCategoryIdQuery,
} from "../services/aspiAPI";

const Materials = () => {
    const { id: subjectId } = useParams();

    const { isError, isFetching, isLoading, isSuccess, data, refetch } =
        useGetMaterialsBySubjectIdQuery(subjectId);
    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );

    if (isError) {
        return (
            <div className="flex items-center justify-center py-6">
                <p>No Materials found</p>
            </div>
        );
    }

    if (isSuccess && data.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>No Materials found</p>
            </div>
        );
    }

    return (
        <>
            <div className="relative pt-4 pb-10">
                <NavLink
                    // to previous page

                    className="absolute top-0 left-0 text-3xl font-bold text-center hover:text-cyan-900"
                >
                    🔙
                </NavLink>

                <p className="text-xl font-bold text-center ">Materials</p>
            </div>

            {isFetching && <progress className="w-full progress"></progress>}
            <div className="grid gap-2 gap-y-5 lg:gap-6 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
                {isSuccess &&
                    data.map((material) => (
                        <NavLink
                            to={`/material/${material.materialId}`}
                            key={material.materialId}
                            className="item-card"
                        >
                            <div className="relative card-body">
                                <h2 className="justify-center card-title ">
                                    {material.description}
                                </h2>
                                <span className="absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-br-md rounded-tl-md">
                                    {material.fileFormat}
                                </span>
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

export default Materials;
