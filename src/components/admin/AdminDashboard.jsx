import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Eye, EyeOff, LogOut, Sparkles, Search, CheckCircle, Clock, Users, FileText, UserPlus, X, AlertCircle, Key, UserCheck, Shield } from 'lucide-react';
import { fetchAllPostsAdmin, deletePostAdmin, togglePublishAdmin, fetchUsersAdmin, createUserAdmin, deleteUserAdmin, updateUserAdmin, updateProfileAdmin } from '../../services/api';
import PostEditor from './PostEditor';
import SLPLogo from '../SLPLogo';

export default function AdminDashboard({ token, admin, onLogout, onGoToSite }) {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'users'

  // Posts State
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [search, setSearch] = useState('');

  // Users State
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [userModalError, setUserModalError] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);

  // Edit User State
  const [editingUser, setEditingUser] = useState(null); // usuario seleccionado para editar
  const [editUserData, setEditUserData] = useState({ name: '', email: '', password: '' });
  const [updatingUser, setUpdatingUser] = useState(false);
  const [editUserError, setEditUserError] = useState('');

  // Self Profile / Change Password State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({ name: admin?.name || '', email: admin?.email || '', currentPassword: '', newPassword: '' });
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [profileModalError, setProfileModalError] = useState('');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');


  const loadPosts = async () => {
    setLoadingPosts(true);
    setPostsError('');
    try {
      const data = await fetchAllPostsAdmin(token);
      setPosts(data);
    } catch (err) {
      setPostsError(err.message || 'Error al cargar las publicaciones');
    } finally {
      setLoadingPosts(false);
    }
  };

  const loadUsers = async () => {
    setLoadingUsers(true);
    setUsersError('');
    try {
      const data = await fetchUsersAdmin(token);
      setUsers(data);
    } catch (err) {
      setUsersError(err.message || 'Error al cargar los usuarios');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  const handleDeletePost = async (id, title) => {
    if (!window.confirm(`¿Estás seguro de eliminar la publicación "${title}"?`)) return;
    try {
      await deletePostAdmin(token, id);
      loadPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await togglePublishAdmin(token, id, !currentStatus);
      loadPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    setUserModalError('');
    setCreatingUser(true);
    try {
      await createUserAdmin(token, newUser);
      setNewUser({ name: '', email: '', password: '' });
      setShowUserModal(false);
      loadUsers();
    } catch (err) {
      setUserModalError(err.message || 'Error al crear usuario');
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUser = async (id, email) => {
    if (!window.confirm(`¿Eliminar al usuario "${email}" del sistema CMS?`)) return;
    try {
      await deleteUserAdmin(token, id);
      loadUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleOpenEditUser = (u) => {
    setEditingUser(u);
    setEditUserData({ name: u.name, email: u.email, password: '' });
    setEditUserError('');
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    setEditUserError('');
    setUpdatingUser(true);
    try {
      await updateUserAdmin(token, editingUser.id, editUserData);
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      setEditUserError(err.message || 'Error al actualizar el usuario');
    } finally {
      setUpdatingUser(false);
    }
  };

  const handleOpenProfileModal = () => {
    setProfileData({ name: admin?.name || '', email: admin?.email || '', currentPassword: '', newPassword: '' });
    setProfileModalError('');
    setProfileSuccessMsg('');
    setShowProfileModal(true);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileModalError('');
    setProfileSuccessMsg('');
    setUpdatingProfile(true);
    try {
      const updatedUser = await updateProfileAdmin(token, profileData);
      setProfileSuccessMsg('¡Perfil y contraseña actualizados correctamente!');
      localStorage.setItem('slp_admin_user', JSON.stringify(updatedUser));
      setTimeout(() => {
        setShowProfileModal(false);
      }, 1500);
    } catch (err) {
      setProfileModalError(err.message || 'Error al actualizar el perfil');
    } finally {
      setUpdatingProfile(false);
    }
  };

  if (isCreatingPost || editingPost) {
    return (
      <PostEditor
        token={token}
        post={editingPost}
        onBack={() => { setIsCreatingPost(false); setEditingPost(null); }}
        onSaved={() => { setIsCreatingPost(false); setEditingPost(null); loadPosts(); }}
      />
    );
  }

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'inherit' }}>
      
      {/* Top Header Bar */}
      <div style={{ background: '#0f1e33', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '14px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <SLPLogo size="small" />
            <span style={{ color: '#f37021', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(243,112,33,0.12)', padding: '4px 10px', borderRadius: 8 }}>
              Panel CMS Admin
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={onGoToSite} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              Ver Sitio Web →
            </button>
            <div style={{ height: 16, width: 1, background: 'rgba(255,255,255,0.15)' }} />
            
            <button
              onClick={handleOpenProfileModal}
              title="Editar mi perfil y cambiar contraseña"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#e2e8f0',
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Key style={{ width: 14, height: 14, color: '#f37021' }} />
              <span>{admin?.name || admin?.email}</span>
            </button>

            <button onClick={onLogout} style={{ background: 'rgba(239,68,68,0.15)', border: 'none', color: '#ef4444', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <LogOut style={{ width: 14, height: 14 }} /> Salir
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 28px' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: 12, borderBottom: '2px solid #e2e8f0', marginBottom: 32 }}>
          <button
            onClick={() => setActiveTab('posts')}
            style={{
              padding: '12px 20px', border: 'none', background: 'transparent',
              fontSize: 14, fontWeight: 800, cursor: 'pointer',
              color: activeTab === 'posts' ? '#f37021' : '#64748b',
              borderBottom: activeTab === 'posts' ? '3px solid #f37021' : '3px solid transparent',
              marginBottom: -2, display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            <FileText style={{ width: 18, height: 18 }} />
            Publicaciones ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '12px 20px', border: 'none', background: 'transparent',
              fontSize: 14, fontWeight: 800, cursor: 'pointer',
              color: activeTab === 'users' ? '#f37021' : '#64748b',
              borderBottom: activeTab === 'users' ? '3px solid #f37021' : '3px solid transparent',
              marginBottom: -2, display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            <Users style={{ width: 18, height: 18 }} />
            Usuarios CMS ({users.length})
          </button>
        </div>

        {/* ── TAB 1: PUBLICACIONES ── */}
        {activeTab === 'posts' && (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 32 }}>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0f1e33', margin: '0 0 4px' }}>Gestor de Publicaciones</h1>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Crea, edita y administra el contenido del blog SLP</p>
              </div>

              <button
                onClick={() => setIsCreatingPost(true)}
                style={{
                  padding: '12px 24px', borderRadius: 12, border: 'none',
                  background: 'linear-gradient(135deg, #f37021, #dc5c10)', color: '#ffffff',
                  fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: '0 8px 20px rgba(243, 112, 33, 0.25)'
                }}
              >
                <Plus style={{ width: 18, height: 18 }} />
                Nueva Publicación
              </button>
            </div>

            {/* Filter & Stats */}
            <div style={{ background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8f0', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ position: 'relative', minWidth: 280 }}>
                <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#94a3b8' }} />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Buscar por título o categoría..."
                  style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 12.5, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 16, fontSize: 12, fontWeight: 700, color: '#475569' }}>
                <span>Total: <strong>{posts.length}</strong></span>
                <span>Publicados: <strong style={{ color: '#10b981' }}>{posts.filter(p => p.published).length}</strong></span>
                <span>Borradores: <strong style={{ color: '#f59e0b' }}>{posts.filter(p => !p.published).length}</strong></span>
              </div>
            </div>

            {/* Posts Table */}
            {loadingPosts ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#64748b', fontSize: 14 }}>Cargando publicaciones...</div>
            ) : postsError ? (
              <div style={{ background: '#fef2f2', color: '#ef4444', padding: 20, borderRadius: 12, textAlign: 'center' }}>{postsError}</div>
            ) : filteredPosts.length === 0 ? (
              <div style={{ background: '#fff', padding: 48, borderRadius: 16, textAlign: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1' }}>
                No hay publicaciones que coincidan.
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 11, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '14px 20px' }}>Publicación</th>
                      <th style={{ padding: '14px 20px' }}>Categoría</th>
                      <th style={{ padding: '14px 20px' }}>Estado</th>
                      <th style={{ padding: '14px 20px' }}>Fecha</th>
                      <th style={{ padding: '14px 20px', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <img src={p.cover_url || '/blog1.png'} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', background: '#f1f5f9' }} />
                            <div>
                              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0f1e33', lineHeight: 1.3 }}>{p.title}</div>
                              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>/blog/{p.slug} {p.featured && <span style={{ color: '#f37021', fontWeight: 700 }}>★ Destacado</span>}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: p.accent || '#0f1e33', background: p.accent_bg || '#f1f5f9', padding: '4px 10px', borderRadius: 8 }}>
                            {p.category_label || p.category}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <button
                            onClick={() => handleTogglePublish(p.id, p.published)}
                            style={{
                              border: 'none', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 800, cursor: 'pointer',
                              background: p.published ? '#ecfdf5' : '#fffbeb', color: p.published ? '#059669' : '#d97706',
                              display: 'inline-flex', alignItems: 'center', gap: 4
                            }}
                          >
                            {p.published ? <CheckCircle style={{ width: 12, height: 12 }} /> : <Clock style={{ width: 12, height: 12 }} />}
                            {p.published ? 'Publicado' : 'Borrador'}
                          </button>
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                          {new Date(p.created_at).toLocaleDateString('es-CO')}
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                            <button onClick={() => setEditingPost(p)} title="Editar" style={{ background: '#f1f5f9', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer', color: '#334155' }}>
                              <Edit3 style={{ width: 16, height: 16 }} />
                            </button>
                            <button onClick={() => handleDeletePost(p.id, p.title)} title="Eliminar" style={{ background: '#fef2f2', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer', color: '#ef4444' }}>
                              <Trash2 style={{ width: 16, height: 16 }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ── TAB 2: USUARIOS CMS ── */}
        {activeTab === 'users' && (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 32 }}>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: '#0f1e33', margin: '0 0 4px' }}>Usuarios Administradores</h1>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Cuentas autorizadas para gestionar contenido en el CMS</p>
              </div>

              <button
                onClick={() => { setUserModalError(''); setShowUserModal(true); }}
                style={{
                  padding: '12px 24px', borderRadius: 12, border: 'none',
                  background: 'linear-gradient(135deg, #20c997, #12b886)', color: '#ffffff',
                  fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: '0 8px 20px rgba(32, 201, 151, 0.25)'
                }}
              >
                <UserPlus style={{ width: 18, height: 18 }} />
                Crear Nuevo Usuario
              </button>
            </div>

            {loadingUsers ? (
              <div style={{ textAlign: 'center', padding: 60, color: '#64748b', fontSize: 14 }}>Cargando usuarios...</div>
            ) : usersError ? (
              <div style={{ background: '#fef2f2', color: '#ef4444', padding: 20, borderRadius: 12, textAlign: 'center' }}>{usersError}</div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 11, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
                      <th style={{ padding: '14px 20px' }}>Usuario</th>
                      <th style={{ padding: '14px 20px' }}>Email</th>
                      <th style={{ padding: '14px 20px' }}>Fecha de Registro</th>
                      <th style={{ padding: '14px 20px', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#0f1e33', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900 }}>
                              {u.name ? u.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                            <div>
                              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0f1e33' }}>
                                {u.name} {admin?.id === u.id && <span style={{ fontSize: 10, background: '#20c997', color: '#fff', padding: '2px 8px', borderRadius: 10, marginLeft: 6 }}>Tú</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: 13, color: '#475569', fontWeight: 600 }}>{u.email}</td>
                        <td style={{ padding: '16px 20px', fontSize: 12, color: '#64748b', fontWeight: 600 }}>
                          {new Date(u.created_at).toLocaleDateString('es-CO')}
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button onClick={() => handleOpenEditUser(u)} title="Editar Usuario / Cambiar Contraseña" style={{ background: '#f1f5f9', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer', color: '#334155' }}>
                              <Edit3 style={{ width: 16, height: 16 }} />
                            </button>
                            {admin?.id !== u.id && (
                              <button onClick={() => handleDeleteUser(u.id, u.email)} title="Eliminar Usuario" style={{ background: '#fef2f2', border: 'none', padding: 8, borderRadius: 8, cursor: 'pointer', color: '#ef4444' }}>
                                <Trash2 style={{ width: 16, height: 16 }} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

      </div>

      {/* ── MODAL: CREAR USUARIO ── */}
      {showUserModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(15,30,51,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 20, maxWidth: 420, width: '100%', padding: 28, boxShadow: '0 20px 50px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button onClick={() => setShowUserModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X style={{ width: 16, height: 16, color: '#64748b' }} />
            </button>

            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f1e33', margin: '0 0 6px' }}>Nuevo Usuario Administrador</h3>
            <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 20px' }}>Conceder acceso al CMS de SLP Soluciones Informáticas</p>

            {userModalError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: 12, marginBottom: 16, color: '#991b1b', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span>{userModalError}</span>
              </div>
            )}

            <form onSubmit={handleCreateUserSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="ej. Carlos Rodríguez"
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="carlos@slp.com"
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Contraseña</label>
                <input
                  type="password"
                  required
                  minLength={4}
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <button
                type="submit"
                disabled={creatingUser}
                style={{
                  width: '100%', padding: 12, borderRadius: 10, border: 'none',
                  background: 'linear-gradient(135deg, #20c997, #12b886)', color: '#fff',
                  fontSize: 13, fontWeight: 800, cursor: creatingUser ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(32, 201, 151, 0.3)'
                }}
              >
                {creatingUser ? 'Creando...' : 'Crear Usuario'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: EDITAR USUARIO ── */}
      {editingUser && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(15,30,51,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 20, maxWidth: 420, width: '100%', padding: 28, boxShadow: '0 20px 50px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button onClick={() => setEditingUser(null)} style={{ position: 'absolute', top: 16, right: 16, background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X style={{ width: 16, height: 16, color: '#64748b' }} />
            </button>

            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f1e33', margin: '0 0 6px' }}>Editar Usuario</h3>
            <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 20px' }}>Modificar datos o asignar nueva contraseña a {editingUser.email}</p>

            {editUserError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: 12, marginBottom: 16, color: '#991b1b', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span>{editUserError}</span>
              </div>
            )}

            <form onSubmit={handleEditUserSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={editUserData.name}
                  onChange={e => setEditUserData({ ...editUserData, name: e.target.value })}
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={editUserData.email}
                  onChange={e => setEditUserData({ ...editUserData, email: e.target.value })}
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>
                  Nueva Contraseña <span style={{ color: '#94a3b8', textTransform: 'none', fontWeight: 500 }}>(Opcional)</span>
                </label>
                <input
                  type="password"
                  value={editUserData.password}
                  onChange={e => setEditUserData({ ...editUserData, password: e.target.value })}
                  placeholder="Dejar en blanco para mantener la actual"
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <button
                type="submit"
                disabled={updatingUser}
                style={{
                  width: '100%', padding: 12, borderRadius: 10, border: 'none',
                  background: 'linear-gradient(135deg, #f37021, #dc5c10)', color: '#fff',
                  fontSize: 13, fontWeight: 800, cursor: updatingUser ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(243, 112, 33, 0.3)'
                }}
              >
                {updatingUser ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: MI PERFIL Y CAMBIAR CONTRASEÑA ── */}
      {showProfileModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(15,30,51,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 20, maxWidth: 440, width: '100%', padding: 28, boxShadow: '0 20px 50px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button onClick={() => setShowProfileModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X style={{ width: 16, height: 16, color: '#64748b' }} />
            </button>

            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f1e33', margin: '0 0 6px' }}>Mi Perfil & Seguridad</h3>
            <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 20px' }}>Edita tus datos personales y cambia tu contraseña de acceso</p>

            {profileModalError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: 12, marginBottom: 16, color: '#991b1b', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span>{profileModalError}</span>
              </div>
            )}

            {profileSuccessMsg && (
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: 12, marginBottom: 16, color: '#15803d', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span>{profileSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={profileData.name}
                  onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={profileData.email}
                  onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '20px 0' }} />
              
              <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0f1e33', margin: '0 0 14px' }}>Cambiar Contraseña (Opcional)</h4>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Contraseña Actual</label>
                <input
                  type="password"
                  value={profileData.currentPassword}
                  onChange={e => setProfileData({ ...profileData, currentPassword: e.target.value })}
                  placeholder="Requerida para cambiar contraseña"
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Nueva Contraseña</label>
                <input
                  type="password"
                  value={profileData.newPassword}
                  onChange={e => setProfileData({ ...profileData, newPassword: e.target.value })}
                  placeholder="Mínimo 8 caracteres"
                  style={{ width: '100%', padding: 10, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <button
                type="submit"
                disabled={updatingProfile}
                style={{
                  width: '100%', padding: 12, borderRadius: 10, border: 'none',
                  background: 'linear-gradient(135deg, #0f1e33, #162a45)', color: '#fff',
                  fontSize: 13, fontWeight: 800, cursor: updatingProfile ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(15, 30, 51, 0.3)'
                }}
              >
                {updatingProfile ? 'Actualizando...' : 'Actualizar Perfil'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

