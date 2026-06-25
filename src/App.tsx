import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { MobileNav } from './components/layout/MobileNav';
import {
  LandingPage,
  ProfilePage,
  AboutPage,
  ContactPage,
  DiscoverPage,
  SalonDetailPage,
  BookingPage,
  DashboardPage,
  AdminDashboardPage,
  AIFeaturesPage,
  StudentDealsPage,
  ForSalonsPage,
  LoginPage,
  SignupPage,
  GlowScorePage,
  BridalPlannerPage,
  InterviewPlannerPage,
  OccasionPlannerPage,
  WomenOwnedPage,
  BeautyTrendsPage,
  BookingSuccessPage,
  NotFoundPage,
  FaceAnalysisPage,
  BudgetPlannerPage,
  BeautyJourneyPage,
  SalonHeatmapPage,
  VirtualStylePage,
  OAuthCallbackPage,
  AddSalonPage,
  PricingPage,
  SuccessStoriesPage,
  PartnerResourcesPage,
  CareersPage,
  JobDetailsPage,
  LeadershipPage,
  BlogPage,
  BlogPostPage,
} from './pages';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { GlobalBackground } from './components/layout/GlobalBackground';

function AppContent() {
  const location = useLocation();
  const hideMobileNav = ['/login', '/signup', '/admin', '/booking-success'].some(
    (path) => location.pathname.startsWith(path)
  );

  return (
    <>
      <GlobalBackground />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/salon/:id" element={<SalonDetailPage />} />
        <Route path="/booking/:salonId" element={<BookingPage />} />
        <Route path="/booking-success" element={<BookingSuccessPage />} />
        
        {/* Protected Customer Routes */}
        <Route element={<ProtectedRoute allowedRoles={['customer', 'salon_owner']} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/add-salon" element={<AddSalonPage />} />
        </Route>

        <Route path="/ai-features" element={<AIFeaturesPage />} />
        <Route path="/glow-score" element={<GlowScorePage />} />
        <Route path="/bridal-planner" element={<BridalPlannerPage />} />
        <Route path="/interview-planner" element={<InterviewPlannerPage />} />
        <Route path="/occasion-planner" element={<OccasionPlannerPage />} />
        <Route path="/student-deals" element={<StudentDealsPage />} />
        <Route path="/women-owned" element={<WomenOwnedPage />} />
        <Route path="/beauty-trends" element={<BeautyTrendsPage />} />
        <Route path="/for-salons" element={<ForSalonsPage />} />
        <Route path="/face-analysis" element={<FaceAnalysisPage />} />
        <Route path="/budget-planner" element={<BudgetPlannerPage />} />
        <Route path="/beauty-journey" element={<BeautyJourneyPage />} />
        <Route path="/salon-heatmap" element={<SalonHeatmapPage />} />
        <Route path="/virtual-style" element={<VirtualStylePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/partner-resources" element={<PartnerResourcesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/:id" element={<JobDetailsPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/oauth-callback" element={<OAuthCallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!hideMobileNav && <MobileNav />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <ToastProvider>
          <Router>
            <AppContent />
          </Router>
        </ToastProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
