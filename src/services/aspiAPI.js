import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aspAPI = createApi({
    reducerPath: "aspAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7242/api/",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // ---------------------------------------------------------
        // ==================== Auth ====================
        login: builder.mutation({
            query: (body) => ({
                url: "Auth/Login",
                method: "POST",
                body,
            }),
        }),

        register: builder.mutation({
            query: (body) => ({
                url: "Auth/Register",
                method: "POST",
                body,
            }),
        }),
        // ==================== End Auth ====================
        // *********************************************************

        // ---------------------------------------------------------
        // ==================== Categories ====================
        addCategory: builder.mutation({
            query: (body) => ({
                url: "Category/AddCategory",
                method: "POST",
                body,
            }),
        }),

        getAllCategories: builder.query({
            query: () => "Category/GetAllCategories",
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `Category/DeleteCategory?CatId=${id}`,
                method: "DELETE",
            }),
        }),
        getCategoryById: builder.query({
            query: (id) => `Category/GetCategoryById?id=${id}`,
        }),
        updateCategoryName: builder.mutation({
            query: (body) => ({
                url: `Category/UpdateCategoryName`,
                method: "PUT",
                body,
            }),
        }),

        searchCategoryByName: builder.query({
            query: (searchKeyword) => {
                let baseQuery = "Category/SearchCategoryByName";
                if (searchKeyword) {
                    baseQuery += `?searchKeyword=${searchKeyword}`;
                }
                return baseQuery;
            },
        }),
        // ==================== End Categories ====================
        // *********************************************************

        // ---------------------------------------------------------
        // ==================== Subjects ====================
        addSubject: builder.mutation({
            query: (body) => ({
                url: "Subject/AddSubject",
                method: "POST",
                body,
            }),
        }),
        getAllSubjects: builder.query({
            query: (body) => `Subject/GetAllSubjects`,
        }),
        deleteSubject: builder.mutation({
            query: (id) => ({
                url: `Subject/DeleteSubject?id=${id}`,
                method: "DELETE",
            }),
        }),

        updateSubjectName: builder.mutation({
            query: (body) => ({
                url: `Subject/UpdateSubjectName`,
                method: "PUT",
                body,
            }),
        }),

        getSubjectById: builder.query({
            query: (id) => `Subject/GetSubjectById?id=${id}`,
        }),

        getSubjectsByCategoryId: builder.query({
            query: (id) => `Subject/GetSubjectsByCategoryId?categoryId=${id}`,
        }),
        searchSubjectByName: builder.query({
            query: (searchKeyword) => {
                let baseQuery = "Subject/SearchSubjectByName";
                if (searchKeyword) {
                    baseQuery += `?searchKeyword=${searchKeyword}`;
                }
                return baseQuery;
            },
        }),
        // ==================== End Subjects ====================
        // *********************************************************

        // ---------------------------------------------------------
        // ==================== Materials ====================
        addMaterial: builder.mutation({
            query: (body) => ({
                url: "Files/UploadFile",
                method: "POST",
                body,
                prepareHeaders: (headers) => {
                    headers.set("Content-Type", "multipart/form-data");
                    return headers;
                },
            }),
        }),
        downloadMaterial: builder.query({
            query: (id) => ({
                url: `Files/DownloadFile?materialId=${id}`,
                responseHandler: async (response) => {
                    const contentType = response.headers.get("content-type");
                    const contentDisposition = response.headers.get(
                        "content-disposition"
                    );
                    const blob = await response.blob();
                    return { blob, contentType, contentDisposition };
                },
            }),
        }),
        getAllMaterials: builder.query({
            query: () => "Material/GetAllMaterials",
        }),

        getMaterialById: builder.query({
            query: (id) => `Material/GetMaterialById?id=${id}`,
        }),

        getMaterialsBySubjectId: builder.query({
            query: ({ subjectId, filterBy }) =>
                `Subject/GetMaterialBySubjectId?subjectId=${subjectId}&filterByFileFormat=${filterBy}`,
        }),

        getCommentsByMaterialId: builder.query({
            query: (id) => `Comment/GetCommentByMaterialId?materialId=${id}`,
        }),

        getMaterialsByStdId: builder.query({
            query: (id) => `Material/GetMaterialsByStdId?stdId=${id}`,
        }),

        updateMaterialDescription: builder.mutation({
            query: (body) => ({
                url: "Material/UpdateMaterialDescription",
                method: "PUT",
                body,
            }),
        }),

        deleteMaterial: builder.mutation({
            query: (id) => ({
                url: `Material/DeleteMaterial?MatId=${id}`,
                method: "DELETE",
            }),
        }),
        // ==================== End Materials ====================
        // *********************************************************

        // ---------------------------------------------------------
        // ==================== Comments ====================
        addComment: builder.mutation({
            query: (body) => ({
                url: "Comment/AddComment",
                method: "POST",
                body,
            }),
        }),

        deleteComment: builder.mutation({
            query: (body) => ({
                url: `Comment/DeleteComment?StdId=${body.StdId}&MatId=${body.MatId}`,
                method: "DELETE",
            }),
        }),
        // ==================== End Comments ====================
        // *********************************************************

        // ---------------------------------------------------------
        // ==================== Reports ====================
        addReport: builder.mutation({
            query: (body) => ({
                url: "Report/AddReport",
                method: "POST",
                body,
            }),
        }),

        getReportsByMaterialId: builder.query({
            query: (id) => `Report/GetReportsByMaterialId?materialId=${id}`,
        }),

        deleteReport: builder.mutation({
            query: (body) => ({
                url: `Report/DeleteReport?StdId=${body.StdId}&MatId=${body.MatId}`,
                method: "DELETE",
            }),
        }),
        // ==================== End Reports ====================
        // *********************************************************

        // ---------------------------------------------------------
        // ==================== SubjectCategory ====================
        addSubjectCategory: builder.mutation({
            query: (body) => ({
                url: "SubCat/AddSubCat",
                method: "POST",
                body,
            }),
        }),
        // ==================== End SubjectCategory ====================
        // *********************************************************

        // ---------------------------------------------------------
        // ==================== Student Info ====================
        getStudentInfo: builder.query({
            query: (id) => `StudentsInfo/GetStudentInfo?studentId=${id}`,
        }),

        updateStudentInfo: builder.mutation({
            query: (body) => ({
                url: "StudentsInfo/UpdateStudentInfo",
                method: "PUT",
                body,
            }),
        }),
        // ==================== End Student Info ====================
        // *********************************************************

        // ---------------------------------------------------------
        // ==================== Bookmark ====================
        addBookmark: builder.mutation({
            query: (body) => ({
                url: "Bookmark/AddBookmark",
                method: "POST",
                body,
            }),
        }),
        getBookmarksByStdId: builder.query({
            query: (id) => `Bookmark/GetBookMarkById?stdId=${id}`,
        }),

        // /api/Bookmark/DeleteBookmark
        removeBookmark: builder.mutation({
            query: (body) => ({
                url: `Bookmark/DeleteBookmark?StdId=${body.StdId}&MatId=${body.MatId}`,
                method: "DELETE",
            }),
        }),
        // ==================== End Bookmark ====================
        // *********************************************************

        // ---------------------------------------------------------
        // ==================== Rate ====================
        addRate: builder.mutation({
            query: (body) => ({
                url: "Rate/AddRate",
                method: "POST",
                body,
            }),
        }),


        getAverageRatesByMaterialId: builder.query({
            query: (id) => `Rate/GetAverageRatesByMaterialId?materialId=${id}`,
        }),

        // ==================== End Rate ====================
        // *********************************************************
    }),
});

