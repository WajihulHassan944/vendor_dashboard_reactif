'use client';

import React, { useState, useEffect } from 'react';

// 1. Define the interface based on the ipapi.is response structure
interface IpData {
  ip: string;
  is_vpn: boolean;
  is_proxy: boolean;
  is_datacenter: boolean;
  asn: {
    asn: number;
    org: string;
    descr: string;
  };
  location: {
    city: string;
    region: string;
    country: string;
    country_code: string;
    timezone: string;
    local_time: string;
  };
}

export default function HetznerIpInfo() {
  // 2. Add types to your state hooks
  const [data, setData] = useState<IpData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const res = await fetch('https://api.ipapi.is');
        if (!res.ok) throw new Error('Failed to fetch IP data');
        
        const json: IpData = await res.json();
        console.log("res is", json);
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchIpInfo();
  }, []);

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400">
        <p className="font-bold">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-slate-900 rounded-2xl border border-slate-700 animate-pulse">
        <div className="h-4 w-24 bg-slate-800 rounded mb-4"></div>
        <div className="h-8 w-48 bg-slate-800 rounded"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl p-6 mt-10 border border-slate-700 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-400">Hetzner Node Info</h2>
        <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-widest">
          Live Connection
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Public IP</p>
          <p className="text-2xl font-mono tracking-tight text-white">{data.ip}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <Info label="Location" value={`${data.location.city}, ${data.location.country_code}`} />
          <Info label="ISP" value={data.asn.org} />
          <Info 
            label="Is VPN?" 
            value={data.is_vpn ? "⚠️ Yes" : "✅ No"} 
            highlight={data.is_vpn}
          />
          <Info label="Timezone" value={data.location.timezone} />
        </div>
      </div>
    </div>
  );
}

// 3. Typed props for the sub-component
interface InfoProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function Info({ label, value, highlight }: InfoProps) {
  return (
    <div>
      <p className="text-slate-500 text-[10px] uppercase font-bold">{label}</p>
      <p className={`text-sm font-medium truncate ${highlight ? 'text-amber-400' : 'text-slate-200'}`}>
        {value}
      </p>
    </div>
  );
}