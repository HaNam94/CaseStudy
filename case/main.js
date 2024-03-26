function save() {
    let fullname = document.getElementById('fullName').value;
    let mssv = document.getElementById('mssv').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;

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

    if (fullname && email && phone && address && mssv && gender) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        console.log({
            fullname: fullname,
            mssv: mssv,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        })
        students.push({
            fullname: fullname,
            mssv: mssv,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
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
            <td>${student.fullname}</td>
            <td>${student.mssv}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${genderLabel}</td>
            <td>${student.address}</td>
            <td>
                <a href="#" onclick='deletePersonnel(${studentID})'>Delete</a>
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

function reset() {
    let check;
    document.getElementById('fullName-error').innerHTML = '';
    document.getElementById('mssv-error').innerHTML = '';
    document.getElementById('email-error').innerHTML = '';
    document.getElementById('phone-error').innerHTML = '';
    document.getElementById('address-error').innerHTML = '';
    check = true;
    return check;
}