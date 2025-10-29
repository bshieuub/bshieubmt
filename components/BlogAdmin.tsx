import React, { useState, useRef, useEffect } from 'react';
import { generateBlogContent, generateBlogIdeas } from '../services/geminiService';
import { BlogPost } from '../types';

interface BlogAdminProps {
  onSave: (post: Omit<BlogPost, 'id' | 'publishedDate'>) => void;
  onClose: () => void;
  editingPost?: BlogPost | null;
}

const BlogAdmin: React.FC<BlogAdminProps> = ({ onSave, onClose, editingPost }) => {
  const [title, setTitle] = useState(editingPost?.title || '');
  const [excerpt, setExcerpt] = useState(editingPost?.excerpt || '');
  const [content, setContent] = useState(editingPost?.content || '');
  const [image, setImage] = useState(editingPost?.image || '');
  const [author, setAuthor] = useState(editingPost?.author || 'Bác sĩ Từ Ngọc Hiếu');
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiType, setAiType] = useState<'title' | 'excerpt' | 'content'>('content');
  const [blogIdeas, setBlogIdeas] = useState<string[]>([]);
  const [showIdeas, setShowIdeas] = useState(false);
  
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const ideas = await generateBlogIdeas();
        setBlogIdeas(ideas);
      } catch (error) {
        console.error('Error loading blog ideas:', error);
      }
    };
    loadIdeas();
  }, []);

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsAIGenerating(true);
    try {
      const aiResponse = await generateBlogContent(aiPrompt, aiType);
      
      if (aiType === 'title') {
        setTitle(aiResponse);
      } else if (aiType === 'excerpt') {
        setExcerpt(aiResponse);
      } else {
        setContent(aiResponse);
      }
      
      setAiPrompt('');
      setShowAIPanel(false);
      
      // Focus on content area
      if (contentRef.current) {
        contentRef.current.focus();
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
    } catch (error) {
      console.error('AI generation error:', error);
      alert('Có lỗi xảy ra khi tạo nội dung AI. Vui lòng thử lại.');
    } finally {
      setIsAIGenerating(false);
    }
  };

  const handleIdeaSelect = (idea: string) => {
    setAiPrompt(idea);
    setAiType('content');
    setShowIdeas(false);
    setShowAIPanel(true);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Vui lòng điền đầy đủ tiêu đề và nội dung bài viết.');
      return;
    }

    onSave({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      image: image.trim(),
      author: author.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    });
  };

  const insertAIContent = (type: 'title' | 'excerpt' | 'content') => {
    setAiType(type);
    setShowAIPanel(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold">
              {editingPost ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-accent transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)]">
          <div className="space-y-4 sm:space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề bài viết *
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Nhập tiêu đề bài viết..."
                />
                <button
                  onClick={() => insertAIContent('title')}
                  className="px-4 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap"
                >
                  AI Tạo tiêu đề
                </button>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tóm tắt bài viết
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Nhập tóm tắt ngắn gọn..."
                />
                <button
                  onClick={() => insertAIContent('excerpt')}
                  className="px-4 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap"
                >
                  AI Tạo tóm tắt
                </button>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL hình ảnh
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tác giả
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tên tác giả"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nội dung bài viết *
                </label>
                <button
                  onClick={() => insertAIContent('content')}
                  className="px-4 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  AI Hỗ trợ viết
                </button>
              </div>
              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Nhập nội dung bài viết..."
              />
            </div>

            {/* AI Panel */}
            {showAIPanel && (
              <div className="bg-gradient-to-r from-light to-blue-50 p-6 rounded-xl border border-secondary shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-primary flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    AI Hỗ trợ viết bài
                  </h3>
                  <button
                    onClick={() => setShowAIPanel(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* AI Type Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại nội dung cần tạo:
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: 'title', label: 'Tiêu đề', icon: '📝' },
                      { value: 'excerpt', label: 'Tóm tắt', icon: '📄' },
                      { value: 'content', label: 'Nội dung', icon: '📖' }
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setAiType(type.value as any)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          aiType === type.value
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {type.icon} {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blog Ideas */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Chủ đề gợi ý:
                    </label>
                    <button
                      onClick={() => setShowIdeas(!showIdeas)}
                      className="text-sm text-primary hover:text-secondary"
                    >
                      {showIdeas ? 'Ẩn' : 'Xem'} gợi ý
                    </button>
                  </div>
                  {showIdeas && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {blogIdeas.map((idea, index) => (
                        <button
                          key={index}
                          onClick={() => handleIdeaSelect(idea)}
                          className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-colors text-sm"
                        >
                          {idea}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI Input */}
                <div className="space-y-3">
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={`Mô tả chủ đề cho ${aiType === 'title' ? 'tiêu đề' : aiType === 'excerpt' ? 'tóm tắt' : 'nội dung'}...`}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleAIGenerate}
                      disabled={isAIGenerating || !aiPrompt.trim()}
                      className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center"
                    >
                      {isAIGenerating ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Đang tạo...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Tạo {aiType === 'title' ? 'tiêu đề' : aiType === 'excerpt' ? 'tóm tắt' : 'nội dung'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors order-2 sm:order-1"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors order-1 sm:order-2"
          >
            {editingPost ? 'Cập nhật' : 'Tạo bài viết'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;