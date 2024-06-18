import Login from "./Pages/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";
import Home from "./Pages/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./Pages/Navbar/navbar";
import Register from "./Pages/Register/Register";
import JobPostForm from "./Pages/Client/JobPostForm/JobPostForm";
import Profile from "./Pages/Freelancer/Profile";
// added 07/04/2024
import TaskList from "./Pages/TaskList/TaskList";
import TaskPage from "./Pages/TaskPage/TaskPage";
import FreelancerPortfolio from "./Pages/FreelancerPortfolio/FreelancerPortfolio";
import FreelancerSettings from "./Pages/FreelancerSettings.js/FreelancerSettings";
import ClientPostTask from "./Pages/ClientPostTask/ClientPostTask";
import ClientManageTasks from "./Pages/ClientManageTasks/ClientManageTasks";
import ClientManageCondidates from "./Pages/ClientManageCondidates/ClientManageCondidates";
import ClientActiveTasks from "./Pages/ClientActiveTasks/ClientActiveTasks";
import Messages from "./Pages/Messages/Messages";
import { useEffect } from "react";
import { current } from "./redux/actions/Actions";
import Header from "./Components/Dropdown/Header/Header";
import ClientSettings from "./Pages/ClientSettings/ClientSettings";
import FreelancerActiveTask from "./Pages/FreelancerActiveTask/FreelancerActiveTask";
import ShowFreelancer from "./Pages/ShowFreelancers/ShowFreelancer";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import FreelancerList from "./Pages/Admin/FreelancerList/FreelancerList";
import ClientList from "./Pages/Admin/ClientList/ClientList";
import ProcessList from "./Pages/Admin/ProcessList/ProcessList";
import AddReclamation from "./Pages/AddReclamation/AddReclamation";
import Reclamations from "./Pages/Admin/Reclamations/Reclamations";
import ClientDeposit from "./Pages/ClientDeposit/ClientDeposit";
import UserReclamations from "./Pages/UsersReclamations/UsersReclamations";
import PaymentApproval from "./Pages/Admin/Payment/PaymentApproval";
import FreelancerWithdraw from "./Pages/FreelancerWithdraw/FreelancerWithdraw";
import WithdrawList from "./Pages/Admin/WithdrawList/WithdrawList";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.LoginReducer);
  useEffect(() => {
    dispatch(current());
  }, []);

  return (
    <div>
      <Header />
      <div className="margin-top-82">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          {/* <Route
            path="/job-post"
            element={
              <PublicRoute>
                <JobPostForm />
              </PublicRoute>
            }
          /> */}
          {/* <Route
            path="/profile"
            element={
              <PublicRoute>
                <Profile />
              </PublicRoute>
            }
          /> */}
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/task-details/:id" element={<TaskPage />} />
          <Route
            path="/freelancer-details/:id"
            element={<FreelancerPortfolio />}
          />
          <Route
            path="/freelancer-settings"
            element={
              <PrivateRoute user={"freelancer"}>
                <FreelancerSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/freelancer-active-proposal"
            element={
              <PrivateRoute user={"freelancer"}>
                <FreelancerActiveTask />
              </PrivateRoute>
            }
          />
          <Route
            path="/withdraw-request"
            element={
              <PrivateRoute user={"freelancer"}>
                <FreelancerWithdraw />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/withdraw-list"
            element={
              <PrivateRoute user={"admin"}>
                <WithdrawList />
              </PrivateRoute>
            }
          />
          <Route
            path="/post-task"
            element={
              <PrivateRoute user={"client"}>
                <ClientPostTask />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-tasks"
            element={
              <PrivateRoute user={"client"}>
                <ClientManageTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-condidates/:id"
            element={
              <PrivateRoute user={"client"}>
                <ClientManageCondidates />
              </PrivateRoute>
            }
          />
          <Route
            path="/deposit-money"
            element={
              <PrivateRoute user={"client"}>
                <ClientDeposit />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-active-tasks"
            element={
              <PrivateRoute user={"client"}>
                <ClientActiveTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <PrivateRoute user={"both"}>
                <Messages />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/payment-approval"
            element={
              <PrivateRoute user={"admin"}>
                <PaymentApproval />
              </PrivateRoute>
            }
          />
          <Route
            path="/client-settings"
            element={
              <PrivateRoute user={"client"}>
                <ClientSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/freelancer-list"
            element={
              <PrivateRoute user={"client"}>
                <ShowFreelancer />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-reclamation"
            element={
              <PrivateRoute user={"both"}>
                <AddReclamation />
              </PrivateRoute>
            }
          />

          <Route
            path="/forget-password"
            element={
              <PublicRoute>
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/admin/freelancer-list"
            element={
              <PrivateRoute user={"admin"}>
                <FreelancerList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/client-list"
            element={
              <PrivateRoute user={"admin"}>
                <ClientList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/process-list"
            element={
              <PrivateRoute user={"admin"}>
                <ProcessList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/reclamations-list"
            element={
              <PrivateRoute user={"admin"}>
                <Reclamations />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
