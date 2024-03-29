function save() {
    let fullname = document.getElementById('fullName').value;
    let mssv = document.getElementById('mssv').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let avatar = document.getElementById('avatar').value;
    let avatarInput = document.getElementById('avatar');
    if (avatarInput.files.length > 0) {
        avatar = URL.createObjectURL(avatarInput.files[0]);
    }

    let gender = '';
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    }
    if (document.getElementById('female').checked) {
        gender = document.getElementById('female').value;
    }

    if (fullname === '') {
        document.getElementById('fullname-error').innerHTML = '*vui long nhap thong tin';
    } else if (fullname.trim().length <= 6) {
        document.getElementById('fullname-error').innerHTML = '*không dc nho hon 6 ky tu';
    }else {
        document.getElementById('fullname-error').innerHTML = '';
    }

    if (email === '') {
        document.getElementById('email-error').innerHTML = '*vui long nhap thong tin';
        email = '';
    } else if (email.trim().length <= 6) {
        document.getElementById('email-error').innerHTML = '*không dc nho hon 6 ky tu';
        email = '';
    } else if (!emailIsValid(email)) {
        document.getElementById('email-error').innerHTML = '*Email không đúng định dạng!';
        email = '';
    } else {
        document.getElementById('email-error').innerHTML = '';
    }

    if (phone === '') {
        document.getElementById('phone-error').innerHTML = '*vui long nhap thong tin';
    } else if (phone.trim().length > 10) {
        document.getElementById('phone-error').innerHTML = '*không dc lon hon 10 ky tu';
    }else {
        document.getElementById('phone-error').innerHTML = '';
    }
    if (address === '') {
        document.getElementById('address-error').innerHTML = '*vui long nhập địa chỉ';
    } else {
        document.getElementById('address-error').innerHTML = '';
    }

    if (mssv === '') {
        document.getElementById('mssv-error').innerHTML = '*vui long nhap thong tin';
    } else {
        document.getElementById('mssv-error').innerHTML = '';
    }

    if (gender === '') {
        document.getElementById('gender-error').innerHTML = '*vui nhap chon gioi tinh'
    } else {
        document.getElementById('gender-error').innerHTML = ''
    }

    if (fullname && email && phone && address && mssv && gender && avatar) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        console.log({
            fullname: fullname,
            mssv: mssv,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
            avatar: avatar,
        })
        students.push({
            fullname: fullname,
            mssv: mssv,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
            avatar: avatar,
        });

        localStorage.setItem('students', JSON.stringify(students));

        renderListPersonnel();
    }
}

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderListPersonnel() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    console.log(students)
    if (students.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    }

    document.getElementById('list-student').style.display = 'block';

    let tableContent = `<tr>
        <td>#</td>
        <td>Avatar</td>
        <td>Full name</td>
        <td>MSSV</td>
        <td>Email</td>
        <td>Phone</td>
        <td>Gender</td>
        <td>Address</td>
        <td>Option</td>
    </tr>`;

    students.forEach((student, index) => {
        let studentID = index;
        let genderLabel = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
        index++;

        tableContent += `<tr>
            <td>${index}</td>
            <td><img src="${student.avatar}" alt="Avatar" style="width: 50px; height: 50px;"></td>
            <td>${student.fullname}</td>
            <td>${student.mssv}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${genderLabel}</td>
            <td>${student.address}</td>
            <td>
                <a href="#" onclick='deletePersonnel(${studentID})'>Delete</a>
                <a href="#" onclick='editPersonnel(${studentID})'>Edit</a>
            </td>
        </tr>`;
    });

    document.getElementById('grid-students').innerHTML = tableContent;
}

function deletePersonnel (id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListPersonnel();
}

function editPersonnel (id){
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')): [];
    let student = students[id];
    document.getElementById('fullName').value = student.fullname;
    document.getElementById('mssv').value = student.mssv;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone;
    document.getElementById('address').value = student.address;
    document.getElementById(student.gender === '1' ? 'male' : 'female').checked = true;
}

function reset() {
    document.getElementById('fullName').value = '';
    document.getElementById('mssv').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('avatar').value = '';
    document.getElementById('avatar-preview').src = '';
}

// function search() {
//     let searchText = document.getElementById('searchInput').value.toLowerCase();
//     let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
//     let filteredStudents = students.filter(student =>
//         student.fullname.toLowerCase().includes(searchText) ||
//         student.mssv.toLowerCase().includes(searchText)
//     );
//     renderListPersonnel(filteredStudents);
// }

function searchStudent() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("grid-students");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2]; // Cột chứa tên sinh viên
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// function previewAvatar() {
//     const fileInput = document.getElementById('avatar');
//     const imgPreview = document.getElementById('avatar-preview');
//
//     if (fileInput.files && fileInput.files[0]) {
//         const reader = new FileReader();
//
//         reader.onload = function (e) {
//             imgPreview.src = e.target.result;
//             imgPreview.style.display = 'block';
//         };
//
//         reader.readAsDataURL(fileInput.files[0]);
//     }
// }



