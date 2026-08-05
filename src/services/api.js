const API_BASE = '/api';

/**
 * Auxiliar seguro para parsear la respuesta HTTP sin quebrar en respuestas vacías o no-JSON
 */
async function handleResponse(res, defaultError = 'Error en la petición') {
  const text = await res.text();
  let data = null;

  if (text && text.trim().length > 0) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      // El cuerpo devuelto no es JSON válido (ej: HTML de error o texto plano)
    }
  }

  if (!res.ok) {
    const errorMsg = (data && (data.error || data.message)) || defaultError;
    throw new Error(errorMsg);
  }

  return data ?? [];
}

export async function fetchPublicPosts(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/posts${query ? `?${query}` : ''}`);
    return await handleResponse(res, 'Error al cargar publicaciones');
  } catch (err) {
    console.warn('API (fetchPublicPosts):', err.message);
    return [];
  }
}

export async function fetchPostBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/posts/${slug}`);
    return await handleResponse(res, 'Error al cargar la publicación');
  } catch (err) {
    console.warn('API (fetchPostBySlug):', err.message);
    return null;
  }
}

export async function loginAdmin(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return await handleResponse(res, 'Error al iniciar sesión');
}

export async function fetchAllPostsAdmin(token) {
  const res = await fetch(`${API_BASE}/posts/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await handleResponse(res, 'Error al cargar panel admin');
}

export async function savePostAdmin(token, postData) {
  const isEdit = !!postData.id;
  const url = isEdit ? `${API_BASE}/posts/${postData.id}` : `${API_BASE}/posts`;
  const method = isEdit ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  return await handleResponse(res, 'Error al guardar la publicación');
}

export async function deletePostAdmin(token, id) {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return await handleResponse(res, 'Error al eliminar la publicación');
}

export async function togglePublishAdmin(token, id, published) {
  const res = await fetch(`${API_BASE}/posts/${id}/publish`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ published }),
  });
  return await handleResponse(res, 'Error al cambiar estado');
}

export async function fetchUsersAdmin(token) {
  const res = await fetch(`${API_BASE}/auth/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await handleResponse(res, 'Error al cargar lista de usuarios');
}

export async function createUserAdmin(token, userData) {
  const res = await fetch(`${API_BASE}/auth/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return await handleResponse(res, 'Error al crear usuario');
}

export async function deleteUserAdmin(token, userId) {
  const res = await fetch(`${API_BASE}/auth/users/${userId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return await handleResponse(res, 'Error al eliminar usuario');
}

export async function updateUserAdmin(token, userId, userData) {
  const res = await fetch(`${API_BASE}/auth/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return await handleResponse(res, 'Error al actualizar usuario');
}

export async function updateProfileAdmin(token, profileData) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  return await handleResponse(res, 'Error al actualizar el perfil');
}

export async function uploadImage(token, file) {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return await handleResponse(res, 'Error al subir la imagen');
}

