class Student {
    constructor(id, fullName, birthdate, gender, classInfo, avatar) {
        this.id = id;
        this.fullName = fullName;
        this.birthdate = birthdate;
        this.gender = gender;
        this.classInfo = classInfo;
        this.avatar = avatar;
    }
}

class UI {
    static displayStudents() {
        const students = Store.getStudents();

        students.forEach((student) => UI.addStudentToList(student));
    }

    static addStudentToList(student) {
        const studentList = document.querySelector('#student-list');

        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';
        studentItem.innerHTML = `
      <p><strong>Mã số sinh viên:</strong> ${student.id}</p>
      <p><strong>Họ và tên:</strong> ${student.fullName}</p>
      <p><strong>Ngày sinh:</strong> ${student.birthdate}</p>
      <p><strong>Giới tính:</strong> ${student.gender}</p>
      <p><strong>Lớp:</strong> ${student.classInfo}</p>
      <img src="${student.avatar}" alt="Avatar">
      <button class="delete" data-id="${student.id}">Xóa</button>
    `;
        studentList.appendChild(studentItem);
    }

    static deleteStudent(el) {
        if (el.classList.contains('delete')) {
            const id = el.getAttribute('data-id');
            el.parentElement.remove();
            Store.removeStudent(id);
        }
    }

    static clearFields() {
        document.querySelector('#student-id').value = '';
        document.querySelector('#full-name').value = '';
        document.querySelector('#birthdate').value = '';
        document.querySelector('#gender').selectedIndex = 0;
        document.querySelector('#class').value = '';
        document.querySelector('#avatar').value = '';
    }
}

class Store {
    static getStudents() {
        let students;
        if (localStorage.getItem('students') === null) {
            students = [];
        } else {
            students = JSON.parse(localStorage.getItem('students'));
        }
        return students;
    }

    static addStudent(student) {
        const students = Store.getStudents();
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
    }

    static removeStudent(id) {
        const students = Store.getStudents();
        students.forEach((student, index) => {
            if (student.id === id) {
                students.splice(index, 1);
            }
        });
        localStorage.setItem('students', JSON.stringify(students));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayStudents);

document.querySelector('#student-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#student-id').value;
    const fullName = document.querySelector('#full-name').value;
    const birthdate = document.querySelector('#birthdate').value;
    const gender = document.querySelector('#gender').value;
    const classInfo = document.querySelector('#class').value;
    const avatar = document.querySelector('#avatar').value;

    const student = new Student(id, fullName, birthdate, gender, classInfo, avatar);

    UI.addStudentToList(student);

    Store.addStudent(student);

    UI.clearFields();
});

document.querySelector('#student-list').addEventListener('click', (e) => {
    UI.deleteStudent(e.target);
});
