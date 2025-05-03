import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editClickmodal, setEditClickmodal] = useState(false)
  const [clickdata, setClickdata] = useState(null)

  const [nameEn, setNameEn] = useState('')
  const [nameRu, setNameRu] = useState('')
  const [nameDe, setNameDe] = useState('')

  const token = localStorage.getItem('token')

  const getCategory = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('https://back.ifly.com.uz/api/category')
      const item = await response.json()
      setData(item?.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load categories')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCategory()
    document.body.classList.add('dark-mode')
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Search query:', searchQuery)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const resetForm = () => {
    setNameEn('')
    setNameRu('')
    setNameDe('')
  }

  const createCategory = async (event) => {
    event.preventDefault()
    try {
      const res = await fetch('https://back.ifly.com.uz/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name_en: nameEn,
          name_ru: nameRu,
          name_de: nameDe,
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Category created successfully')
        getCategory()
        setModalOpen(false)
        resetForm()
      } else {
        toast.error('Failed to create category')
      }
    } catch (err) {
      console.error('Failed to create:', err)
      toast.error('Request failed')
    }
  }

  const deleteCategory = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this category?')
    if (!confirmed) return

    try {
      const res = await fetch(`https://back.ifly.com.uz/api/category/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Category deleted')
        getCategory()
      } else {
        toast.error('Failed to delete category')
      }
    } catch (error) {
      console.error('Failed to delete:', error)
      toast.error('Error deleting category')
    }
  }

  const editCategory = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`https://back.ifly.com.uz/api/category/${clickdata?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name_en: nameEn,
          name_ru: nameRu,
          name_de: nameDe,
        }),
      })
      const elem = await res.json()
      if (elem?.success) {
        toast.success('Category edited successfully')
        setEditClickmodal(false)
        getCategory()
        resetForm()
      } else {
        toast.error('Category edit failed')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error updating category')
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen transition-colors duration-500">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">Product List</h2>
          <button
            onClick={() => {
              setModalOpen(true)
              setEditClickmodal(false)
              resetForm()
            }}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 transition-all rounded-xl text-white shadow-md"
          >
            + Add Category
          </button>
        </div>

        {/* Add Modal */}
        {modalOpen && (
          <div className="bg-black bg-opacity-70 fixed inset-0 flex items-center justify-center z-50">
            <form
              onSubmit={createCategory}
              className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-4 text-2xl text-red-400 hover:text-red-600"
              >
                ×
              </button>
              <h3 className="text-xl font-bold mb-4">Add New Category</h3>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                required
                placeholder="Name EN"
                className="p-2 mb-3 w-full rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                value={nameRu}
                onChange={(e) => setNameRu(e.target.value)}
                required
                placeholder="Name RU"
                className="p-2 mb-3 w-full rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                value={nameDe}
                onChange={(e) => setNameDe(e.target.value)}
                required
                placeholder="Name DE"
                className="p-2 mb-4 w-full rounded bg-gray-700 text-white border border-gray-600"
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {/* Edit Modal */}
        {editClickmodal && (
          <div className="bg-black bg-opacity-70 fixed inset-0 flex items-center justify-center z-50">
            <form
              onSubmit={editCategory}
              className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setEditClickmodal(false)}
                className="absolute top-3 right-4 text-2xl text-red-400 hover:text-red-600"
              >
                ×
              </button>
              <h3 className="text-xl font-bold mb-4">Edit Category</h3>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                required
                placeholder="Name EN"
                className="p-2 mb-3 w-full rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                value={nameRu}
                onChange={(e) => setNameRu(e.target.value)}
                required
                placeholder="Name RU"
                className="p-2 mb-3 w-full rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                value={nameDe}
                onChange={(e) => setNameDe(e.target.value)}
                required
                placeholder="Name DE"
                className="p-2 mb-4 w-full rounded bg-gray-700 text-white border border-gray-600"
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-900 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[13px] uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">№</th>
                <th className="py-4 px-6">Title EN</th>
                <th className="py-4 px-6">Title RU</th>
                <th className="py-4 px-6">Title DE</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array(5)
                  .fill()
                  .map((_, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-4 px-6"><Skeleton width={30} /></td>
                      <td className="py-4 px-6"><Skeleton /></td>
                      <td className="py-4 px-6"><Skeleton /></td>
                      <td className="py-4 px-6"><Skeleton /></td>
                      <td className="py-4 px-6 text-center"><Skeleton width={60} /></td>
                    </tr>
                  ))
              ) : (
                data
                  .filter((item) =>
                    item.name_en.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-700 transition-all border-b border-gray-700">
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">{item.name_en}</td>
                      <td className="py-4 px-6">{item.name_ru}</td>
                      <td className="py-4 px-6">{item.name_de}</td>
                      <td className="py-4 px-6 flex justify-center gap-4">
                        <button
                          onClick={() => {
                            setEditClickmodal(true)
                            setModalOpen(false)
                            setClickdata(item)
                            setNameEn(item.name_en)
                            setNameRu(item.name_ru)
                            setNameDe(item.name_de)
                          }}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCategory(item.id)}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
