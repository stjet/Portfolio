async function text_encrypt(text, password, nonce) {
  let data_bytes = (new TextEncoder()).encode(text);
  //single hash of password is 32 bytes, will be aes key
  let key_bytes = new Uint8Array(await window.crypto.subtle.digest("SHA-256", utf8_to_uint8(password)));
  //generate nonce if no nonce
  if (!nonce) {
    nonce = window.crypto.getRandomValues(new Uint8Array(16));
  }
  //key bytes to key object
  let key = await crypto.subtle.importKey(
    "raw",
    key_bytes,
    "AES-CTR",
    true,
    ["encrypt", "decrypt"]
  );
  return {
    encrypted: uint8_to_hex(new Uint8Array(await window.crypto.subtle.encrypt(
      {
        name: "AES-CTR",
        counter: nonce,
        length: 64
      },
      key,
      data_bytes
    ))),
    nonce: uint8_to_hex(nonce),
  };
}

function remove_empty_time(sound_file) {
  let lines = sound_file.split("\n");
  let s = lines.shift();
  for (let i=0; i < lines[0].split(":").length; i++) {
    let notes = [];
    for (let j=0; j < lines.length; j++) {
      if (lines[j].split(":")[i]) {
        notes.push("a");
      }
    }
    if (notes.length === 0) {
      console.log("found empty")
      //empty note, remove it
      for (let j=0; j < lines.length; j++) {
        lines[j] = lines[j].split(":").toSpliced(i,1).join(":");
      }
      break;
    }
  }
  return s+"\n"+lines.join("\n");
}


function dash_to_colon(lines) {
  lines = lines.split("\n");
  let s = lines.shift();
  let new_lines = "";
  for (let i=0; i < lines.length; i++) {
    let new_line = "";
    let line = lines[i];
    for (let c=0; c < line.length; c++) {
      if (line[c] === "-") {
        new_line += ":";
        if (line[c] === "-" && line[c+1] !== undefined && line[c+1] !== "-") {
          new_line += ":";
        }
      } else if (Number(line[c]) > 0) {
        new_line += line[c]+":";
      } else {
        new_line += line[c];
      }
    }
    new_lines += new_line+"\n";
  }
  return s+"\n"+new_lines;
}

function letter_to_notes(lines) {
  lines = lines.split("\n");
  let s = lines.shift();
  let new_lines = "";
  for (let i=0; i < lines.length; i++) {
    let line = lines[i];
    let new_line = "";
    for (let c=0; c < line.length; c++) {
      if (line[c] === line[c].toUpperCase() && line[c] !== line[c].toLowerCase()) {
        //is uppercase, add a #
        new_line += line[c]+"#";
      } else if (line[c] === line[c].toLowerCase() && line[c] !== line[c].toUpperCase()) {
        //is lowercase, uppercase it
        new_line += line[c].toUpperCase();
      } else {
        new_line += line[c];
      }
    }
    new_lines += new_line;
    if (i !== lines.length-1) {
      new_lines += "\n";
    }
  }
  return s+"\n"+new_lines;
}

function multiple(lines) {
  lines = dash_to_colon(lines);
  for (let i=0; i < 50; i++) {
    lines = remove_empty_time(lines);
  }
  return letter_to_notes(lines);
}

function multiple2(lines) {
  lines = dash_to_colon(lines);
  return letter_to_notes(lines);
}
