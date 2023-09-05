const url = 'https://reqres.in/api/users'

const getUsers = () => {
    let content = ""
    fetch(url + '/')
        .then(response => response.json())
        .then(data => {
            let users = data.data
            for (let i = 0; i < users.length; i++) {
                content += `
                <div class="col-12 col-md-6 col-xl-4 my-3" style="max-width: 540px;">
                    <div class="card">
                        <div class="row">
                            <div class="col-4 col-md-3">
                                <img src="${users[i].avatar}" class="avatar img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-8 col-md-9">
                                <div class="card-body">
                                    <h5 class="card-title">${users[i].first_name} ${users[i].last_name}</h5>
                                    <p class="card-text">${users[i].email}</p>
                                    <button type="button" class="btn btn-primary" onclick="showUser(${users[i].id})" 
                                    data-bs-toggle="modal" data-bs-target="#showUser">
                                        Ver
                                    </button>
                                    <button type="button" class="btn btn-warning" onclick="getUser(${users[i].id})" 
                                    data-bs-toggle="modal" data-bs-target="#updateUser">
                                        Editar
                                    </button>
                                    <button onclick="deleteUser(${users[i].id})" type="button" class="btn btn-danger">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
                `;
            }
            document.getElementById('users').innerHTML = content;
        });
}

const addUser = () => {
    let name = document.getElementById('name').value
    let job = document.getElementById('job').value
    let btn = document.getElementById('btnCerrarAdd')
    let user = {
        name: name,
        job: job
    }

    if (name == "" || job == "") return Swal.fire({
        icon: 'error',
        title: 'Ambos campos son obligatorios'
    })

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            btn.click()
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso'
            })
        })
}

const showUser = (id) => {
    fetch(url + '/' + id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let user = data.data
            document.getElementById('firstname').value = user.first_name;
            document.getElementById('lastname').value = user.last_name;
            document.getElementById('email').value = user.email;
            document.getElementById('id').value = user.id;
        });
}

const getUser = (id) => {
    fetch(url + '/' + id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let user = data.data
            document.getElementById('nameM').value = user.first_name + " " + user.last_name;
            document.getElementById('idM').value = user.id;
        });
}

const updateUser = () => {
    let name = document.getElementById('nameM').value
    let job = document.getElementById('jobM').value
    let id = document.getElementById('idM').value
    let btn = document.getElementById('btnCerrarUp')
    let user = {
        name: name,
        job: job
    }
    fetch(url + '/' + id, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            btn.click()
            Swal.fire({
                icon: 'success',
                title: 'Modificación exitosa'
            })
        })
}

const deleteUser = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podras revertirlo!",
        icon: 'warning',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(url + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminación exitosa'
                })
            })
        }
    })
}