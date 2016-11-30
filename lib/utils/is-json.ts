export function isJson(text: string): boolean {
  let result: boolean = false;
  if (text.match(/^{.*}$/)) {
    result = true;
  }
  return result;
}


export function isHtml(text: string): boolean {
  let result: boolean = false;
  if (text.match(/<html.*>/)) {
    result = true;
  }
  return result;
}