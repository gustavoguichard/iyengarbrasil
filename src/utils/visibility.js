export default (fn) => {
  // Set the name of the hidden property and the change event for visibility
  let hidden, visibilityChange
  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden"
    visibilityChange = "visibilitychange"
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden"
    visibilityChange = "msvisibilitychange"
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden"
    visibilityChange = "webkitvisibilitychange"
  }

  if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
    console.log('Browser does not support visibility API')
  } else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, fn, false);
  }
  return {
    hidden,
    unlisten: () => {
      if(typeof document.removeEventListener !== "undefined") {
        document.removeEventListener(visibilityChange, fn, false)
      }
    },
  }
}
