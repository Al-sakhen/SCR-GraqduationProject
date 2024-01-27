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
            headers.set("Content-Type", "application/json");
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
            query: (searchKeyword) =>
                `Category/SearchCategoryByName?searchKeyword=${searchKeyword}`,
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
            query: () => "Subject/GetAllSubjects",
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
        // ==================== End Subjects ====================
        // *********************************************************

        // ---------------------------------------------------------
        // ==================== Materials ====================
        addMaterial: builder.mutation({
            query: (body) => (
                console.log({ body }),
                {
                    url: "Files/UploadFile",
                    method: "POST",
                    body,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            ),
        }),

        downloadMaterial: builder.query({
            query: (id) => `Files/DownloadFile?materialId=${id}`,
        }),

        getAllMaterials: builder.query({
            query: () => "Material/GetAllMaterials",
        }),

        getMaterialById: builder.query({
            query: (id) => `Material/GetMaterialById?id=${id}`,
        }),

        getMaterialsBySubjectId: builder.query({
            query: (id) => `Subject/GetMaterialBySubjectId?subjectId=${id}`,
        }),

        // /api/Comment/GetCommentByMaterialId
        getCommentsByMaterialId: builder.query({
            query: (id) => `Comment/GetCommentByMaterialId?materialId=${id}`,
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
            query: (body) => (
                console.log({ body }),
                {
                    url: `Comment/DeleteComment?StdId=${body.StdId}&MatId=${body.MatId}`,
                    method: "DELETE",
                }
            ),
        }),
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
} = aspAPI;

// anything starts with "use" called a hook
