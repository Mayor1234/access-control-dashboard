import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import NotFound from '../pages/NotFound';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/auth/Login';
import ApprovalOversight from '../pages/approval-oversight/ApprovalOversight';
import CommunityManagement from '../pages/community-management/CommunityManagement';
import VisitorLog from '../pages/visitor-log/VisitorLog';
import VisitorDetail from '../components/ui/visitor-log/VisitorDetail';
import ApprovalOversightDetail from '../components/ui/approval-oversight/ApprovalOversightDetail';
import CommunityManagementDetail from '../components/ui/community-management/CommunityManagementDetail';
import StreetDetail from '../components/ui/community-management/street/StreetDetail';
import { Settings } from '../pages/settings/Settings';
import ManageUsers from '../pages/settings/manage-users/ManageUsers';
import UserRoles from '../pages/settings/manage-users/UserRoles';
// import Profile from '../pages/profile/Profile';
import { PersistAuth } from '../shared/utils/PersistAuth';
import ProtectedRoute from '../shared/utils/ProtectedRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<PersistAuth />}>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* Dashboard and main routes */}
            <Route path="dashboard" element={<Dashboard />} />

            {/* Visitor Log */}
            <Route path="visitor-log" element={<VisitorLog />} />
            <Route path="visitor-log/:id" element={<VisitorDetail />} />

            {/* Approval Oversight */}
            <Route path="approval-oversight" element={<ApprovalOversight />} />
            <Route
              path="approval-oversight/:id"
              element={<ApprovalOversightDetail />}
            />

            {/* Community Management */}
            <Route
              path="community-management"
              element={<CommunityManagement />}
            />
            <Route
              path="community-management/:id"
              element={<CommunityManagementDetail />}
            />
            <Route
              path="community-management/street/:streetId"
              element={<StreetDetail />}
            />

            {/* Profile */}
            {/* <Route path="profile" element={<Profile />} /> */}

            {/* Settings with nested routes */}
            <Route path="settings" element={<Settings />}>
              <Route index element={<ManageUsers />} />{' '}
              {/* Default settings page */}
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="user-roles" element={<UserRoles />} />
            </Route>

            {/* Commented out routes */}
            {/* <Route path="analytics-reports" element={<AnalyticsReport />} /> */}
            {/* <Route path="invites" element={<Invites />} /> */}
            {/* <Route path="notifications" element={<Notification />} /> */}
          </Route>
        </Route>
      </Route>

      {/* 404 - Must be last */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
