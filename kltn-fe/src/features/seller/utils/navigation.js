// src/utils/navigation.js
let _navigate = null;

export function setNavigator(navigateFn) {
  _navigate = navigateFn;
}

export function getNavigator() {
  return _navigate;
}
