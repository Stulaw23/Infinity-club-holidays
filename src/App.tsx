import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HolidayPackages from './components/HolidayPackages';
import PackageModal from './components/PackageModal';
import ServicesSection from './components/ServicesSection';
import AboutExperience from './components/AboutExperience';
import DestinationsGallery from './components/DestinationsGallery';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import QuotePlannerModal from './components/QuotePlannerModal';
import BugReportModal from './components/BugReportModal';
import RageClickToast from './components/RageClickToast';
import { HolidayPackage } from './types';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [bugReportModalOpen, setBugReportModalOpen] = useState(false);
  const [selectedPackageForQuote, setSelectedPackageForQuote] = useState<string>('');
  const [selectedCategoryForQuote, setSelectedCategoryForQuote] = useState<string>('');
  const [detailModalPackage, setDetailModalPackage] = useState<HolidayPackage | null>(null);

  const handleOpenQuoteModal = (packageOrServiceName?: string, category?: string) => {
    setSelectedPackageForQuote(packageOrServiceName || '');
    setSelectedCategoryForQuote(category || '');
    setQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setQuoteModalOpen(false);
    setSelectedPackageForQuote('');
    setSelectedCategoryForQuote('');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-sky-600 selection:text-white overflow-x-hidden w-full">
      {/* Primary Sticky Header */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Diving & Ocean Imagery and Trip Finder */}
        <Hero onOpenQuoteModal={(cat) => handleOpenQuoteModal('', cat)} />

        {/* 2. Holiday Specials & Packages Card Grid */}
        <HolidayPackages
          onSelectPackage={(pkg) => setDetailModalPackage(pkg)}
          onOpenQuoteModal={(pkgTitle) => handleOpenQuoteModal(pkgTitle)}
        />

        {/* 3. Products & Services Comprehensive Breakdown */}
        <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 4. Destinations Spotlight (Local SA & International) */}
        <DestinationsGallery onOpenQuoteModal={(dest) => handleOpenQuoteModal(dest)} />

        {/* 5. Why Choose Us (21 Years of Travel Experience & Personal Care) */}
        <AboutExperience onOpenQuoteModal={() => handleOpenQuoteModal()} />

        {/* 6. Customer Testimonials & Direct Reviews */}
        <TestimonialsSection />

        {/* 7. Office & Direct Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenQuoteModal={() => handleOpenQuoteModal()} 
        onOpenBugReport={() => setBugReportModalOpen(true)}
      />

      {/* Floating WhatsApp Action Button & Mobile Sticky Bar */}
      <FloatingWhatsApp onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Proactive Feedback / Help Toast */}
      <RageClickToast onOpenBugReport={() => setBugReportModalOpen(true)} />

      {/* Package Detail Modal */}
      <PackageModal
        pkg={detailModalPackage}
        onClose={() => setDetailModalPackage(null)}
        onOpenQuoteModal={(pkgTitle) => {
          setDetailModalPackage(null);
          handleOpenQuoteModal(pkgTitle);
        }}
      />

      {/* Interactive Holiday Planner & Quote Request Modal */}
      <QuotePlannerModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuoteModal}
        initialPackageTitle={selectedPackageForQuote}
        initialCategory={selectedCategoryForQuote}
      />

      {/* Bug Report & Support Diagnostics Modal */}
      <BugReportModal
        isOpen={bugReportModalOpen}
        onClose={() => setBugReportModalOpen(false)}
      />
    </div>
  );
}
