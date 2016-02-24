window.customize = false;

window.onload = function () {

  var collectionElement = document.querySelector('.js-collection');
  if (collectionElement && items && items.length) {
    items.forEach(function (item) {
      var node = itemToNode(item);
      collectionElement.appendChild(node);
    });
  }

  window.onkeydown = function (event) {
    if (items && items.length) {
      items.forEach(function (item) {
        if (event.keyCode === item.shortcut) {
          window.location.replace(item.link);
        }
      });
    }
  }

  var customizeElement = document.querySelector('.js-customize');
  customizeElement.addEventListener('click', function () {
    window.customize = !window.customize;
  });

}

function itemToNode(item) {
  var element = document.createElement("div");
  element.classList.add("collection-item");
  element.innerHTML = document.querySelector(".collection-item-template").innerHTML;
  var image = element.querySelector(".js-img");
  image.src = "./icons/" + item.icon;
  image.title = item.name;

  element.addEventListener('click', function (event) {
    if (window.customize) {
      event.preventDefault();
      event.stopPropagation();

      createEditPopup(element, item);
    } else {
      window.location.href = item.link;
    }
  });

  return element;
}

function createEditPopup(element, item) {
  var popup = document.createElement("div");
  popup.classList.add("edit-popup");
  document.body.appendChild(popup);

  var elementBoundingRect = element.getBoundingClientRect();
  var popupBoundingRect = popup.getBoundingClientRect();
  popup.style.top = elementBoundingRect.top + elementBoundingRect.height + 15 + 'px';
  popup.style.left = elementBoundingRect.left - (popupBoundingRect.width / 2) +
  (elementBoundingRect.width / 2) + 'px';
}