import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { adminService } from '../../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(data.stats);
                setRecentActivities(data.recentActivities);
            } catch (err) {
                toast.error('Failed to load admin dashboard stats');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
                    <p className="text-slate-500 font-medium mt-1">Welcome back, {user?.name || 'Admin'}!</p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg overflow-hidden relative`}>
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl font-bold"></div>
                        <p className="text-white/80 font-bold tracking-wider text-xs uppercase mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black mb-2">{stat.value}</h3>
                        <p className="text-white/60 text-xs font-semibold">{stat.trend}</p>
                    </div>
                ))}
            </div>

            {/* More content to be added as mock data tables */}
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 min-h-[400px]">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {recentActivities.length > 0 ? (
                        recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{activity.action}</p>
                                    <p className="text-xs text-slate-500 font-medium">By {activity.user}</p>
                                </div>
                                <span className="text-xs font-bold text-slate-400">{activity.time}</span>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-64 text-slate-400 font-medium border-2 border-dashed border-slate-100 rounded-xl">
                            Activity Feed Empty
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
