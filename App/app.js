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

        let universidad = document.getElementById('universidad').value;
        let nombres = document.getElementById('nombre').value;
        let carrera = document.getElementById('carrera').value;
        let fecha = document.getElementById('fecha').value;
        let transaccion = document.getElementById('transaccion').value;

        generatePDF(universidad, nombres, carrera,fecha,transaccion);
    })

});

async function generatePDF(universidad, nombres,carrera,fecha,transaccion) {
    const image = await loadImage("certificado.jpg");


    const pdf = new jsPDF('p', 'pt', 'letter');

    pdf.addImage(image, 'PNG', 0, 0, 630, 792);


    pdf.setFontSize(12);
    pdf.text(carrera, 285, 480);

    
    pdf.setFontSize(10);
    pdf.text(universidad, 170, 600);
    pdf.text(nombres, 270, 350);
    pdf.text(fecha, 300, 700 );
    pdf.text(transaccion, 110, 170);


    pdf.setFillColor(0, 0, 0);




    pdf.save("certificado.pdf");


}