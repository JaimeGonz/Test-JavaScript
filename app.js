const url = 'https://jsonplaceholder.typicode.com/todos';

fetch(url)
    .then(respuesta => respuesta.json() )
    .then(resultado => mostrarHTML(resultado) )
    .catch(error => {
        console.log(error);
        const content = document.querySelector('#content');
        const err = document.querySelector('#error');
        
        content.classList.add('hide');
        err.classList.add('show');
    });

function mostrarHTML (list) {
    let tableData = "";
    const body = document.querySelector('#table_body');

    list.forEach(data => {

        const {userId, id, title, completed} = data;
        tableData += `
            <tr>
                <th class="text-center" > ${id} </th>
                <td class="text-center" > ${userId} </td>
                <td> ${title} </td>
                <td class="text-center" >${completed}</td>
            </tr>
        `
    });

    body.innerHTML = tableData;

    changeColorRows();
    paginar();
}

function changeColorRows() {
    const elements = document.getElementById("tabla").getElementsByTagName("tr");

    for ( var i=1;i<elements.length;i++ ) {
        if (elements[i].children[3].childNodes[0].nodeValue == "false" ){
            elements[i].style.background = "gray";
            elements[i].children[3].childNodes[0].textContent = "✖" ;
        } else {
            elements[i].children[3].childNodes[0].textContent = "✓" ;
        }
    }
}

const refrescar = document.querySelector("#refresh");
refrescar.addEventListener('click', function(){
    const content = document.querySelector('#content');
    const loading = document.querySelector('#loading');
    clean();
    
    content.classList.add('hide');
    loading.classList.add('show');
    setTimeout( () => {
        location.reload();
    }, 2000);
});

const btnCrear = document.querySelector('#btnCrear');
btnCrear.addEventListener("click", addRow);

document.querySelector("#descripcion").addEventListener("keyup", function(e){
    e.preventDefault();
    if(e.keyCode === 13 ){
        document.querySelector("#btnCrear").click();
    }
});

function addRow() {
    const table = document.querySelector("#table_body");
    const title = document.querySelector('#descripcion');
    const userId = Math.ceil(Math.random()*5000);
    const id = Math.ceil(Math.random()*5000);

    table.insertRow(0).innerHTML = `
        <tr>
            <th class="bg-secondary text-center" > ${userId} </th>
            <td class="bg-secondary text-center" > ${id} </td>
            <td class="bg-secondary " > ${title.value} </td>
            <td class="bg-secondary text-center" >✖</td>
        </tr>
    `;

    clean();
    paginar();

}

function clean (){
    const title = document.querySelector('#descripcion');
    title.value = "";
    title.focus();
}

function paginar () {
    paginator({
        table: document.getElementById("tabla"),
        box: document.getElementById("index_native"),
        page_options: false,
        tail_call: false,
    });
}
