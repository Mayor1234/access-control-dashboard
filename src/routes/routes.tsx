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
import Invites from '../pages/invites/Invites';
import VisitorLog from '../pages/visitor-log/VisitorLog';
import AnalyticsReport from '../pages/analytics-report/AnalyticsReport';
import VisitorDetail from '../components/ui/visitor-log/VisitorDetail';
import ApprovalOversightDetail from '../components/ui/approval-oversight/ApprovalOversightDetail';
import CommunityManagementDetail from '../components/ui/community-management/CommunityManagementDetail';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visitor-log" element={<VisitorLog />} />
        <Route path="/visitor-log/:id" element={<VisitorDetail />} />
        <Route path="/approval-oversight" element={<ApprovalOversight />} />
        <Route
          path="/approval-oversight/:id"
          element={<ApprovalOversightDetail />}
        />
        <Route path="/analytics-reports" element={<AnalyticsReport />} />
        <Route path="/community-management" element={<CommunityManagement />} />
        <Route
          path="/community-management/:id"
          element={<CommunityManagementDetail />}
        />
        <Route path="/invites" element={<Invites />} />
        {/* <Route path="/billing-wallet" element={<BillingWallet />} />
        <Route path="/notifications" element={<Notifications />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
