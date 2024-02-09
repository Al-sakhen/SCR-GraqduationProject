import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./pages/layout/AppLayout";
import About from "./pages/About";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./pages/admin/layout/AdminLayout";
import Categories from "./pages/admin/layout/Categories";
import Register from "./pages/Register";
import CategoriesEdit from "./pages/admin/layout/Categories/edit";
import Subjects from "./pages/admin/layout/Subjects";
import CreateMaterial from "./pages/layout/materials/CreateMaterial";
import SubjectEdit from "./pages/admin/layout/Subjects/edit";
import DashboardHome from "./pages/admin/DashboardHome";
import HomeSubjects from "./pages/Subjects";
import Materials from "./pages/Materials";
import Material from "./pages/Material";
import AdMaterials from "./pages/admin/layout/Materials";
import MaterialReports from "./pages/admin/layout/Materials/MaterialReports";
import MaterialComments from "./pages/admin/layout/Materials/MaterialComments";
import CategorySubjects from "./pages/admin/layout/CategorySubjects";
import HomeCategories from "./pages/HomeCategories";
import MainSubjects from "./pages/HomeSubjects";
import Profile from "./pages/Profile";
import STDMaterials from "./pages/STDMaterials";
import STDMaterialEdit from "./pages/STDMaterialEdit";
import STDBookmarks from "./pages/STDBookmarks";

function App() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                // theme="dark"
            />

            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/" element={<Home />} />

                {/* =============== User Routes =============== */}
                <Route path="/" element={<AppLayout />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="categories" element={<HomeCategories />} />
                    <Route path="subjects" element={<MainSubjects />} />
                    <Route
                        path="category/:id/subjects"
                        element={<HomeSubjects />}
                    />
                    {/* <Route
                        path="materials/create"
                        element={<CreateMaterial />}
                    /> */}
                    <Route
                        path="subject/:id/materials"
                        element={<Materials />}
                    />
                    <Route path="my-materials" element={<STDMaterials />} />
                    <Route
                        path="material/:id/edit"
                        element={<STDMaterialEdit />}
                    />
                    <Route path="my-bookmarks" element={<STDBookmarks />} />

                    <Route path="material/:id" element={<Material />} />
                </Route>
                {/* =============== End User Routes =============== */}
                {/* ************************************************ */}

                {/* =============== Admin Routes =============== */}
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<DashboardHome />} />

                    {/* -------- Categories  -------- */}
                    <Route path="categories" element={<Categories />} />
                    <Route
                        path="categories/edit/:id"
                        element={<CategoriesEdit />}
                    />

                    {/* -------- Subjects  -------- */}
                    <Route path="subjects" element={<Subjects />} />
                    <Route path="subjects/edit/:id" element={<SubjectEdit />} />

                    {/* -------- materials  -------- */}
                    <Route path="materials" element={<AdMaterials />} />
                    <Route
                        path="materials/:id/reports"
                        element={<MaterialReports />}
                    />
                    <Route
                        path="materials/:id/comments"
                        element={<MaterialComments />}
                    />

                    {/*  --------- Category Subjects ------ */}
                    <Route
                        path="category-subjects"
                        element={<CategorySubjects />}
                    />
                </Route>
                {/* =============== End Admin Routes =============== */}
                {/* ************************************************ */}
            </Routes>
        </>
    );
}

export default App;
