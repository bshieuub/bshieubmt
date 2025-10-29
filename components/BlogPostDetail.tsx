import React from 'react';
import { BlogPost } from '../types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Define options to customize rendering of rich text elements to match site styling
const richTextOptions = {
    renderNode: {
      'heading-2': (node, children) => <h2 className="text-2xl font-bold text-primary mt-8 mb-3">{children}</h2>,
      'heading-3': (node, children) => <h3 className="text-xl font-bold text-primary mt-6 mb-2">{children}</h3>,
      'heading-4': (node, children) => <h4 className="text-lg font-bold text-primary mt-4 mb-2">{children}</h4>,
      'paragraph': (node, children) => {
        // Contentful can create empty paragraphs from line breaks, filter them out.
        if (children && Array.isArray(children) && children.length === 1 && children[0] === '') {
            return null;
        }
        return <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
      },
      'unordered-list': (node, children) => <ul className="list-disc list-inside ml-4 my-4 space-y-2">{children}</ul>,
      'ordered-list': (node, children) => <ol className="list-decimal list-inside ml-4 my-4 space-y-2">{children}</ol>,
      'list-item': (node, children) => <li className="text-gray-700 leading-relaxed">{children}</li>,
      'blockquote': (node, children) => <blockquote className="border-l-4 border-secondary bg-light p-4 my-4 italic">{children}</blockquote>,
      'hyperlink': (node, children) => <a href={node.data.uri} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">{children}</a>,
    },
};

// FIX: Added interface for component props
interface BlogPostDetailProps {
  post: BlogPost;
  onGoBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onGoBack }) => {

  return (
    <section className="py-16 bg-white animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={onGoBack} className="mb-8 px-5 py-2 bg-gray-100 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Quay lại danh sách
          </button>
          
          <article>
            <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 shadow-lg" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-8 border-b pb-4">
              <span>Đăng bởi: <strong>{post.author}</strong></span>
              <span className="mx-3">|</span>
              <span>Ngày đăng: {new Date(post.publishedDate).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="prose lg:prose-xl max-w-none">
              {post.content ? documentToReactComponents(post.content, richTextOptions) : <p>Nội dung đang được cập nhật...</p>}
            </div>
          </article>

        </div>
      </div>
    </section>
  );
};

export default BlogPostDetail;