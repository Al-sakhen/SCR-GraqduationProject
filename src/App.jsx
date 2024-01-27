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
                </Route>

                {/* =============== User Routes =============== */}
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route
                        path="category/:id/subjects"
                        element={<HomeSubjects />}
                    />
                    <Route
                        path="materials/create"
                        element={<CreateMaterial />}
                    />
                    <Route
                        path="subject/:id/materials"
                        element={<Materials />}
                    />
                    <Route path="material/:id" element={<Material />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
