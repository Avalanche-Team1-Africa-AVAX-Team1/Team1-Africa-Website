import { useState } from 'react'

interface Comment {
    id: string
    author: string
    authorAvatar: string
    content: string
    timestamp: string
    likes: number
    dislikes: number
    isVerified?: boolean
    replies: Comment[]
}

const mockComments: Comment[] = [
    {
        id: '1',
        author: 'Noah Pierre',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        content: 'This is exactly what the African blockchain ecosystem needs! The insights on subnet architecture are particularly valuable for our growing developer community.',
        timestamp: '58 minutes ago',
        likes: 25,
        dislikes: 3,
        replies: [
            {
                id: '1-1',
                author: 'Skill Sprout',
                authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
                content: 'Completely agree! We\'ve been implementing similar solutions in Lagos and the results have been transformative. The example with subnets was particularly helpful!',
                timestamp: '8 minutes ago',
                likes: 2,
                dislikes: 0,
                isVerified: true,
                replies: []
            }
        ]
    },
    {
        id: '2',
        author: 'Mollie Hall',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        content: 'I really enjoyed today\'s lesson on blockchain infrastructure! The explanations made the concepts so much easier to grasp.',
        timestamp: '5 hours ago',
        likes: 15,
        dislikes: 1,
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
    const [dislikes, setDislikes] = useState(comment.dislikes)
    const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null)

    const handleLike = () => {
        if (userVote === 'like') {
            setLikes(likes - 1)
            setUserVote(null)
        } else {
            if (userVote === 'dislike') setDislikes(dislikes - 1)
            setLikes(likes + 1)
            setUserVote('like')
        }
    }

    const handleDislike = () => {
        if (userVote === 'dislike') {
            setDislikes(dislikes - 1)
            setUserVote(null)
        } else {
            if (userVote === 'like') setLikes(likes - 1)
            setDislikes(dislikes + 1)
            setUserVote('dislike')
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
        <div className={`${depth > 0 ? 'ml-14' : ''} mb-6`}>
            <div className="flex gap-3">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                        <img src={comment.authorAvatar} alt={comment.author} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                        {comment.isVerified && (
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>

                    <p className="text-sm text-gray-800 leading-relaxed mb-3">{comment.content}</p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-1 text-sm transition-colors ${userVote === 'like' ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                                }`}
                        >
                            <svg className="w-4 h-4" fill={userVote === 'like' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                            </svg>
                            <span className="font-medium">{likes}</span>
                        </button>

                        <button
                            onClick={handleDislike}
                            className={`flex items-center gap-1 text-sm transition-colors ${userVote === 'dislike' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <svg className="w-4 h-4" fill={userVote === 'dislike' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
                            </svg>
                            <span className="font-medium">{dislikes}</span>
                        </button>

                        {depth < 2 && (
                            <button
                                onClick={() => setIsReplying(!isReplying)}
                                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                </svg>
                                <span className="font-medium">Reply</span>
                            </button>
                        )}

                        <button className="ml-auto text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </button>
                    </div>

                    {isReplying && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Add a reply..."
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                                rows={3}
                            />
                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={handleReply}
                                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors"
                                >
                                    Reply
                                </button>
                                <button
                                    onClick={() => {
                                        setIsReplying(false)
                                        setReplyText('')
                                    }}
                                    className="px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {comment.replies.length > 0 && (
                        <div className="mt-4">
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
    const [sortBy, setSortBy] = useState<'recent' | 'top'>('recent')

    const handlePostComment = () => {
        if (newComment.trim()) {
            console.log('New comment:', newComment)
            setNewComment('')
        }
    }

    const totalComments = comments.length + comments.reduce((acc, c) => acc + c.replies.length, 0)

    return (
        <section className="mt-16 pb-16">
            {/* New Comment Form */}
            <div className="mb-8 bg-gray-50 rounded-2xl p-6">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add comment..."
                    className="w-full px-0 py-2 text-sm border-0 bg-transparent focus:outline-none resize-none placeholder-gray-500"
                    rows={3}
                />
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Bold">
                            <span className="font-bold text-sm">B</span>
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Italic">
                            <span className="italic text-sm">I</span>
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Underline">
                            <span className="underline text-sm">U</span>
                        </button>
                        <div className="w-px h-5 bg-gray-300 mx-1"></div>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Attach file">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Add image">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Add emoji">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Mention">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={handlePostComment}
                        className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* Comments Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-900">Comments</h2>
                    <span className="px-2.5 py-0.5 bg-red-600 text-white text-xs font-bold rounded-full">
                        {totalComments}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'recent' | 'top')}
                        className="text-sm font-medium text-gray-700 bg-transparent border-0 focus:outline-none cursor-pointer"
                    >
                        <option value="recent">Most recent</option>
                        <option value="top">Top comments</option>
                    </select>
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
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
