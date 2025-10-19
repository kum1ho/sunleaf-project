// In-memory сховище запитів
const requests = [];

function addRequest(data) {
  const request = {
    id: Date.now(),
    ...data,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  requests.unshift(request);
  console.log('[Requests Storage] Added request:', request.id, request.type);
  return request;
}

function getRequests(type = null) {
  if (type) {
    return requests.filter(r => r.type === type);
  }
  return requests;
}

function updateRequestStatus(id, status) {
  const request = requests.find(r => r.id === Number(id));
  if (request) {
    request.status = status;
    request.updatedAt = new Date().toISOString();
    console.log('[Requests Storage] Updated:', id, status);
    return request;
  }
  return null;
}

function getStats() {
  return {
    total: requests.length,
    new: requests.filter(r => r.status === 'new').length,
    processing: requests.filter(r => r.status === 'processing').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };
}

module.exports = { addRequest, getRequests, updateRequestStatus, getStats };
