import React, { useState } from 'react'
import { FaPlus, FaMinus, FaPaperPlane } from 'react-icons/fa'
import { toast, Toaster } from "react-hot-toast";

interface Props {
  userId?: string
}

export default function Component({ userId }: Props) {
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [content, setContent] = useState([{ body: '' }])
  const baseURL = process.env.NEXT_PUBLIC_API_URL

  const handleContentChange = (index: number, value: string) => {
    const newContent = [...content]
    newContent[index].body = value
    setContent(newContent)
  }

  const addContentSection = () => {
    setContent([...content, { body: '' }])
  }

  const removeContentSection = (index: number) => {
    if (content.length > 1) {
      const newContent = content.filter((_, i) => i !== index)
      setContent(newContent)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const contentData = JSON.stringify(content)
    const url = `${baseURL}/blog/new?userId=${userId}&title=${encodeURIComponent(title)}&overview=${encodeURIComponent(overview)}&content=${contentData}`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        toast.success('Blog submitted successfully!')
        setTitle('')
        setOverview('')
        setContent([{ body: '' }])
      } else {
        throw new Error('Failed to submit blog')
      }
    } catch (error) {
      toast.error('There was an error submitting the blog. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded-lg border border-blue-800 text-white shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Add new blog</h2>

          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-blue-800 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="overview" className="block text-sm font-medium mb-2">Overview</label>
            <textarea
              id="overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full px-4 py-2 border border-blue-800 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Content Sections</label>
            {content.map((section, index) => (
              <div key={index} className="flex mb-4">
                <textarea
                  value={section.body}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  className="w-full px-4 py-2 border border-blue-800 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeContentSection(index)}
                  className="ml-2 p-2 bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <FaMinus />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addContentSection}
              className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
            >
              <FaPlus className="mr-2" /> Add Section
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center"
          >
            <FaPaperPlane className="mr-2" /> Submit Blog
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  )
}
