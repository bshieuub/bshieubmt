import React from 'react';
import { BlogPost } from '../types';

interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void;
  onEdit?: (post: BlogPost) => void;
  onDelete?: (postId: string) => void;
  isAdmin?: boolean;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ 
  post, 
  onBack, 
  onEdit, 
  onDelete, 
  isAdmin = false 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-primary hover:text-secondary transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại
            </button>
            
            {isAdmin && (
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit?.(post)}
                  className="px-4 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => onDelete?.(post.id)}
                  className="px-4 py-2 bg-error text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(post.publishedDate)}</span>
              </div>
            </div>

            {post.excerpt && (
              <div className="bg-light p-6 rounded-lg border-l-4 border-secondary">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center text-gray-600">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{post.author}</p>
                  <p className="text-sm">Chuyên khoa Ung bướu</p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Chia sẻ bài viết
                </button>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;