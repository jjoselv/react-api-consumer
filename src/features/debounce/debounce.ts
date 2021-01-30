/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * `wait` milliseconds.
 * @param {function} func The function to debounce
 * @param {number} wait delay in milliseconds
 * @returns {Array} On the first position the debounced function, on the second,
 *  a function that when called will clear the timeout, preventing scheduled execution
 */
export default function debounce(func: (...args: any) => any, wait: number = 500): Array<any> {
  let timeout: number | undefined;

  // Abort util to prevent execution of the function
  function stopExecution(): void {
    window.clearTimeout(timeout);
  }

  // This is the function that is returned and will be executed many times
  // We spread (...args) to capture any number of parameters we want to pass
  function debouncedFunction(...args: any) {
    // The callback function to be executed after
    // the debounce time has elapsed
    const later = () => {
      // null timeout to indicate the debounce ended
      timeout = undefined;

      // Execute the callback
      func(...args);
    };
    // This will reset the waiting every function execution.
    // This is the step that prevents the function from
    // being executed because it will never reach the
    // inside of the previous setTimeout
    window.clearTimeout(timeout);

    // Restart the debounce waiting period.
    // setTimeout returns a truthy value (it differs in web vs Node)
    timeout = window.setTimeout(later, wait);
  }

  return [debouncedFunction, stopExecution];
}
