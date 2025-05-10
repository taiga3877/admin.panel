import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Team = () => {
  const [teamData, setTeamdata] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const [fullname, setFullName] = useState("")
  const [positionEn, setPositionEn] = useState("")
  const [positionDe, setPositionDe] = useState("")
  const [positionRu, setPositionRu] = useState("")
  const [img, setImg] = useState(null)

  const token = localStorage.getItem("token")

  const getTeam = () => {
    fetch("https://back.ifly.com.uz/api/team-section")
      .then((res) => res.json())
      .then((data) => {
        setTeamdata(data?.data || [])
      })
      .catch((err) => console.error("Fetch error:", err))
  }

  useEffect(() => {
    getTeam()
  }, [])

  const handleFormReset = () => {
    setFullName("")
    setPositionEn("")
    setPositionDe("")
    setPositionRu("")
    setImg(null)
  }

  const handleEditOpen = (member) => {
    setEditData(member)
    setFullName(member.full_name)
    setPositionEn(member.position_en)
    setPositionDe(member.position_de)
    setPositionRu(member.position_ru)
    setIsEditOpen(true)
  }

  const teamCreate = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("full_name", fullname)
    formdata.append("position_en", positionEn)
    formdata.append("position_de", positionDe)
    formdata.append("position_ru", positionRu)
    if (img) formdata.append("file", img)

    fetch('https://back.ifly.com.uz/api/team-section', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formdata
    }).then(res => res.json())
      .then(data => {
        if (data?.success) {
          toast.success("Member added successfully")
          getTeam()
          setIsModalOpen(false)
          handleFormReset()
        } else {
          toast.error("Failed to add")
        }
      })
  }

  const editTeamMember = (e) => {
    e.preventDefault()
    if (!editData?.id) return toast.error("Invalid member")

    const formdata = new FormData()
    formdata.append("full_name", fullname)
    formdata.append("position_en", positionEn)
    formdata.append("position_de", positionDe)
    formdata.append("position_ru", positionRu)
    if (img) formdata.append("file", img)

    fetch(`https://back.ifly.com.uz/api/team-section/${editData.id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formdata
    }).then(res => res.json())
      .then(data => {
        if (data?.success) {
          toast.success("Member updated successfully")
          getTeam()
          setIsEditOpen(false)
          handleFormReset()
        } else {
          toast.error("Failed to update")
        }
      })
  }

  const teamDelete = (id) => {
    fetch(`https://back.ifly.com.uz/api/team-section/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(res => res.json())
      .then(data => {
        if (data?.success) {
          toast.success("Deleted successfully")
          getTeam()
        } else {
          toast.error("Delete failed")
        }
      })
  }

  const renderModalForm = (onSubmit, title, buttonLabel) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50">
      <form onSubmit={onSubmit} className="bg-black/40 backdrop-blur-xl border border-gray-700 p-8 rounded-3xl w-full max-w-md shadow-[0_0_40px_#00ff8840] relative text-white">
        <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-400 via-green-300 to-white text-transparent bg-clip-text">
          {title}
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-1 text-gray-400">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">Position (DE)</label>
            <input
              type="text"
              value={positionDe}
              onChange={(e) => setPositionDe(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">Position (RU)</label>
            <input
              type="text"
              value={positionRu}
              onChange={(e) => setPositionRu(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">Position (EN)</label>
            <input
              type="text"
              value={positionEn}
              onChange={(e) => setPositionEn(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-400">Image</label>
            <input
              type="file"
              onChange={(e) => setImg(e?.target?.files[0])}
              accept='image/*'
              className="w-full px-4 py-2 bg-white/5 border border-gray-600 rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end mt-10 gap-4">
          <button
            onClick={() => {
              setIsModalOpen(false)
              setIsEditOpen(false)
              handleFormReset()
            }}
            type="button"
            className="px-5 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20"
          >
            Cancel
          </button>
          <button
            type='submit'
            className="px-5 py-2 bg-gradient-to-r from-emerald-400 to-green-600 hover:from-emerald-500 hover:to-green-700 rounded-xl shadow-lg text-white"
          >
            {buttonLabel}
          </button>
        </div>
      </form>
    </div>
  )

  return (
    <div className="bg-gray-900 text-white min-h-screen transition-colors duration-500">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">Team Members</h2>
          <button
            onClick={() => {
              handleFormReset()
              setIsModalOpen(true)
            }}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-xl shadow-md"
          >
            + Add Member
          </button>
        </div>

        {isModalOpen && renderModalForm(teamCreate, "Add Team Member", "Save")}
        {isEditOpen && renderModalForm(editTeamMember, "Edit Team Member", "Update")}

        <div className="bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[13px] uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">№</th>
                <th className="py-4 px-6">Images</th>
                <th className="py-4 px-6">Full Name</th>
                <th className="py-4 px-6">Position En</th>
                <th className="py-4 px-6">Position Ru</th>
                <th className="py-4 px-6">Position De</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-700 transition-all border-b border-gray-700">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={`https://back.ifly.com.uz/${item.image}`}
                        alt={item.full_name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6">{item.full_name}</td>
                  <td className="py-4 px-6">{item.position_en}</td>
                  <td className="py-4 px-6">{item.position_ru}</td>
                  <td className="py-4 px-6">{item.position_de}</td>
                  <td className="py-4 px-6 flex justify-center gap-4">
                    <button
                      onClick={() => handleEditOpen(item)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => teamDelete(item.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Team
