addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('gid').innerText = gid;
    document.getElementById('wlcMsg').innerText = wlcMsg;
    document.getElementById('exitMsg').innerText = lvMsg;
    document.getElementById('i2').checked = antiLink;
      let e = gowner.split('@c.us').join('').split('+').join('');
      let y = '*'.repeat(e.length-6);
      e = e.slice(0, 3) + y + e.slice(-3);
    document.getElementById('groupOwner').innerText = e;
});

function openFilePicker() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click(); // Programmatically open the file picker

    fileInput.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            addTag('{image}', 'wlcMsg');
        }
    };
}

function addTag(tag, id) {
    if(tag === '{image}') {
        let t = document.getElementById(id).value;
        document.getElementById(id).value = `[The image you selected will be added here]
` + t;
    }
    else {
        document.getElementById(id).value += tag;
    }
}

function prepsave() {
    document.getElementById('otp_space').style.display = 'block';
}

function save() {
    let gid = document.getElementById('gid').innerText;
    let wlcMsg = document.getElementById('wlcMsg').innerText;
    let lvMsg = document.getElementById('exitMsg').innerText;
    let antiLink = document.getElementById('i2').checked;
    let otp_in = document.getElementById('otp_in').value;
    let save_uri = `https://selina-theta.vercel.app/api/dbsave?gid=${gid}&wlcMsg=${wlcMsg}&lvMsg=${lvMsg}}&antiLink=${antiLink}&hashed=${hashed}&otp_in=${otp_in}`;
    location.href = save_uri;
}
