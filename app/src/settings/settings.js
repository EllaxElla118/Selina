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