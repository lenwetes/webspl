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

import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_903xb8u';
const EMAILJS_TEMPLATE_ID = 'template_8z9jwzl';
const EMAILJS_PUBLIC_KEY = 'Xr5_oJICjSgT1PGam';

export async function sendContact(data) {
  const rows = [
    `Origen: ${data.origen || 'Web'}`,
    `Nombre: ${data.nombre}`,
    `Empresa: ${data.empresa || 'N/A'}`,
    `Teléfono: ${data.telefono}`,
    `Correo: ${data.correo}`,
    `Servicio: ${data.servicio || 'N/A'}`,
    data.alcance ? `Alcance: ${data.alcance}` : '',
    data.urgencia ? `Urgencia: ${data.urgencia}` : '',
    data.presupuesto ? `Presupuesto: ${data.presupuesto}` : '',
    `Mensaje / Requerimiento: ${data.mensaje || 'N/A'}`,
  ].filter(Boolean);

  const plainMessage = rows.join('\n');
  const htmlMessage = rows.join('<br/>');

  const templateParams = {
    from_name: data.nombre,
    name: data.nombre,
    nombre: data.nombre,
    user_name: data.nombre,

    reply_to: data.correo,
    email: data.correo,
    user_email: data.correo,
    correo: data.correo,
    from_email: data.correo,

    phone: data.telefono,
    telefono: data.telefono,
    tel: data.telefono,
    celular: data.telefono,

    company: data.empresa || 'N/A',
    empresa: data.empresa || 'N/A',

    service: data.servicio || 'N/A',
    servicio: data.servicio || 'N/A',

    scale: data.alcance || '',
    alcance: data.alcance || '',
    urgency: data.urgencia || '',
    urgencia: data.urgencia || '',
    budget: data.presupuesto || '',
    presupuesto: data.presupuesto || '',
    detalles: data.mensaje || 'N/A',
    details: data.mensaje || 'N/A',

    subject: `[${data.origen}] ${data.servicio || 'Consulta'} — ${data.nombre}`,
    origen: data.origen,
    fecha: new Date().toLocaleString('es-CO', { dateStyle: 'long', timeStyle: 'short' }),

    message: plainMessage,
    message_html: htmlMessage,
    mensaje: htmlMessage,
    content: plainMessage,
    text: plainMessage,
    notes: plainMessage,
    body: plainMessage,
  };

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Tiempo de espera agotado. Contáctenos por WhatsApp al 321 445 1817.')), 10000)
  );

  const sendPromise = emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    EMAILJS_PUBLIC_KEY
  );

  try {
    return await Promise.race([sendPromise, timeoutPromise]);
  } catch (err) {
    console.error('EmailJS error:', err);
    throw new Error(err.text || err.message || 'No se pudo enviar el mensaje. Contáctenos por WhatsApp al 321 445 1817.');
  }
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

