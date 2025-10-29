
import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import BlogSection from './components/BlogSection';
import BlogDetail from './components/BlogDetail';
import BlogAdmin from './components/BlogAdmin';
import KnowledgeSection from './components/KnowledgeSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import { BlogPost } from './types';

type ViewMode = 'home' | 'blog' | 'blog-detail' | 'blog-admin';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const sections = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    blog: useRef<HTMLDivElement>(null),
    knowledge: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: keyof typeof sections) => {
    if (section === 'blog') {
      setCurrentView('blog');
      return;
    }
    sections[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBlogPostSelect = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView('blog-detail');
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
    setCurrentView('blog');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedPost(null);
    setEditingPost(null);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setCurrentView('blog-admin');
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentView('blog-admin');
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      // TODO: Implement delete functionality
      console.log('Delete post:', postId);
    }
  };

  const handleSavePost = (postData: Omit<BlogPost, 'id' | 'publishedDate'>) => {
    // TODO: Implement save functionality
    console.log('Save post:', postData);
    setCurrentView('blog');
    setEditingPost(null);
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'blog':
        return (
          <div ref={sections.blog}>
            <BlogSection
              onSelectPost={handleBlogPostSelect}
              onCreatePost={isAdminMode ? handleCreatePost : undefined}
              onEditPost={isAdminMode ? handleEditPost : undefined}
              onDeletePost={isAdminMode ? handleDeletePost : undefined}
              isAdmin={isAdminMode}
            />
          </div>
        );
      
      case 'blog-detail':
        return selectedPost ? (
          <BlogDetail
            post={selectedPost}
            onBack={handleBackToBlog}
            onEdit={isAdminMode ? handleEditPost : undefined}
            onDelete={isAdminMode ? handleDeletePost : undefined}
            isAdmin={isAdminMode}
          />
        ) : null;
      
      case 'blog-admin':
        return (
          <BlogAdmin
            onSave={handleSavePost}
            onClose={() => setCurrentView('blog')}
            editingPost={editingPost}
          />
        );
      
      default:
        return (
          <>
            <div ref={sections.home}>
              <Hero onOpenModal={openModal} />
            </div>
            <div ref={sections.about}>
              <AboutSection />
            </div>
            <div ref={sections.services}>
              <ServicesSection />
            </div>
            <div ref={sections.knowledge}>
              <KnowledgeSection />
            </div>
            <div ref={sections.testimonials}>
              <TestimonialsSection />
            </div>
            <div ref={sections.contact}>
              <ContactSection />
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-light font-sans text-dark min-h-screen">
      <Header onNavigate={scrollToSection} onOpenModal={openModal} />
      
      {/* Admin Toggle */}
      <div className="fixed top-16 md:top-20 right-2 md:right-4 z-40">
        <button
          onClick={toggleAdminMode}
          className={`px-3 py-2 md:px-4 rounded-lg font-semibold transition-all shadow-lg text-sm md:text-base ${
            isAdminMode 
              ? 'bg-accent text-primary hover:bg-yellow-400' 
              : 'bg-primary text-white hover:bg-blue-700'
          }`}
        >
          <span className="hidden sm:inline">
            {isAdminMode ? 'Thoát Admin' : 'Chế độ Admin'}
          </span>
          <span className="sm:hidden">
            {isAdminMode ? 'Thoát' : 'Admin'}
          </span>
        </button>
      </div>

      <main>
        {renderContent()}
      </main>
      
      {currentView === 'home' && <Footer />}
      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default App;