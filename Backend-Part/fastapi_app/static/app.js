const API_ROOT = 'http://localhost:8000/api'

async function checkHealth(){
  try{
    const r = await fetch(API_ROOT + '/health')
    const j = await r.json()
    document.getElementById('health').textContent = j.status
  }catch(e){
    document.getElementById('health').textContent = 'error'
  }
}

async function loadItems(){
  const res = await fetch(API_ROOT + '/items')
  const items = await res.json()
  const container = document.getElementById('items')
  container.innerHTML = ''
  if(!items.length) container.textContent = 'No items yet.'
  items.forEach(it => {
    const el = document.createElement('div')
    el.className = 'item'
    el.innerHTML = `<b>${escapeHtml(it.name)}</b> <small>id:${it.id}</small><div>${escapeHtml(it.description)}</div>`
    const del = document.createElement('button')
    del.textContent = 'Delete'
    del.onclick = async ()=>{
      await fetch(API_ROOT + '/items/' + it.id, {method:'DELETE'})
      loadItems()
    }
    el.appendChild(del)
    container.appendChild(el)
  })
}

async function createItem(){
  const name = document.getElementById('name').value.trim()
  const desc = document.getElementById('desc').value.trim()
  if(!name) return alert('name required')
  await fetch(API_ROOT + '/items', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({name, description: desc})
  })
  document.getElementById('name').value = ''
  document.getElementById('desc').value = ''
  loadItems()
}

function escapeHtml(s){
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

document.getElementById('btnHealth').onclick = checkHealth
document.getElementById('btnLoad').onclick = loadItems
document.getElementById('btnCreate').onclick = createItem

// auto-load
checkHealth()
loadItems()
