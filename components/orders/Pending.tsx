import React from 'react'
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

const Pending = () => {
  return (
    <div>
       <div className="bg-[#171a23]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl shadow-black/30 overflow-hidden">
      
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <FiAlertCircle className="text-white/70" />
                    <span className="font-semibold">
                      Action Required: Order Acceptance
                    </span>
                  </div>
      
                  <span className="text-xs text-white/50">
                    Expires in 24h
                  </span>
                </div>
      
                {/* Body */}
                <div className="px-6 py-10 flex flex-col items-center gap-8">
      
                  <p className="text-center text-white/60 max-w-lg">
                    Please review the specifications above. By accepting this order,
                    you agree to deliver the items by{" "}
                    <span className="text-white font-semibold">
                      Nov 12, 2025
                    </span>.
                  </p>
      
                  {/* Buttons */}
                  <div className="flex flex-wrap justify-center gap-4">
      
                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-md font-semibold hover:bg-white/90 transition">
                      <FiCheckCircle /> Accept Order
                    </button>
      
                    <button className="flex items-center gap-2 px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/5 transition">
                      Decline
                    </button>
      
                    <button className="flex items-center gap-2 px-6 py-3 rounded-md border border-white/20 text-white hover:bg-white/5 transition">
                      Update Quote
                    </button>
      
                  </div>
                </div>
              </div>
    </div>
  )
}

export default Pending