export const {
    useLoginMutation,
    useAddCategoryMutation,
    useRegisterMutation,
    useGetAllCategoriesQuery,
    useDeleteCategoryMutation,
    useGetCategoryByIdQuery,
    useUpdateCategoryNameMutation,
    useGetAllSubjectsQuery,
    useAddSubjectMutation,
    useDeleteSubjectMutation,
    useGetAllMaterialsQuery,
    useAddMaterialMutation,
    useUpdateSubjectNameMutation,
    useGetSubjectByIdQuery,
    useGetSubjectsByCategoryIdQuery,
    useSearchCategoryByNameQuery,
    useGetMaterialsBySubjectIdQuery,
    useGetMaterialByIdQuery,
    useDownloadMaterialQuery,
    useGetCommentsByMaterialIdQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useAddReportMutation,
    useGetReportsByMaterialIdQuery,
    useDeleteReportMutation,
    useAddSubjectCategoryMutation,
    useSearchSubjectByNameQuery,
    useGetStudentInfoQuery,
    useUpdateStudentInfoMutation,
    useAddBookmarkMutation,
    useGetMaterialsByStdIdQuery,
    useUpdateMaterialDescriptionMutation,
    useGetBookmarksByStdIdQuery,
    useRemoveBookmarkMutation,
    useAddRateMutation,
    useGetAverageRatesByMaterialIdQuery,
    useDeleteMaterialMutation,
} = aspAPI;
