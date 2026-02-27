import React from 'react'
import { FiSend } from 'react-icons/fi'
import { Label } from '../ui/label'

const Inprogress = () => {
  return (
    <div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
                {/* ================= PRODUCTION PHASE ================= */}
                <div className="lg:col-span-2 bg-[#171a23]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl shadow-black/30 p-6 flex flex-col gap-6">
      
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Production Phase</h3>
                    <span className="text-xs text-white/40">
                      Last updated: 2 hours ago
                    </span>
                  </div>
      
                  {/* Dropdown */}
<div className="flex flex-col gap-2">
  
  {/* Label on Top */}
  <Label className="text-sm font-semibold text-white">
    Current Phase
  </Label>

  {/* Row: Select + Button */}
  <div className="flex gap-3">
    
    <select className="flex-1 h-10 bg-[#1e2230] border border-white/10 rounded-lg px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition">
      <option>Material Preparation</option>
      <option>Printing</option>
      <option>Installation</option>
    </select>

    <button className="h-10 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition">
      Update
    </button>

  </div>
</div>
                  {/* Checklist */}
                  <div className="bg-[#1e2230] border border-white/10 rounded-xl p-5 flex flex-col gap-4">
                    <div className="text-sm font-semibold text-white/70">
                      Active Task Checklist
                    </div>
      
                    {[
                      "Verify material stock (3M IJ180Cv3)",
                      "Print test strip for color match",
                      "Run full batch (5 sets)",
                    ].map((task, i) => (
                      <label key={i} className="flex items-center gap-3 text-sm text-white/60 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-indigo-500"
                        />
                        {task}
                      </label>
                    ))}
                  </div>
                </div>
      
                {/* ================= WORK LOG ================= */}
                <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl shadow-black/30 p-6 flex flex-col gap-6">
      
                  <h3 className="text-lg font-semibold">Work Log</h3>
      
                  <div className="flex flex-col gap-4 text-sm text-white/60">
                    <div>
                      <div className="text-white font-medium">
                        Today, 9:00 AM
                      </div>
                      Started printing side panels. Ink levels checked.
                    </div>
      
                    <div>
                      <div className="text-white font-medium">
                        Yesterday, 4:30 PM
                      </div>
                      Received vector files from design team. Validated dimensions.
                    </div>
                  </div>
      
                  {/* Add Note */}
                  <div className="mt-auto flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a Note..."
                      className="flex-1 bg-[#1e2230] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
                    />
                    <button className="px-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition">
                      <FiSend />
                    </button>
                  </div>
      
                </div>
              </div>
    </div>
  )
}

export default Inprogress
