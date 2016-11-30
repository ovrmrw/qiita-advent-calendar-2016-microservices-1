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


export function isPicture(text: string): boolean {
  let result: boolean = false;
  if (text.match(/PNG/)) {
    result = true;
  }
  return result;
}


export function convertToBody(body, encoding) {
  // This may be removed on Azure Function native support for Buffer
  // https://github.com/Azure/azure-webjobs-sdk-script/issues/814
  // https://github.com/Azure/azure-webjobs-sdk-script/pull/781
  return Buffer.isBuffer(body)
    ? body.toString(encoding)
    : body;
}