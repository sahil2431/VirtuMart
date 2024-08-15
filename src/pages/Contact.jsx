import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NotLoggedIn } from '../components'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axios'

const Contact = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const { user} = useSelector((state) => state.auth)
  const [email, setEmail] = useState(user?.email)
  const [sending , setSending] = useState(false)
  const handleSubmit = async(e) => {
  
    e.preventDefault()
    try {
      setSending(true)
      const res = await axiosInstance.post('/users/contactUs' , {name , email ,message})
      if(res.data.statusCode) {
        toast.success(res.data.message)
        setSending(false)
      }
      else {
        toast.error(res.data.message)
        setSending(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
      setSending(false)
      
    }
    console.log('Form submitted:', { name, email, message })
    setName('')
    setEmail('')
    setMessage('')
  }


  

  return (
    <section className="bg-gray-800 min-h-[65vh] text-white p-8">
      <h2 className="text-3xl font-bold text-center py-6">Contact Us</h2>
      <div className="max-w-2xl mx-auto">
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md p-2 text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md p-2 text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full rounded-md p-2 h-32 text-gray-800"
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {sending ? "Sending Email...." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
