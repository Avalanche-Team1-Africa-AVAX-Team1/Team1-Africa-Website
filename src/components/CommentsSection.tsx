import { useState } from 'react'

interface Comment {
    id: string
    author: string
    authorAvatar: string
    content: string
    timestamp: string
    likes: number
    replies: Comment[]
}

const mockComments: Comment[] = [
    {
        id: '1',
        author: 'Amara Okafor',
        authorAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100',
        content: 'This is exactly what the African blockchain ecosystem needs! The insights on subnet architecture are particularly valuable for our growing developer community.',
        timestamp: '58 minutes ago',
        likes: 25,
        replies: [
            {
                id: '1-1',
                author: 'Marcus Osei',
                authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
                content: 'Completely agree! We\'ve been implementing similar solutions in Lagos and the results have been transformative.',
                timestamp: '8 minutes ago',
                likes: 2,
                replies: []
            }
        ]
    },
    {
        id: '2',
        author: 'Chidi Nwosu',
        authorAvatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100',
        content: 'Great article! Would love to see more content on cross-chain integration strategies and how they can benefit African startups.',
        timestamp: '5 hours ago',
        likes: 15,
        replies: []
    }
]

interface CommentItemProps {
    comment: Comment
    depth?: number
}

function CommentItem({ comment, depth = 0 }: CommentItemProps) {
    const [isReplying, setIsReplying] = useState(false)
    const [replyText, setReplyText] = useState('')
    const [likes, setLikes] = useState(comment.likes)
    const [hasLiked, setHasLiked] = useState(false)

    const handleLike = () => {
        if (hasLiked) {
            setLikes(likes - 1)
            setHasLiked(false)
        } else {
            setLikes(likes + 1)
            setHasLiked(true)
        }
    }

    const handleReply = () => {
        if (replyText.trim()) {
            console.log('Reply:', replyText)
            setReplyText('')
            setIsReplying(false)
        }
    }

    return (
        <div className={`${depth > 0 ? 'ml-12' : ''} py-4 border-b border-gray-100 last:border-0`}>
            <div className="flex gap-3">
                <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100">
                        <img src={comment.authorAvatar} alt={comment.author} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-400">{comment.timestamp}</span>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{comment.content}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-1.5 hover:text-gray-900 transition-colors ${hasLiked ? 'text-gray-900' : ''
                                }`}
                        >
                            <svg className="w-3.5 h-3.5" fill={hasLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                            </svg>
                            <span>{likes}</span>
                        </button>

                        {depth < 2 && (
                            <button
                                onClick={() => setIsReplying(!isReplying)}
                                className="hover:text-gray-900 transition-colors"
                            >
                                Reply
                            </button>
                        )}
                    </div>

                    {isReplying && (
                        <div className="mt-3">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 resize-none"
                                rows={3}
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={handleReply}
                                    className="px-4 py-1.5 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Post
                                </button>
                                <button
                                    onClick={() => {
                                        setIsReplying(false)
                                        setReplyText('')
                                    }}
                                    className="px-4 py-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {comment.replies.length > 0 && (
                        <div className="mt-3">
                            {comment.replies.map((reply) => (
                                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function CommentsSection() {
    const [newComment, setNewComment] = useState('')
    const [comments] = useState<Comment[]>(mockComments)

    const handlePostComment = () => {
        if (newComment.trim()) {
            console.log('New comment:', newComment)
            setNewComment('')
        }
    }

    const totalComments = comments.length + comments.reduce((acc, c) => acc + c.replies.length, 0)

    return (
        <section className="mt-16 pb-16 border-t border-gray-100 pt-12">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
                {totalComments} {totalComments === 1 ? 'Comment' : 'Comments'}
            </h2>

            {/* New Comment Form */}
            <div className="mb-8">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 resize-none"
                    rows={4}
                />
                <button
                    onClick={handlePostComment}
                    className="mt-3 px-5 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                >
                    Post Comment
                </button>
            </div>

            {/* Comments List */}
            <div>
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </section>
    )
}
