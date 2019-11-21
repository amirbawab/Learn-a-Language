const md5_lib = require('md5');

export function md5(text: string): string {
  return md5_lib(text);
}

export function shuffle(array: any[]): void {
  let current_id = array.length;
  let tmp_val = undefined;
  let rand_id = undefined;
  while (0 !== current_id) {
    rand_id = Math.floor(Math.random() * current_id);
    current_id -= 1;
    tmp_val = array[current_id];
    array[current_id] = array[rand_id];
    array[rand_id] = tmp_val;
  }
}
