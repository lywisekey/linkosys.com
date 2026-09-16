export const changeHTMLAttribute = (attribute: string, value: string): void => {
  // Called during setup, which also runs on the server during prerendering.
  if (typeof document === 'undefined' || !document.body) return
  document.getElementsByTagName('html')[0].setAttribute(attribute, value)
}
