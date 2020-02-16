let dragged = null;

function handleDragStart(e) {
  dragged = this.cloneNode(true);
  dragged.classList.remove('item');
  dragged.classList.add('contentItem');
  // e.dataTransfer.effectAllowed = 'copy';
  // e.dataTransfer.setData('text/html', e.target);
  
  this.style.opacity = '0.4';
}

function handleDragOver(e) {
  if (e.preventDefault) e.preventDefault();

  // e.dataTransfer.dropEffect = 'copy';
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  if (e.stopPropagation) e.stopPropagation();

  e.target.appendChild(dragged);
  content.classList.remove('over');

  return false;
}

function handleDragEnd(e) {
  e.target.style.opacity = '';
}

function itemHandlers(item) {
  item.addEventListener('dragstart', handleDragStart, false);
  item.addEventListener('dragend', handleDragEnd, false);
}

function contentHandlers(item) {
  item.addEventListener('dragenter', handleDragEnter, false)
  item.addEventListener('dragover', handleDragOver, false);
  item.addEventListener('dragleave', handleDragLeave, false);
  doctype.addEventListener('drop', handleDrop, false);
}

const items = document.querySelectorAll('.item');
items.forEach(itemHandlers);

const doctype = document.getElementById('doctype');
const content = document.getElementById('content');
contentHandlers(content);
