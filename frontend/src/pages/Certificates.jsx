import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import SideBar from '../components/layout/SideBar';
import TopBar from '../components/layout/TopBar';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/api';

/* ─── Reusable Certificate Component ─────────────────────────── */
function CertificateCard({ cert, userName, formatDate }) {
    return (
        <div
            className="certificate-card"
            style={{
                width: '100%',
                maxWidth: 820,
                aspectRatio: '1.414 / 1',
                background: 'linear-gradient(135deg, #fffdf7 0%, #fff 40%, #fffef9 100%)',
                border: '3px solid #c9a84c',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 56px',
                fontFamily: "'Georgia', 'Times New Roman', serif",
                boxShadow: '0 25px 60px rgba(0,0,0,0.12)',
            }}
        >
            {/* Corner ornaments */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => {
                const isTop = pos.includes('top');
                const isLeft = pos.includes('left');
                return (
                    <svg key={pos} width="80" height="80" viewBox="0 0 80 80" style={{
                        position: 'absolute',
                        [isTop ? 'top' : 'bottom']: 12,
                        [isLeft ? 'left' : 'right']: 12,
                        transform: `scaleX(${isLeft ? 1 : -1}) scaleY(${isTop ? 1 : -1})`,
                        opacity: 0.6,
                    }}>
                        <path d="M0 0 C0 0, 8 40, 0 80" stroke="#c9a84c" fill="none" strokeWidth="1.5" />
                        <path d="M0 0 C0 0, 40 8, 80 0" stroke="#c9a84c" fill="none" strokeWidth="1.5" />
                        <path d="M5 5 C5 5, 13 35, 5 65" stroke="#c9a84c" fill="none" strokeWidth="0.8" opacity="0.5" />
                        <path d="M5 5 C5 5, 35 13, 65 5" stroke="#c9a84c" fill="none" strokeWidth="0.8" opacity="0.5" />
                        <circle cx="6" cy="6" r="3" fill="#c9a84c" opacity="0.4" />
                    </svg>
                );
            })}

            {/* Inner border */}
            <div style={{
                position: 'absolute', inset: 10,
                border: '1px solid rgba(201,168,76,0.3)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', inset: 14,
                border: '0.5px solid rgba(201,168,76,0.15)',
                pointerEvents: 'none',
            }} />

            {/* Top decorative line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#c9a84c" opacity="0.5" />
                </svg>
                <div style={{ width: 80, height: 1, background: 'linear-gradient(270deg, transparent, #c9a84c)' }} />
            </div>

            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{
                    width: 28, height: 28, background: '#1e1b4b', borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 'bold', fontSize: 10, fontStyle: 'italic',
                    fontFamily: 'system-ui, sans-serif'
                }}>LX</div>
                <span style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontWeight: 800, fontSize: 22, color: '#1e1b4b', letterSpacing: '-0.5px'
                }}>LearnX</span>
            </div>

            {/* Title */}
            <h1 style={{
                fontSize: 28, fontWeight: 400, color: '#1e1b4b',
                textTransform: 'uppercase', letterSpacing: '0.35em',
                marginBottom: 6, fontFamily: "'Georgia', serif",
            }}>
                Certificate
            </h1>
            <p style={{
                fontSize: 11, color: '#94855a', textTransform: 'uppercase',
                letterSpacing: '0.25em', fontWeight: 600, marginBottom: 20,
                fontFamily: 'system-ui, sans-serif',
            }}>
                of Completion
            </p>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 120, height: 0.5, background: '#c9a84c' }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c' }} />
                <div style={{ width: 120, height: 0.5, background: '#c9a84c' }} />
            </div>

            {/* Preamble */}
            <p style={{
                fontSize: 12, color: '#6b7280', fontFamily: 'system-ui, sans-serif',
                fontWeight: 500, letterSpacing: '0.05em', marginBottom: 8
            }}>
                This is to certify that
            </p>

            {/* Name */}
            <h2 style={{
                fontSize: 38, color: '#1e1b4b', fontStyle: 'italic',
                fontWeight: 400, marginBottom: 10,
                borderBottom: '2px solid #c9a84c', paddingBottom: 4,
                minWidth: 300, textAlign: 'center',
            }}>
                {userName}
            </h2>

            {/* Body */}
            <p style={{
                fontSize: 12, color: '#6b7280', fontFamily: 'system-ui, sans-serif',
                fontWeight: 500, letterSpacing: '0.05em', marginBottom: 6, marginTop: 4,
            }}>
                has successfully completed all levels and mastery assessments of the
            </p>

            {/* Course */}
            <h3 style={{
                fontSize: 22, color: '#1e1b4b', fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                letterSpacing: '-0.3px', marginBottom: 24,
            }}>
                {cert.path_title}
            </h3>

            {/* Bottom Section */}
            <div style={{
                width: '100%', display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-end', paddingInline: 24, marginTop: 'auto',
            }}>
                {/* Date */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 130, borderBottom: '1px solid #c9a84c', marginBottom: 6 }} />
                    <span style={{
                        fontSize: 9, color: '#94855a', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.12em',
                        fontFamily: 'system-ui, sans-serif',
                    }}>Date of Issue</span>
                    <span style={{
                        fontSize: 12, color: '#374151', fontWeight: 600, marginTop: 3,
                        fontFamily: 'system-ui, sans-serif',
                    }}>{formatDate(cert.issued_at)}</span>
                </div>

                {/* Seal */}
                <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #d97706 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(245,158,11,0.4)',
                    border: '4px solid #fffdf7',
                    outline: '1px solid #fde68a',
                    position: 'relative', flexShrink: 0,
                }}>
                    <div style={{
                        position: 'absolute', inset: 4,
                        border: '1px dashed rgba(254,243,199,0.5)',
                        borderRadius: '50%',
                    }} />
                    <span style={{
                        fontWeight: 'bold', color: 'rgba(120,53,15,0.8)',
                        fontSize: 16, fontFamily: 'Georgia, serif',
                    }}>LX</span>
                </div>

                {/* Cert ID */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 130, borderBottom: '1px solid #c9a84c', marginBottom: 6 }} />
                    <span style={{
                        fontSize: 9, color: '#94855a', fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.12em',
                        fontFamily: 'system-ui, sans-serif',
                    }}>Certificate ID</span>
                    <span style={{
                        fontSize: 9, color: '#374151', fontFamily: 'monospace', marginTop: 3,
                    }}>{cert.certificate_id}</span>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function Certificates() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCert, setSelectedCert] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const certRef = useRef(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const data = await userService.getCertificates();
                setCertificates(data);
                if (data.length > 0) setSelectedCert(data[0]);
            } catch (error) {
                console.error('Error fetching certificates:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const handleDownload = () => {
        if (!certRef.current || !selectedCert) return;
        const printWindow = window.open('', '_blank');
        const certEl = certRef.current.querySelector('.certificate-card');
        if (!certEl) return;

        printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<title>LearnX Certificate - ${selectedCert.path_title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
<style>
  @page { size: landscape; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #fff; }
  @media print { body { background: white; } }
</style>
</head>
<body>${certEl.outerHTML}
<script>
  setTimeout(() => { window.print(); }, 600);
</script>
</body>
</html>`);
        printWindow.document.close();
    };

    const displayName = selectedCert?.user_name || user?.name || user?.username || 'Student';

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-['Plus_Jakarta_Sans']">
            <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activePage="certificates" />

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto w-full lg:pl-72">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full">

                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">🏆</span>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Certificates</h1>
                        </div>
                        <p className="text-slate-500 text-[15px] font-medium">
                            Complete all levels in a skill path to earn a verified certificate.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-pulse text-slate-400 font-bold text-lg">Loading certificates...</div>
                        </div>
                    ) : certificates.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-20">
                            <div className="h-28 w-28 mx-auto mb-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center shadow-inner">
                                <svg className="w-14 h-14 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Certificates Yet</h2>
                            <p className="text-slate-500 max-w-md mx-auto mb-8">
                                Complete all levels in a skill path to earn your first verified certificate.
                            </p>
                            <button
                                onClick={() => navigate('/skill-paths')}
                                className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                            >
                                Browse Skill Paths
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Certificates List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
                                {certificates.map((cert) => (
                                    <button
                                        key={cert.id}
                                        onClick={() => setSelectedCert(cert)}
                                        className={`text-left bg-white rounded-2xl p-5 border-2 transition-all hover:shadow-md ${
                                            selectedCert?.id === cert.id
                                            ? 'border-amber-400 shadow-lg shadow-amber-100/50 ring-1 ring-amber-200'
                                            : 'border-slate-100 hover:border-indigo-200'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div
                                                className="h-11 w-11 rounded-xl flex items-center justify-center text-white text-base font-bold shadow-sm"
                                                style={{ background: cert.color || '#4f46e5' }}
                                            >
                                                {cert.path_title.charAt(0)}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-base font-bold text-slate-900 truncate">{cert.path_title}</h3>
                                                <p className="text-xs text-slate-400 font-medium">{formatDate(cert.issued_at)}</p>
                                            </div>
                                            <div className="shrink-0 h-7 w-7 rounded-full bg-emerald-50 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-mono text-slate-300 truncate">{cert.certificate_id}</div>
                                    </button>
                                ))}
                            </div>

                            {/* Certificate Preview */}
                            {selectedCert && (
                                <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm p-6 xl:p-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            Certificate Preview
                                        </h2>
                                        <button
                                            onClick={handleDownload}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download PDF
                                        </button>
                                    </div>

                                    <div
                                        className="w-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 rounded-2xl p-6 sm:p-12 flex items-center justify-center relative overflow-hidden"
                                        ref={certRef}
                                    >
                                        {/* Background decorative glow */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-amber-100/30 blur-3xl rounded-full pointer-events-none" />

                                        <CertificateCard
                                            cert={selectedCert}
                                            userName={displayName}
                                            formatDate={formatDate}
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
