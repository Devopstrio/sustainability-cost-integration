import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  DollarSign, 
  Cloud, 
  Zap, 
  Target,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Globe,
  Leaf,
  BarChart4,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

const correlationData = [
  { name: 'Jan', cost: 4200, carbon: 1200 },
  { name: 'Feb', cost: 3800, carbon: 1100 },
  { name: 'Mar', cost: 4500, carbon: 1300 },
  { name: 'Apr', cost: 3200, carbon: 900 },
  { name: 'May', cost: 3900, carbon: 1050 },
  { name: 'Jun', cost: 3500, carbon: 980 },
];

const KPI_CARDS = [
  { title: 'Total Cloud Cost', value: '$45.2K', trend: '-12%', color: 'indigo', icon: DollarSign },
  { title: 'Carbon Footprint', value: '1.25t', trend: '-18%', color: 'emerald', icon: Leaf },
  { title: 'Efficiency Score', value: '88/100', trend: '+4pts', color: 'indigo', icon: Target },
  { title: 'Optimization Wins', value: '$2.4K', trend: '+150g CO2', color: 'indigo', icon: Zap },
];

const SustainabilityDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sustainability & Cost Hub</h1>
          <p className="text-slate-400">Correlating financial expenditure with environmental impact.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-600/20">
          Generate ESG Report
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-indigo-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-indigo-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('-') && card.title.includes('Cost') || card.trend.includes('-') && card.title.includes('Footprint') ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Correlation Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Cost vs. Carbon Emission Trends</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={correlationData}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="cost" stroke="#6366f1" fill="url(#colorCost)" name="Cost (USD)" />
                <Area type="monotone" dataKey="carbon" stroke="#10b981" fill="transparent" strokeDasharray="5 5" name="Carbon (kg CO2e)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Region Intensity */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Regional Carbon Intensity</h3>
          <div className="flex-1 space-y-6">
            {[
              { region: 'West Europe', intensity: 220, color: 'bg-emerald-500' },
              { region: 'US East 1', intensity: 350, color: 'bg-indigo-500' },
              { region: 'US Central 1', intensity: 410, color: 'bg-amber-500' },
              { region: 'Asia NE 1', intensity: 550, color: 'bg-rose-500' },
            ].map((reg) => (
              <div key={reg.region} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{reg.region}</span>
                  <span className="text-slate-400">{reg.intensity} gCO2/kWh</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${reg.color}`} style={{ width: `${(reg.intensity / 600) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex gap-3">
            <AlertCircle className="text-indigo-400 shrink-0" size={18} />
            <p className="text-xs text-slate-400">Migrating batch workloads to <span className="text-emerald-400 font-bold">West Europe</span> could reduce emissions by up to 45% with minimal cost delta.</p>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Sustainability Optimization Hub</h3>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">View All Recommendations</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Recommendation</th>
                <th className="px-6 py-4 font-semibold">Target Service</th>
                <th className="px-6 py-4 font-semibold">Cost Savings</th>
                <th className="px-6 py-4 font-semibold">Carbon Reduction</th>
                <th className="px-6 py-4 font-semibold">Priority</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { type: 'REGION_OPTIMIZATION', target: 'Analytics Pipeline', cost: '-$120', carbon: '-850g', priority: 'HIGH' },
                { type: 'RIGHTSIZING', target: 'EKS Prod Cluster', cost: '+$450', carbon: '-1.2kg', priority: 'MEDIUM' },
                { type: 'IDLE_CLEANUP', target: 'Staging DB Instances', cost: '+$85', carbon: '-250g', priority: 'LOW' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-200">{row.type.replace('_', ' ')}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.target}</td>
                  <td className="px-6 py-4 text-sm text-emerald-400 font-bold">{row.cost}/mo</td>
                  <td className="px-6 py-4 text-sm text-emerald-400 font-bold">{row.carbon}/mo</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      row.priority === 'HIGH' ? 'text-rose-400 border-rose-500/20 bg-rose-500/10' : 
                      row.priority === 'MEDIUM' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' : 
                      'text-indigo-400 border-indigo-500/20 bg-indigo-500/10'
                    }`}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityDashboard;
