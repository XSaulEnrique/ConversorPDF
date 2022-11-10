function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad = null;

window.addEventListener('load', async () => {

   

    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let curso = document.getElementById('curso').value;
        let nombres = document.getElementById('nombre').value;
       
        generatePDF(curso, nombres);
    })

});

async function generatePDF(curso, nombres) {
    const image = await loadImage("certificado.jpg");
    

    const pdf = new jsPDF('p', 'pt', 'letter');

     pdf.addImage(image, 'PNG', 0, 0, 630, 792);


    pdf.setFontSize(12);
    pdf.text(curso, 235, 480);

    const date = new Date();
    pdf.text(date.getUTCDate().toString(), 270, 515);
    pdf.text((date.getUTCMonth() + 1).toString(), 310, 515);
    pdf.text(date.getUTCFullYear().toString(), 340, 515);

    pdf.setFontSize(10);
    pdf.text(nombres, 270   , 325);


    pdf.setFillColor(0, 0, 0);




    pdf.save("certificado.pdf");


}