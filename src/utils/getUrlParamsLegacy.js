let weakMap = new WeakMap()
/** 
 * @param {string} paramName  
 */
export function getQueryParam(paramName) {
	const urlParams = new URLSearchParams(decodeURIComponent(window.location.search));
  return urlParams.get(paramName);
}